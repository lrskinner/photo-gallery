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


//This is rendering our home.hbs
server.get('/', (req,res) => {
  res.render('home')
})

server.get('/contact', (req,res) => {
    res.render('contact')
})
 
server.get('/about', (req,res) => {
   res.render('aboutusviewpage')
})
  


  





module.exports = server