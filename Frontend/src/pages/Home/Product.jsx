import React, { useReducer, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import products from "../../../public/images/images/home/product.json"

const SampleNextArrow = (props)=>{
    const {className, style, onClick} = props;
    return
    <div className={className, style, onClick} = props;
    display: "block", background:"red"></div>
}
const Product = () => {
  const [product, setProduct] = useState(productList);
  const slider = useRef(null);
  const setting = {
    dots: true,
    Infinite: false,
    speed: 500,
    slideToShow: 3,
    slideToScroll: 3,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        setting: {
          dots: true,
          Infinity: true,
          slideToShow: 3,
          slideToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        setting: {
          dots: true,
          Infinity: true,
          slideToShow: 3,
          slideToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        setting: {
          dots: true,
          Infinity: true,
          slideToShow: 3,
          slideToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        setting: {
          dots: true,
          Infinity: true,
          slideToShow: 3,
          slideToScroll: 3,
        },
      },
    ],
  };
  return (
  <div className="section-container my-20 relative">
    <div className="text-left">
      <p className="subtitle">Special Items</p>
      <h2 className="title">Standout Items from our products</h2>
    </div>
    <div className="md:absolute right-3 top-8 md-10 md:mr-24 space-x-2">
      <button onClick={()=>slider?.current?.slickPev()}>arrow</button>
      <button onClick={()=>slider?.current?.slickPev()}>arrow right</button>
      <button onClick={()=>slider?.current?.slickPev()}>arrow left</button>
    </div>
    <div className="slider-container">
      <Slider ref={slider} {...setting} className="overflow-hidden mt-10 space-x-5">
        {products.length>0 && products.map((item, index)=>{
          return <Card item={item} key={index}/>;
        })}
      </Slider>
    </div>
  </div>
  ); 
};

export default Product;
