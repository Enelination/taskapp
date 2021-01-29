const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')



const app = express()

//bp
app.use(express.json())

//db
const db = config.get("mongoURI")

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
app.use('/api/items', require('./routes/api/Items') )
app.use('/api/users', require('./routes/api/users') )
app.use('/api/auth', require('./routes/api/auth') )

//Serve static assests if in production
if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`Server started on port ${port}`))