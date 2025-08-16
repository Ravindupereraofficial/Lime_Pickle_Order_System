import React, { useState, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, interval = 4000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative w-full h-96 rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-lime-100 to-orange-100">
      {/* Main Image */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Lime Pickle ${index + 1}`}
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
              zIndex: index === currentImageIndex ? 10 : 0,
              display: 'block',
              transition: 'opacity 1s cubic-bezier(0.4,0,0.2,1)'
            }}
            className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-xl border-4 border-white"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ))}
        {/* Fallback placeholder when no images load - only show if no images are loaded */}
        {images.length === 0 && (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-lime-200 to-orange-200 flex items-center justify-center transition-opacity duration-1000">
            <div className="text-center text-gray-600">
              <div className="text-6xl mb-4">🍋</div>
              <div className="text-xl font-semibold">Lime Pickle Images</div>
              <div className="text-sm">Loading...</div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-4 h-4 rounded-full border-2 border-lime-400 focus:outline-none transition-all duration-300 shadow-md
              ${index === currentImageIndex ? 'bg-lime-500 border-lime-600 scale-125 shadow-lg' : 'bg-white hover:bg-lime-200'}`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Previous/Next Buttons */}
      <button
        onClick={() => goToImage(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-200"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => goToImage(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-200"
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image Counter */}
      <div className="absolute top-4 right-4 bg-black/30 text-white px-3 py-1 rounded-full text-sm font-medium">
        {images.length > 0 ? `${currentImageIndex + 1} / ${images.length}` : '0 / 0'}
      </div>
    </div>
  );
};

