const axios = require('axios')

class JobController{
    static getListJobs(req, res){
        axios.get(`https://jobs.github.com/positions.json?description=${req.query.search}`)
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(err => {  
            res.status(500).json(err)
        })
    }
}

module.exports = JobController