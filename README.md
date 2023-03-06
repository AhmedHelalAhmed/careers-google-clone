# Google careers clone
This is clone for [google careers](https://careers.google.com) with [vue.js](https://vuejs.org) [tailwindcss](https://tailwindcss.com) and [typescript](https://www.typescriptlang.org) 

with high test coverage focus on unit tests and behavior.


# Technologies, Tools and packages
- [Vue.js](https://vuejs.org)
- [Pinia](https://pinia.vuejs.org)
- [Tailwindcss](https://tailwindcss.com)
- [Typescript](https://www.typescriptlang.org)
- [Vue Test Utils](https://test-utils.vuejs.org)
- [Testing Library](https://testing-library.com)
- [vitest](https://vitest.dev)
- [json-server](https://www.npmjs.com/package/json-server)
- [vite.js](https://vitejs.dev)
- [eslint](https://eslint.org)
- [prettier](https://prettier.io)
- [fontawesome](https://fontawesome.com)
- [axios](https://www.npmjs.com/package/axios)
- [jsdom](https://www.npmjs.com/package/jsdom)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and
disable
Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Backend server

```sh
npm run backend
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Run tests

```sh
npm run test:unit
```

### Prepare environment variables

```sh
cp .env.example .env.development.local
cp .env.example .env.test.local
cp .env.example .env.production.local
# change the value to be like that
VITE_APP_API_URL = http://127.0.0.1:3000
```