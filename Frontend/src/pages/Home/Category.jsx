import { useState } from "react";
const categoryItems = [
  {
    id: 1,
    title: "Clothing",
    number: 86,
    image: "/images/home/category/img1.jpg",
  },
  {
    id: 1,
    title: "Clothing",
    number: 86,
    image: "/images/home/category/img1.jpg",
  },
  {
    id: 1,
    title: "Clothing",
    number: 86,
    image: "/images/home/category/img1.jpg",
  },
  {
    id: 1,
    title: "Clothing",
    number: 86,
    image: "/images/home/category/img1.jpg",
  },
];

const Category = () => {
  const [categories, setCategories] = useState(categoryItems);
  return (
    <div className='section-container py-16'>
      <div className='text-center'>
        <p className='subtitle'>Customer Favorites</p>
        <h2 className='title'>Popular Categories</h2>
      </div>
      <div className='flex flex-col sm:flex-row flex-wrap gap-6 justify-around items-center mt-12'>
        {
          categories.length>0 &&(
            categories.map((item)=>{
              return (
                <div key={item.id} className="shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translation-all duration-300"
                >
                  <div className="w-full mx-auto flex item-center justify-center">
                    <img src={item.image} alt='' className='bg-red p-2 rounded-full w-28 h-28'
                    />
                  </div>
                  <div className='mt-5 space-y-1'>
                    <h5 className='text'></h5>
                  </div>
                </div>
              )
            })
          )
        }
      </div>
    </div>
  )
}

export default Category