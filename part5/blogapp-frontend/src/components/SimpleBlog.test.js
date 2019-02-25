import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Testaus on tärkeää',
    author: 'Tessa Testaaja',
    likes: 9001
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  expect(component.container).toHaveTextContent(
    'Testaus on tärkeää Tessa Testaaja'
  )

  expect(component.container).toHaveTextContent(
    'blog has 9001 likes'
  )
})

test('two clicks triggers two calls to handler fn', () => {
  const blog = {
    title: 'Testaus on tärkeää',
    author: 'Tessa Testaaja',
    likes: 9001
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = component.getByText('like')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})
