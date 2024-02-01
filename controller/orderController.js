const Order = require("../schema/orderSchema");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc")


// -------------------- Create Order -------------------
exports.createOrder = async (req, res)=>{

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
  
      return res
      .status(200).json({success: true, message: "Order successfully completed", data: result._id})
      } catch (error) {
  
        console.log(error.message)
          return res
          .status(500).json({success: false, message: error.message})
      }
}

// -------------------- Get All Order -------------------
exports.getAllOrder = async (req, res)=>{
    try {
       const allOrder =  await Order.find()      
    return res
    .status(200).json({success: true, message: "Get All Order Successfully", data: allOrder})
    } catch (error) {
        return res
        .status(200).json({success: false, message: error.message})
    }
}


// ---------------------- Payment ----------------------


const calculateOrderAmount = (items) => {
    
    const totalAmount = items.reduce((currentValue, item)=> currentValue += item.price, 0)
        
    return totalAmount
  };

exports.payment = async (req, res)=>{
    const { items } = req.body;

    console.log(items)
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