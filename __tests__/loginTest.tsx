import React from 'react'
import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginTemplate } from '@/shared/templates'
import { useLogin } from '@/shared/hooks'
import '@testing-library/jest-dom'
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup'
import { server } from '@/__tests_mock/server'
import { loginTestHandler } from '@/__tests_mock/handlers'
import { act } from 'react-dom/test-utils'

type SetupProps = {
  user: UserEvent
  usernameInput: HTMLElement
  passwordInput: HTMLElement
  submitButton: HTMLElement
}

const username = 'kminchelle'
const password = '0lelplR'

const loginResponse = {
  username: expect.any(String),
  email: expect.any(String),
  token: expect.any(String),
  id: expect.any(Number),
  firstName: expect.any(String),
  lastName: expect.any(String),
  gender: expect.any(String),
  image: expect.any(String)
}

const errorResponse = {
  message: expect.any(String)
}

function setup(): SetupProps {
  render(<LoginTemplate />)

  const usernameInput = screen.getByPlaceholderText(/usuário/i)
  const passwordInput = screen.getByPlaceholderText(/senha/i)
  const submitButton = screen.getByText(/login/i)
  const user = userEvent.setup()

  return { user, usernameInput, passwordInput, submitButton }
}

function renderLoginFormTest() {
  const { usernameInput, passwordInput, submitButton } = setup()

  expect(usernameInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
  expect(submitButton).toBeInTheDocument()
}

async function loginSuccessSubmitTest() {
  const { user, usernameInput, passwordInput, submitButton } = setup()

  const {
    result: {
      current: { login }
    }
  } = renderHook(() => useLogin())

  await user.type(usernameInput, username)
  await user.type(passwordInput, password)

  await act(async () => {
    fireEvent.click(submitButton)

    server.use(loginTestHandler)

    const data = await login(username, password)

    expect(data).toEqual(expect.objectContaining(loginResponse))
  })
}

async function loginFailureSubmitTest() {
  const { user, usernameInput, passwordInput, submitButton } = setup()

  const {
    result: {
      current: { login }
    }
  } = renderHook(() => useLogin())

  await user.type(usernameInput, '1123123')
  await user.type(passwordInput, password)

  await act(async () => {
    fireEvent.click(submitButton)

    server.use(loginTestHandler)

    const data = await login('1123123', password)

    expect(data).toEqual(expect.objectContaining(errorResponse))
  })
}

describe('Login render and submit', () => {
  it('should render login form', renderLoginFormTest)
  it('should login on submit', loginSuccessSubmitTest)
  it('should receive message on submit error', loginFailureSubmitTest)
})
