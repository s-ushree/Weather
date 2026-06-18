import asyncHandler from 'express-async-handler';

// Weather condition categories
const weatherCategories = {
  hot: ['Clear', 'Sunny', 'Hot'],
  cold: ['Snow', 'Freezing', 'Cold'],
  rainy: ['Rain', 'Drizzle', 'Thunderstorm'],
  cloudy: ['Clouds', 'Mist', 'Fog', 'Haze'],
  windy: ['Squall', 'Tornado']
};

// Temperature ranges (in Kelvin)
const tempRanges = {
  veryHot: 303.15, // 30°C / 86°F
  hot: 298.15,     // 25°C / 77°F
  warm: 293.15,    // 20°C / 68°F
  cool: 283.15,    // 10°C / 50°F
  cold: 273.15,    // 0°C / 32°F
  veryCold: 263.15 // -10°C / 14°F
};

// Food recommendations based on weather
const foodRecommendations = {
  hot: [
    {
      name: 'Refreshing Fruit Salad',
      description: 'A cooling mix of seasonal fruits with mint and honey dressing.',
      image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '10 mins',
      category: 'Dessert',
      ingredients: [
        'Mixed seasonal fruits (watermelon, berries, pineapple)',
        'Fresh mint leaves',
        'Honey',
        'Lime juice'
      ],
      instructions: [
        'Wash and chop all fruits into bite-sized pieces',
        'Mix in a large bowl',
        'Finely chop mint leaves and add to the fruit',
        'Drizzle with honey and lime juice',
        'Toss gently and refrigerate before serving'
      ]
    },
    {
      name: 'Cucumber Gazpacho',
      description: 'Cold cucumber soup perfect for hot days.',
      image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '15 mins',
      category: 'Soup',
      ingredients: [
        '2 large cucumbers, peeled and chopped',
        '1 green bell pepper, chopped',
        '1 garlic clove',
        '2 tbsp olive oil',
        '1 tbsp white wine vinegar',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Blend all ingredients until smooth',
        'Season with salt and pepper',
        'Chill for at least 2 hours before serving',
        'Garnish with diced cucumber and herbs'
      ]
    },
    {
      name: 'Greek Yogurt Parfait',
      description: 'Layers of yogurt, granola, and berries for a refreshing treat.',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '5 mins',
      category: 'Breakfast',
      ingredients: [
        'Greek yogurt',
        'Granola',
        'Mixed berries',
        'Honey'
      ],
      instructions: [
        'Layer yogurt, granola, and berries in a glass',
        'Drizzle with honey',
        'Repeat layers as desired',
        'Serve immediately'
      ]
    }
  ],
  cold: [
    {
      name: 'Hearty Vegetable Soup',
      description: 'A warming soup packed with seasonal vegetables and herbs.',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '30 mins',
      category: 'Soup',
      ingredients: [
        'Onion, carrot, celery',
        'Garlic',
        'Seasonal vegetables',
        'Vegetable broth',
        'Herbs and spices'
      ],
      instructions: [
        'Sauté onion, carrot, and celery until soft',
        'Add garlic and cook for 1 minute',
        'Add remaining vegetables and broth',
        'Simmer until vegetables are tender',
        'Season with herbs and spices'
      ]
    },
    {
      name: 'Spiced Hot Chocolate',
      description: 'Rich hot chocolate with cinnamon and nutmeg.',
      image: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '10 mins',
      category: 'Beverage',
      ingredients: [
        'Milk',
        'Dark chocolate',
        'Cinnamon',
        'Nutmeg',
        'Whipped cream (optional)'
      ],
      instructions: [
        'Heat milk in a saucepan until steaming',
        'Add chopped chocolate and stir until melted',
        'Add cinnamon and nutmeg',
        'Pour into mugs and top with whipped cream if desired'
      ]
    },
    {
      name: 'Baked Mac and Cheese',
      description: 'Comfort food at its best with a crispy breadcrumb topping.',
      image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '45 mins',
      category: 'Main Course',
      ingredients: [
        'Pasta',
        'Butter',
        'Flour',
        'Milk',
        'Cheese blend',
        'Breadcrumbs'
      ],
      instructions: [
        'Cook pasta according to package directions',
        'Make a roux with butter and flour',
        'Add milk to create a béchamel sauce',
        'Stir in cheese until melted',
        'Mix with pasta and top with breadcrumbs',
        'Bake until golden and bubbly'
      ]
    }
  ],
  rainy: [
    {
      name: 'Masala Chai',
      description: 'Spiced tea perfect for rainy afternoons.',
      image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '10 mins',
      category: 'Beverage',
      ingredients: [
        'Black tea',
        'Milk',
        'Ginger',
        'Cardamom',
        'Cinnamon',
        'Cloves',
        'Sugar'
      ],
      instructions: [
        'Crush spices slightly to release flavors',
        'Bring water to a boil with spices',
        'Add tea leaves and simmer',
        'Add milk and sugar',
        'Strain and serve hot'
      ]
    },
    {
      name: 'Vegetable Pakoras',
      description: 'Crispy fritters made with mixed vegetables and spices.',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '20 mins',
      category: 'Snack',
      ingredients: [
        'Mixed vegetables (onion, potato, cauliflower)',
        'Chickpea flour',
        'Spices (cumin, coriander, turmeric)',
        'Water',
        'Oil for frying'
      ],
      instructions: [
        'Slice vegetables thinly',
        'Mix chickpea flour with spices and water to form a batter',
        'Dip vegetables in batter',
        'Deep fry until golden and crispy',
        'Serve hot with chutney'
      ]
    },
    {
      name: 'Tomato Soup with Grilled Cheese',
      description: 'Classic comfort food combo for rainy days.',
      image: 'https://images.unsplash.com/photo-1555072930-714baf554d3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '25 mins',
      category: 'Lunch',
      ingredients: [
        'Tomatoes',
        'Onion',
        'Garlic',
        'Vegetable broth',
        'Bread',
        'Cheese'
      ],
      instructions: [
        'Sauté onion and garlic',
        'Add tomatoes and broth, simmer until soft',
        'Blend until smooth',
        'Make grilled cheese sandwiches',
        'Serve soup with grilled cheese for dipping'
      ]
    }
  ],
  cloudy: [
    {
      name: 'Mediterranean Salad',
      description: 'Fresh salad with feta, olives, and a lemon vinaigrette.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '15 mins',
      category: 'Salad',
      ingredients: [
        'Mixed greens',
        'Cucumber',
        'Cherry tomatoes',
        'Red onion',
        'Feta cheese',
        'Kalamata olives',
        'Lemon vinaigrette'
      ],
      instructions: [
        'Chop all vegetables',
        'Combine in a large bowl',
        'Add crumbled feta and olives',
        'Dress with lemon vinaigrette just before serving'
      ]
    },
    {
      name: 'Avocado Toast',
      description: 'Whole grain toast topped with avocado, eggs, and microgreens.',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '10 mins',
      category: 'Breakfast',
      ingredients: [
        'Whole grain bread',
        'Ripe avocado',
        'Eggs',
        'Microgreens',
        'Salt and pepper',
        'Red pepper flakes'
      ],
      instructions: [
        'Toast bread until golden',
        'Mash avocado and spread on toast',
        'Top with fried or poached egg',
        'Garnish with microgreens',
        'Season with salt, pepper, and red pepper flakes'
      ]
    },
    {
      name: 'Lemon Garlic Pasta',
      description: 'Light pasta dish with lemon, garlic, and fresh herbs.',
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      prepTime: '20 mins',
      category: 'Main Course',
      ingredients: [
        'Pasta',
        'Olive oil',
        'Garlic',
        'Lemon juice and zest',
        'Fresh herbs (parsley, basil)',
        'Parmesan cheese'
      ],
      instructions: [
        'Cook pasta according to package directions',
        'Sauté garlic in olive oil',
        'Add cooked pasta, lemon juice, and zest',
        'Toss with fresh herbs and Parmesan',
        'Season with salt and pepper'
      ]
    }
  ]
};

