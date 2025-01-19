const express = require('express');
const app = express();
const port = 3000;

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Sample recipe data
const recipe = {
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
};

// Route for the single page
app.get('/', (req, res) => {
  res.render('index', { recipe: recipe });
});

// Start the server
app.listen(port, () => {
  console.log(`Recipe app listening at http://localhost:${port}`);
});

