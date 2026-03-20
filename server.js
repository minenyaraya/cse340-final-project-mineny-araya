import express from "express";
import dotenv from "dotenv";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import flash from "connect-flash";
import staticRoutes from "./routes/routes.js";
import loanRoute from "./routes/loan-route.js";

dotenv.config();
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/layout");
app.set("views", path.join(process.cwd(), "views"));

app.use((req, res, next) => {
  res.locals.messages = req.flash();
  res.locals.accountData = req.session.accountData || null;
  res.locals.loggedin = req.session.loggedin || false;
  next();
});

app.use("/", staticRoutes);
app.use("/account", staticRoutes);
app.use("/loans", loanRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
