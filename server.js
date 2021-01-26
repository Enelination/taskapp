const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")

const items = require('./routes/api/Items')


const app = express()

//bp
app.use(bodyParser.json())

//db
const db = require('./config/keys').mongoURI

//connect db
mongoose.connect(db, {
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
    useCreateIndex:true,
    useFindAndModify:true
})
.then(()=>{
    console.log('Database Connected....')
})
.catch(err => console.log(err))

//use routes
app.use('/api/items',items )



const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`Server started on port ${port}`))