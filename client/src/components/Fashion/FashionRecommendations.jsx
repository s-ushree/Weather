import { useState } from 'react';
import { Card, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { GiClothes } from 'react-icons/gi';
import { FaFemale, FaMale } from 'react-icons/fa';
import './FashionRecommendations.css';

// Placeholder data (will be replaced with API data)
const placeholderFashion = {
  sunny: {
    men: [
      {
        id: 1,
        title: 'Summer Casual',
        description: 'Light and breathable outfit for hot sunny days',
        image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Light cotton t-shirt',
          'Linen shorts',
          'Canvas sneakers',
          'Sunglasses',
          'Baseball cap'
        ]
      },
      {
        id: 2,
        title: 'Beach Ready',
        description: 'Perfect outfit for a day at the beach',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Printed short-sleeve shirt',
          'Swim shorts',
          'Flip flops',
          'Straw hat',
          'Waterproof watch'
        ]
      }
    ],
    women: [
      {
        id: 1,
        title: 'Summer Chic',
        description: 'Stylish and comfortable for hot weather',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Floral sundress',
          'Straw hat',
          'Sandals',
          'Sunglasses',
          'Light tote bag'
        ]
      },
      {
        id: 2,
        title: 'Beach Day',
        description: 'Breezy outfit for beach outings',
        image: 'https://images.unsplash.com/photo-1524255684952-d7185b509571?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Swimsuit',
          'Cover-up dress',
          'Flip flops',
          'Wide-brim hat',
          'Beach bag'
        ]
      }
    ]
  },
  rainy: {
    men: [
      {
        id: 1,
        title: 'Rain Ready',
        description: 'Stay dry and stylish in wet weather',
        image: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Waterproof jacket',
          'Dark jeans',
          'Waterproof boots',
          'Umbrella',
          'Water-resistant backpack'
        ]
      },
      {
        id: 2,
        title: 'Office Rain Gear',
        description: 'Professional look for rainy workdays',
        image: 'https://images.unsplash.com/photo-1553754538-466add009c05?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Trench coat',
          'Chinos',
          'Leather boots',
          'Compact umbrella',
          'Waterproof watch'
        ]
      }
    ],
    women: [
      {
        id: 1,
        title: 'Rainy Day Style',
        description: 'Chic and practical for wet weather',
        image: 'https://images.unsplash.com/photo-1536125423168-9b9843c28760?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Waterproof trench coat',
          'Skinny jeans',
          'Rain boots',
          'Umbrella',
          'Crossbody waterproof bag'
        ]
      },
      {
        id: 2,
        title: 'Casual Rain Look',
        description: 'Comfortable outfit for rainy days',
        image: 'https://images.unsplash.com/photo-1525171254639-d04267f8b52d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Hooded raincoat',
          'Leggings',
          'Waterproof sneakers',
          'Beanie',
          'Water-resistant backpack'
        ]
      }
    ]
  },
  cold: {
    men: [
      {
        id: 1,
        title: 'Winter Warmth',
        description: 'Layered outfit for cold weather',
        image: 'https://images.unsplash.com/photo-1608236415053-3691791bbffe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Thermal base layer',
          'Wool sweater',
          'Insulated jacket',
          'Jeans',
          'Winter boots',
          'Beanie and gloves'
        ]
      },
      {
        id: 2,
        title: 'Business Cold',
        description: 'Professional winter attire',
        image: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Wool coat',
          'Suit or blazer',
          'Turtleneck',
          'Wool trousers',
          'Leather boots',
          'Leather gloves'
        ]
      }
    ],
    women: [
      {
        id: 1,
        title: 'Winter Elegance',
        description: 'Stylish and warm winter outfit',
        image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Turtleneck sweater',
          'Wool coat',
          'Thermal leggings',
          'Knee-high boots',
          'Scarf and gloves',
          'Wool hat'
        ]
      },
      {
        id: 2,
        title: 'Casual Winter',
        description: 'Cozy and practical cold weather outfit',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Puffer jacket',
          'Hoodie',
          'Jeans',
          'Snow boots',
          'Beanie',
          'Thermal socks'
        ]
      }
    ]
  },
  default: {
    men: [
      {
        id: 1,
        title: 'Casual Classic',
        description: 'Timeless casual look for any day',
        image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Button-down shirt',
          'Chinos',
          'Leather sneakers',
          'Watch',
          'Sunglasses'
        ]
      },
      {
        id: 2,
        title: 'Smart Casual',
        description: 'Elevated everyday style',
        image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Blazer',
          'T-shirt',
          'Dark jeans',
          'Loafers',
          'Minimal accessories'
        ]
      }
    ],
    women: [
      {
        id: 1,
        title: 'Everyday Chic',
        description: 'Stylish yet comfortable everyday outfit',
        image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Blouse',
          'Jeans',
          'Ankle boots',
          'Minimal jewelry',
          'Crossbody bag'
        ]
      },
      {
        id: 2,
        title: 'Smart Casual',
        description: 'Polished look for various occasions',
        image: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        items: [
          'Blazer',
          'T-shirt or blouse',
          'Tailored pants',
          'Flats or low heels',
          'Statement accessory'
        ]
      }
    ]
  }
};

