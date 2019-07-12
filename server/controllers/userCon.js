
const { sign } = require("../helpers/jwt")
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


class UserController {
    static gSignin(req,res, next){
        async function verify(){
            const ticket = await client.verifyIdToken({
                idToken:req.body.idToken,
                audience:process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload()
            const name = payload.name
            const email = payload.email
            const payloadToken = { name, email }
            const token = sign(payloadToken)
            let obj = { token:token }
            res.status(200).json(obj)
        }
        verify().catch(next)
    }
}

module.exports = UserController