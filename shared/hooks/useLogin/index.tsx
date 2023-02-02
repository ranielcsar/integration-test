import { UserData } from '@/shared/templates/LoginTemplate'
import { apiURL } from '@/shared/lib/api'

async function loginFetch(username: string, password: string) {
  try {
    const data = await fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then((res) => res.json())
      .then((data) => data)

    return data as UserData
  } catch (err: any) {
    throw Error(err)
  }
}

export function useLogin() {
  return { login: loginFetch }
}
