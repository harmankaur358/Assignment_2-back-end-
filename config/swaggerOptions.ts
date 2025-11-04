import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Employee and Branch Management API Documentation",
            version: "1.0.0",
            description:
                "This API provides endpoints for managing employees and branches, including CRUD operations, validation, and authentication.",
            contact: {
                name: "API Support Team",
                email: "support@company.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Enter your JWT token for authentication",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    // Path to route and validation files where inline OpenAPI docs will live
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validations/*.ts"],
};

// Generate the Swagger spec
export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};
