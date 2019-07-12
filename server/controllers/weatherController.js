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
                console.log(data, "<<<<<<<<<<<<<<<<<<<<<")
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


    // static get5DaysWeather(req, res){
    //     return axios({
    //         method: "GET",
    //         url: `https://www.metaweather.com/api/location/search/?lattlong=${req.params.lat},${req.params.lng}`
    //     })
    //     .then(({data})=>{
    //         let today = new Date();
    //         let dd = today.getDate();
    //         let mm = today.getMonth();
    //         let yyyy = today.getFullYear();

    //         let firstDay = `${yyyy}/${mm}/${dd}`
    //         let secondDay = `${yyyy}/${mm}/${dd+1}`
    //         let thirdDay =  `${yyyy}/${mm}/${dd+2}`

    //         let first =  axios({
    //             method:"GET",
    //             url: `https://www.metaweather.com/api/location/${data[0].woeid}/${firstDay}`
    //         })
    //         let second = axios({
    //             method:"GET",
    //             url: `https://www.metaweather.com/api/location/${data[0].woeid}/${secondDay}`
    //         })
    //         let third = axios({
    //             method:"GET",
    //             url: `https://www.metaweather.com/api/location/${data[0].woeid}/${thirdDay}`
    //         })

    //         Promise.all([thi])
    //         .then(({data})=>{
    //             console.log(data, "<<<<<<<<<<<<<<<<<<<<<")
    //             let woeid = data.woeid
    //             let weather = data.consolidated_weather[0].weather_state_name
    //             let min = data.consolidated_weather[0].min_temp
    //             let max = data.consolidated_weather[0].max_temp
    //             let imgUrl = `https://www.metaweather.com/static/img/weather/${data.consolidated_weather[0].weather_state_abbr}.svg`
    //             res.status(200).json({woeid, weather, min, max, imgUrl})
    //         })
    //         .catch(err=>{
    //             console.log("getting weather", err)
    //             res.status(500).json(err)
    //         })
    //     })
    //     .catch(err=>{
    //         console.log("getting weather location", err)
    //         res.status(500).json(err)
    //     })
    // }
}

module.exports = WeatherController