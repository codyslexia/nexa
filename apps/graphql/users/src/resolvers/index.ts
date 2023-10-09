import { identifier } from '@core/utils'

export const Query = {
  me() {
    return { id: identifier('usr'), email: 'john@example.com' }
  },
  users() {
    return [
      { id: identifier('usr'), email: 'matt@example.com' },
      { id: identifier('usr'), email: 'russ@example.com' },
    ]
  },
}

export const Mutation = {
  login(_, { email }) {
    return { id: identifier('usr'), email }
  },
  createUser(_, { email }) {
    return { id: identifier('usr'), email }
  },
}

export const User = {
  __resolveReference(user, { fetchUserById }) {
    return fetchUserById(user.id)
  },
}
