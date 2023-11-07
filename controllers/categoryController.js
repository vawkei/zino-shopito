const slugify = require("slugify");
const Category = require("../models/category");

//createCategory:
const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ msg: "Please fill in category name" });
  }

  try {
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ msg: "Category name already exists" });
    }

    const category = await Category.create({ name, slug: slugify(name) });

    res.status(201).json({ msg: "Category created", category });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//getCategories:
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ categories, nbhits: categories.length });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

  // res.send("<h1>Get categories route</h1>")
};

//deleteCategory:

const deleteCategory = async (req, res) => {
  const slug= req.params.slug.toLowerCase();

  try {
    const category = await Category.findOneAndDelete({slug});
    if (!category) {
      return res.status(404).json({ msg: `No category with slug: ${slug}` });
    }
    res.status(200).json({ msg: "Category deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createCategory, getCategories, deleteCategory };
