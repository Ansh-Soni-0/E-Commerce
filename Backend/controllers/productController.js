const productModel = require("../models/productModel");

const cloudinary = require("cloudinary").v2;

//funtion for add product
const addProduct = async (req , res) => {

    try {

        const { name , description , price , category ,subCategory ,  sizes , bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const Allimages = [image1,image2,image3,image4]
        //sayad koi image na bheji ho to vo undefined ho jayegi so we filtered that
        const images = Allimages.filter((item) => item !== undefined)

        let imagesURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path , {resource_type:'image'});

                // secure_url always uses https://
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            //parse array to string 
            sizes:JSON.parse(sizes),
            bestseller:bestseller === 'true' ? true : false,
            image:imagesURL,
            date:Date.now()
        }

        const product = await productModel.create(productData)

        console.log(productData);
        

        res.json({success : true , message : "Product Added"})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//funtion for remove product
const removeProduct = async (req , res) => {
    try {
        const productId  = req.body.id;

        if (!productId) {
        return res
            .status(400)
            .json({ success: false, message: "No product ID provided" });
        }

        const deleted = await productModel.findByIdAndDelete(productId);

        if (!deleted) {
            return res
              .status(404)
              .json({ success: false, message: "No product found with this ID" });
          }

        return res.json({success : true , message : "Product Removed"})

    } catch (error) {
        
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

//funtion for list product
const listProducts = async (req , res) => {

    try {

        const products = await productModel.find({})
        res.json({success : true , products})

    } catch (error) {
        
        console.log(error)
        res.json({success:false,message:error.message})

    }

}

// funtion for single product info 
const singleProduct = async (req , res) => {
    try {
        
        const { productId } = req.body

        if (!productId) {
            return res.status(400).json({
              success: false,
              message: "Product ID is required",
            });
        }

        console.log(productId);

        const product = await productModel.findById(productId)


        if (!product) {
            return res.status(404).json({
              success: false,
              message: "Product not found",
            });
        }

        res.json({
            success :true , product
        })


    } catch (error) {
        
        console.log(error)
        res.json({success:false,message:error.message})

    }
}


module.exports = {addProduct,
    removeProduct,
    singleProduct,
    listProducts,
}