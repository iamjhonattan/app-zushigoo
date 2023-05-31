import React from 'react'
import Delivery from '../components/img/deliveryMot.png'

function MainContainer() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
    <div className='py-2 flex-1 flex flex-col items-start md:items-center justify-center'>
      <div className='flex items-center gap-2 justify-center bg-orange-100
      px-4 py-1 rounded-full'>
      <p className='text-base text-orange-500 font-semibold'>Servicio Delivery</p>
        <div className='w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl'>
          <img 
            src={Delivery} 
            className='w-full h-full object-contain' 
            alt="delivery" 
            />
        </div>
      </div>
    </div>
    <div className='p-4 bg-blue-400 flex-1'></div>
  </div>
  );
};

export default MainContainer;