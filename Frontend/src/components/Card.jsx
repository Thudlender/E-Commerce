import React, { useState } from 'react'
const Card = () => {
    const { _id, name, image, description, category, price } = item;
    const [isHeartFilled, setIsHeartFilled] = useState
    (false);
    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    };
  return (
    <div className='card shadow-xl relative mr-5 h-120'>
        <div className="rating gap-1 absolute right-2 top-2 p-4 heartStar bg-red ${isHeartFilled ? "text-white-500"}"></div>
        <figure>
            <img 
            src={image}
            alt=''
            className='hover:scale-105 transition-all duration-300 md:h-60'
            />
        </figure>
        <div className='card-body'>
            <h2 className='card-title'>{name}</h2>
            <p>{description}</p>
            <div className=''>///////////</div>
        </div>
    </div>
  )
}

export default Card