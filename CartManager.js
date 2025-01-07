var itemsInCart = 0;
var totalPrice = 0;
var roundedTotalPrice = 0; // rounds total price to two decimals.

const fromDb = undefined;
const arr = fromDb || []; // Track bs_cards added by drink ID. Prevent

let bs_card = "";

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
        // To store something in localStorage, a KVP must be used.
        // CHECK if that key is ALREADY in localstorage. SINCE keys can override each other.
        if(key in localStorage){
            
            value = JSON.parse(localStorage.getItem(key));
            console.log("value", value);
            value.amount += 1;
            localStorage.setItem(key, JSON.stringify(value));

            // define variable to track drink price...
            // value.totalDupeDrinkPrice = value.drinkPrice + value.drinkPrice;
            
            // print amount of duplicate drink
            console.log(value.title, ":", value.amount);
        }

        else{

            // Init drink with amount and price.
            data.amount = 1;
            data.drinkPrice = data.pricePerServing / data.servings;
            localStorage.setItem(key, JSON.stringify(data))
        }
        
        
        // console.log('drinkstringify', localStorage); // indexes from 1.
        
    })
}



// needs price fixing to calculate cost.

function loadCart(){
    
    // This is not properly displayed in view of the page:
    // document.getElementById("cartStatusID").innerHTML = "Press 'Checkout' button to submit order!";

    Object.keys(localStorage).forEach(key =>{

                    const value = JSON.parse(localStorage.getItem(key)); // parse from where it is stored with stringify.


                    // CHECK THAT MULTIPLE CARDS FOR SAME DRINK DO NOT EXIST.
                    // HAVE TO DO IT UP THERE BECAUSE IT PREVENTS FROM ADDING ANOTHER OF THE SAME UP THERE!!
                    if(arr.includes(value.id)){
                        console.log(value.title, "already in");
                        console.log(arr);
                    }
                    else{
                        
                        arr.push(key);
                        console.log("just added in", value.title);
                        console.log(arr);
                        
                        // Define drinkPrice...
                        value.drinkPrice = value.pricePerServing / value.servings; //totalDupeDrinkPrice...
                        // let roundedDrinkPrice = value.drinkPrice.toFixed(2);
                        // need to implement this... add a cart limit:
                        //itemsInCart += 1;
                        
                        totalPrice += value.drinkPrice; // NEED TO ADD A TWO DECIMAL CUT/ROUND OFF.
                        roundedTotalPrice = totalPrice.toFixed(2);
                        // NEED TO MAKE IT ALIGN LEFT.
                        bs_card += `
                        <div class="row">
                        <div class="col-4" id="${value.id}">
                            <div class=" card h-[calc(100%+1rem)] text-black bg-light">
                            <div class="card-body">
                            <img class="card-img-top" src="${value.image}" alt="${value.title}"/>
                            <h5 class="card-title">${value.title}</h2>
                            <!--Use id for querySelector.-->
                            <p id="price-${value.id}" style="color:black">$${value.drinkPrice}</p>
                            <p id="amount-${value.id}">Amount: ${value.amount}</p>
                            <button type="button" class="btn btn-danger" onclick="decreaseAmount(${value.id})" alt="Decrease drink amount.">-</button>
                            <button type="button" class="btn btn-info" onclick="increaseQuantity(${value.id})" alt="Increase drink amount.">+</button>
                            </div>
                            </div>
                            </div>
                            </div>
                            `
                    }


            });
            
            document.querySelector('#cartDisplaygrr').insertAdjacentHTML('beforeend', bs_card);
            document.getElementById('tpb').innerHTML = 'Total: $' + roundedTotalPrice;
            
            //
                
}       
                
function increaseQuantity(id){

    // get value with id as key.
    const value = JSON.parse(localStorage.getItem(id));
    console.log(value); // prints correctly.

    if(!value){
        console.log("no item found");
    }

    else{

        value.amount += 1;

        // Update total cost for that specific drink. There can be more than one of same drink item.
        totalDupeDrinkPrice = value.drinkPrice += value.drinkPrice;

        // update it in localstorage. stores all drink info as well as new value and price
        localStorage.setItem(id, JSON.stringify(value));
        
        // Use id tags to update bootstrap card.
        //  Used a backtick instead of regular single quote for my string and variables.
        const amountElement = document.querySelector(`#amount-${id}`);
        const priceElement = document.querySelector(`#price-${id}`);
        
        amountElement.innerHTML = `Amount: ${value.amount}`;
        priceElement.innerHTML = `$${totalDupeDrinkPrice}`;
        
        // Update totalprice (global).
        totalPrice += value.drinkPrice * value.amount;
        roundedTotalPrice = totalPrice.toFixed(2);
        document.getElementById('tpb').innerHTML = 'Total: $' + roundedTotalPrice; 
    }

}



// THIS DOESN'T WORK FOR NOW:
function decreaseAmount(id){
    
    // get value with id as key.
    const value = JSON.parse(localStorage.getItem(id));
    console.log(value); // prints correctly.

    if(!value){
        console.log("no item found");
    }

    else{

        // Remove before checking.
        value.amount -= 1;
        if(value.amount <= 1){

            // remove card completely.
            localStorage.removeItem(id);
            // Using loadCart re-adds all the cards that ALREADY EXIST in loadCart().
            loadCart();
        }


        // THIS not working... now..?..:

        // Update amount and combined price of that specific drink (id).
        value.drinkPrice -= drinkPrice * value.amount;

        // update it in localstorage. stores all drink info as well as new value and price
        localStorage.setItem(id, JSON.stringify(value));
        
        // Use id tags to update bootstrap card.
        const amountElement = document.querySelector(`#amount-${id}`);
        const priceElement = document.querySelector(`#price-${id}`);

        amountElement.innerHTML = `Amount: ${value.amount}`;
        priceElement.innerHTML = `Price: ${value.drinkPrice}`;

        // Update totalprice (global).
        totalPrice -= value.drinkPrice * value.amount;
        roundedTotalPrice = totalPrice.toFixed(2);
        document.getElementById('tpb').innerHTML = 'Total: $' + roundedTotalPrice; 
    }
}