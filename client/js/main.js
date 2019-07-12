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

function onSignIn(googleUser) {
    const idToken= googleUser.getAuthResponse().id_token
    $.ajax({
        url: `http://localhost:3000/users/gsignin`,
        type: 'post',
        data: {
           idToken
        }
    })
    .done(function(data){
        console.log(data)
        localStorage.setItem('token', data.token)
    })
    .fail(function(err){
        console.log(err)
    })
}
