import { useEffect, useState } from "react";
import "./Slider.scss";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import  { sliderData } from "./SliderData";
import {useNavigate} from "react-router-dom"

const Slider = () => {
  const slideLength = sliderData.length;

  const [currentSlide, setCurrentSlide] = useState(0);
  const  navigate= useNavigate()


  let slideInterval;
  let intervalTime = 5000

  useEffect(()=>{
    setCurrentSlide(0)
  },[])

  useEffect(()=>{
    function auto(){
        slideInterval = setInterval(nextSlide,intervalTime)
    };
    auto();
    return ()=>{
        clearInterval(slideInterval)
    }
  },[currentSlide,slideInterval]);


  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

      {sliderData.map((slide, index) => {
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}>
            {index === currentSlide && (
              <>
                <img src={slide.image} alt="slide" />
                <div className="content">
                  <span className="span1"></span>
                  <span className="span2"></span>
                  <span className="span3"></span>
                  <span className="span4"></span>
                  <h2>{slide.heading}</h2>
                  <p>{slide.desc}</p>
                  <hr />
                  <button className="--btn --btn-primary" onClick={()=>navigate("/shop")}>Shop Now</button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
