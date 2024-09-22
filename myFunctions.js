function addToCart(drinkID){
    // Request drinkID from URL.

    //var drinkID = Request.QueryString["id"];
    
    const addedDrinkData = drinkID;

    // Make another API request using specific ID.

    //const API_URL= 
    // Process the results. Render info for each drink.

    fetch(API_URL)
    .then(res => {
        if (!res.ok) {
        throw new Error('Network response was not ok'); // Fetch returns nothing due to no wifi connection
        }
        return res.json(); // returns entire OK response converted to json. no network error.
    })
    //
    .then(data => {
        const results = data.results; // Access 'results' array from returned API data.
        
    results.forEach(drink => {
            const cartDrinksHTML = `
            <div class="col-auto">
            <div class="card text-white bg-light"
            <div class="card-body">
                <img class="card-img-top" src="${drink.image}" alt="${drink.title}" />
                <h5 class="card-title">${drink.title}</h2>
                <p>his drink still needs a price by ingredients!</p>
                <a href="cart.html" onclick="removeFromCart(${drink.ID})" class="btn btn-img-primary"Remove from cart</a>
                <button class="btn btn-white" onclick="increaseDrinkBy1(${drink.ID})">+</button>
                <button class="btn btn-white" onclick="decreaseDrinkBy1(${drink.ID})">-</button>
                </div>
                </div>
                `;
                document.querySelector('#cartDisplaygrr').insertAdjacentHTML('beforeend', cartDrinksHTML);
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });


    itemsInCart += 1;
    document.getElementByID("cartItemNumber")
  }

