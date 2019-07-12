const baseUrl = `http://localhost:3000`

let foundJobs = []
// let description = 
function allJobs() {
    $('.searching').click(function () {
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
                    console.log("gak ada data di keywordnya");
                    $('#form-input-keyword').empty()
                    $('#listJob').empty()
                    $('#form-input-keyword-get-list').show()
                    $('#listJob').append(
                        `<h1> not found </h1>`
                    )
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
        <div class="col-12" id="googleMap" style="width:80vw;height:50vh;"></div> 
        <h1 class="col-8" style="margin-top:5%;">${detail.title}</h1>
        <div class="col-12" style="text-alignment: justify;"> ${detail.description} </div>
        <h6 class="col-12">How To Apply</h6> 
        <p class="col-12"> ${detail.how_to_apply} </p> 
        <button id="sendEmail" class="btn btn-info col-12">Send  to Email</button> 
    `)

    $("#sendEmail").click(function(){
      sendEmail(detail.title, detail.company, detail.how_to_apply)  
    })

}

//  <button id="searching" type="button" class="btn btn-info" class="col-12" style="width: 100%; margin-bottom: 5%; margin-top: 3%; disabled"> Apply </button>  
function homePage(){
    $('.detail-jobs').empty()
    $('#form-input-keyword').show()
}

function sendEmail(title, company, apply){
    $.ajax({
        method: 'post',
        url: `${baseUrl}/jobs/sendEmail`,
        data : { title, company, apply }
    })
        .done(function (data) {
            console.log(data);
        })
        .fail(function (err) {
            console.log(err);
        })
}

$(document).ready(function(){
    start()
    allJobs()
    $('.detail-jobs').hide()
})