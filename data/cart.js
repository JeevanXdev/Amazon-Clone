export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart){
    cart = [{
        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6' , 
        quantity : 2 ,
        deliveryOptionId : '1'
    } , 
    
    {
        productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d' ,
        quantity : 1 , 
        deliveryOptionId : '2'
    }]; 
}


export function saveToStorage() {
    localStorage.setItem ('cart' , JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem = null;

    // Find the matching item in the cart
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    // If the item exists in the cart, increment the quantity; otherwise, add it to the cart
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }

    console.log('Cart after update:', cart); // Debugging log

    // Save to storage
    saveToStorage();
}


   export function removeFromCart (productId) {
        const newCart = []; 

        cart.forEach ((cartItem) => {
            if(cartItem.productId !== productId)
            {
                newCart.push(cartItem);
            }
        });

        cart = newCart ;

        saveToStorage();
    }