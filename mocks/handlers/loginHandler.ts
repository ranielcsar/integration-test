import { loginResponse } from '@/__tests__/loginTest'
import { rest } from 'msw'
import { apiURL } from '@/shared/lib/api'

export const loginTestHandler = rest.post(apiURL, (_, res, ctx) =>
  res(ctx.status(200), ctx.json(loginResponse))
)
