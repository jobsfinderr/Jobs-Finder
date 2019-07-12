const axios = require('axios')

class WeatherController{
    static getWeathers(req, res){
        return axios({
            method: "GET",
            url: `https://www.metaweather.com/api/location/search/?lattlong=${req.params.lat},${req.params.lng}`
        })
        .then(({data})=>{
            
            return axios({
                method:"GET",
                url: `https://www.metaweather.com/api/location/${data[0].woeid}`
            })
            .then(({data})=>{
                let woeid = data.woeid
                let weather = data.consolidated_weather[0].weather_state_name
                let min = Math.round(data.consolidated_weather[0].min_temp)
                let max = Math.round(data.consolidated_weather[0].max_temp)
                let imgUrl = `https://www.metaweather.com/static/img/weather/${data.consolidated_weather[0].weather_state_abbr}.svg`
                res.status(200).json({woeid, weather, min, max, imgUrl})
            })
            .catch(err=>{
                console.log("getting weather", err)
                res.status(500).json(err)
            })
        })
        .catch(err=>{
            console.log("getting weather location", err)
            res.status(500).json(err)
        })
    }


    static getForecast(req, res){
        return axios({
            method: "GET",
            url: `https://www.metaweather.com/api/location/search/?lattlong=${req.params.lat},${req.params.lng}`
        })
        .then(({data})=>{
            axios({
                method:"GET",
                url: `https://www.metaweather.com/api/location/${data[0].woeid}/${req.params.y}/${req.params.m}/${req.params.d}`
            })
            .then(({data})=>{
                // status', 'statusText', 'headers', 'config', 'request', 'data'
                console.log(data[0],"<<<<<<<<<<<<<<<<<<<<<<<")
                let weather = data[0].weather_state_name
                let min = Math.round(data[0].min_temp)
                let max = Math.round(data[0].max_temp)
                let imgUrl = `https://www.metaweather.com/static/img/weather/${data[0].weather_state_abbr}.svg`
                res.status(200).json({ weather, min, max, imgUrl})
            })
            .catch(err=>{
                console.log("getting weather", err)
                res.status(500).json(err)
            })
        })
        .catch(err=>{
            console.log("getting weather location", err)
            res.status(500).json(err)
        })
    }
}

module.exports = WeatherController

