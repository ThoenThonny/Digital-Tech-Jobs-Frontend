import React from 'react';

function Imagescrolling() {
  const images = [
    { image: 'https://i.pinimg.com/736x/fa/01/8a/fa018ad9db226544b0bdaf9a74507da9.jpg' },
    { image: 'https://i.pinimg.com/736x/06/03/c7/0603c7093a69cae565ce6ebcc3175f53.jpg' },
    { image: 'https://i.pinimg.com/1200x/96/c1/72/96c1720919baa5c867e1f4f2afc2a4f3.jpg' },
    { image: 'https://i.pinimg.com/736x/06/af/8f/06af8fff2c908216b054152fd7454115.jpg' },
    { image: 'https://i.pinimg.com/1200x/fa/4b/0d/fa4b0d387bf601181ac933b98c84929a.jpg' },
    { image: 'https://i.pinimg.com/736x/3c/eb/e4/3cebe4c4cdfc87f49046c2a40ea54eb0.jpg' },
    { image: 'https://i.pinimg.com/1200x/f4/92/7f/f4927f33e7a328be658a7d223440f7a3.jpg' },
    { image: 'https://i.pinimg.com/736x/d4/8c/71/d48c713f1c4d4f8441fd53cd13848739.jpg' },
  ];

  // Duplicate the array to create seamless infinite effect
  const scrollingImages = [...images, ...images];

  return (
    <div className="overflow-hidden w-full bg-gray-50 py-6">
      <div className="flex gap-4 animate-scroll">
        {scrollingImages.map((item, index) => (
          <div key={index} className="w-[150px] flex-shrink-0">
            <img
              src={item.image}
              alt={`Image ${index}`}
              className="w-full h-[200px] object-cover rounded-xl shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Imagescrolling;
