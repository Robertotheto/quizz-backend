FROM oven/bun:1
WORKDIR /app
COPY . .
RUN bun install
RUN bun prisma generate
RUN bun prisma migrate deploy

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["bun","src/index.ts"]