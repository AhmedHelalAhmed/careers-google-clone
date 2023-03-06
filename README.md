# careers-google-clone
This is clone for [google careers](https://careers.google.com) with vue.js tailwindcss and typescript

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