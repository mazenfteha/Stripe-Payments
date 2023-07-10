const express = require('express')
const app = express()

app.get('/', (req, res) =>{
    res.send('Server working')
})

app.listen(5000, () =>{
    console.log('Server is running on port 5000')
})