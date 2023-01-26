import { TextInput, Button, UserInfos } from '@/shared/components'
import { withTryCatch } from '@/shared/utils'
import { Box, Grid } from '@chakra-ui/react'
import { FormEvent, useRef, useState } from 'react'
import { useLogin } from '@/shared/hooks'

export type UserData = {
  email: string
  firstName: string
  gender: string
  id: number
  image: string
  lastName: string
  token: string
  username: string
}

const userForTesting = {
  username: 'kminchelle',
  password: '0lelplR'
}

type InputRefProps = {
  value: string
}

export function LoginTemplate() {
  const usernameRef = useRef<InputRefProps>(null)
  const passwordRef = useRef<InputRefProps>(null)
  const [user, setUser] = useState<UserData>()

  const { login } = useLogin()

  const handleLogin = async (evt: FormEvent) => {
    evt.preventDefault()

    withTryCatch(async () => {
      if (usernameRef.current && passwordRef.current) {
        let username = usernameRef.current.value
        let password = passwordRef.current.value

        if (username === '' && password === '') {
          username = userForTesting.username
          password = userForTesting.password
        }

        const data = await login(username, password)

        setUser(data)
      }
    })
  }

  return (
    <Box margin="5rem auto" maxWidth={500}>
      <Grid
        templateRows="1.5fr 1.5fr 0.5fr"
        rowGap={5}
        as="form"
        onSubmit={handleLogin}
        width="100%"
      >
        <TextInput
          ref={usernameRef}
          label="Usuário"
          name="username"
          placeholder="Nome do usuário"
          autoComplete="current-username"
        />
        <TextInput
          ref={passwordRef}
          label="Senha"
          name="password"
          placeholder="Senha"
          type="password"
          autoComplete="current-password"
        />
        <Button type="submit" colorScheme="purple">
          Login
        </Button>
      </Grid>

      <UserInfos {...{ user }} />
    </Box>
  )
}
