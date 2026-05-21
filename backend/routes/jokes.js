// backend/routes/jokes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Joke API endpoints
const JOKE_APIS = {
  // JokeAPI - https://jokeapi.dev/
  jokeAPI: 'https://v2.jokeapi.dev/joke/Any?safe-mode',
  
  // Official Joke API - https://official-joke-api.appspot.com/
  officialJokeAPI: 'https://official-joke-api.appspot.com/random_joke',
  
  // Random Useless Facts API (bonus)
  randomFact: 'https://uselessfacts.jsonfeed.org/random.json'
};

/**
 * GET /api/jokes/random
 * Fetch a random joke from external API
 */
router.get('/random', async (req, res) => {
  try {
    const jokeSource = req.query.source || 'jokeAPI'; // Default to JokeAPI

    let response;
    let joke;

    switch (jokeSource) {
      case 'official':
        // Official Joke API
        response = await axios.get(JOKE_APIS.officialJokeAPI, {
          timeout: 5000
        });
        
        joke = {
          source: 'Official Joke API',
          setup: response.data.setup,
          delivery: response.data.punchline,
          type: 'two-part',
          id: response.data.id
        };
        break;

      case 'jokeAPI':
      default:
        // JokeAPI (supports various joke types and safe mode)
        response = await axios.get(JOKE_APIS.jokeAPI, {
          timeout: 5000
        });

        if (response.data.type === 'twopart') {
          joke = {
            source: 'JokeAPI',
            setup: response.data.setup,
            delivery: response.data.delivery,
            type: 'two-part',
            category: response.data.category,
            id: response.data.id
          };
        } else {
          joke = {
            source: 'JokeAPI',
            content: response.data.joke,
            type: 'single',
            category: response.data.category,
            id: response.data.id
          };
        }
        break;
    }

    res.json({
      success: true,
      data: joke
    });
  } catch (error) {
    console.error('Error fetching joke:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch joke',
      message: error.message
    });
  }
});

/**
 * GET /api/jokes/random/safe
 * Fetch a safe random joke (no offensive content)
 */
router.get('/random/safe', async (req, res) => {
  try {
    const response = await axios.get(JOKE_APIS.jokeAPI, {
      timeout: 5000
    });

    let joke;
    if (response.data.type === 'twopart') {
      joke = {
        source: 'JokeAPI (Safe Mode)',
        setup: response.data.setup,
        delivery: response.data.delivery,
        type: 'two-part',
        category: response.data.category,
        id: response.data.id
      };
    } else {
      joke = {
        source: 'JokeAPI (Safe Mode)',
        content: response.data.joke,
        type: 'single',
        category: response.data.category,
        id: response.data.id
      };
    }

    res.json({
      success: true,
      data: joke
    });
  } catch (error) {
    console.error('Error fetching safe joke:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch safe joke',
      message: error.message
    });
  }
});

/**
 * GET /api/jokes/category/:category
 * Fetch a joke by category (JokeAPI supports: general, knock-knock, programming, etc.)
 */
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const url = `https://v2.jokeapi.dev/joke/${category}?safe-mode`;

    const response = await axios.get(url, {
      timeout: 5000
    });

    if (response.data.error) {
      return res.status(404).json({
        success: false,
        error: `Category "${category}" not found`
      });
    }

    let joke;
    if (response.data.type === 'twopart') {
      joke = {
        source: 'JokeAPI',
        setup: response.data.setup,
        delivery: response.data.delivery,
        type: 'two-part',
        category: response.data.category,
        id: response.data.id
      };
    } else {
      joke = {
        source: 'JokeAPI',
        content: response.data.joke,
        type: 'single',
        category: response.data.category,
        id: response.data.id
      };
    }

    res.json({
      success: true,
      data: joke
    });
  } catch (error) {
    console.error('Error fetching joke by category:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch joke by category',
      message: error.message
    });
  }
});

/**
 * GET /api/jokes/multiple
 * Fetch multiple random jokes
 * Query params: count (default: 5, max: 10)
 */
router.get('/multiple', async (req, res) => {
  try {
    let count = parseInt(req.query.count) || 5;
    count = Math.min(count, 10); // Max 10 jokes
    count = Math.max(count, 1); // Min 1 joke

    const jokes = [];

    for (let i = 0; i < count; i++) {
      try {
        const response = await axios.get(JOKE_APIS.jokeAPI, {
          timeout: 5000
        });

        let joke;
        if (response.data.type === 'twopart') {
          joke = {
            setup: response.data.setup,
            delivery: response.data.delivery,
            type: 'two-part',
            category: response.data.category,
            id: response.data.id
          };
        } else {
          joke = {
            content: response.data.joke,
            type: 'single',
            category: response.data.category,
            id: response.data.id
          };
        }

        jokes.push(joke);

        // Small delay to avoid rate limiting
        if (i < count - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error(`Error fetching joke ${i + 1}:`, error.message);
      }
    }

    res.json({
      success: true,
      count: jokes.length,
      data: jokes
    });
  } catch (error) {
    console.error('Error fetching multiple jokes:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch multiple jokes',
      message: error.message
    });
  }
});

/**
 * GET /api/jokes/categories
 * Get available joke categories
 */
router.get('/categories', async (req, res) => {
  try {
    const categories = [
      'general',
      'knock-knock',
      'programming',
      'miscellaneous'
    ];

    res.json({
      success: true,
      categories: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
      message: error.message
    });
  }
});

module.exports = router;
