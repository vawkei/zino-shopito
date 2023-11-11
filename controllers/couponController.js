const Coupon = require("../models/coupon");

//createCoupon:
const createCoupon = async (req, res) => {
  const { name, discount, expiresAt } = req.body;
  if (!name || !discount || !expiresAt) {
    return res.status(400).json({ msg: "Please fill in fields" });
  }
try{
  const coupon = await Coupon.create({ name, discount, expiresAt });
  res.status(201).json({ msg: "Coupon created", coupon });
}catch(error){
  res.status(500).json({msg: error.message})
};

};

//getCoupons:
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort("-createdAt");
    if (!coupons) {
      return res.status(404).json({ msg: "No coupon found" });
    }
    res.status(200).json({ coupons, nbhits: coupons.length });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//getSingleCoupon:
const getSingleCoupon = async (req, res) => {

  try {
    const coupon = await Coupon.findOne({
      name: req.params.couponName,
      expiresAt: { $gt: Date.now() },
    });

    if (!coupon) {
      return res.status(404).json({ msg: "Coupon not found or expired" });
    }
    res.status(200).json({coupon,msg:"Coupon added successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json(error); 
  }
};

//deleteCoupon:
const deleteCoupon = async (req, res) => {
  const couponId = req.params.id;

  try {
    const coupon = await Coupon.findOneAndDelete({ _id: couponId });
    if (!coupon) {
      return res
        .status(404)
        .json({ msg: `No coupon found with name:${couponId}` });
    }
    res.status(200).json({msg:"Coupon deleted"})
  } catch (error) {
    console.log(error);
    res.status(500).json(error.name);
  }

  //res.send("Delete coupon route")
};

module.exports = { createCoupon, getCoupons, getSingleCoupon, deleteCoupon };
