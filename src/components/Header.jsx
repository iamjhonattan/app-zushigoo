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

        const login = async () => {
            if(!user){
                const {user : {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type : actionType.SET_USER,
                user : providerData[0],
            });
            localStorage.setItem("user", JSON.stringify(providerData[0]));
            }
        };

  return (
    <header className='fixed z-50 w-screen p-6 px-16'>
        {/* pc & tabletas */}
        <div className='hidden md:flex w-full h-full items-center justify-between'>
            <Link to={"/"} className='flex items-center gap-2'>
                <img src={Logo} className='w-50 object-cover' alt='logo' />
                <p className='text-headingColor text-xl font-bold'>¡Demasiado Bueno!</p>
                
            </Link>

            <div className='flex items-center gap-8'>    
            <ul className='flex items-center gap-8 ml-auto'>
                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Inicio</li>
                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menú</li>
                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Servicios</li>
                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Contactos</li>
            </ul>

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
                    <div className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-10 right-0'>
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
                        transition-all duration-100 ease-in-out text-textColor text-base'>
                            Salir <MdLogout />
                            </p>
                    </div>
                </div>
            </div>
        </div>

        {/* moviles */}
        <div className='flex md:hidden w-full h-full'></div>
    </header>
  );
};

export default Header;