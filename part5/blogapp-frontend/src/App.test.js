import React from 'react'
import { render, waitForElement } from 'react-testing-library'

import App from './App'

describe('<App />', () => {
  it('does not render blogs if user is not logged in', async () => {
    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(() => component.getByText('log in'))

    const blogs = component.container.querySelectorAll('.reducedContent')
    expect(blogs.length).toBe(0)
  })

  it('renders blogs if user is logged in', async () => {
    const user = {
      username: 'ttestaaja',
      token: 'foobar',
      name: 'Tessa Testaaja'
    }

    localStorage.setItem('user', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(() => component.getByText('log in'))

    const blogs = component.container.querySelectorAll('.reducedContent')
    expect(blogs.length).toBe(2)
  })
})