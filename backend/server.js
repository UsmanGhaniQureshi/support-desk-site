const express = require("express");
const connectToDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleWare");
const port = process.env.PORT || 5000;

require("dotenv").config();

const app = express();

connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server Started at the port ${port}`));
