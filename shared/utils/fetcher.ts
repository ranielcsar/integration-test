import { UserData } from '@/shared/templates/LoginTemplate'

export const apiURL = 'https://dummyjson.com/auth/login'

export async function loginFetch(username: string, password: string) {
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
}
