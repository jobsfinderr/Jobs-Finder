function getMapData(data){
    return axios({
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${data}&key=AIzaSyBnX4XOhtETC-xh6vKy1KJPusRKLUCoPmY`
    })
    .then(({data}) => {
        let lat = data.results[0].geometry.location.lat
        let lng = data.results[0].geometry.location.lng
        return {
            lat,
            lng
        }
    })
    .catch(err => {
        console.log(err);
    })
}
