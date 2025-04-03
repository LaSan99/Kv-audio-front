import React from 'react';

const Gallery = () => {
  // Live Performances Section
  const livePerformances = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
      title: 'Live Concert',
      description: 'Energetic rock concert performance',
      date: 'March 15, 2024',
      venue: 'City Arena'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
      title: 'Jazz Night',
      description: 'Intimate jazz club performance',
      date: 'March 20, 2024',
      venue: 'Blue Note Club'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec',
      title: 'Band Performance',
      description: 'Live band playing on stage',
      date: 'March 25, 2024',
      venue: 'The Underground'
    }
  ];

  // Festivals Section
  const festivals = [
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
      title: 'Summer Music Festival',
      description: 'Outdoor summer music festival',
      date: 'June 10-12, 2024',
      venue: 'Sunset Park'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
      title: 'Indie Music Fest',
      description: 'Celebration of independent artists',
      date: 'July 5-7, 2024',
      venue: 'Riverside Grounds'
    }
  ];

  // Classical Events Section
  const classicalEvents = [
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
      title: 'Symphony Orchestra',
      description: 'Classical masterpieces performance',
      date: 'April 2, 2024',
      venue: 'Grand Concert Hall'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
      title: 'Chamber Music',
      description: 'Intimate classical ensemble',
      date: 'April 10, 2024',
      venue: 'Royal Theater'
    }
  ];

  // DJ Events Section
  const djEvents = [
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
      title: 'Electronic Night',
      description: 'DJ dance party',
      date: 'March 30, 2024',
      venue: 'Neon Club'
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
      title: 'House Music Night',
      description: 'Deep house and techno',
      date: 'April 5, 2024',
      venue: 'The Warehouse'
    }
  ];

  const renderSection = (title, items) => (
    <div className="mb-16">
      <h2 className="text-3xl font-light text-gray-800 mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="aspect-w-4 aspect-h-3">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-xl font-light mb-2">{item.title}</h3>
                <p className="text-gray-200 text-sm mb-2">{item.description}</p>
                <p className="text-gray-300 text-xs mb-1">Date: {item.date}</p>
                <p className="text-gray-300 text-xs">Venue: {item.venue}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-light text-center text-gray-800 mb-12">Music Events Gallery</h1>
      
      {renderSection("Live Performances", livePerformances)}
      {renderSection("Music Festivals", festivals)}
      {renderSection("Classical Events", classicalEvents)}
      {renderSection("DJ Nights", djEvents)}
    </div>
  );
};

export default Gallery;