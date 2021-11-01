This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, migrate the development database:

```bash
npm run migrate:dev
# or
yarn migrate:dev
```

Then start the dev server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Codegen

If you make changes to anything inside the `graphql` folder you need to run the code generator to update the schema and hooks.
The `__generated__` folder contains generated files and should not be edited manually.

```bash
npm run cg
# or
yarn cg
```
