import express from 'express'
import { UserCtr } from '../Controller/UserCtr'


const router = express.Router()

router.post('/register',UserCtr.register)
router.post('/activation',UserCtr.activateEmail)
router.post('/refresh_token',UserCtr.AccessToken)
router.post('/login',UserCtr.login)
router.get('/logout',UserCtr.logout)
module.exports = router;