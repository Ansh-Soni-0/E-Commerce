import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId} = useParams();

  const { products , currency } = useContext(ShopContext)

  const [productData , setproductData] = useState(false)

  const [size , setSize] = useState('')

  const [image , setImage] = useState("")

  const fetchProductData = async () => {

    products.map((item) => {
      if(item._id === productId){

        setproductData(item)

        // console.log(item)

        setImage(item.image[0])

        return null;
      } 
    })
      
  }

  useEffect(() => {
    fetchProductData()
  }, [productId , products])
  

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* ------------product data-----------  */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

          {/* ----------product images--------- */}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
              <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                  {
                    productData.image.map((item , index) => (
                      <img 
                      onClick={() => setImage(item)}
                      key={index}
                      src={item}
                      alt="small-image" 
                      className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                      />
                    ))
                  }
              </div>

              <div className='w-full sm:w-[80%]'>
                  <img 
                  className='w-full h-auto'
                  src={image} 
                  alt="big-image" />
              </div>

          </div>

          {/* --------product information---------  */}

          <div className='flex-1'>
                <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

                <div className='flex items-center gap-1 mt-2'>

                  <img src={assets.star_icon} alt="start-icon" className="w-3.5" />
                  <img src={assets.star_icon} alt="start-icon" className="w-3.5" />
                  <img src={assets.star_icon} alt="start-icon" className="w-3.5" />
                  <img src={assets.star_icon} alt="start-icon" className="w-3.5" />
                  <img src={assets.star_dull_icon} alt="start-icon" className="w-3.5" />

                  <p className='pl-2'>(122)</p>

                </div>

                <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>

                <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

                <div className='flex flex-col gap-4 my-8'>
                  <p>Select Size</p>
                  <div className='flex gap-2'>
                      {
                        productData.sizes.map((item , index) => (
                          <button 
                          onClick={() => setSize(item)}
                          className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" : ''} cursor-pointer`}
                          key={index}>{item}</button>
                        ))
                      }
                  </div>
                </div>

                <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer'>ADD TO CART</button>

                <hr className='mt-8 sm:w-4/5 text-gray-400'/>

                <div className='text-sm text-gray-500 mt-5 flex flex-col gap1'>
                  <p>100% Original Product.</p>
                  <p>Cash on delivery is avilable on this product.</p>
                  <p>Easy return and exchange policy within 7 days</p>
                </div>
          </div>

      </div>

      {/* ---------description and review section --------- */}

      <div className='mt-20'>
        <div className='flex'>
          <b className='border border-gray-300 px-5 py-3 text-sm'>Description</b>
          <p className='border border-gray-300 px-5 py-3 text-sm'>Reviews(122)</p>
        </div>

        <div className='flex flex-col gap-4 border border-gray-300 px-6 text-sm text-gray-500'>
            <p>Look stylish and feel comfortable with our Trendy  Outfit. This set includes a smart top and matching pants made from soft, high-quality fabric that’s perfect for everyday wear. Whether you're going out with friends, heading to work, or just running errands, this outfit keeps you looking fresh and fashionable. Easy to dress up with heels or keep casual with sneakers. Available in multiple colors to suit your style. It’s a must-have set for your wardrobe—simple, chic, and ready to wear!</p>

            <p>I had a fantastic experience shopping on this e-commerce website. The layout is clean and easy to navigate, making it simple to find exactly what I was looking for. The product descriptions were detailed and accurate, and I appreciated the customer reviews that helped me make informed decisions.</p>
        </div>
      </div>

      {/* --------------display related products--------------- */}

      <RelatedProducts 
      category={productData.category}
      subCategory={productData.subCategory}
      />

    </div> 
  ) : <div className='opacity-0'>

  </div>
}

export default Product