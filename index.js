if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const stripeSecretkey = process.env.STRIPE_SECRET_KEY
const stripePublickey = process.env.STRIPE_PUBLIC_KEY


const express = require('express')
const app = express()
const fs = require('fs')
const stripe = require('stripe')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))

app.get('/store', (req, res) => {
    fs.readFile('items.json', function(error, data) {
        if(error) {
            res.status(500).end()
        }
        else{
            res.render('store.ejs', {
                stripePublickey: stripePublickey,
                items: JSON.parse(data)
            })
        }
    })
})

app.post('/purchase', (req,res) => {
    fs.readFile('items.json', function(error, data) {
        if(error) {
            res.status(500).end()
        } else {
            const itemsJson = JSON.parse(data)
            const itemsArray = itemsJson.music.concat(itemsJson.merch)
            let total = 0
            req.body.items.foreach(function(item) {
                const itemJson = itemsArray.find(function(i) {
                    return i.id == item.id
                })
                total = total + itemJson.price * item.quntity
            })
        }
    })
})

app.listen(5000, () =>{
    console.log('Server is running on port 5000')
})