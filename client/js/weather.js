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
            <dl style="width: 250px; background-color:white">
            <dt >Current Weather</dt>
            <dd>
                <h5 style="color:rgb(51, 153, 255);text-align:center">${weather.data.weather}</h5>
                <img src="${weather.data.imgUrl}" alt="weather symbol" height="120" width="120">
            </dd>
            <dt style="color:rgb(51, 153, 255)">Temperature</dt>
            <dd>
                <p >min: ${weather.data.min}°C</p>
                <p >max: ${weather.data.max}°C</p>
                <button onclick="window.open('http://metaweather.com/${weather.data.woeid}','_blank')" class="btn btn-info">More Weather Info</button>
            </dd>
            <dl>
        `)
    })
    .catch(err=>{
        console.log("Error at get Weather", err)
    })
}

getMapData("Hacktiv8")
.then(coordinate=>{
    displayWeather(coordinate)
})
.catch(err=>{
    console.log(err)
})
        



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
