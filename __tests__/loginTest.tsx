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
}

export const loginResponse = {
  username: 'kminchelle',
  email: 'kminchelle@qq.com'
}

function setup(): SetupProps {
  render(<LoginTemplate />)
  const userInput = screen.getByPlaceholderText(/usuário/i)
  const passwordInput = screen.getByPlaceholderText(/senha/i)
  const user = userEvent.setup()

  return { user, userInput, passwordInput }
}

function renderLoginFormTest() {
  const { userInput, passwordInput } = setup()

  expect(userInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
}

async function loginSubmitTest() {
  const {
    result: {
      current: { login }
    }
  } = renderHook(() => useLogin())
  const { user, userInput, passwordInput } = setup()

  const username = 'kminchelle'
  const password = '0lelplR'

  await user.type(userInput, username)
  await user.type(passwordInput, password)

  const buttonElement = screen.getByText(/login/i)

  await act(async () => {
    fireEvent.click(buttonElement)

    server.use(loginTestHandler)

    const data = await login(username, password)

    expect(data).toEqual(expect.objectContaining(loginResponse))
  })
}

describe('Login render and submit', () => {
  it('should render login form', renderLoginFormTest)
  it('should login when submit', loginSubmitTest)
})
