"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface EventSliderProps {
  images: string[];
  className?: string;
}

export function EventSlider({ images, className }: EventSliderProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  if (images.length === 1) {
    return (
      <div className="cursor-pointer max-h-[250px] min-h-[250px] overflow-hidden flex justify-center">
        <div>
          <img className="m-auto h-[250px]" src={images[0]} alt="Event" />
        </div>
      </div>
    );
  }

  return (
    <Slider {...settings} className={className}>
      {images.map((img, index) => (
        <div
          key={index}
          className="cursor-pointer max-h-[250px] min-h-[250px] overflow-hidden flex justify-center"
        >
          <div>
            <img
              className="m-auto h-[250px]"
              src={img}
              alt={`Event ${index + 1}`}
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}
