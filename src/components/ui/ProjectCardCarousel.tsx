"use client";

import { FC } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProjectCardCarousel.css";

interface ProjectCardCarouselProps {
  images: string[];
  projectName: string;
}

const ProjectCardCarousel: FC<ProjectCardCarouselProps> = ({
  images,
  projectName,
}) => {
  if (!images || images.length === 0) {
    return (
      <div className="carousel-container">
        <div className="carousel-slide">
          <div className="image-wrapper">
            <div className="placeholder">No images available</div>
          </div>
        </div>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    arrows: false,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={`${projectName}-${index}`} className="carousel-slide">
            {/* <div className="image-wrapper"> */}
              <Image
                src={image}
                alt={`${projectName} - Slide ${index + 1}`}
                fill
                style={{
                  objectFit: "contain",
                }}
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0}
                quality={80}
              />
            {/* </div> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProjectCardCarousel;
