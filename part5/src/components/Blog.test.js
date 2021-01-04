import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from "@testing-library/react"
import Blog from './Blog'
import CreateBlog from './CreateBlog'


// component.debug()

test("name and author shown by default and not url or number of likes", () => {

    const mockHandler = jest.fn()

    const testUser = {
        username: "test_user",
        name: "Test User"
    }

    const testBlog = {
        title: "Test Blog",
        author: "test_user",
        url: "www.test.com",
        likes: 12,
        user: [{username: "test_user", name: "Test User"}]
    }

    const component = render(
        <Blog
            blog={testBlog}
            onClick={mockHandler}
            user={testUser}
        />
    )

    const mainInfo = component.container.querySelector('.mainInfo')
    const hiddenInfo = component.container.querySelector('.hiddenInfo')

    expect(mainInfo).toHaveTextContent('Test Blog')
    expect(mainInfo).toHaveTextContent('test_user')
    expect(hiddenInfo).toHaveStyle('display: none')
})

test("URL and number of likes shown when button clicked", () => {

    const mockHandler = jest.fn()

    const testUser = {
        username: "test_user",
        name: "Test User"
    }

    const testBlog = {
        title: "Test Blog",
        author: "test_user",
        url: "www.test.com",
        likes: 12,
        user: [{username: "test_user", name: "Test User"}]
    }

    const component = render(
        <Blog
            blog={testBlog}
            onClick={mockHandler}
            user={testUser}
        />
    )

    const toggleButton = component.container.querySelector('.viewButton')
    const hiddenInfo = component.container.querySelector('.hiddenInfo')

    fireEvent.click(toggleButton)

    expect(hiddenInfo).toHaveTextContent('www.test.com')
    expect(hiddenInfo).toHaveTextContent(12)
})

test("Event handler called twice if like button called twice", () => {

    const mockHandler = jest.fn()

    const testUser = {
        username: "test_user",
        name: "Test User"
    }

    const testBlog = {
        title: "Test Blog",
        author: "test_user",
        url: "www.test.com",
        likes: 12,
        user: [{username: "test_user", name: "Test User"}]
    } 

    const component = render(
        <Blog
            blog={testBlog}
            incrementLikes={mockHandler}
            user={testUser}
        />
    )

    const toggleButton = component.container.querySelector('.likeButton')

    fireEvent.click(toggleButton)
    fireEvent.click(toggleButton)

    expect(mockHandler.mock.calls.length).toBe(2)
})

test("Event handler called with correct details when creating new blog", () => {

    const mockHandler = jest.fn()

    const testUser = {
        username: "test_user",
        name: "Test User"
    }

    const testBlog = {
        title: "Test Blog",
        author: "test_user",
        url: "www.test.com",
    } 

    const component = render(
        <CreateBlog
           createBlog={mockHandler}
        />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#form')
    
    fireEvent.change(title, { target: { value: testBlog.title } })
    fireEvent.change(author, { target: { value: testBlog.author } })
    fireEvent.change(url, { target: { value: testBlog.url } })
    fireEvent.submit(form)

    expect(mockHandler.mock.calls.length).toBe(1)
    expect(mockHandler.mock.calls[0][0]).toStrictEqual(testBlog)
})
