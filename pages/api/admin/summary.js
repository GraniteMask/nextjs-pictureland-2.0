import nc from 'next-connect'
import Order from '../../../models/Order'
import Product from '../../../models/Product'
import User from '../../../models/User'
import { isAuth } from '../../../utils/auth'
import db from '../../../utils/db'
import {onError} from '../../../utils/error'

const handler = nc({
    onError
})

handler.use(isAuth)

handler.get(async(req,res)=>{
    await db.connect()
    const ordersCount = await Order.countDocuments()
    const productsCount = await Product.countDocuments()
    const userCount = await User.countDocuments()
    const ordersPriceGroup = await Order.aggregate([
        {
            $group:{
                _id: null,
                sales: {$sum: '$totalPrice'}
            }
        }
    ])
    const ordersPrice = ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;
    res.send({ordersCount, productsCount, userCount, ordersPrice})
})

export default handler