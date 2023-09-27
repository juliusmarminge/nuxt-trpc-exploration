Any file in here will be exposed as an API endpoint

https://nuxt.com/docs/guide/directory-structure/server

```ts
// server/api/hello.ts
export default defineEventHandler((event) => {
  return {
    hello: "world",
  };
});
```

will be exposed as `/api/hello`. Start the dev server and visit the URL in your browser to see the result: `http://localhost:3000/api/hello`
