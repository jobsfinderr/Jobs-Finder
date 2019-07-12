function getWeather(data){
    return axios({
        method: "GET",
        url: `${baseUrl}/weather/${data.lat}/${data.lng}`
    })
}

function displayWeather(coordinate){
    getWeather(coordinate)
    .then(weather=>{
        $('.weather').append(`
            <dl style="width: 150px; background-color:white; border:black solid 1px">
            <dt>Current Weather</dt>
            <dd>
                <h6>${weather.data.weather}</h6>
                <img src="${weather.data.imgUrl}" alt="weather symbol" height="42" width="42">
            </dd>
            <dt>Temperature</dt>
            <dd>
                <p>min: ${weather.data.min}°C</p>
                <p>max: ${weather.data.max}°C</p>
                <a href="http://metaweather.com/${weather.data.woeid}" target="_blank">More Weather Info</a>
            </dd>
            <dl>
        `)
    })
    .catch(err=>{
        console.log("Error at getWeather", err)
    })
}

// getMapData("Hacktiv8")
// .then(coordinate=>{
//     displayWeather(coordinate)
// })
// .catch(err=>{
//     console.log(err)
// })
        



// function getWeather(data){
//     return axios({
//         method: "GET",
//         url: `http://metaweather.com/api/location/search/?lattlong=${data.lat},${data.lng}`
//     })
//     .then(locationData=>{
//         return axios({
//             method:"GET",
//             url: `http://metaweather.com/api/location/${locationData.woeid}`
//         })
//         .then(({consolidated_weather})=>{
//             let weather = consolidated_weather[0].weather_state_name
//             let min = consolidated_weather[0].min_temp
//             let max = consolidated_weather[0].max_temp
//             let imgUrl = `metaweather.com/static/img/weather/${consolidated_weather[0].weather_state_abbr}`
//             return {weather, min, max, imgUrl}
//         })
//         .catch(err=>{
//             console.log("getting weather", err)
//         })
//     })
//     .catch(err=>{
//         console.log("getting weather location", err)
//     })
// }

// $('.weather').click(function(event){
//     return getMapData("hacktiv8")
//     .then(data=>{
//         return getWeather(data)
//         .then(weather=>{
//         $('.weather').append(`
//         aaa
//         `)
//     })
//     })  
// })
