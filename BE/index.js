import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./DB/configDB.js";
import { userRoutes, taskRoutes } from "./src/routes/routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerDef.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

sequelize
  .sync({ })
  .then(() => console.log("Database updated"))
  .catch((err) => console.error(err));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});

// FOR TEST KINFLY COMMENT THE LISTEN FUNCTION AND UNCOMMENT THE BELOW LINE:
// export default app;
