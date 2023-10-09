import gql from 'graphql-tag'
import { join } from 'path'
import { readFileSync } from 'fs'

import * as D from '@apollo/server/plugin/disabled'
import { ApolloServer } from '@apollo/server'
import { buildSubgraphSchema } from '@apollo/subgraph'
import { startStandaloneServer } from '@apollo/server/standalone'

import { context } from '@core/utils'
import * as resolvers from './resolvers'

const SUBGRAPH_NAME = 'projects'

const plugins = [
  D.ApolloServerPluginInlineTraceDisabled(),
  D.ApolloServerPluginUsageReportingDisabled(),
]

const APOLLO_PORT = Number(process.env.PORT || 4002)

async function main() {
  const typeDefs = gql(
    readFileSync(join(process.cwd(), 'apps/graphql/projects/src/schema.graphql'), {
      encoding: 'utf-8',
    })
  )

  const server = new ApolloServer({
    plugins,
    status400ForVariableCoercionErrors: true,
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  })

  const { url } = await startStandaloneServer(server, {
    context,
    // context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: APOLLO_PORT },
  })

  console.log(
    JSON.stringify({
      runner: 'graphql-projects',
      message: `Server ready at ${url}. Run 'rover dev --url ${url} --name ${SUBGRAPH_NAME}' to connect this subgraph to a Rover graph.`,
      timestamp: new Date().toISOString(),
    })
  )
}

main()
