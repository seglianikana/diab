require('dotenv').config()

const mongoose = require("mongoose");
const app = require("./server");
const SERVER_PORT = 8080
const SERVER_HOST = "127.0.0.1"

const MONGO_URL = "mongodb+srv://testUser:qRxUYboBW7NGpiUI@cluster0.62fw2.mongodb.net/myproject?retryWrites=true&w=majority"

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
            console.info("MongoDB connected...")
        }
    )
    .catch(err => console.info(err));

const port_number = process.env.PORT || 8080;

const instance = app.listen(Number(port_number), SERVER_HOST, () => {
    console.info("Available on:", `${SERVER_HOST}:${port_number}`)
});

instance.on("listening", () =>
    console.info("Available on:", `${SERVER_HOST}:${port_number}`)
);
instance.on("error", error => console.error(error));

