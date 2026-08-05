import React from "react";
import { Carousel } from "react-bootstrap";

const ProductsCarousel = () => {
  return (
    <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/20 my-8">
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100 h-[400px] object-cover opacity-80"
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80"
            alt="First slide"
          />
          <Carousel.Caption className="bg-black/50 backdrop-blur-sm rounded-xl p-4 mb-4">
            <h3 className="text-3xl font-bold text-white">Premium Audio</h3>
            <p className="text-teal-300">
              Immerse yourself in crystal clear sound.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 h-[400px] object-cover opacity-80"
            src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&q=80"
            alt="Second slide"
          />
          <Carousel.Caption className="bg-black/50 backdrop-blur-sm rounded-xl p-4 mb-4">
            <h3 className="text-3xl font-bold text-white">4K Displays</h3>
            <p className="text-teal-300">
              See every detail with ultra-high resolution.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 h-[400px] object-cover opacity-80"
            src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200&q=80"
            alt="Third slide"
          />
          <Carousel.Caption className="bg-black/50 backdrop-blur-sm rounded-xl p-4 mb-4">
            <h3 className="text-3xl font-bold text-white">Smart Wearables</h3>
            <p className="text-teal-300">
              Track your life seamlessly on the go.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ProductsCarousel;
