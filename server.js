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
  
server.get('/gallery', (req, res) => {
    fs.writeFile('./data.json', 'utf-8', (err, data) => {

    })
})

server.post('', () => {
    
})

//add a server.post route that points to a form (create form page- to comment on a photo?)
//fs.writeFile to put that info into a file





module.exports = server