// Music recommendations based on weather
const musicRecommendations = {
  hot: [
    {
      title: 'Summer Vibes',
      description: 'Upbeat tracks perfect for sunny days',
      image: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'Spotify',
      link: 'https://open.spotify.com',
      tracks: [
        { name: 'Happy', artist: 'Pharrell Williams' },
        { name: 'Walking on Sunshine', artist: 'Katrina & The Waves' },
        { name: 'Good Vibrations', artist: 'The Beach Boys' }
      ]
    },
    {
      title: 'Beach Party',
      description: 'Dance hits for your beach day',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'YouTube',
      link: 'https://youtube.com',
      tracks: [
        { name: 'Despacito', artist: 'Luis Fonsi ft. Daddy Yankee' },
        { name: 'Can\'t Stop the Feeling', artist: 'Justin Timberlake' },
        { name: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' }
      ]
    }
  ],
  cold: [
    {
      title: 'Winter Warmth',
      description: 'Cozy acoustic songs for cold weather',
      image: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'Spotify',
      link: 'https://open.spotify.com',
      tracks: [
        { name: 'Sweater Weather', artist: 'The Neighbourhood' },
        { name: 'Winter Winds', artist: 'Mumford & Sons' },
        { name: 'White Winter Hymnal', artist: 'Fleet Foxes' }
      ]
    },
    {
      title: 'Cozy Classics',
      description: 'Classic songs to warm your soul',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'YouTube',
      link: 'https://youtube.com',
      tracks: [
        { name: 'Let It Snow', artist: 'Dean Martin' },
        { name: 'The Girl from Ipanema', artist: 'Stan Getz & Astrud Gilberto' },
        { name: 'What a Wonderful World', artist: 'Louis Armstrong' }
      ]
    }
  ],
  rainy: [
    {
      title: 'Rainy Day Acoustics',
      description: 'Soothing acoustic tracks for rainy weather',
      image: 'https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'Spotify',
      link: 'https://open.spotify.com',
      tracks: [
        { name: 'Skinny Love', artist: 'Bon Iver' },
        { name: 'The A Team', artist: 'Ed Sheeran' },
        { name: 'Banana Pancakes', artist: 'Jack Johnson' }
      ]
    },
    {
      title: 'Chill Jazz',
      description: 'Relaxing jazz for rainy afternoons',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'YouTube',
      link: 'https://youtube.com',
      tracks: [
        { name: 'Take Five', artist: 'Dave Brubeck' },
        { name: 'So What', artist: 'Miles Davis' },
        { name: 'Autumn Leaves', artist: 'Bill Evans Trio' }
      ]
    }
  ],
  cloudy: [
    {
      title: 'Indie Mood',
      description: 'Indie tracks for cloudy days',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'Spotify',
      link: 'https://open.spotify.com',
      tracks: [
        { name: 'Sweater Weather', artist: 'The Neighbourhood' },
        { name: 'Midnight City', artist: 'M83' },
        { name: '1901', artist: 'Phoenix' }
      ]
    },
    {
      title: 'Chill Electronic',
      description: 'Ambient electronic music for cloudy skies',
      image: 'https://images.unsplash.com/photo-1470225620780-d04267f8b52d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'YouTube',
      link: 'https://youtube.com',
      tracks: [
        { name: 'Strobe', artist: 'Deadmau5' },
        { name: 'Flim', artist: 'Aphex Twin' },
        { name: 'Dayvan Cowboy', artist: 'Boards of Canada' }
      ]
    }
  ]
};

// Fashion recommendations based on weather
const fashionRecommendations = {
  hot: {
    men: [
      {
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
  cold: {
    men: [
      {
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
  rainy: {
    men: [
      {
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
  cloudy: {
    men: [
      {
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

// Determine weather category based on condition and temperature
const getWeatherCategory = (weatherCondition, temperature) => {
  // Convert condition to lowercase for case-insensitive comparison
  const condition = weatherCondition.toLowerCase();
  
  // Check if condition matches any category
  for (const [category, keywords] of Object.entries(weatherCategories)) {
    if (keywords.some(keyword => condition.includes(keyword.toLowerCase()))) {
      return category;
    }
  }
  
  // If no condition match, categorize based on temperature
  if (temperature >= tempRanges.veryHot) {
    return 'hot';
  } else if (temperature >= tempRanges.warm) {
    return 'cloudy'; // Default mild weather recommendations
  } else if (temperature <= tempRanges.cold) {
    return 'cold';
  } else {
    return 'cloudy'; // Default for mild temperatures
  }
};

// @desc    Get recommendations based on weather
// @route   GET /api/recommendations
// @access  Private
export const getRecommendations = asyncHandler(async (req, res) => {
  const { weather, temp } = req.query;
  
  if (!weather || !temp) {
    res.status(400);
    throw new Error('Weather condition and temperature are required');
  }
  
  // Convert temperature from string to number
  const temperature = parseFloat(temp);
  
  // Determine weather category
  const category = getWeatherCategory(weather, temperature);
  
  console.log(`Getting recommendations for weather: ${weather}, temp: ${temperature}, category: ${category}`);
  
  // Get recommendations based on category
  // Use default category if the determined category doesn't exist in our recommendations
  const foodRecs = foodRecommendations[category] || foodRecommendations.cloudy || foodRecommendations.default;
  const musicRecs = musicRecommendations[category] || musicRecommendations.cloudy || musicRecommendations.default;
  const fashionRecs = fashionRecommendations[category] || fashionRecommendations.cloudy || fashionRecommendations.default;
  
  const recommendations = {
    food: foodRecs,
    music: musicRecs,
    fashion: fashionRecs
  };
  
  console.log(`Sending recommendations with ${recommendations.food?.length || 0} food items, ${recommendations.music?.length || 0} music items`);
  
  res.json(recommendations);
});
