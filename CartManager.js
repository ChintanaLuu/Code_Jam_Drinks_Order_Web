var itemsInCart = 0;
var totalPrice = 0;

let results = {};

let bs_card = "";

//let storedDrinks = [];
// function updateTotalPrice(){
//     //var totalPrice += drink.cost;
//     document.getElementById("tbp").innerHTML = "Total ${totalPrice}";
    
// }


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

    })
}

function loadCart(){
    
    document.getElementById("cartStatusID").innerHTML = "Press 'Checkout' button to submit order!";
    
            // add a drink desc LATER.
            // needs resizing and price fixing to calculate cost.
    
            Object.keys(localStorage).forEach(key =>{

                    const value = JSON.parse(localStorage.getItem(key)); // parse from where it is stored with stringify.

                    var amount = 1;
                    var drinkPrice = value.pricePerServing / value.servings
                    //itemsInCart += 1;
                    //totalPrice += ${drink.price};
                    bs_card += `
                    <div class="col-auto" id="${value.id}">
                    <div class="card text-black bg-light">
                    <div class="card-body">
                    <img class="card-img-top" src="${value.image}" alt="${value.title}" height="100px" width="100px"/>
                    <h5 class="card-title">${value.title}</h2>
                    <p style="color:black">$${drinkPrice}</p>
                    <p>Amount: ${amount}</p>
                    <button type="button" class="btn btn-danger" onclick="increaseAmount(amount, drinkPrice)" alt="Increase drink amount.">-</button>
                    <button type="button" class="btn btn-info" onclick="decreaseAmount()">+</button>
                    </div>
                    </div>
                    `


            });
            
            // can only call this when on the cart page:
            document.querySelector('#cartDisplaygrr').insertAdjacentHTML('beforeend', bs_card);    
                
}       
                
function increaseAmount(amount, drinkPrice){

    // get the specific drink html......
    // value.id
    amount+= 1;
    drinkPrice += drinkPrice;
    //
    loadCart();
}

function decreaseAmount(){
    
}