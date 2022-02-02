# rwa-express-ts

## 1. Getting Started

---

```bash
cd rwa-express-ts
npm install

# Start development mode.
npm run dev

# Build and start production mode.
npm run build
npm start
```

## 2. From Scratch

---

### 2.1. Project Initialization

---

Execute the following commands to create `package.json`.

```bash
npm init
```

### 2.2. Install Development Tools

---

#### 2.2.1. TypeScript

---

```bash
npm install -D ts-node @types/node
npx tsc --init
```

#### 2.2.2. Prettier

---

```bash
npm install -D prettier @prettier/plugin-pug prettier-plugin-sh
```

#### 2.2.3. ESLint

---

```bash
npm install -D eslint eslint-config-prettier eslint-plugin-import
npm install -D @typescript-eslint/eslint-plugin
npm init @eslint/config
```

#### 2.2.4. Husky

---

```bash
npm install -D husky
npx husky install
npm set-script prepare "husky install"
```

Add some empty Husky scripts.

```bash
npx husky add .husky/pre-commit "exit 0"
npx husky add .husky/pre-push "exit 0"
```

#### 2.2.5. lint-staged

---

```bash
npm install -D lint-staged
```

#### 2.2.6. Jest

---

```bash
npm install -D jest @types/jest eslint-plugin-jest
npx jest --init
```

#### 2.2.7. Babel

---

```bash
npm install -D babel-jest @babel/core @babel/preset-env @babel/preset-typescript
```

#### 2.2.8. supertest

---

```bash
npm install -D supertest @types/supertest
```

#### 2.2.9. nodemon

---

```bash
npm install -D nodemon
```

### 2.3. Initialize Express Project

---

#### 2.3.1. Express

---

```bash
npm install express
npm install -D @types/express
```

#### 2.3.2. Mongoose

---

```bash
npm install mongoose
```

#### 2.3.3. morgan

---

```bash
npm install morgan
npm install -D @types/morgan
```

#### 2.3.4. express-validator

---

```bash
npm install express-validator
```

#### 2.3.5. express-session

---

```bash
npm install express-session
npm install -D @types/express-session
```

#### 2.3.6. passport

---

```bash
npm install passport passport-local
npm install -D @types/passport @types/passport-local
```

#### 2.3.7. crypto-js

---

```bash
npm install crypto-js
npm install -D @types/crypto-js
```

#### 2.3.8. Pug

---

```bash
npm install pug
```

#### 2.3.9. HTTP errors

---

```bash
npm install http-errors
npm install -D @types/http-errors
```
