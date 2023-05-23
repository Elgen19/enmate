// LIBRARY IMPORTS
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const inmateRouter = require('./routes/inmate');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ESTABLISHED CONNECTION TO MONGO DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message))

// CONTROLLERS
app.use('/inmates', inmateRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
