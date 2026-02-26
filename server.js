import express from "express";
import dotenv from "dotenv";
import path from "path"; // Agrega esta línea
import staticRoutes from "./routes/routes.js";

dotenv.config();
const app = express();
app.set("view engine", "ejs");

// Cambia la línea de public por esta:
app.use(express.static(path.join(process.cwd(), "public")));

const port = process.env.PORT || 3000;

app.use("/", staticRoutes);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