const FashionRecommendations = ({ recommendations }) => {
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [activeTab, setActiveTab] = useState('women');
  
  // Use API recommendations if available, otherwise use placeholder data
  const getFashion = () => {
    if (recommendations) {
      return recommendations;
    }
    
    // Use placeholder data based on weather
    // In a real app, this would come from the weather context
    const weather = 'default'; // Could be 'sunny', 'rainy', 'cold', etc.
    return placeholderFashion[weather] || placeholderFashion.default;
  };
  
  const fashion = getFashion();
  
  const handleOutfitClick = (outfit) => {
    setSelectedOutfit(outfit);
  };
  
  const handleBackClick = () => {
    setSelectedOutfit(null);
  };

  return (
    <Card className="dashboard-card fashion-card">
      <Card.Header className="dashboard-card-header">
        <h4 className="dashboard-card-title">
          <GiClothes /> Fashion Recommendations
        </h4>
      </Card.Header>
      <Card.Body className="dashboard-card-body">
        {selectedOutfit ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="outfit-detail"
          >
            <Button 
              variant="outline-primary" 
              size="sm" 
              onClick={handleBackClick}
              className="mb-3"
            >
              ← Back to outfits
            </Button>
            
            <div className="outfit-detail-content">
              <div className="outfit-detail-image">
                <img src={selectedOutfit.image} alt={selectedOutfit.title} />
              </div>
              <div className="outfit-detail-info">
                <h3>{selectedOutfit.title}</h3>
                <p className="outfit-description">{selectedOutfit.description}</p>
                
                <div className="outfit-items">
                  <h5>What to Wear:</h5>
                  <ul>
                    {selectedOutfit.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="outfit-tips mt-4">
                  <h5>Style Tips:</h5>
                  <p>
                    {selectedOutfit.tips || 'Layer pieces as needed based on the temperature throughout the day. Accessorize to personalize your look while staying weather-appropriate.'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div>
            <p className="recommendation-intro">
              Weather-appropriate fashion suggestions:
            </p>
            
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="fashion-tabs mb-3"
            >
              <Tab eventKey="women" title={<><FaFemale /> Women</>}>
                <Row className="outfit-grid">
                  {fashion.women.map((outfit) => (
                    <Col key={outfit.id} md={6} className="mb-3">
                      <motion.div
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div 
                          className="outfit-card" 
                          onClick={() => handleOutfitClick(outfit)}
                        >
                          <div className="outfit-image">
                            <img src={outfit.image} alt={outfit.title} />
                          </div>
                          <div className="outfit-content">
                            <h5 className="outfit-title">{outfit.title}</h5>
                            <p className="outfit-description">{outfit.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </Tab>
              <Tab eventKey="men" title={<><FaMale /> Men</>}>
                <Row className="outfit-grid">
                  {fashion.men.map((outfit) => (
                    <Col key={outfit.id} md={6} className="mb-3">
                      <motion.div
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div 
                          className="outfit-card" 
                          onClick={() => handleOutfitClick(outfit)}
                        >
                          <div className="outfit-image">
                            <img src={outfit.image} alt={outfit.title} />
                          </div>
                          <div className="outfit-content">
                            <h5 className="outfit-title">{outfit.title}</h5>
                            <p className="outfit-description">{outfit.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </Tab>
            </Tabs>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default FashionRecommendations;
