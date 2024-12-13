import { useState } from "react";

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <div className="relative h-[700px] ">
      {/* Slider Image */}
      <div className="w-full h-full">
        <img
          src={images[currentImageIndex]}
          alt="slider"
          className="sm:w-full sm:h-full w-[100%] h-[70%]object-cover transition-transform duration-500"
        />
      </div>

      {/* Dot Indicators */}
      <div className="absolute sm:bottom-[-3rem] bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentImageIndex
                ? "bg-gradient-to-r from-[#4c49ed] to-[#020067] w-[30px] h-3"
                : "bg-gray-400"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
