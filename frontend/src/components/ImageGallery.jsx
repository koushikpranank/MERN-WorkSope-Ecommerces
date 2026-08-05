import React from "react";

const ImageGallery = () => {
  // Store your 6 images here
  const images = [
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&q=80",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80",
    "https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&q=80",
    "https://images.unsplash.com/photo-1527814050087-179f376dd62d?w=300&q=80",
    "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=300&q=80",
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Featured Highlights
      </h2>

      {/* Grid displaying 6 images in a row on large screens */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          >
            <img
              src={img}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-32 object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
