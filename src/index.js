const { createServer } = require('./server');

const { STORE_SERVICE_HOST, STORE_SERVICE_PORT } = process.env;

const host = STORE_SERVICE_HOST;
const port = +STORE_SERVICE_PORT;

const server = createServer();

const start = async () => {
  const { url } = await server.listen({ host, port });

  console.log(`🚀 Server ready at ${url}`);
};

start();
