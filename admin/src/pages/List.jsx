import React, { useState , useEffect } from 'react'
import axios from 'axios'
import { toast } from "react-toastify"
import { currency } from '../App'
import { backendUrl } from '../App'

const List = ({token}) => {

  const [list , setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list")

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      
      const response = await axios.post(backendUrl + "/api/product/remove" , {id} , {headers:{token}})

      // console.log(response.data);
      
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    
    fetchList()
    
  }, [])
  

  return (
    <>
      
      <p className='mb-2'>
        All Product List
      </p>

      <div className='flex flex-col gap-2'>

      {/* -------list table title-------  */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm shadow-md'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* --------product list ------------ */}


        {
          list.map((item , index) => (
            <div 
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm shadow-md'
            key={index}>
              <img 
              className='w-12'
              src={item.image[0]} 
              alt="image" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency} {item.price}</p>

              <p 
              onClick={() => removeProduct(item._id)}
              className='text-right md:text-center cursor-pointer text-lg'>
                <span className="material-symbols-outlined
                flex items-center justify-center h-6 w-6 hover:bg-gray-200 rounded-full transition-all">
                  close
                </span>
              </p>
              
            </div>

          ))
        }


      </div>
      
    </>
  )
}

export default List