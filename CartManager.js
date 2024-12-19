let drinks = []; // array store drinks.

var itemsInCart = 0;
var totalPrice = 0;

let results = {};

let bs_card = "";

// need to create a manager so functions dont need to call other ones...

function updateCartDisplay(){
    

    console.log('drink array length:', drinks.length); // num of drink items in there... index starts from 0

    // let is an array.
    for(let i=0; i < drinks.length; i++){

        // DONT USE API! FETCH THE DATA FROM A DICT/ARRAY INSTEAD! i may change the data to store the results in a dict so only one API call is needed for the entirety.

        //${params.get('id')}. i need to get drinkID on button click.
        // I NEED TO GET MAIN TO PASS ID TO QS SO I CAN GET IT FOR MY CART!           
        //const API_URL= "https://api.spoonacular.com/recipes/complexSearch?recipeBoxID=${params.get('id')}&apiKey=&type=Drink";  // query needs fixing and hiding the API key.
        
        //price by ID:
        //const API_price = "https://api.spoonacular.com/recipes/{id}/priceBreakdownWidget.json";

        fetch(API_URL)
        .then(res => {

            if(res == 402){
                throw new Error("Sorry! Today's API has reached its point limit. Come back tomorrow to check on the website!"); 
            }
            
            else if (!res.ok) {
            throw new Error('Network response was not ok');
            // need to add a check for error type..
            }
            return res.json();
        })
        
        .then(data => {
            results = data.results; // Access 'results' array from returned API data.
            
            results.forEach(drink => {
                    //itemsInCart += 1; // Assignment to const variable error.

                    //document.getElementByID("cartItemNumber").textContent(itemsInCart);
                    //totalPrice += ${drink.price}; // need another query for that!

                    bs_card += `
                            <div class="col-auto">
                            <div class="card text-white bg-light">
                            <div class="card-body">
                                <img class="card-img-top" src="${drink.image}" alt="${drink.title}" />
                                <h5 class="card-title">${drink.title}</h2>
                                <p style="color:black">his drink still needs a price by ingredients!</p>
                                <a href="cart.html" onclick="removeFromCart(${drink.ID})" class="btn btn-img-primary"Remove from cart</href>
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

// function updateTotalPrice(){

//     document.getElementById("tbp").innerHTML = "Total ${totalPrice}";

// }


function addToCart(drinkID){
    
    // HIDE THE API KEY LATER!!!
    // GETS drink information.
    const API_URL = "https://api.spoonacular.com/recipes/756814/information/?&apiKey=";

    fetch(API_URL)
    .then(res => {
        if (!res.ok) {
        throw new Error('Network response was not ok');
        }
        return res.json(); // Can i store it somewhere??
    })

    .then(data => {
        
        console.log(data);
        
        // results = data.results; // THIS IS UNDEFINED!!
        //console.log('yarr:', results);

        drinks.push(data);

        document.getElementById("cartStatusID").innerHTML = "An item is in the cart.";
        document.getElementById("cart-inv-dis").innerHTML = data.title; 
        // title is null/undefined.... grrr
        console.log('Drinks:', data.id, data.title, data.image); // "drinks.title undefined". // only works if using "data" directly..

        drinks.forEach(drink => {
            //itemsInCart += 1; // Assignment to const variable error.

            //document.getElementByID("cartItemNumber").textContent(itemsInCart);
            //totalPrice += ${drink.price}; // need another query for that!

            bs_card += `
                    <div class="col-auto">
                    <div class="card text-white bg-light">
                    <div class="card-body">
                        <img class="card-img-top" src="${data.image}" alt="${drink.title}" />
                        <h5 class="card-title">${data.title}</h2>
                        <p style="color:black">This drink still needs a price by ingredients!</p>
                        <a href="cart.html" class="btn btn-img-primary"Remove from cart</href>
                        <button class="btn btn-white" onclick="increaseDrinkBy1(${drink.ID})">+</button>
                        <button class="btn btn-white" onclick="decreaseDrinkBy1(${drink.ID})">-</button>
                        </div>
                        </div>
                        `

                document.querySelector('#cartDisplaygrr').insertAdjacentHTML('beforeend', bs_card);
        });       
        })
    

    //console.log(updateCartDisplay()); // undefined error...
    //console.log("update called!");
    //updateTotalPrice();
}