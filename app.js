require("dotenv").config();
const express = require("express");
const app = express();

require("./config/db.config")();
require("./config/session.config")(app);
require("./config/middleware.config")(app);
require("./config/cloudinary-setup.config")

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const productRoutes = require("./routes/products.routes");
app.use("/products", productRoutes)

const mainRoutes = require("./routes/main.routes");
app.use("/", mainRoutes)

app.listen(process.env.PORT, () => console.log("server running"));
