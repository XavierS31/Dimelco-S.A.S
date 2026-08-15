# Multi-stage images for local Express development and AWS Lambda.
FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM dependencies AS build
COPY tsconfig.json ./
COPY src ./src
RUN npm run typecheck && npm run build

FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
EXPOSE 4000
CMD ["node", "dist/index.js"]

FROM public.ecr.aws/lambda/nodejs:22 AS lambda
WORKDIR ${LAMBDA_TASK_ROOT}
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist

# API Gateway invokes this handler through the Lambda runtime.
CMD ["dist/index.handler"]
