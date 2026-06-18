import { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { GiCookingPot } from 'react-icons/gi';
import { useWeather } from '../../context/WeatherContext'; // Fixed import path
import './FoodRecommendations.css';

// Placeholder data (will be replaced with API data)
const placeholderRecipes = {
  hot: [
    {
      id: 1,
      name: 'Refreshing Fruit Salad',
      description: 'A cooling mix of seasonal fruits with mint and honey dressing.',
      image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '10 mins',
      category: 'Dessert'
    },
    {
      id: 2,
      name: 'Cucumber Gazpacho',
      description: 'Cold cucumber soup perfect for hot days.',
      image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '15 mins',
      category: 'Soup'
    },
    {
      id: 3,
      name: 'Greek Yogurt Parfait',
      description: 'Layers of yogurt, granola, and berries for a refreshing treat.',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '5 mins',
      category: 'Breakfast'
    }
  ],
  cold: [
    {
      id: 1,
      name: 'Hearty Vegetable Soup',
      description: 'A warming soup packed with seasonal vegetables and herbs.',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '30 mins',
      category: 'Soup'
    },
    {
      id: 2,
      name: 'Spiced Hot Chocolate',
      description: 'Rich hot chocolate with cinnamon and nutmeg.',
      image: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '10 mins',
      category: 'Beverage'
    },
    {
      id: 3,
      name: 'Baked Mac and Cheese',
      description: 'Comfort food at its best with a crispy breadcrumb topping.',
      image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '45 mins',
      category: 'Main Course'
    }
  ],
  rainy: [
    {
      id: 1,
      name: 'Masala Chai',
      description: 'Spiced tea perfect for rainy afternoons.',
      image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '10 mins',
      category: 'Beverage'
    },
    {
      id: 2,
      name: 'Vegetable Pakoras',
      description: 'Crispy fritters made with mixed vegetables and spices.',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '20 mins',
      category: 'Snack'
    },
    {
      id: 3,
      name: 'Tomato Soup with Grilled Cheese',
      description: 'Classic comfort food combo for rainy days.',
      image: 'https://images.unsplash.com/photo-1555072930-714baf554d3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '25 mins',
      category: 'Lunch'
    }
  ],
  default: [
    {
      id: 1,
      name: 'Mediterranean Salad',
      description: 'Fresh salad with feta, olives, and a lemon vinaigrette.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '15 mins',
      category: 'Salad'
    },
    {
      id: 2,
      name: 'Avocado Toast',
      description: 'Whole grain toast topped with avocado, eggs, and microgreens.',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '10 mins',
      category: 'Breakfast'
    },
    {
      id: 3,
      name: 'Lemon Garlic Pasta',
      description: 'Light pasta dish with lemon, garlic, and fresh herbs.',
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '20 mins',
      category: 'Main Course'
    }
  ]
};

const FoodRecommendations = ({ recommendations }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
  // Use API recommendations if available, otherwise use placeholder data
  const getRecipes = () => {
    console.log('Food recommendations from API:', recommendations);
    
    if (recommendations && Array.isArray(recommendations) && recommendations.length > 0) {
      return recommendations;
    }
    
    // Use placeholder data based on weather from context
    const { theme } = useWeather();
    console.log('Using placeholder food recipes for theme:', theme);
    
    // Map theme to weather category
    let weather = 'default';
    if (theme === 'sunny' || theme === 'clear') weather = 'hot';
    else if (theme === 'rainy') weather = 'rainy';
    else if (theme === 'cloudy') weather = 'cloudy';
    else if (theme === 'snowy') weather = 'cold';
    
    return placeholderRecipes[weather] || placeholderRecipes.default;
  };
  
  const recipes = getRecipes();
  
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };
  
  const handleBackClick = () => {
    setSelectedRecipe(null);
  };

  return (
    <Card className="dashboard-card food-card">
      <Card.Header className="dashboard-card-header">
        <h4 className="dashboard-card-title">
          <GiCookingPot /> Tasty Food Recommendations
        </h4>
      </Card.Header>
      <Card.Body className="dashboard-card-body">
        {selectedRecipe ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="recipe-detail"
          >
            <Button 
              variant="outline-primary" 
              size="sm" 
              onClick={handleBackClick}
              className="mb-3"
            >
              ← Back to recipes
            </Button>
            
            <div className="recipe-detail-content">
              <div className="recipe-detail-image">
                <img src={selectedRecipe.image} alt={selectedRecipe.name} />
              </div>
              <div className="recipe-detail-info">
                <h3>{selectedRecipe.name}</h3>
                <p className="recipe-category">{selectedRecipe.category}</p>
                <p className="recipe-prep-time">Prep time: {selectedRecipe.prepTime}</p>
                <p className="recipe-description">{selectedRecipe.description}</p>
                
                {selectedRecipe.ingredients && (
                  <div className="recipe-ingredients">
                    <h5>Ingredients:</h5>
                    <ul>
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedRecipe.instructions && (
                  <div className="recipe-instructions">
                    <h5>Instructions:</h5>
                    <ol>
                      {selectedRecipe.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div>
            <p className="recommendation-intro">
              Weather-appropriate recipes to try today:
            </p>
            
            <Row className="recipe-grid">
              {recipes.map((recipe) => (
                <Col key={recipe.id} md={4} sm={6} className="mb-3">
                  <motion.div
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div 
                      className="recipe-card" 
                      onClick={() => handleRecipeClick(recipe)}
                    >
                      <div className="recipe-image">
                        <img src={recipe.image} alt={recipe.name} />
                      </div>
                      <div className="recipe-content">
                        <h5 className="recipe-title">{recipe.name}</h5>
                        <p className="recipe-meta">
                          {recipe.category} • {recipe.prepTime}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default FoodRecommendations;
