import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import ProductItems from '../components/ProductItems'
const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext)

  const [showFilter , setShowFilter] = useState(false)

  const [filterProducts , setFilterProducts] = useState([])

  const [category , setCategory] = useState([])

  const [subCategory , setSubCategory] = useState([])

  const [sortType , setSortType] = useState('relevent')


  //toggle category function
  const toggleCategory = (e) => {
    
    if(category.includes(e.target.value)){
      // uncheck then remove in category array
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      //check then add category array
      setCategory(prev => [...prev , e.target.value])
    }

  }

  //toggle subCategory function
  const toggleSubCategory = (e) => {

    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev , e.target.value])
    }

  }

  // useEffect(() => {
  //   setFilterProducts(products);
  // }, [])

  const applyFilter = () => {

    let productsCopy = products.slice();

    // search items on the basis on search query 
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // get all item which category is selected
    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    // get all item which subCategory is selected
    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }


  const sortproduct = () => {

    let fiterProductCopy = products.slice()

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fiterProductCopy.sort((a , b) => (a.price - b.price)))
        break;

      case 'high-low':
        setFilterProducts(fiterProductCopy.sort((a , b) => (b.price - a.price)))
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(() => {
    applyFilter()
  }, [category , subCategory , search , showSearch , products])
  

  useEffect(() => {
    sortproduct()
  }, [sortType])

  // useEffect(() => {
  //   console.log(category)
  //   console.log(subCategory)
  // }, [category , subCategory])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* left filter options  */}
      <div className='min-w-60'>

        <p 
        // onClick={() => setShowFilter(prev => !prev)}
                  // or
        onClick={() => setShowFilter(!showFilter)}
        className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS

          <div className='w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all duration-300 mr-2'>
            <img 
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90': ''} transition-all duration-300`}
            src={assets.dropdown_icon} 
            alt="" />
          </div>

        </p>

        {/* category filter */}
        <div 
        className={`border border-hray-300 pl-5 py-3 mt-6 ${showFilter ? "": 'hidden'} sm:block`}>

          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

          <div 
          className='flex flex-col gap-2 text-sm font-light text-gray-700'>

            <p className='flex gap-2'>

              <input 
              onChange={toggleCategory}
              type="checkbox" 
              className='w-3 cursor-pointer' 
              value={'Men'}/> 
              Men
            </p>

            <p className='flex gap-2'>
              <input 
              onChange={toggleCategory}
              type="checkbox" 
              className='w-3 cursor-pointer' 
              value={'Women'}/> 
              Women
            </p>

            <p className='flex gap-2'>
              <input 
              onChange={toggleCategory}
              type="checkbox" 
              className='w-3 cursor-pointer' 
              value={'Kids'}/> 
              Kids
            </p>

          </div>

        </div>


        {/* sub category filter */}

        <div 
        className={`border border-hray-300 pl-5 py-3 my-5 ${showFilter ? "": 'hidden'} sm:block`}>

          <p className='mb-3 text-sm font-medium'>TYPE</p>

          <div 
          className='flex flex-col gap-2 text-sm font-light text-gray-700'>

            <p className='flex gap-2'>

              <input 
              onChange={toggleSubCategory}
              type="checkbox" 
              className='w-3 cursor-pointer' 
              value={'Topwear'}/> 
              Topwear
            </p>

            <p className='flex gap-2'>
              <input 
              onChange={toggleSubCategory}
              type="checkbox" 
              className='w-3 cursor-pointer' 
              value={'Bottomwear'}/> 
              Bottomwear
            </p>

            <p className='flex gap-2'>
              <input 
              onChange={toggleSubCategory}
              type="checkbox" 
              className='w-3 cursor-pointer' 
              value={'Winterwear'}/> 
              Winterwear
            </p>

          </div>

        </div>

      </div>

      {/* Right side collections */}

      <div className='flex-1'>

        {/* all collection heading and drop down */}
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title 
              text1={'ALL'}
              text2={'COLLECTIONS'}
            />


            {/* product sort */}
            <select 
            onChange={(e) => setSortType(e.target.value)}
            className='cursor-pointer border border-gray-300 text-sm px-2'>
              <option value="relevent">Sort by: Relevent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High To Low</option>
            </select>


        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>


          {
            filterProducts.map((item , index) => (
              <ProductItems 
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
              
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default Collection