var itemsInCart = 0;

var roundedDrinkPrice = 0;

var totalPrice = 0;
var roundedTotalPrice = 0; // rounds total price to two decimals.

let bs_card = "";

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
        
        console.log(data); // prints the Object.
        
        const key = data.id; 
        // To store something in localStorage, a KVP must be used.
        // CHECK if that key is ALREADY in localstorage. SINCE keys can override each other.
        if(key in localStorage){
            
            value = JSON.parse(localStorage.getItem(key));
            console.log("value", value);
            value.amount += 1;

            // define variable to track drink price...
            value.roundedDrinkPrice = value.drinkPrice.toFixed(2);
            value.totalDupeDrinkPrice = value.roundedDrinkPrice * value.amount;
            localStorage.setItem(key, JSON.stringify(value));


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
        
                        // Define drinkPrice.
                        value.drinkPrice = value.pricePerServing / value.servings;
                        value.roundedDrinkPrice = value.drinkPrice.toFixed(2);
                        localStorage.setItem(key, JSON.stringify(value));
                        
                        itemsInCart += 1;
                        
                        totalPrice += value.roundedDrinkPrice;
                        // value.roundedTotalPrice = valuetotalPrice.toFixed(2); //.toFixed() not a function.

                        // NEED TO MAKE IT ALIGN LEFT.
                        bs_card += `
                        <div class="row" id="card-${value.id}">
                        <div class="col-4">
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


            });
            
            document.querySelector('#cartDisplaygrr').insertAdjacentHTML('beforeend', bs_card);
            document.getElementById('tpb').innerHTML = 'Total: $' + totalPrice;
                
}       
                
function increaseQuantity(id){

    // get value with id as key.
    const value = JSON.parse(localStorage.getItem(id));

    if(!value){
        console.log("no item found");
    }

    else{

        itemsInCart++;
        value.amount += 1;

        // Update total cost for that specific drink. There can be more than one of same drink item.
        totalDupeDrinkPrice = value.roundedDrinkPrice * value.amount;

        // update it in localstorage. stores all drink info as well as new value and price.
        localStorage.setItem(id, JSON.stringify(value));
        
        // Update bootstrap card.
        const amountElement = document.querySelector(`#amount-${id}`);
        amountElement.innerHTML = `Amount: ${value.amount}`;

        const priceElement = document.querySelector(`#price-${id}`);
        priceElement.innerHTML = `$${totalDupeDrinkPrice}`;
        
        // Update totalprice (global).
        totalPrice += value.roundedDrinkPrice * value.amount;
        // value.roundedTotalPrice = totalPrice.toFixed(2); //
        document.getElementById('tpb').innerHTML = 'Total: $' + totalPrice; 
    }

}



function decreaseAmount(id){
    
    // get value with id as key.
    const value = JSON.parse(localStorage.getItem(id));

    if(!value){
        console.log("no item found");
    }

    else{

        itemsInCart--;
        // Remove before checking.
        value.amount -= 1;

        if(value.amount < 1){
            // remove from localStorage.
            localStorage.removeItem(id);
            console.log("Item removed!");
            // Delete the specific card where id.
            const drinkBsCard = document.querySelector(`#card-${id}`);
            if(drinkBsCard){
                drinkBsCard.remove();
            }

        
        }

        // Update combined price of that specific drink id.
        totalDupeDrinkPrice = value.drinkPrice * value.amount;
        
        // update it in localstorage. stores all drink info as well as new amount and price
        localStorage.setItem(id, JSON.stringify(value));

        // update bootstrap card.
        const amountElement = document.querySelector(`#amount-${id}`);
        amountElement.innerHTML = `Amount: ${value.amount}`;
        const priceElement = document.querySelector(`#price-${id}`);
        priceElement.innerHTML = `$${totalDupeDrinkPrice.toFixed(2)}`;
        
        // Update totalprice (global).
        totalPrice -= value.roundedDrinkPrice * value.amount;
        document.getElementById('tpb').innerHTML = 'Total: $' + totalPrice; 
    }
}