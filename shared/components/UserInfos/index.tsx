import { UserData } from '@/shared/templates/LoginTemplate'
import { Grid, Text } from '@chakra-ui/react'

type Props = {
  user?: UserData
}

export function UserInfos({ user }: Props) {
  return (
    <Grid as="section" autoRows="30px" width="100%" margin="5rem 0">
      {user ? <Infos user={user} /> : <NoUserLogged />}
    </Grid>
  )
}

function NoUserLogged() {
  return (
    <Text as="strong" textAlign="center">
      Nenhum usuário logado
    </Text>
  )
}

type LabelProps = {
  prop: string
  value?: string | number
}

function Label({ prop, value }: LabelProps) {
  return (
    <Text>
      <strong>{prop}:</strong> {value}
    </Text>
  )
}

function Infos({ user }: { user: UserData }) {
  return (
    <>
      <Label prop="ID" value={user?.id} />
      <Label prop="Email" value={user?.email} />
      <Label prop="Nome" value={`${user?.firstName} ${user?.lastName}`} />
      <Label prop="Gênero" value={user?.gender} />
      <Label prop="Nome de usuário" value={user?.username} />
    </>
  )
}
