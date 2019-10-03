const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");

mongoose.connect("mongodb+srv://omnistack:omnistack@api-aircnc-ycawd.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

const api = express();

api.use(cors())
api.use(express.json());
api.use("/files", express.static(path.resolve(__dirname, '..', 'uploads')));
api.use(routes);

api.listen(3030, () => {
    console.log("Server is running...");
});