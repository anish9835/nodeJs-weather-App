const request = require('request')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')

const hbs = require('hbs')
const path = require('path') // this is node js core module
const express = require('express')
const app = express()

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public") //path to static
const viewsPath = path.join(__dirname, '../templates/views') //path to views
const partialPath = path.join(__dirname, '../templates/partials') //patj to partials

// Setting Handlebars engine and views location
app.set('view engine', 'hbs') // search for .hbs
app.set('views', viewsPath) // setting path to views directory
hbs.registerPartials(partialPath) // setting partials directory


// Setup Static Directory to serve available on PUBlic e.g. CSS img JavaScript 
app.use(express.static(publicDirectoryPath))

// Rendering Homepage
app.get('', (req, resp) => {
    resp.render('index', {
        title: 'Weather App',
        name: 'Anish'
    })
})

// Rendering About page
app.get('/about', (req, resp) => {
    resp.render('about', {
        title: 'About Me',
        name: 'Anish'
    })
})

// Rendering help Page
app.get('/help', (req, resp) => {
    resp.render('help', {
        title: "Help ",
        name: 'Anish'
    })
})

app.get('/weather', (req, resp) => {
    let address = req.query.address
    if (!address) {
        return resp.send({
            error: 'You must have provide address'
        })
    }

    geocode(address, (error, { latitude, longitude, cityName } = {}) => {
        if (error) {
            return resp.send({ error })
        }
        forecast(latitude, longitude, (error, { temp, weather } = {}) => {
            if (error) {
                return resp.send({ error })
            }
            resp.send({
                cityName: cityName,
                temp,
                weather
            })
        })
    })
})

app.get('/products', (req, resp) => {
    if (!req.query.search) {
        return resp.send({
            error: 'You must have provide a search term'
        })
    }
    console.log(req.query)
    resp.send({
        products: []
    })
})

// 404 Error
app.get('/help/*', (req, resp) => {
    resp.render('404', {
        title: "404",
        errorMessage: 'Help Article Not Found',
        name: 'Anish'
    })
})


app.get('*', (req, resp) => {
    resp.render('404', {
        title: '404',
        errorMessage: 'Page Not Found',
        name: 'Anish'
    })
})

// Server Creating at port 3000

app.listen(3000, () => {
    console.log("Servere is up on port 3000.")
})