const mongoclient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: true }))
const port = process.env.PORT || 3000

mongoclient.connect('mongodb+srv://ShivanshGupta:india@2006@blogdb.xowev.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true
})

    .then(client => {
        console.log('Connected to databases')
        const db = client.db('ChristmasDB')
        const wishes = db.collection('Wishes')
        app.set('view engine', 'ejs')
        app.listen(port, function (req, res) {
            console.log('server is running')
        })
        app.get('/', function (req, res) {
            res.render('index.ejs')
        })
        app.get('/wishes', function (req, res) {
            res.render('wish.ejs')
        })
        app.get('/create-a-wish', function (req, res) {
            res.render('createawish.ejs')
        })

        app.set('views', __dirname + '/views');
        app.get('/wishes', function (req, res) {
            db.collection('Wishes').find().toArray()
                .then(result => {
                    console.log(result)
                
                    
                    
                })
                .catch(error => {
                    console.error(error)
                })
        })
        app.post('/create-a-wish', function (req, res) {
            wishes.insertOne(req.body)
    
                .then(result => {
                    res.redirect('/wishes')
                })


                .catch(error => {
                    console.error(error)
                })
        })
       

             
        })
  











