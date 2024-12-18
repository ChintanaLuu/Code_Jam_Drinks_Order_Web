// Hide API key in environment.
// import 'dotenv/config'
// require('dotenv').config();
// console.log(process.env.HIDDEN_API_KEY);

function callSpoonacularAPI(){

    // get drink recipes.
    const API_URL= "https://api.spoonacular.com/recipes/complexSearch?apiKey=HIDDEN_API_KEY&type=Drink"
    //const API_URL= "https://api.spoonacular.com/recipes/complexSearch?apiKey=&type=Drink"

    fetch(API_URL)
    .then(res => {
    if (!res.ok) {
    throw new Error('Network response was not ok'); // Fetch returns nothing due to no wifi connection
    }
    return res.json(); // returns entire OK response converted to json. no network error.
    })

    .then(data => {
    console.log(data);

    const results = data.results; // Access 'results' array from returned API data.
    results.forEach(drink => {

    const drinkHTML = `
    <div class="col-auto">
    <div class="card text-black bg-light"
    <div class="card-body">
        <img class="card-img-top" src="${drink.image}" alt="${drink.title} height="50px" width="50px" />
        <h5 class="card-title">${drink.title}</h2>
        <button id="AB" onclick="addToCart(${drink.id})" alt="Add drink to cart.">Add to Cart</button>
        <button href="#" alt="View drink information.">View info</button>
        </div>
        </div>
        `;
        document.querySelector('#cell').insertAdjacentHTML('beforeend', drinkHTML);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });


    return results;
}





