import { loginResponse } from '@/__tests__/loginTest'
import { rest } from 'msw'
import { apiURL } from '../shared/utils/fetcher'

export const loginFetchHandler = rest.post(apiURL, (_, res, ctx) =>
  res(ctx.status(200), ctx.json(loginResponse))
)

export const handlers = [loginFetchHandler]
