import { createContext, useState , useEffect} from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems , setCartItems] = useState({});
  
  const navigate = useNavigate();

  const addToCart = async (itemId , size) => {

    if(!size){
      toast.error('Select Product Size')
      return;
    }

    let cartData = structuredClone(cartItems);

    if(cartData[itemId]){

      if(cartData[itemId][size]){
        cartData[itemId][size] += 1;
      }else{
        cartData[itemId][size] = 1;
      }
    }else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1
    }
    
    setCartItems(cartData)

  }

  const getCartCount = () => {

    let totalCount = 0;

    for(const items in cartItems){
      for(const item in cartItems[items]){
        try {
          if(cartItems[items][item] > 0){
            totalCount += cartItems[items][item]
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    return totalCount;
  }

  const updateQuantity = async (itemId , size , quantity) => {
    const cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for(const items in cartItems){
      let itemInfo = products.find((product) => product._id === items);
      // console.log(itemInfo.price)
      for(const item in cartItems[items]){
        try {
          if(cartItems[items][item] > 0){
            // console.log(cartItems[items][item])
            totalAmount += (itemInfo.price * cartItems[items][item]);
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    // console.log(totalAmount)
    return totalAmount
  }

  // useEffect(() => {
  //   console.log(cartItems)
  //   getCartAmount()
  // }, [cartItems])
  


  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
