const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Sample recipe data
const recipes = [
  {
    name: "Chocolate Chip Cookies",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 teaspoon baking soda",
      "1 teaspoon salt",
      "1 cup unsalted butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup packed brown sugar",
      "2 large eggs",
      "2 teaspoons vanilla extract",
      "2 cups semisweet chocolate chips"
    ],
    instructions: [
      "Preheat the oven to 375°F (190°C).",
      "In a bowl, mix flour, baking soda, and salt.",
      "In another bowl, cream together butter, granulated sugar, and brown sugar.",
      "Beat in eggs and vanilla to the butter mixture.",
      "Gradually stir the flour mixture into the butter mixture.",
      "Fold in chocolate chips.",
      "Drop spoonfuls of dough onto ungreased baking sheets.",
      "Bake for 9 to 11 minutes or until golden brown.",
      "Let cool on baking sheet for 2 minutes, then transfer to wire racks."
    ]
  }
];

// Route for the single page
app.get('/', (req, res) => {
  res.render('index', { recipes: recipes });
});

// Route to display the form to add a new recipe
app.get('/add-recipe', (req, res) => {
  res.render('add-recipe');
});

// Route to display a single recipe
app.get('/recipe/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < recipes.length) {
    const recipe = recipes[index];
    res.render('recipe', { recipe: recipe, index: index });
  } else {
    res.status(404).send('Recipe not found');
  }
});

// Route to handle the form submission and add a new recipe
app.post('/add-recipe', (req, res) => {
  const { name, ingredients, instructions } = req.body;

  if (!name || !ingredients || !instructions) {
    return res.status(400)
      .send('Name, ingredients, and instructions are required.');
  }

  const newRecipe = {
    name: name.toUpperCase(),
    ingredients: ingredients.split('\n').map(capitaliseSentence),
    instructions: instructions.split('\n').map(capitaliseSentence)
  };

  recipes.push(newRecipe);
  res.redirect('/');
});

// Route to handle the form submission and remove a recipe
app.post('/remove-recipe', (req, res) => {
  const index = parseInt(req.body.index, 10);
  if (index >= 0 && index < recipes.length) {
    recipes.splice(index, 1);
    res.redirect('/');
  } else {
    res.status(400).send('Invalid recipe index');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Recipe app listening at http://localhost:${port}`);
});

function capitaliseSentence (sentence) {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};