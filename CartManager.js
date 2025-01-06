var itemsInCart = 0;
var totalPrice = 0;

let results = {};

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
    
    document.getElementById("cartStatusID").innerHTML = "Press 'Checkout' button to submit order!";
    

        // if(value.id > 1){
        //     value.amount = 1;
        // }

    Object.keys(localStorage).forEach(key =>{

                    const value = JSON.parse(localStorage.getItem(key)); // parse from where it is stored with stringify.

                    value.amount = 1;
                    value.drinkPrice = value.pricePerServing / value.servings;

                    //itemsInCart += 1;
                    totalPrice += value.drinkPrice;
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
                                    <button type="button" class="btn btn-danger" onclick="decreaseAmount(${value.id}) alt="Increase drink amount.">-</button>
                                    <button type="button" class="btn btn-info" onclick="increaseQuantity(${value.id})">+</button>
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
    console.log(value); // prints correctly.

    if(!value){
        console.log("no item found");
    }

    else{

        value.amount += 1;

        // Update totalprice (global).
        totalPrice += value.drinkPrice * value.amount;
        document.getElementById('tpb').innerHTML = 'Total: $' + totalPrice; 
    
        // update it in localstorage. stores all drink info as well as new value and price
        localStorage.setItem(id, JSON.stringify(value));
        
        // Use id tags to update bootstrap card.
        //  Used the curly single quotes instead of regular single quote for my string and variables.
        const amountElement = document.querySelector(`#amount-${id}`);
        const priceElement = document.querySelector(`#price-${id}`);

        amountElement.innerHTML = `Amount: ${value.amount}`;
        priceElement.innerHTML = `Price: ${value.drinkPrice}`;
    }

}

function decreaseAmount(id){
    
    console.log("rarrr");
    // // Find in ls where id.
    // drinkIndex.amount =- 1;
    // drinkIndex.drinkPrice -= drinkPrice;
    // // call update after.
    // loadCart();
}