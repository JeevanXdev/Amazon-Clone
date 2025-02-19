import { cart ,removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { FormatCurrency } from "./utlis/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import deliveryOption from '../data/deliveryOption.js'

const today = dayjs();
const deliveryDate = today.add (7 , 'days');
console.log(deliveryDate.format('dddd, MMMM D'));

let cartSummaryHtml = '';

let matchingProduct= products.find((product) => product.id === cart[0].productId);

cart.forEach((cartItem) => {

    const productId = cartItem.productId ;

    let matchingProduct ;

    products.forEach ((product) => {
        if(product.id === productId)
        {
            matchingProduct = product ;
        }
    });

   
    const deliveryOptionId = cartItem.deliveryOptionId;

// Ensure that deliveryOption is an array (for example, fetched from elsewhere)
let deliveryOptions = [];  // Initialize with an empty array if no options are found

// Assuming 'options' is an array of delivery options you want to loop over
deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
        deliveryOption = option;  // Now deliveryOption will hold the selected option
    }
});

if (!deliveryOption) {
    console.error('No matching delivery option found.');
    return;
}

const today = dayjs();
const deliveryDate = today.add(
    deliveryOption.deliveryDays, // Corrected to use the right property
    'days'
);
const dateString = deliveryDate.format('dddd, MMMM D');


cartSummaryHtml += `
<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${FormatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options ">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            
            ${deliveryOptionHTML(matchingProduct , cartItem)}
            
            </div>
        </div>
        </div>
        
` 
});

function deliveryOptionHTML(matchingProduct , cartItem) {
    let html = '';
    deliveryOption.forEach((option) => {
        const today = dayjs();
        const deliveryDate = today.add(
            option.deliveryDays, // ✅ Corrected property access
            'days'
        );
        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        );

        // Ensure priceCents is a valid number
        const priceInDollars = option.priceCents ? (option.priceCents / 100).toFixed(2) : '0.00';
        const priceString = option.priceCents === 0
            ? 'Free' 
            : `$${priceInDollars} - `; // ✅ Corrected formatting

            const isCheck = deliveryOption.id === cartItem.deliveryOptionId; // Ensure type consistency

            console.log('Checking if option is selected:', deliveryOption.id, cartItem.deliveryOptionId, isCheck); // Debugging
            
            html += `
                <div class="delivery-option">
                    <input type="radio"
                        ${isCheck ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>
            `;
    });
            console.log('Generated HTML:', html); // Debugging
            return html;
            
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click' , () => {
        const productId = link.dataset.productId ;
          removeFromCart(productId) ;
          
          const container = document.querySelector(`.js-cart-item-container-${productId}`);
            
          container.remove();
        });
    });