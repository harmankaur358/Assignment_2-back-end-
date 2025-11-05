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

            // Added schemas 
            schemas: {
                Branch: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "b123" },
                        name: { type: "string", example: "Head Office" },
                        location: { type: "string", example: "London" },
                    },
                },
                CreateBranch: {
                    type: "object",
                    required: ["name", "location"],
                    properties: {
                        name: { type: "string", example: "Regional Office" },
                        location: { type: "string", example: "Toronto" },
                    },
                },
                UpdateBranch: {
                    type: "object",
                    properties: {
                        name: { type: "string", example: "Updated Office" },
                        location: { type: "string", example: "Vancouver" },
                    },
                },
                Employee: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "e123" },
                        name: { type: "string", example: "John Doe" },
                        position: { type: "string", example: "Manager" },
                        department: { type: "string", example: "HR" },
                        branchId: { type: "string", example: "b123" },
                    },
                },
                CreateEmployee: {
                    type: "object",
                    required: ["name", "position", "department", "branchId"],
                    properties: {
                        name: { type: "string", example: "Jane Smith" },
                        position: { type: "string", example: "Developer" },
                        department: { type: "string", example: "IT" },
                        branchId: { type: "string", example: "b123" },
                    },
                },
                UpdateEmployee: {
                    type: "object",
                    properties: {
                        name: { type: "string", example: "Jane Updated" },
                        position: { type: "string", example: "Senior Developer" },
                        department: { type: "string", example: "IT" },
                    },
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
