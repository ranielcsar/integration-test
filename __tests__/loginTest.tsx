import React from 'react'
import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginTemplate } from '@/shared/templates'
import { useLogin } from '@/shared/hooks'
import '@testing-library/jest-dom'
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup'
import { server } from '@/mocks/server'
import { loginTestHandler } from '@/mocks/handlers'
import { act } from 'react-dom/test-utils'

type SetupProps = {
  user: UserEvent
  userInput: HTMLElement
  passwordInput: HTMLElement
  submitButton: HTMLElement
}

const username = 'kminchelle'
const password = '0lelplR'

export const loginResponse = {
  username: 'kminchelle',
  email: 'kminchelle@qq.com'
}

function setup(): SetupProps {
  render(<LoginTemplate />)

  const userInput = screen.getByPlaceholderText(/usuário/i)
  const passwordInput = screen.getByPlaceholderText(/senha/i)
  const submitButton = screen.getByText(/login/i)
  const user = userEvent.setup()

  return { user, userInput, passwordInput, submitButton }
}

function renderLoginFormTest() {
  const { userInput, passwordInput, submitButton } = setup()

  expect(userInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
  expect(submitButton).toBeInTheDocument()
}

async function loginSubmitTest() {
  const { user, userInput, passwordInput, submitButton } = setup()

  const {
    result: {
      current: { login }
    }
  } = renderHook(() => useLogin())

  await user.type(userInput, username)
  await user.type(passwordInput, password)

  await act(async () => {
    fireEvent.click(submitButton)

    server.use(loginTestHandler)

    const data = await login(username, password)

    expect(data).toEqual(expect.objectContaining(loginResponse))
  })
}

describe('Login render and submit', () => {
  it('should render login form', renderLoginFormTest)
  it('should login when submit', loginSubmitTest)
})
