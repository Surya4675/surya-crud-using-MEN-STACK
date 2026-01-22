import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import methodOverride from "method-override";
import userRoutes from "./routes/userRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";   

dotenv.config();

const app = express();

// --- Fix for __dirname in ES modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- EJS + Layouts setup ---
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);            // enables layout engine
app.set("layout", "layout");        // this tells EJS to use views/layout.ejs automatically

// --- Static files ---
app.use(express.static(path.join(__dirname, "public")));

// --- Middlewares ---
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method")); // for PUT + DELETE in HTML forms



// --- Routes ---
app.use("/api/user", userRoutes);

// --- DB Connection ---

const PORT = process.env.PORT || 5001;
const MONGOURL = process.env.MONGO_URL;

// start server FIRST (UI must not wait for DB)
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});

// try DB connection, but don’t block UI
if (MONGOURL) {
  mongoose
    .connect(MONGOURL)
    .then(() => console.log("Database connected Successfully."))
    .catch(() => console.log("MongoDB not connected – UI running without DB"));
}

