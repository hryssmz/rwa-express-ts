// index.ts
import app from "./app";
import { NODE_ENV, HOST, PORT } from "./utils/env";

app.listen({ host: HOST, port: PORT }, () => {
  const serverType = NODE_ENV === "development" ? "Development" : "Production";
  console.log(`${serverType} server ready at http://${HOST}:${PORT}`);
});
