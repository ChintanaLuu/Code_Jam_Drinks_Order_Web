let drinks = {}; // store drinks.

var itemsInCart = 0;
var totalPrice = 0;

let results = {};

function updateCartDisplay(){
    
    let drinksLen = drinks.length;
    let bs_card = "";
    


    for(let i=0; i < drinksLen; i++){


     
        //const API_URL= "https://api.spoonacular.com/recipes/complexSearch?recipeBoxID=${params.get('id')}&apiKey=&type=Drink";  
        
        //price by ID:
        //const API_price = "https://api.spoonacular.com/recipes/{id}/priceBreakdownWidget.json";

        fetch(API_URL) // API_url NOT DEFINED!!!
        .then(res => {
            if (!res.ok) {
            throw new Error('Network response was not ok');
            // need to add a check for error type..
            }
            return res.json();
        })
        //
        .then(data => {
            results = data.results; // Access 'results' array from returned API data.
            

            results.forEach(drink => {
                    itemsInCart += 1; // Assignment to const variable error.

                    document.getElementByID("cartItemNumber").textContent(itemsInCart);
                    //totalPrice += ${drink.price}; // need another query for that!

                    bs_card += `
                            <div class="col-auto">
                            <div class="card text-white bg-light"
                            <div class="card-body">
                                <img class="card-img-top" src="${drink.image}" alt="${drink.title}" />
                                <h5 class="card-title">${drink.title}</h2>
                                <p style="color:black">his drink still needs a price by ingredients!</p>
                                <a href="cart.html" onclick="removeFromCart(${drink.ID})" class="btn btn-img-primary"Remove from cart</a>
                                <button class="btn btn-white" onclick="increaseDrinkBy1(${drink.ID})">+</button>
                                <button class="btn btn-white" onclick="decreaseDrinkBy1(${drink.ID})">-</button>
                                </div>
                                </div>
                                `

                        document.querySelector('#cartDisplaygrr').insertAdjacentHTML('beforeend', bs_card);
                });
                })
            .catch(error => {
            console.error('Error:', error);
            });
        
    //var totalPrice += $({drink.cost});
}
}


function addToCart(drinkID){
    
    // HIDE THE API KEY LATER!!!
    // GETS drink information.
    const API_URL = "https://api.spoonacular.com/recipes/756814/information/?&apiKey=";

    fetch(API_URL)
    .then(res => {
        if (!res.ok) {
        throw new Error('Network response was not ok');
        }
        return res.json();
    })

    .then(data => {
        // ass to const var
        results = data.results; // Access 'results' array from returned API data.

        drinks.push(drink); // drink is not defined...

        // only adds one drink at a time!!
        // results.forEach(drink =>{ // cannot read for does not exist
        })

    // need to get results where drinkID
    // results.get(drinkID) -- from main.html/api.js
    
    document.getElementById("cartStatusID").innerHTML = "An item is in the cart.";
    console.log('Drinks:', drinks.title); // print dict

    updateCartDisplay();
    
    // user should not be able to add more UNIQUE drinks to cart than drinks displayed! (11 rn (indexing from 0))
    
        // Array(10)
        // 0
        // : 
        // {id: 756814, title: 'Powerhouse Almond Matcha Superfood Smoothie', image: 'https://img.spoonacular.com/recipes/756814-312x231.jpg', imageType: 'jpg'}
}