const  slugify  = require("slugify");
const Brands = require("../models/brand");
const Category = require("../models/category");

const createBrand = async (req, res) => {
  const { name, category } = req.body;

  if (!name || !category) {
    return res.status(400).json({ msg: "Please insert name and category" });
  }
 
  try {
    const categoryExists = await Category.findOne({ name: category });
    
    if (!categoryExists) {
      return res.status(400).json({ msg: "Parent category not found" });
    }
    
    const brand = await Brands.create({ name, slug: slugify(name), category });
    res.status(201).json({ msg: "Brand created", brand });


    //entered this:{
    //     "name":"tecno",
    //     "category":"phone"
    // } got this :{
    //     "msg": "Brand created",
    //     "brand": {
    //         "name": "tecno",
    //         "slug": "tecno",
    //         "category": "phone",
    //         "_id": "654472df71407563679eca26",
    //         "createdAt": "2023-11-03T04:11:11.123Z",
    //         "updatedAt": "2023-11-03T04:11:11.123Z",
    //         "__v": 0
    //     }
    // }
} catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//getBrands:
const getBrands = async (req, res) => {
  try {
    const brands = await Brands.find({}).sort("-createdAt");
    res.status(200).json({ brands, nbhits: brands.length });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//deleteBrand:

const deleteBrand = async (req, res) => {
  const slug = req.params.slug.toLowerCase();

  try {
    const brand = await Brands.findOneAndDelete({ slug });
    if (!brand) {
      return res.status(404).json({ msg: `No brand with slug: ${brand}` });
    }
    res.status(200).json({ msg: "Brand deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createBrand, getBrands, deleteBrand };
