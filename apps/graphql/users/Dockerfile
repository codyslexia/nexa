
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system graphql-users && \
  adduser --system -G graphql-users graphql-users

COPY dist/apps/users/graphql graphql-users
RUN chown -R graphql-users:graphql-users .

# use --bundle instead of install to include external dependencies on compile
RUN npm --prefix graphql-users --omit=dev -f install

CMD [ "node", "graphql-users" ]
