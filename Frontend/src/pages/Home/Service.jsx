import { useState } from "react";
const serviceList = [
  {
    id: 1,
    title: "High-Quality Products",
    description:
      "We provide high-quality products to our customers. We have a wide range of products in different categories.",
    image: "/images/home/services/assurance.png",
  },
  {
    id: 2,
    title: "Fast Delivery",
    description: "We deliver your order promptly to your door",
    image: "/images/home/services/fast-delivery.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    description:
      "Explore products & order with ease using our Online Ordering n",
    image: "/images/home/services/order.png",
  },
  {
    id: 4,
    title: "Gift Cards",
    description: "Give the gift of exceptional dining with SE Shop Gift Cards",
    image: "/images/home/services/gift.png",
  },
];

const Service = () => {
  const [myServices, setMyServices] = useState(serviceList);
  return (
    <div className='section-container my-16'>
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className='md:w-1/2'>
         <div className='text-left md:w-4/5'>
          <p className='my-5 text-secondary leading-[30px]'>
            lorem ipsum
          </p>
          <button className='btn bg-red font-semibold text-white px-8 py-3 rounded-full'>
            Explore
          </button>
         </div>
        </div>
       <div className='md:w-1/2'>
        <div className='grid sm:grid-cols-1 gap-8 item-center'>
          {myServices.length > 0 &&
            myServices.map((item) => {
              return (
                <div 
                 key={item.id}
                 className='shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-red cursor-pointer
                 hover:border hover:border-indigo-600 transition-all duration-200'
                >
                  <img src={item.image} alt="" className="mx-auto h-16" /> <h5 className="font-semibold">{item. title}</h5> <p className="text-[#907E7E]">(item. description)</p>
                </div>
              );
            })
          }
        </div>
       </div>
      </div>
    </div>
  )
}

export default Service