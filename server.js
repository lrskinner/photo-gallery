const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')
const bodyParser = require("body-parser");
// const puppyRoutes = require('./users')
// const newUploadroutes = require('./addDetails')

const server = express()

// Middlewares
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars 
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')


//This is displaying home.hbs
server.get('/', (req,res) => {
  res.render('home')
})

server.get('/contact', (req,res) => {
    res.render('contact')
})
 
server.get('/gallery', (req,res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        res.render('gallery', JSON.parse(data))
    }) 
})
  
server.get('/gallery/:id', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        res.render('gallery', JSON.parse(data))
    }) 
})

server.post('/gallery/:id', (req, res) => {
    // get id from request params
    const id = Number(req.params.id)

    // retrieve gallery object from database
    fs.readFile('./data.json', 'utf-8', (err,data) => {
        if (err) return res.status(500).send(err.message)
        const galleryObjects = JSON.parse(data)
        const selected = galleryObjects.photos.find(photo => photo.id === id)
        // add rating to gallery object
        //selected.push(req.body.rating)

        if (req.body.rating === "like") selected.likes++
        else if (req.body.rating === "dislike") selected.dislikes++
        
        // save back to database
        fs.writeFile('./data.json', JSON.stringify(galleryObjects), function (err) {
            if (err) return res.status(500).send(err.message)
            return res.redirect('/gallery')
        })
    })
    // redirect back to gallery
})

//add a server.post route that points to a form (create form page- to comment on a photo?)
//fs.writeFile to put that info into a file





module.exports = server