import { IncomingMessage } from 'http'

import { GraphQLError } from 'graphql'

import * as S from '@apollo/server/standalone'
import { GraphQLRequest, ContextFunction } from '@apollo/server'

/**
 * This interface is used with `graphql-codegen` to generate types for the resolvers context.
 */
export interface DataSourceContext {
  auth?: string
}

/**
 * Standalone server context function that is used to create the context for the resolvers.
 */
type ServerContext = ContextFunction<[S.StandaloneServerContextFunctionArgument], DataSourceContext>

export const context: ServerContext = async ({ req }) =>
  isRouterAuthorized(req) ? { auth: req.headers.authorization } : {}

export function validateRequest(request: GraphQLRequest) {
  if (request.operationName === 'IntrospectionQuery') {
    return
  }

  if (!request.http?.headers.get('authorization')) {
    throw new GraphQLError('Missing authentication', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    })
  }
}

function hasValidSecret(request: IncomingMessage) {
  const routerSecret = process.env.ROUTER_SECRET
  const routerAuthorization = process.env.ROUTER_AUTHORIZATION
  const targetHeader = request.headers['router-authorization']
  if (targetHeader == null) return false
  if (routerSecret === targetHeader) return true
  if (routerAuthorization === targetHeader) return true
}

export function isRouterAuthorized(request: IncomingMessage) {
  if (!hasValidSecret(request)) {
    throw new GraphQLError('Invalid Router Authentication', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    })
  }

  return true
}
