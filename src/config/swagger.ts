import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJs api astek',
      version: '1.0.0',
      description: 'API documentation with Swagger',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: { type: 'uuid', example: '123' },
            name: { type: 'string', example: 'Laptop' },
            product_type: { type: 'string', example: 'Electronics' },
            color: { type: 'string', example: 'Black' },
            user_id: { type: 'uuid', example: '456' },
          },
        },
        ProductInput: {
          type: 'object',
          required: ['name', 'product_type'],
          properties: {
            name: { type: 'string', example: 'Laptop' },
            product_type: { type: 'string', example: 'Electronics' },
            color: { type: 'string', example: 'Black' },
          },
        },
        AccountPermission: {
          type: 'object',
          properties: {
            view: { type: 'boolean', example: true },
            create: { type: 'boolean', example: true },
            update: { type: 'boolean', example: true },
            Assign: { type: 'boolean', example: true },
          },
        },
        Permission: {
          type: 'object',
          properties: {
            view: { type: 'boolean', example: true },
            create: { type: 'boolean', example: true },
            update: { type: 'boolean', example: true },
          },
        },
        RolePermission: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'super Admin' },
            account: { $ref: '#/components/schemas/AccountPermission' },
            product: { $ref: '#/components/schemas/Permission' },
            role: { $ref: '#/components/schemas/Permission' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'uuid', example: '123' },
            username: { type: 'string', example: 'admin' },
            name: { type: 'string', example: 'administrator' },
            phone: { type: 'string', example: '9123456789' },
            password: { type: 'string', example: 'admin' },
            is_super_admin: { type: 'boolean', example: 'false' },
            roleId: { type: 'uuid', example: '456' },
          },
        },
        UserInput: {
          type: 'object',
          require: ['username', 'name', 'phone', 'password', 'role'],
          properties: {
            username: { type: 'string', example: 'admin' },
            name: { type: 'string', example: 'administrator' },
            phone: { type: 'string', example: '9123456789' },
            password: { type: 'string', example: 'admin' },
            is_super_admin: { type: 'boolean', example: 'false' },
            role: { type: 'uuid', example: '456' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ['src/modules/**/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
