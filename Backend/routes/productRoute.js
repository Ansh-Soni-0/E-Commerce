const express = require("express");
const productRouter = express.Router();

const upload = require("../middleware/multer");
const { adminAuth } = require("../middleware/adminAuth")

const {
  addProduct,
  removeProduct,
  singleProduct,
  listProducts,
} = require("../controllers/productController");

//combined profile or custom profile -> cp
const cpUpload = upload.fields([{name:"image1" , maxCount:1},{name:"image2" , maxCount:1} , {name:"image3" , maxCount:1} ,{name:"image4" , maxCount:1}])

productRouter.post("/add", adminAuth ,cpUpload , addProduct)
productRouter.delete("/remove", adminAuth , removeProduct)
productRouter.post("/single", singleProduct)
productRouter.get("/list", listProducts)

module.exports = productRouter