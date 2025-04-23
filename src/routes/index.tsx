import { $, component$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { formAction$, useForm, type InitialValues } from '@modular-forms/qwik'
import { PrismaClient } from '~/../prisma/generated'

type LoginForm = {
  email: string
  password: string
}

export const useLoginFormLoader = routeLoader$<InitialValues<LoginForm>>(() => {
  return { email: '', password: '' }
})

const useFormAction = formAction$<LoginForm>(
  async (data) => {
    console.log('Form data:', data)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prisma = new PrismaClient()   //  <-- This line breaks the build. Comment it to check.
    // const users = await prisma.user.findMany()
    // console.log('Users:', users)
  },
  $(() => ({}))
)

export const LoginFormComponent = component$(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: useLoginFormLoader(),
    action: useFormAction(),
  })

  return (
    <Form>
      <Field name="email">
        {(field, props) => (
          <input {...props} type="email" value={field.value} />
        )}
      </Field>
      <Field name="password">
        {(field, props) => (
          <input {...props} type="password" value={field.value} />
        )}
      </Field>
      <button type="submit">Login</button>
    </Form>
  )
})

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
      <br />
      <LoginFormComponent />
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
