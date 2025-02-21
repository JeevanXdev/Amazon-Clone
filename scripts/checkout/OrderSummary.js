import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products , getProduct } from "../../data/products.js";
import { FormatCurrency } from "../utlis/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import deliveryOptionsData from '../../data/deliveryOption.js';  // Updated import to match the name
import { getdeliveryOption } from "../../data/deliveryOption.js";

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'));

export function renderOrderSummary () {

        let cartSummaryHtml = '';

        cart.forEach((cartItem) => {
        const productId = cartItem.productId;

       const matchingProduct = getProduct(productId);


        const deliveryOptionId = cartItem.deliveryOptionId;

        // Ensure that deliveryOptionsData is an array (e.g., fetched from elsewhere)
        let selectedDeliveryOption = getdeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(
            selectedDeliveryOption.deliveryDays, // Corrected to use the right property
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

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    
                    ${deliveryOptionHTML(matchingProduct , cartItem, selectedDeliveryOption)} 
                    
                </div>
            </div>
        </div>
        `;
        });

        function deliveryOptionHTML(matchingProduct , cartItem, selectedDeliveryOption) {
        let html = '';

        // Loop over all delivery options to render them
        deliveryOptionsData.forEach((option) => {
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

            const isCheck = option.id === selectedDeliveryOption.id; // Corrected to check against the selected option

            html += `
            <div class="delivery-option js-delivery-option" 
                data-product-id = "${matchingProduct.id}"
                data-delivery-option-id = "${option.id}">
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

        return html;
        }

        document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

        document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeFromCart(productId);
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.remove();
            });
        });

        document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const { productId, deliveryOptionId } = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary () ;
            });
        });
    }


