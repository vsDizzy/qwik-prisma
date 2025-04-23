import { component$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { PrismaClient } from '~/../prisma/generated'

export const useUsers = routeLoader$(async () => {
  const prisma = new PrismaClient()
  return await prisma.user.findMany()
})

const UserList = component$(() => {
  const users = useUsers()

  return <>Users count: {users.value.length}</>
})

export default component$(() => {
  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </div>
      <UserList />
    </>
  )
})

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
}
