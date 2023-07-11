if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const stripeSecretkey = process.env.STRIPE_SECRET_KEY
const stripePublickey = process.env.STRIPE_PUBLIC_KEY


const express = require('express')
const app = express()
const fs = require('fs')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/store', (req, res) => {
    fs.readFile('items.json', function(error, data) {
        if(error) {
            res.status(500).end()
        }
        else{
            res.render('store.ejs', {
                items: JSON.parse(data)
            })
        }
    })
})

app.listen(5000, () =>{
    console.log('Server is running on port 5000')
})