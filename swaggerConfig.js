const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Affiliate Website Backend API",
      description: "This is the backend api of Affiliate Website",
      contact: {
        name: "Joshua Izu",
      },
      servers: ["http://localhost:5000"],
    },
  },
  apis: [
    "./api/server.js",
    "./routes/auth.routes.js",
    "./routes/product.routes.js",
    "./routes/transaction.routes.js",
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
