function updateHoverInfo(id){

    console.log("hello hello hello hello");

    const drinkID = id;

    // Fetch drink info using API and display it.

    const API_URL = `https://api.spoonacular.com/recipes/${drinkID}/information?apiKey=`;

    fetch(API_URL)
    .then(res => {
    if (!res.ok) {
        throw new Error('Network response was not ok'); // Fetch returns nothing due to no wifi connection
    }
    return res.json(); // returns entire OK response converted to json. no network error.

    })

    .then(data => {

        const drink = data;
        console.log("the drink", drink);

        drink.drinkInfo = `Vegan: ${drink.vegan}, Gluten: ${drink.glutenFree}, Dairy: ${drink.dairyFree}`;

        const infoElement = document.querySelector(`#drinkInfo-${drink.id}`);
        infoElement.innerHTML = drink.drinkInfo; 

    })


    .catch(error => {
        console.error('Error:', error);
    });
    
}