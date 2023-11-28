const User = require("../models/user");
const Transaction = require("../models/transaction");
const { response } = require("express");
const  axios  = require("axios");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//  const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

//transferFunds:
const transferFunds = async (req, res) => {
  const { amount, sender, receiver, description, status } = req.body;

  if (!amount || !sender || !receiver) {
    return res.status(400).json({ msg: "Input fields can't be empty" });
  };

  

  try {
    const loggedInUser = await User.findOne({_id:req.user.userId})
    const user = await User.findOne({ email: sender });

    if(loggedInUser.email !== sender){
      return res.status(401).json({msg:"You aint authorized"})
    }

    if (user.amount < amount) {
      return res.status(401).json({ msg: "Insufficient balance" });
    }

    //decrease sender's account balance:
    await User.findOneAndUpdate(
      { email: sender },
      {
        $inc: { balance: -amount },
      }
    );

    //increase receiver's account balance:
    await User.findOneAndUpdate(
      { email: receiver },
      {
        $inc: {
          balance: amount,
        },
      }
    );

    //save Transaction:
    await Transaction.create(req.body);

    //res.send("This is the transferFunds route");
    res.status(200).json({ msg: "Transaction successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//verifyAccount:
const verifyAccount = async (req, res) => {
  const { receiver } = req.body;

  try {
    const user = await User.findOne({ email: receiver });
    if (!user) {
      return res.status(404).json({ msg: "Receiver's email does not exist" });
    } else {
      res.status(200).json({receiversName:user.name, msg: "Account verification successful" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  //res.send("This is the verifyAccount route");
};

//getUserTransactions:
const getUserTransactions = async (req, res) => {
  
    const user = await User.findOne({_id:req.user.userId});
  //   if (user.email !== req.body.email) {
  //   return res
  //     .status(401)
  //     .json({ msg: "You are not authorized to view this transaction" });
  //   //chatgpt: "This ensures that the user can only view their own transactions. However, depending on your use case, you might want to adjust this logic. For example, you could allow certain roles or administrators to view transactions of any user."will implement this in Sams. 
  // }

  try {
    const transactions = await Transaction.find({
      $or: [{ sender:user.email }, { receiver: user.email }],
    })
      .sort("-createdAt")
    //   .populate("sender") 
    //   .populate("receiver"); 
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

  //res.send("This is the getUserTransactions route");
};


//depositFundsStripe:
const depositFundsStripe =async (req,res)=>{
  
  const {amount} = req.body;
  
  const user =await User.findOne({_id:req.user.userId});

  //create stripe customerId:stripeCustomerId
  if(!user.stripeCustomerId){
    const customer = await stripe.customers.create({
      email:user.email,
    })
    user.stripeCustomerId = customer.id // i.e,after creating a cusomer, then u save it to mongodb
     user.save()
  }
  // if (!user.stripeCustomerId) {
  //   const customer = await stripe.customers.create({ email: user.email });
  //   user.stripeCustomerId = customer.id;
  //   user.save();
  // }

  //create stripe session:
  const session = await stripe.checkout.sessions.create({
  
    mode:"payment",
    payment_method_types: ["card"],
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency:"usd",
          product_data:{
            name:"Shopito wallet deposit...", 
            description:`Make a deposit of $${amount} to your shopito wallet`,
          },
          unit_amount: amount * 100 //if using stripe you have to x by 100 else the amount will show in cents
        },
        quantity: 1,
      },
    ],
    customer:user.stripeCustomerId,

    success_url: `${process.env.FRONTEND_URL}/wallet?payment=successful&amount=${amount}`,

    cancel_url: `${process.env.FRONTEND_URL}/wallet?payment=failed`,  
  })

  console.log(session)
  return res.json(session)
  //res.send("This is the depositFunds route")
}

//Deposit funds: stripe and flutterwave
const depositFund =async (customer,data,description,source)=>{
  await Transaction.create({
    amount: source === "stripe" ? data.amount_subtotal /100 : data.amount_subtotal,
    sender:"self",
    receiver:customer.email, //the receiver is you, ur email.
    description:description,
    status:"success"
  });

  //increase receiver's account:
  await User.findOneAndUpdate(
    {email:customer.email},
    {
      $inc:{
        balance:
        source === "stripe" ? data.amount_subtotal /100 : data.amount_subtotal
      }
    }
  );
}


//stripe webhook:
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET ;
const webhook = (req,res)=>{
  
  const sig = req.headers['stripe-signature'];
  
  let data;
  let event;
  let eventType;


  try{
    event = stripe.webhooks.constructEvent(req.body,sig,endpointSecret);
    console.log("webhook verified")
  }catch(error){
    console.log("webhook verification error",error)
    res.status(400).send(`webhook error ${error.message}`)
    return
  }
  data = event.data.object;
  eventType = event.type;

  if(eventType === "checkout.session.completed"){
    stripe.customers
    .retrieve(data.customer)
    .then(async(customer)=>{
      //deposit funds into customer account:
      const description = "Stripe deposit";
      const source = "stripe"
      depositFund(customer,data,description,source)

    }).catch((error)=>console.log(error.message))
  }
  res.send().end()
};

//depositFundsFlutterwave:
const depositFundsFlutterwave =async (req,res)=>{
 
    const {transaction_id} = req.query;
  
    //confirm transaction:
    const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;
  
    const response = await axios({
      url:url,
      method: "get",
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        Authorization:process.env.FLUTTERWAVE_SECRET_KEY
      }
    })
  
    console.log(response)
    const {tx_ref,amount,customer} = response.data.data;
  
    const successURL = process.env.FRONTEND_URL + `/wallet?payment=successful`;
    
    const failURL = process.env.FRONTEND_URL + `/wallet?payment=failed`;
    
    if(req.query.status==="successful"){
      //deposit money in user's wallet:
      const data = {
        amount_subtotal:amount
      }
      const description = "Flutterwave deflutterwaveposit";
      const source = ""
      depositFund(customer,data,description,source)

      res.redirect(successURL)
    }else{
      res.redirect(failURL)
    };
  // res.send("This is the depositFundsFlutterwave route")   
  }  
 


module.exports = { transferFunds, verifyAccount, getUserTransactions,depositFundsStripe, webhook, depositFundsFlutterwave };
