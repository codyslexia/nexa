import { identifier } from '@core/utils'

export const Query = {
  projects() {
    const projects = []

    for (let i = 0; i < 3; i++) {
      projects.push({
        id: identifier('prj'),
        userId: identifier('usr'),
        kind: i % 2 !== 0 ? 'cloud' : 'web',
        environment: i % 2 === 0 ? 'development' : 'staging',
      })
    }

    return projects
  },
}

export const Mutation = {
  createProject(_, { userId, kind = 'cloud', environment = 'development' }) {
    return { id: identifier('prj'), userId, environment, kind }
  },
}

export const Project = {
  __resolveReference(project, { fetchProjectById }) {
    return fetchProjectById(project.id)
  },
}
