const drinksHovered = []; // Store drink info.

function updateHoverInfo(id){
    
    const drinkID = id;

    // for(let i = 0; i < localStorage.getItem(`DrinksOnMainPage-${drinkID}`).length; i++){

    // }
    // if(drinksHovered.includes(drinkID)){


    
    
    if(drinksHovered.includes(drinkID)){
        
        console.log("burger");
        
        // Get info where id is stored.
        // drink = drinksHovered(id);
        drink.drinkInfo = `Vegan: ${drink.vegan}, Gluten: ${drink.glutenFree}, Dairy: ${drink.dairyFree}`;
        
        const infoElement = document.querySelector(`#drinkInfo-${drink.id}`);
        infoElement.innerHTML = drink.drinkInfo; 
        
        console.log(drinksHovered); // this is null when i first did it??.    
    }
    
    else{
        
        console.log("pickle");
        
        // Fetch drink info using API and display it. Only call if id has not been called before.
        
        // store localstorage from main.html instead of calling all the time!
                // const API_URL = `https://api.spoonacular.com/recipes/${drinkID}/information?apiKey=eb02b9f4564547709316d45bbd4bc718`;
            
            fetch(API_URL)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok'); // Fetch returns nothing due to no wifi connection
                }
                return res.json(); // returns entire OK response converted to json. no network error.
                
            })
            
            .then(data => {
                
                const drink = data;
                
                // Store drink info. (const[])
                drinksHovered.push(drink); // only storing if not already in there.
                console.log("the drink", drinksHovered);
                
                drink.drinkInfo = `Vegan: ${drink.vegan}, Gluten: ${drink.glutenFree}, Dairy: ${drink.dairyFree}`;
                
                localStorage.setItem(`DrinksOnMainPage-${drinkID}`, JSON.stringify(drinksHovered));
                console.log(localStorage.getItem('DrinksOnMain')); // Contains all drinks in array and their drinkInfos.
                
                const infoElement = document.querySelector(`#drinkInfo-${drink.id}`);
                infoElement.innerHTML = drink.drinkInfo; 
                
                // Save the drink info in the local.
                
            })
        
        
            .catch(error => {
                console.error('Error:', error);
            });
        }

    }
    
     
    
// Set innerHTML back to blank once mouse out.
function updateOutInfo(id){

    const infoElement = document.querySelector(`#drinkInfo-${id}`);
    infoElement.innerHTML = ""; // Set to blank. 

}