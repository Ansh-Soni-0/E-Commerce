import { useContext, useState }  from 'react'
import {assets} from '../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    const { setShowSearch , getCartCount } = useContext(ShopContext)

    const [visible , setVisible] = useState(false)

  return (
    <div 
    className='flex items-center justify-between py-5 font-medium'>
        <Link
        to='/'
        >
            <img 
            src={assets.logo} 
            alt="webside-logo" 
            className='w-36'/>
        </Link>
        


        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

            <NavLink 
            to='/'
            className="flex flex-col items-center gap-1">
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden'/>
            </NavLink>

            <NavLink 
            to='/collection'
            className="flex flex-col items-center gap-1">
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden'/>
            </NavLink>

            <NavLink 
            to='/about'
            className="flex flex-col items-center gap-1">
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden'/>
            </NavLink>

            <NavLink 
            to='/contact'
            className="flex flex-col items-center gap-1">
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden'/>
            </NavLink>

        </ul>


        <div className='flex items-center gap-6'>
            <img 
            //searchbar visible onclick search icon
            onClick={(e) => setShowSearch(true)}
            loading='lazy'
            src={assets.search_icon} 
            className='w-5 cursor-pointer' 
            alt="search-icon" />

            
            <div className='group relative'>
                <img 
                src={assets.profile_icon} 
                alt="profile-icon" 
                className='w-5 cursor-pointer'/>

                {/* drop down menu of profile icon  */}
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p className='cursor-pointer hover:text-black'>Orders</p>
                        <p className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                </div>

            </div>

            <Link to='/cart' className='relative'>
                <img 
                src={assets.cart_icon} 
                className="w-5 min-w-5"
                alt="cart-icon" />

                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] font-extrabold'>{getCartCount()}</p>
            </Link>

            <img 
            onClick={() => setVisible(true)}
            src={assets.menu_icon} 
            alt="menu-icon" 
            className='w-5 cursor-pointer sm:hidden'/>
        </div>

        {/* Side bar menu for small screens */}
        <div 
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-gray-100 transition-all duration-500 ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-500'>

                <div 
                onClick={() => setVisible(false)}
                className='flex items-center gap-4 p-3 cursor-pointer'>
                    <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180'/>
                    <p>Back</p>
                </div>

                <NavLink 
                onClick={() => setVisible(false)}
                to='/' 
                className='py-2 pl-6 border border-gray-200 hover:bg-black hover:text-white transition-all'>
                    HOME
                </NavLink>
                
                <NavLink 
                onClick={() => setVisible(false)}
                to='/collection' 
                className='py-2 pl-6 border border-gray-200 hover:bg-black hover:text-white transition-all'>
                    COLLECTION
                </NavLink>

                <NavLink 
                onClick={() => setVisible(false)}
                to='/about' 
                className='py-2 pl-6 border border-gray-200 hover:bg-black hover:text-white transition-all'>
                    ABOUT
                </NavLink>

                <NavLink 
                onClick={() => setVisible(false)}
                to='/contact' 
                className='py-2 pl-6 border border-gray-200 hover:bg-black hover:text-white transition-all'>
                    CONTACT
                </NavLink>



            </div>
        </div>
        
    </div>
  )
}

export default Navbar