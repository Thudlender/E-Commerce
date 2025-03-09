import React from "react";

const CardItemsAdmin = ({ items }) => {
  const { name, image, description, price } = items;

  return (
    <div className="card shadow-xl relative mr-5 md:my-5 h-120">
      <figure>
        <img
          src={image}
          alt={name}
          className="hover:scale-105 transition-all duration-300 md:h-60 md:w-60 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="">{description}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-bold">
            {price} <span className="text-sm text-red">฿</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CardItemsAdmin;