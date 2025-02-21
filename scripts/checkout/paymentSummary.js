import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getdeliveryOption } from "../../data/deliveryOption.js";
import FormatCurrency from "../utlis/money.js";

export function renderPaymentSummary () {
    let productPriceCents = 0;
    let shippingPriceCents = 0;  // Declare and initialize shippingPriceCents

    cart.forEach((cartItem) => {
       const product = getProduct(cartItem.productId);
       productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getdeliveryOption(cartItem.deliveryOptionId);  // Fix the typo in "deliveryOptionId"
        shippingPriceCents += deliveryOption.priceCents;
    });   

    const totalBeforeTax = productPriceCents + shippingPriceCents ;
    const taxCents = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxCents;

    const paymentSummaryHtml = `
        <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (3):</div>
                <div class="payment-summary-money">$${FormatCurrency(productPriceCents)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${FormatCurrency(shippingPriceCents)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${FormatCurrency(totalBeforeTax)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${FormatCurrency(taxCents)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${FormatCurrency(totalCents)}</div>
            </div>

            <button class="place-order-button button-primary">
                Place your order
            </button>
    `; 

    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHtml;
}
