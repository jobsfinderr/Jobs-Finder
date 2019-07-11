if(process.env.NODE_ENV === 'development' || !process.env.NODE_ENV){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = process.env.DB_NAME || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

mongoose.connect(`${process.env.DB_URL}`, {useNewUrlParser: true});

app.listen(port, () => {
    console.log(`This app listen on port ${port}`);
})