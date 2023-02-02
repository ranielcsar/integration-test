import { rest } from 'msw'
import { apiURL } from '@/shared/lib/api'
import { UserData } from '@/shared/templates/LoginTemplate'

export const loginTestHandler = rest.post(apiURL, (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({} as UserData))
})
