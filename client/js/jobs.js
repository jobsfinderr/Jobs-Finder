const baseUrl = `http://localhost:3000`
let foundJobs = []
// let description = 
function allJobs() {
    $('.searching').click(function () {
        let keyword = $('#keyword-search').val()
        $('#form-input-keyword').empty()
        $('#form-input-keyword').append(
            `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`
        )

        $.ajax({
            method: 'GET',
            url: `${baseUrl}/jobs?search=${keyword}`
        })
            .done(function (data) {
                console.log(data);
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
                            <h6>How To Apply</h6>
                            ${element.how_to_apply}
                            <a href="#" onclick="detailJobs('${element.id}')" class="btn btn-primary">See Detail</a>
                        </div>
                    </div>
                    `)
                });
            })
            .fail(function (err) {
                console.log(err);
            })
    })
}

function showDetail(){
    $.each(function(i, foundJobs){

    })
}

function start(){
    $('#form-input-keyword-get-list').hide()
}

function detailJobs(id){
    console.log(id, "ini Id");
    console.log(foundJobs[0] , 'ini foundjobs')
    let detail = null
    // console.log(foundJobs[0], ">>>>>>>>>>>>>>>>>>>>>>>>>>>");
    
    foundJobs.forEach(element => {
        // console.log(element);
        
        if(element.id == id){
            // console.log(element);
            detail = element
        }
    })

    $('#listJob').empty()
    $('#form-input-keyword-get-list').empty()

    $('.detail-jobs').append(`
        <h2>${detail.company}</h2>
        <h4>${detail.title}</h4>
        <a href=${detail.company_url}><small>${detail.company_url}</small></a>
        ${detail.description}
        <button onclick="allJobs()" type="button" class="btn btn-info"> Apply </button>
    `)
}

function homePage(){
    $('.detail-jobs').empty()
    $('#form-input-keyword').show()
}

$(document).ready(function(){
    start()
    allJobs()
})