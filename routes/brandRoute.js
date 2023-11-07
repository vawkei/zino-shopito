const express = require("express");
const router = express.Router();

const {createBrand, getBrands, deleteBrand} = require("../controllers/brandController");
const {authenticateUser,adminOnly}=require("../middlewares/authentication-middleware")

router.post("/createBrand", authenticateUser,adminOnly,createBrand);
router.get("/getBrands",authenticateUser,adminOnly, getBrands);
router.delete("/:slug",authenticateUser,adminOnly, deleteBrand)


module.exports=router;