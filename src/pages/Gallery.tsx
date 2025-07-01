import React from 'react';

const Gallery: React.FC = () => {
  // This would typically come from an API or CMS
  const galleryItems = [
    {
      id: 1,
      title: 'Event 1',
      description: 'This event',
      imageUrl: '/placeholder-image-1.jpg',
    },
  ];

  return (
    <div className="gallery-page">
      <h1>Gallery</h1>
      <p className="gallery-intro">
        Explore photos from our past events.
      </p>

      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <div key={item.id} className="gallery-item">
            <div className="gallery-image">
              <img src={item.imageUrl} alt={item.title} />
            </div>
            <div className="gallery-caption">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;