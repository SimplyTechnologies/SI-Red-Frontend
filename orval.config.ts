import "dotenv/config";

export default {
  users: {
    input: {
      target: `${process.env.VITE_API_URL}/swagger.json`,
    },
    output: {
      mode: "tags-split",
      target: "./src/api/",
      schemas: "./src/api/schemas",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/lib/api/customMutator.ts",
          name: "customMutator",
        },
      },
    },
  },
};
