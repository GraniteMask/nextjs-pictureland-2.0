import nc from 'next-connect'
import User from '../../../models/User'
import { signToken } from '../../../utils/auth'
import db from '../../../utils/db'

const handler = nc()

handler.post(async(req, res)=>{
    await db.connect()
    const user = await User.findOne({email: req.body.email})
    await db.disconnect()
    if(user && bcrypt.compareSync(req.body.password, user.password)){
        const token = signToken(user)
    }
})

export default handler