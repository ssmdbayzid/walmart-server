const Order = require("../schema/orderSchema");
const  User  = require("../schema/userSchema");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc")


// -------------------- Create Order -------------------
exports.createOrder = async (req, res)=>{

  console.log(req.body)
    try {     
        const {cart} = req.body                      
  
        const newOrder = {               
          ...req.body,
          cartItems: cart.cartItems,        
          total_price: cart.cartTotalAmount,                
          status: "Paid",
        }
        const result = new Order(newOrder)
        await result.save()
        const  updateUser = await User.findOneAndUpdate({email: req.email}, {
          $push: {
            orders: result._id
          }
        })
        console.log(updateUser)
      return res
      .status(200).json({success: true, message: "Order successfully completed", data: result._id})
      } catch (error) {
  
        console.log(error.message)
          return res
          .status(500).json({success: false, message: error.message})
      }
}

exports.getAllOrders = async (req, res) =>{
  try {
    const orders = await Order.find()

    return res
    .status(200).json({success: true, message: "Get all orders", data: orders})
  } catch (error) {
    console.log(error.message)
    return res
    .status(500).json({success: false, message: error.message})
  }
}

// -------- Get Single Order 
exports.getSingleOrder = async (req, res)=>{
    const id = req.params.id
    try {
       const data =  await Order.findById(id)      
    return res
    .status(200).json({success: true, message: "Geting order successfull", data})
    } catch (error) {
        return res
        .status(200).json({success: false, message: error.message})
    }
}

// Update Order

exports.updateOrder = async (req, res)=>{
  const id = req.params.id
  
try {
  const updateOrder = await Order.findByIdAndUpdate(id, req.body, {new: true})  
  console.log(updateOrder)
  return res
  .status(200).json({success: true, message: "Updated successfull", data: updateOrder})
  
} catch (error) {
  console.log(error.message)
  return res.
  status(500).json({succcess: false, message: error.message})
}
}


// ---------------------- Payment ----------------------


const calculateOrderAmount = (items) => {
  
    const totalAmount = items.reduce((currentValue, item)=> currentValue += item.price, 0)
        
    return totalAmount
  };

exports.payment = async (req, res)=>{
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
}