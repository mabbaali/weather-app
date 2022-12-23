const express = require('express')
const bodyparser = require('body-parser')
const https = require('https')

const app = express()
const apikey = 'fb010be4012cbace673b4bff5a31a830'
app.use(bodyparser.urlencoded({extended:true}))
app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.post('/', (req, res)=>{
    var lat = req.body.lat
    var lon = req.body.lon

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+apikey
    https.get(url, (response)=>{
        response.on('data', (data)=>{
        var weatherdata = JSON.parse(data)

        console.log(weatherdata)
        var description = weatherdata.weather[0].description
        var temp = weatherdata.main.temp
        console.log(temp)
        console.log(description)
        res.write(`<p>Description: ${description}</p>`)
        res.write(`<p>Tempreture: ${temp}</p>`)
        res.send()
        })
       
    })
    
    console.log(lat,lon)
})

app.listen(process.env.PORT || 3005, ()=>{
    console.log('running')
})

