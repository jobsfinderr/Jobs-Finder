const axios = require('axios')
const nodemailer = require("nodemailer");
const { decoded } = require("../helpers/jwt")

class JobController {
    static getListJobs(req, res) {
        axios.get(`https://jobs.github.com/positions.json?description=${req.query.search}`)
            .then(response => {
                console.log(response.data);

                res.status(200).json(response.data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static sendEmail(req, res) {
        let dataUser = decoded(req.headers.token)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `jfinder007@gmail.com`,
                pass: `jfadmin123`
            }
        })

        const emailCont = `This is your dream job ${req.body.title}, ${req.body.company}
                            To apply, follow some instructions below :
                            ${req.body.apply}`
        const mailOptions = {
            from: 'admin@jfinder.com', // sender address
            to: dataUser.email, // list of receivers
            subject: 'Job-Finder', // Subject line
            html: emailCont
        };
        // console.log(emailCont);

        transporter.sendMail(mailOptions, function (err, info) {
            if(err){
                console.log(err);
            } else {
                console.log(info);
            }
        })
    }
}

module.exports = JobController