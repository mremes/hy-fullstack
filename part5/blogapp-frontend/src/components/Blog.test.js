import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

describe('<Togglable />', () => {
  let component

  const blog = {
    title: 'Testaus on tärkeää',
    author: 'Tessa Testaaja',
    likes: 9001
  }

  const mockHandlerLike = jest.fn()
  const mockHandlerDelete = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        isOwner={true}
        likeHandler={mockHandlerLike}
        deleteHandler={mockHandlerDelete} />
    )
  })

  it('shows reduced content and hides full content', () => {
    const reduced = component.container.querySelector('.reducedContent')
    const full = component.container.querySelector('.fullContent')
    expect(reduced).not.toHaveStyle('display: none')
    expect(full).toHaveStyle('display: none')
    expect
  })

  it('shows the full content after clicking the title', () => {
    const button = component.getByText(blog.title)
    fireEvent.click(button)

    const div = component.container.querySelector('.fullContent')
    expect(div).not.toHaveStyle('display: none')
  })
})