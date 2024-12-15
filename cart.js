function addToCart(){
    

document.getElementById("BMTL!!!").innerHTML = "UPDATE LE HTML!";
console.log("hello! function called!");

}


//     // Request drinkID from URL.
    
//     const API_URL= "https://api.spoonacular.com/recipes/complexSearch?apiKey=HIDDEN_API_KEY&type=Drink" //add drinkID
//     fetch(API_URL, drinkID);
    
//     //var totalPrice += $({drink.cost});
//     // Cart limit is 10 drinks.
//     // Get all add to cart buttons on main html page.

//     var addCartItemButtons = document.getElementsById('AB')


//     for (var i=0; i < addCartItemButtons.length; i++){

//         var button = addCartItemButtons[i]
//         button.addEventListener('click', function(event)){
//         }
//         updateCartTotal()
//     }

// function updateCartTotal(){

    

    
//     fetch(API_URL)
//     .then(res => {
//         if (!res.ok) {
//         throw new Error('Network response was not ok');
//         }
//         return res.json();
//     })

//     itemsInCart += 1;
//     document.getElementByID("cartItemNumber") // update this...
//   }


// function removeFromCart(drinkID){

//     let drinkCart = [];
    
//     drinkCart.forEach(i=0, i < DrinkCart)

// }

// function displayCart(){

//     fetch(API_URL)
//     .then(res => {
//         if (!res.ok) {
//         throw new Error('Network response was not ok'); // Fetch returns nothing due to no wifi connection
//         }
//         return res.json(); // returns entire OK response converted to json. no network error.
//     })
    

//     .then(data => {
//         const results = data.results; // Access 'results' array from returned API data.
        
//     results.forEach(drink => {
//             const cartDrinksHTML = `
//             <div class="col-auto">
//             <div class="card text-white bg-light"
//             <div class="card-body">
//                 <img class="card-img-top" src="${drink.image}" alt="${drink.title}" />
//                 <h5 class="card-title">${drink.title}</h2>
//                 <p>his drink still needs a price by ingredients!</p>
//                 <a href="cart.html" onclick="removeFromCart(${drink.ID})" class="btn btn-img-primary"Remove from cart</a>
//                 <button class="btn btn-white" onclick="increaseDrinkBy1(${drink.ID})">+</button>
//                 <button class="btn btn-white" onclick="decreaseDrinkBy1(${drink.ID})">-</button>
//                 </div>
//                 </div>
//                 `;
//                 document.querySelector('#cartDisplaygrr').insertAdjacentHTML('beforeend', cartDrinksHTML);
//           });
//         })
//         .catch(error => {
//           console.error('Error:', error);
//         });

// };