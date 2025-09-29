// Load recipes from localStorage
let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

// Elements
const recipeForm = document.getElementById("recipeForm");
const recipeList = document.getElementById("recipeList");
const searchInput = document.getElementById("search");

// Function to display all recipes
function displayRecipes(filteredRecipes = recipes) {
  recipeList.innerHTML = "";

  if (filteredRecipes.length === 0) {
    recipeList.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  filteredRecipes.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.innerHTML = `
      <h3>${recipe.name}</h3>
      <img src="${recipe.image}" alt="${recipe.name}">
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <button class="view-btn">View</button>
      <button class="delete-btn">Delete</button>
    `;
    card.querySelector(".delete-btn").addEventListener("click", () => {
      if (confirm(`Are you sure you want to delete "${recipe.name}"?`)) {
        recipes.splice(index, 1); // remove recipe
        localStorage.setItem("recipes", JSON.stringify(recipes)); // update storage
        displayRecipes(); // refresh list
      }
    });

    recipeList.appendChild(card);
  });
}
    

// Add Recipe
recipeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const ingredients = document.getElementById("ingredients").value.trim();
  const steps = document.getElementById("steps").value.trim();
  const imageInput = document.getElementById("image").files[0];

  if (!name || !ingredients || !steps || !imageInput) {
    alert("Please fill out all fields!");
    return;
  }

  
  const reader = new FileReader();
  reader.onload = function(e) {
    const newRecipe = {
      name,
      ingredients,
      steps,
      image: e.target.result
    };

    recipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    displayRecipes();

    recipeForm.reset();
  };

  reader.readAsDataURL(imageInput);
});

// Search Recipes
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = recipes.filter(r => 
    r.name.toLowerCase().includes(query) || 
    r.ingredients.toLowerCase().includes(query)
  );
  displayRecipes(filtered);
});

// Initial Display
displayRecipes();
