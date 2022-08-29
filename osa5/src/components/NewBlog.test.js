import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlog from './NewBlog'
import userEvent from '@testing-library/user-event'

test("<NewBlog /> updates parent state and calls onsubmit", async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    render(<NewBlog createBlog={createBlog} />)

    const input = screen.getByPlaceholderText("title")
    const input2 = screen.getByPlaceholderText("author")
    const input3 = screen.getByPlaceholderText("url")
    const input4 = screen.getByPlaceholderText("likes")
    const sendButton = screen.getByText("add")

    await user.type(input, "testingAForm")
    await user.type(input2, "derp")
    await user.type(input3, "google.com")
    await user.type(input4, "5")
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe("testingAForm")
    expect(createBlog.mock.calls[0][0].author).toBe("derp")
    expect(createBlog.mock.calls[0][0].url).toBe("google.com")
    expect(createBlog.mock.calls[0][0].likes).toBe("5")

    screen.debug()
})