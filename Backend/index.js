require("dotenv").config(); //Loads Env variables from .env file into process.env, so we can use process.env.PORT,  Basically It consist of basic Information like Api keys, port values
const express = require("express"); //Importing express module
const app = express();  //Creating an instance of express
const cors = require("cors"); //Importing cors module

const port = process.env.PORT || 5000;  //Setting the port number, if process.env.PORT is not found, it will use 5000

app.use(cors()); //Enabling cors
app.use(express.json()); //Enabling json parsing

// Import Routes
const bookingRoutes = require('./routes/bookings');
const contactRoutes = require('./routes/contact');

app.get("/", (req, res) => {
    res.send("SquareConnect Backend is Running!");
})

// Mount Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`); //Logging the port number
});

