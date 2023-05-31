import React, { useState } from 'react';
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from 'framer-motion';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import Logo from './img/logoHeader-250x55px.png';
import Avatar from './img/userAvatar.png';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Header = () => {
 
        const firebaseAuth = getAuth(app);
        const provider = new GoogleAuthProvider();

        const [{user}, dispatch] = useStateValue();

        const [isMenu, setIsMenu] = useState(false)

        const login = async () => {
            if(!user){
                const {user : {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type : actionType.SET_USER,
                user : providerData[0],
            });
            localStorage.setItem("user", JSON.stringify(providerData[0]));
            }else{
                setIsMenu(!isMenu);
            }
        };

        const logout = () => {
            setIsMenu(false)
            localStorage.clear()

            dispatch({
                type : actionType.SET_USER,
                user : null
            });
        };

  return (
    <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16'>
        {/* pc & tabletas */}
        <div className='hidden md:flex w-full h-full items-center justify-between'>
            <Link to={"/"} className='flex items-center gap-2'>
                <img src={Logo} className='w-50 object-cover' alt='logo' />
                <p className='text-headingColor text-xl font-bold'>¡Demasiado Bueno!</p>
                
            </Link>

            <div className='flex items-center gap-8'>    
            <motion.ul initial={{opacity : 0, x : 200}}
            animate={{opacity : 1, x : 0}}
            exit={{opacity : 0, x : 200}}
            className='flex items-center gap-8 ml-auto'>
                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Inicio</li>
                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menú</li>
                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Servicios</li>
                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Contactos</li>
            </motion.ul>

            <div className='relative flex items-center justify-center'>
                <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
                <div className='absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center'>
                    <p className='text-xs text-white font-semibold'>2</p>
                    </div>
                </div>

                <div className='relative'>
                <motion.img
                    whileTap={{ scale: 0.6 }}
                    src={user ? user.photoURL : Avatar} 
                    className='w-10 h-10 rounded-full cursor-pointer min-w-[40px] min-w-[40px]' 
                    alt="userprofile"
                    onClick={login} 
                    />
                    {
                        isMenu && (

                            <motion.div 
                            initial={{opacity : 0, scale : 0.6}} 
                            animate={{opacity : 1, scale : 1}} 
                            exit={{opacity : 0, scale : 0.6}}  
                            className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-10 right-0'>
                        {
                         user && user.email === "iamjhonattan@gmail.com" && (
                            <Link to={'/createItem'}>
                             <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 
                             transition-all duration-100 ease-in-out text-textColor text-base'>
                                New Item <MdAdd />
                                </p>
                            </Link>
                            )}
                        <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 
                        transition-all duration-100 ease-in-out text-textColor text-base'
                            onClick={logout}
                        >
                            Salir <MdLogout />    
                         </p>
                    </motion.div>
                        )
                    }
                </div>
            </div>
        </div>

        {/* moviles */}
        <div className='flex items-center justify-between md:hidden w-full h-full'>


            <div className='relative flex items-center justify-center'>
                <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
                <div className='absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center'>
                    <p className='text-xs text-white font-semibold'>2</p>
                </div>
            </div>

            <Link to={"/"} className='flex items-center gap-2'>
                <img src={Logo} className='w-40 object-cover' alt='logo' />
                <p className='text-headingColor text-xl font-bold'></p>
            </Link>

            <div className='relative'>
                <motion.img
                    whileTap={{ scale: 0.6 }}
                    src={user ? user.photoURL : Avatar} 
                    className='w-10 h-10 rounded-full cursor-pointer min-w-[40px] min-w-[40px]' 
                    alt="userprofile"
                    onClick={login} 
                    />
                    {
                        isMenu && (

                        <motion.div 
                            initial={{opacity : 0, scale : 0.6}}
                            animate={{opacity : 1, scale : 1}} 
                            exit={{opacity : 0, scale : 0.6}}  
                            className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-10 right-0'>
                        {
                         user && user.email === "iamjhonattan@gmail.com" && (
                            <Link to={'/createItem'}>
                             <p className='px-4 py-2 flex items-center gap-3 
                             cursor-pointer hover:bg-slate-200 transition-all
                             duration-100 ease-in-out text-textColor text-base'>
                                New Item <MdAdd />
                                </p>
                            </Link>
                            )}

                        <ul className='flex flex-col px-4 py-2'>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>Inicio</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>Menú</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>Servicios</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>Contactos</li>
                        </ul>

                        <p className='m-2 p-2 rounded-md shadow-md flex items-center justify-center 
                        bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 
                        transition-all duration-100 ease-in-out text-textColor 
                        text-base'
                            onClick={logout}
                        >
                            Salir <MdLogout />
                         </p>
                    </motion.div>
                        )
                    }
                </div>
        </div>
    </header>
  );
};

export default Header;