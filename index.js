const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require("dotenv").config()
const userRoute = require("./src/routes/user-routes");
const foodRoute = require("./src/routes/food-routes");
const { addDataToDB } = require('./read_json');

const app = express();

//activate cors
app.use(
    cors({
        origin: "*"
    })
)

//set port and db uri
const port = process.env.PORT || 5010
const uri = "mongodb://127.0.0.1:27017/food-metrics"


//local uri = process.env.DB_URI
// connect mongodb
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection
connection.once('open', ()=>{console.log('Database running Successfully')})

app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: false}));

app.use("/users", userRoute)
app.use("/foods", foodRoute)

app.get("/add-data", (req, res)=>{
    addDataToDB()
    res.json("Done")
})

//run server
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})