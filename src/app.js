const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebar engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setting up static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

// Setting up the routes
app.get('', (req, res)=>{
    res.render('index', {
        title: "Weather App",
        name: "Rohan Uddin"
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title:"Help"
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        img: 'robot.png'
    })
})

app.get('/weather', (req, res)=> {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (err, {latitude, longitude, location} = {})=> {
        if (err) {
            return res.send({
                error: err
            })
        }
    
        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send({
                    error: err
                })
            }
            
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        info: "help page"
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        info: "page"
    })
})

//Opening up the server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is running on Port"+port)
})