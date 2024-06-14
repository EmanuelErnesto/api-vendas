import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Api vendas documentation',
    description: 'Api vendas description',
  },
  host: process.env.SWAGGER_HOST || 'localhost:3000',
  schemes: ['http'],
};

const outputFile = path.resolve(__dirname, '../../../../swagger-output.json');
const routes = [
  path.resolve(
    __dirname,
    '../../../modules/products/infra/http/routes/products.routes.ts',
  ),
];

swaggerAutogen()(outputFile, routes, doc).then(() => {
  console.log('Swagger file generated');
});
