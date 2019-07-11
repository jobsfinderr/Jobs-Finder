const baseUrl = `http://localhost:3000`
let foundJobs = []

function allJobs() {
    $('#searching').click(function () {
        let keyword = $('#keyword-search').val()
        $.ajax({
            method: 'GET',
            url: `${baseUrl}/jobs?search=${keyword}`
        })
            .done(function (data) {
                console.log(data);
                foundJobs = data
                data.forEach(element => {
                    $('#listJob').append(`
                    <div id="form-list" class="card" style="margin-top:5%">
                        <div class="card-header">
                            ${element.company}
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"> <a href= ${element.company_url}> view website </a> </h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">See Detail</a>
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

$(document).ready(function(){
    allJobs()
})