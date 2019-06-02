if (process.env.NODE_ENV !== 'production')
  require('dotenv').config()

const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User  = require('./models/User')
const jwt = require('jsonwebtoken')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => Book.find({ author: root.id }).countDocuments()
  },

  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      const genre = args.genre
      const author = args.author
      const query_args = {}

      if (genre) query_args.genres = { $in: [genre] }
      if (author) query_args.author = { $eq: author }

      return await Book.find(query_args).populate('author')
    },
    allAuthors: () => Author.find({}),
    me: (_0, _1, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    addBook: async (_, args, ctx) => {
      if (!ctx.currentUser) throw new AuthenticationError("must be logged in.")
      let existing = await Book.find({ title: args.title }).count()
      if (existing != 0) throw new UserInputError("Book already exists", { title: args.title })

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
      }

      const book = new Book({ ...args, author: author })

      try {
        await book.save()
        await author.save()
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args })
      }

      return book
    },
    editAuthor: async (_, args, ctx) => {
      if (!ctx.currentUser) throw new AuthenticationError("must be logged in.")
      let author = await Author.findOne({ name: args.name })
      if (!author) return null

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args })
      }

      return author
    },
    createUser: async (_, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      return user
    },
    login: async (_, args) => {
      const username = args.username
      const user = await User.findOne({ username })

      if (!user) {
        throw new UserInputError("no such user", username)
      } else if (args.password !== 'password') {
        throw new UserInputError("invalid password for user", username)
      }

      return { value: jwt.sign({ username, id: user._id }, process.env.JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})