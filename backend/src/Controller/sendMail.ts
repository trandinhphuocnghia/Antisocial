import nodemailer from 'nodemailer'
const {google} = require ('googleapis')

const {OAuth2} = google.auth;

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    SERVICE_CLIENT_ID,
    SERVICE_REFRESH_TOKEN,
    SERVICE_CLIENT_SECRET,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client  = new OAuth2(
    SERVICE_CLIENT_ID,
    SERVICE_REFRESH_TOKEN,
    SERVICE_CLIENT_SECRET,
    OAUTH_PLAYGROUND

)

//send mail
export const sendEmail = (to:any,url:any,txt:any) => {
    oauth2Client.setCredentials({
        refresh_token: SERVICE_REFRESH_TOKEN
    })


const accessToken = oauth2Client.getAccessToken()
// set transport
const smtpTransport = nodemailer.createTransport({
    service:'gmail',

    auth:{
        type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
             clientId: SERVICE_CLIENT_ID,
            clientSecret: SERVICE_CLIENT_SECRET,
            refreshToken: SERVICE_REFRESH_TOKEN,
            accessToken
    }

})

//config content of  the seding mail
const mailOptions = {
    from : SENDER_EMAIL_ADDRESS,
    to: to,
    subject: "Antisocial",
    html:`
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Antisocial.</h2>
    <p>Congratulations! You're almost set to start using this web site.
        Just click the button below to validate your email address.
    </p>
    
    <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>

    <p>If the button doesn't work for any reason, you can also click on the link below:</p>

    <div>${url}</div>
    </div>
    `

}

smtpTransport.sendMail(mailOptions, (err:any, infor:any) => {
    if(err) return err;
    return infor
})

}
 