// Create a drink class so i can use 'this'.


// put this in manager import from engine file...
export function initDrinkItem(drinkID){
    var testdefineditem = {id: drinkID}; // needs to retrieve the ID.
    // let data type
    this.item = {testdefineditem} // needs unique name for each?
    
    // Instead I will make addToCart call this.
    //addToCart(rr);            
} 