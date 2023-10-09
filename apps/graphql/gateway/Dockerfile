
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system graphql-gateway && \
  adduser --system -G graphql-gateway graphql-gateway

COPY dist/apps/graphql-gateway graphql-gateway
RUN chown -R graphql-gateway:graphql-gateway .

# use --bundle instead of install to include external dependencies on compile
RUN npm --prefix graphql-gateway --omit=dev -f install

CMD [ "node", "graphql-gateway" ]
