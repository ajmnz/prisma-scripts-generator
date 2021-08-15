# Prisma Scripts Generator

Run npm scripts when generating your Prisma schema.

### Use cases

You can run basically any script present in your `package.json` file. This generator will run either `npm run <command>` or `yarn <command>` (for multiple commands if required)

- Open Prisma Studio
- Generate documentation with tools like Swagger
- Trigger workflows
- Run tests

# Usage

### Installation

Install the package.

```shell
$ yarn add prisma-scripts-generator
```

or

```shell
$ npm install prisma-scripts-generator
```

### Add the generator

Add the generator to your schema.

```prisma
generator scripts {
  provider = "node node_modules/prisma-scripts-generator"
  manager = "yarn" // Available: `yarn` (default) | `npm`
  scripts = "swagger-docs;test;e2e" // Script(s) to run separated by a semicolon
}
```

Run `npx prisma generate` or `yarn prisma generate` to generate the Prisma Client and run your scripts.

# Example

**schema.prisma**

```prisma
generator scripts {
  provider = "node node_modules/prisma-scripts-generator"
  manager = "yarn"
  scripts = "swagger-docs;test"
}
```

**package.json**

```json
// ...
"scripts": {
  "swagger-docs": "swagger-jsdoc -d docs/api/definition.yml src/api/routes/**.ts -o docs/api/spec.yml",
  "test": "jest -i --colors --verbose --detectOpenHandles"
}
// ...
```

The generator will execute the following commands

```shell
$ yarn swagger-docs
$ yarn test
```

or if `manager = "npm"`

```shell
$ npm run swagger-docs
$ npm test
```
