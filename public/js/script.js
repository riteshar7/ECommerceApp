// Basic functionality for adding to cart (just for demonstration)
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
        alert("Product added to cart!");
    });
});

var myHeaders =  new Headers()

/**you need to get the token and put it in myToken var.
   Where to store the token is the real question, you need
   to take care about the storage you choose beacause of
   the security risks*/

myHeaders.append('Content-Type','application/json; charset=utf-8');
myHeaders.append('Authorization', 'Bearer ' + myToken);

fetch( '/myurl', {
    credentials: 'include',
    headers: myHeaders,
    method: 'GET'
}).then( res => {

    return res.json();

}).then( res => {

    /**your stuff*/
    
});