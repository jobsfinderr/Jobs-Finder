const baseUrl = `http://localhost:3000`

let foundJobs = []
// let description = 
function allJobs() {
    $('.searching').click(function (event) {
        event.preventDefault()
        let keyword = $('#keyword-search').val()
        $('#form-input-keyword').empty()
        $('#listJob').empty()
        $('#form-input-keyword-get-list').hide()
        $('#form-input-keyword').append(
            `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`
        )

        $.ajax({
            method: 'GET',
            url: `${baseUrl}/jobs?search=${keyword}`
        })
            .done(function (data) {
                console.log(data);
                if(data.length > 0){
                    foundJobs = data
                    $('#form-input-keyword').empty()
                    $('#listJob').empty()
                    $('#form-input-keyword-get-list').show()
                    data.forEach(element => {
                        let description = element.description.split('\n')
                        $('#listJob').append(`
                        <div id="form-list" class="card" style="margin-top:5%">
                            <div class="card-header">
                            ${element.title}
                            </div>
                            <div class="card-body">
                                <h5 class="card-title"> ${element.company} </h5>
                                <small><a href=${element.company_url}> View Website </a></small>
                                <p>location : ${element.location} </p>
                                ${description[0]}
                                <a href="#" onclick="detailJobs('${element.id}')" class="btn btn-info">See Detail</a>
                            </div>
                        </div>
                        `)
                    });
                } else {
                    $('#form-input-keyword').empty()
                    $('#listJob').empty()
                    $('#form-input-keyword-get-list').show()
                    Swal.fire({
                        title: 'Oops, job not found',
                        text: `No result found for '${keyword}'. Try another keyword!`,
                        type: 'error',
                    })
                    .then((result) => {
                        console.log(result);
                    })
                    .catch(err => {
                        console.log(err);              
                    })
                }
            })
            .fail(function (err) {
                console.log(err);
            })
    })
}

function start(){
    $('#form-input-keyword-get-list').hide()
}

function myMap(data) {
    getMapData(data)
    .then(coordinate=>{
        var mapProp= {
        center:new google.maps.LatLng(coordinate),
        zoom:15,
        };
        var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
        marker = new google.maps.Marker({
            map: map,
            // draggable: true,
            animation: google.maps.Animation.DROP,
            position: coordinate
        });
        marker.addListener('click', toggleBounce);
    })
    .catch(err=>{
        console.log(err)
    })
}

function detailJobs(id){
    let detail = null
    
    foundJobs.forEach(element => {
        
        if(element.id == id){
            detail = element
        }
    })
    
    myMap(detail.company)
    let apply = detail.how_to_apply
    let htmlElement = $.parseHTML(apply)
    //let stringApply = String(apply)
    $('#listJob').empty()
    $('#form-input-keyword-get-list').empty()
    $('.detail-jobs').show()
    $('.detail-jobs').append(`
        <h2 class="col-8">${detail.company}</h2>
        <p class="col-4 text-truncate">Company Website: <a href="${detail.company_url}" target="blank"> ${detail.company_url} </a> </p>
        <h1 class="col-8" style="margin-top:5%;">${detail.title}</h1>
        <div class="col-12" style="text-alignment: justify;"> ${detail.description} </div>
        <h6 class="col-12">How To Apply</h6> 
        <p class="col-12"> ${detail.how_to_apply} </p> 
        <div class="col-12" id="googleMap" style="width:80vw;height:50vh;"></div> 
        <div class="weather col-12" style="margin-top:5%; text-align:center;"></div>
        <button id="sendEmail" class="btn btn-info col-12" style="margin-top:5%; margin-bottom: 10%;">Send to Email</button> 
    `)


    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth();
    let yyyy = today.getFullYear();

    let firstDay = `${yyyy}/${mm}/${dd+1}`
    let secondDay = `${yyyy}/${mm}/${dd+2}`
    let thirdDay =  `${yyyy}/${mm}/${dd+3}`
    let forthDay =  `${yyyy}/${mm}/${dd+4}`
    let days = [firstDay, secondDay, thirdDay, forthDay]

    $("#sendEmail").click(function(){
      sendEmail(detail.title, detail.company, detail.how_to_apply)  
    })  


    getMapData(detail.company)
    .then(coordinate=>{
        days.forEach(el => {
            displayForecast(coordinate, el)    
        });        
    })
    .catch(err=>{
        console.log(err)
    })
}

//  <button id="searching" type="button" class="btn btn-info" class="col-12" style="width: 100%; margin-bottom: 5%; margin-top: 3%; disabled"> Apply </button>  
function homePage(){
    $('.detail-jobs').empty()
    $('#form-input-keyword').show()
}

function sendEmail(title, company, apply){
    if (localStorage.getItem('token')) {
        Swal.fire({
            title: 'Success sent to email',
            text: 'Check your email',
            type: 'success',
        })
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);              
        })
        // PROCESS SENT EMAIL
        $.ajax({
            method: 'post',
            url: `${baseUrl}/jobs/sendEmail`,
            data : { title, company, apply },
            headers: { token : localStorage.getItem('token') }
        })
        .done(function (data) {
            console.log(data);
        })
        .fail(function (err) {
            console.log(err);
        })
    } else {
        Swal.fire({
            title: 'You must login to sent email',
            text: 'Refresh page to login',
            type: 'error',
        })
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);              
        })
    }
}

$(document).ready(function(){
    start()
    allJobs()
    $('.detail-jobs').hide()
})