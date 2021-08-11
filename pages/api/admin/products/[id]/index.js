import nc from 'next-connect'
import Product from '../../../../../models/Product'
import { isAuth, isAdmin } from '../../../../../utils/auth'
import db from '../../../../../utils/db'

const handler = nc()
handler.use(isAuth, isAdmin)

handler.get(async(req,res)=>{
    await db.connect()
    const product = await Product.findById(req.query.id)
    await db.disconnect()
    res.send(product)
})

export default handler