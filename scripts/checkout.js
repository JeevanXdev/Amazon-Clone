import { cart ,removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { FormatCurrency } from "./utlis/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOption} from '../data/deliveryOption.js';

const today = dayjs();
const deliveryDate = today.add (7 , 'days');
console.log(deliveryDate.format('dddd, MMMM D'));

let cartSummaryHtml = '';

cart.forEach((cartItem) => {

    const productId = cartItem.productId ;

    let matchingProduct ;

    products.forEach ((product) => {
        if(product.id === productId)
        {
            matchingProduct = product ;
        }
    });


cartSummaryHtml += `
<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
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
            
            ${deliveryOptionHTML (matchingProduct)}
            
            </div>
        </div>
        </div>
        
` 
});

function deliveryOptionHTML (matchingProduct) {
    let html = '';
    deliveryOption.forEach (() => {
        const today = dayjs();
        const deliveryDate = today.add (
            deliveryOption.deliveryDays,
            'days'
        );
        const dataString = deliveryDate.format (
            'dddd, MMMM D'
        );

        const priceString = deliveryOption.priceCents === 0
        ? 'Free' : `$${FormatCurrency(deliveryOption.priceCents)} - `;
        html +=
        `
         <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dataString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>
        `
    });

    return html; 
}

document.querySelector('.js-order-summary') 
    .innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click' , () => {
        const productId = link.dataset.productId ;
          removeFromCart(productId) ;
          
          const container = document.querySelector(`.js-cart-item-container-${productId}`);
            
          container.remove();
        });
    });