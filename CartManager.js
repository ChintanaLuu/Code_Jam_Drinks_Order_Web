var itemsInCart = 0;
var totalPrice = 0;

let results = {};

let bs_card = "";

//let storedDrinks = [];
// function updateTotalPrice(){
//     //var totalPrice += drink.cost;
//     document.getElementById("tbp").innerHTML = "Total ${totalPrice}";
    
// }

function loadCart(){
    
    console.log("CART LOADED!");
    document.getElementById("cartStatusID").innerHTML = "roar!";
    
            // add a drink desc LATER.
            // needs resizing and price fixing to calculate cost.
    
            Object.keys(localStorage).forEach(key =>{

                    const value = JSON.parse(localStorage.getItem(key)); // parse from where it is stored with stringify.

                    //itemsInCart += 1;
                    //totalPrice += ${drink.price};
                    bs_card += `
                    <div class="col-auto">
                    <div class="card text-black bg-light" style="width: 18rem;">
                    <div class="card-body">
                    <img class="card-img-top" src="${value.image}" alt="${value.title}" height="50px" width="50px"/>
                    <h5 class="card-title">${value.title}</h2>
                    <p style="color:black">$${value.pricePerServing / value.servings}</p>
                    <button class="btn btn-white" onclick="#">-</button>
                    <button class="btn btn-white" onclick="#">+</button>
                    </div>
                    </div>
                    `
            });
            
            // can only call this when on the cart page:
            document.querySelector('#cartDisplaygrr').insertAdjacentHTML('beforeend', bs_card);    
                
            };       
                
function addToCart(drinkID){
    
    // GETS drink information.

    const API_URL = `https://api.spoonacular.com/recipes/${drinkID}/information?apiKey=`;
    
    fetch(API_URL)
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    
    .then(data => {
        
        console.log(data); // prints the Object.


            const key = data.id; 
            localStorage.setItem(key, JSON.stringify(data)); // store in JSON

        //console.log('drinkstringify', localStorage);

    })}