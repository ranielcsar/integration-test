import { setupServer } from 'msw/node'
import { handlers } from './handlers'
import 'whatwg-fetch'

export const server = setupServer(...handlers)
