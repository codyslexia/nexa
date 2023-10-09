
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system graphql-projects && \
  adduser --system -G graphql-projects graphql-projects

COPY dist/apps/projects/graphql graphql-projects
RUN chown -R graphql-projects:graphql-projects .

# use --bundle instead of install to include external dependencies on compile
RUN npm --prefix graphql-projects --omit=dev -f install

CMD [ "node", "graphql-projects" ]
