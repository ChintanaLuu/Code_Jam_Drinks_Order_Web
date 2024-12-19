let drinks = []; // array store drinks.

var itemsInCart = 0;
var totalPrice = 0;

let results = {};

let bs_card = "";

function loadCart(){
    
    drinks.forEach(drink => {
        
        //itemsInCart += 1; // Assignment to const variable error.
        //document.getElementByID("cartItemNumber").textContent(itemsInCart);
        //totalPrice += ${drink.price}; // need another query for that!
        
        
        // data is not defined. use drink var instead.
        // this drink is really expensive for some reason. may be multiple drinks in one serving?? or ingredient costs?
        bs_card += `
        <div class="col-auto">
        <div class="card text-white bg-light">
        <div class="card-body">
        <img class="card-img-top" src="${drink.image}" alt="${drink.title}" />
        <h5 class="card-title">${drink.title}</h2>
        <p style="color:black">$${drink.pricePerServing / drink.servings}</p>
        <button class="btn btn-white" onclick="increaseDrinkBy1(${drink.id})">+</button>
        <button class="btn btn-white" onclick="decreaseDrinkBy1(${drink.ID})">-</button>
        </div>
        </div>
        `
        
        document.querySelector('#cartDisplaygrr').insertAdjacentHTML('beforeend', bs_card);
    });       
    
}

function updateTotalPrice(){
    
    //var totalPrice += drink.cost;
    document.getElementById("tbp").innerHTML = "Total ${totalPrice}";
    
}


function addToCart(drinkID){
    
    
    // GETS drink information.

    const API_URL = `https://api.spoonacular.com/recipes/${drinkID}/information?apiKey=eb02b9f4564547709316d45bbd4bc718`;
    
    fetch(API_URL)
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    
    .then(data => {
        
        //console.log(data);        
        drinks.push(data);

        console.log("i walk a lonely road, the only one that i have ever known", window.localStorage = drinks);
        
        // cannot set properties of null because it isnt going to cart page now.
        //document.getElementById("cartStatusID").innerHTML = "An item is in the cart.";
        //document.getElementById("cart-inv-dis").innerHTML = data.title; //displays name of drink in cart.
        
        //loadCart();
    })}
    
    
    // results = data.results; // THIS IS UNDEFINED!!
    //console.log('yarr:', results);
    //console.log('Drinks:', data.id, data.title, data.image)
    
    // drinks.forEach(drink => {
        
        //     //itemsInCart += 1; // Assignment to const variable error.
        //     //document.getElementByID("cartItemNumber").textContent(itemsInCart);
        //     //totalPrice += ${drink.price}; // need another query for that!
        
        //     bs_card += `
        //             <div class="col-auto">
        //             <div class="card text-white bg-light">
        //             <div class="card-body">
        //                 <img class="card-img-top" src="${data.image}" alt="${drink.title}" />
        //                 <h5 class="card-title">${data.title}</h2>
        //                 <p style="color:black">$${totalPrice}</p>
        //                 <button class="btn btn-white" onclick="increaseDrinkBy1(${drink.id})">+</button>
        //                 <button class="btn btn-white" onclick="decreaseDrinkBy1(${drink.id})">-</button>
        //                 </div>
        //                 </div>
        //                 `
        
        //         document.querySelector('#cartDisplaygrr').insertAdjacentHTML('beforeend', bs_card);
        // });       
        // })
        
        
        
        //console.log(updateCartDisplay()); // undefined error...
        //console.log("update called!");
        //updateTotalPrice();
        
        //import { initDrinkItem } from 'CartEngine.js'; // cannot use import statement outside a module