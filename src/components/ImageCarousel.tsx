import React, { useState, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  interval = 4000 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Debug logging
  useEffect(() => {
    console.log('ImageCarousel loaded with images:', images);
    console.log('Number of images:', images.length);
  }, [images]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const goToImage = (index: number) => {
    console.log(`Switching to image ${index + 1}`);
    setCurrentImageIndex(index);
  };
  
  // Debug current image state
  useEffect(() => {
    console.log(`Current image index: ${currentImageIndex}, Image: ${images[currentImageIndex]}`);
  }, [currentImageIndex, images]);

  return (
    <div className="relative w-full h-96 rounded-2xl shadow-2xl overflow-hidden">
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
              display: 'block'
            }}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            onError={(e) => {
              console.error(`Failed to load image ${index + 1}:`, image);
              e.currentTarget.style.display = 'none';
            }}
            onLoad={() => {
              console.log(`Successfully loaded image ${index + 1}:`, image);
            }}
          />
        ))}
        
        {/* Fallback placeholder when no images load - only show if no images are loaded */}
        <div className={`absolute inset-0 w-full h-full bg-gradient-to-br from-lime-200 to-orange-200 flex items-center justify-center transition-opacity duration-1000 ${
          images.length === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="text-center text-gray-600">
            <div className="text-6xl mb-4">🍋</div>
            <div className="text-xl font-semibold">Lime Pickle Images</div>
            <div className="text-sm">Loading...</div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
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
        {currentImageIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageCarousel;
