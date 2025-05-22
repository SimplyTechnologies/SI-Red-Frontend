export default {
  users: {
    // NOTE: That is just an example please swap "users" depending on your task
    input: {
      target: "http://localhost:3306/swagger.json",
    },
    output: {
      mode: "tags-split",
      target: "./src/api/",
      schemas: "./src/api/schemas",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/api/authentication/customMutator.ts",
          name: "customMutator",
        },
      },
    },
  },
};
