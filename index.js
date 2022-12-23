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

        var description = weatherdata.weather[0].description
        var temp = weatherdata.main.temp
        var icon = weatherdata.weather[0].icon
        const imgLink = 'https://openweathermap.org/img/wn/'+icon+'@2x.png'
    
        res.write(`<p>Description: ${description}</p>`)
        res.write(`<p>Tempreture: ${temp}</p>`)
        res.write(`<img src='${imgLink}'>`)
        res.send()
        })
       
    })
    
})

app.listen(process.env.PORT || 3005, ()=>{
    console.log('running')
})

