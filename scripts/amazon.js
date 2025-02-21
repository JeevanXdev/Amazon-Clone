import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { FormatCurrency } from "./utlis/money.js";

// ✅ Load cart from localStorage when page loads
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cart");

  if (storedCart) {
    // ✅ Parse the cart from localStorage and update cart
    Object.assign(cart, JSON.parse(storedCart));
  }
}

// ✅ Save cart to localStorage whenever it changes
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ✅ Load cart and update UI
loadCartFromLocalStorage();
updateCartQuantity();

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${FormatCurrency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
                <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                Add to Cart
            </button>
            </div>
    `;
});

document.querySelector(".js-product-grid").innerHTML = productsHTML;

// ✅ Update cart quantity
function updateCartQuantity() {
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = totalQuantity;
  console.log(totalQuantity);
}

// ✅ Attach event listeners to add-to-cart buttons
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    addToCart(productId);
    saveCartToLocalStorage(); // ✅ Save cart data after updating
    updateCartQuantity();

    // Add the "added" class and set opacity to 1
    const addedMessage = button.closest(".product-container").querySelector(".added-to-cart");
    addedMessage.classList.add("added"); // You can define the "added" class in CSS to change opacity

    // Show opacity transition by adding a class
    addedMessage.style.opacity = "1";

    // Set a timeout to remove the opacity and hide it after 1.5 seconds
    setTimeout(() => {
      addedMessage.style.opacity = "0"; // Fade out
      setTimeout(() => {
        addedMessage.classList.remove("added"); // Optionally remove the "added" class
      }, 500); // Delay to allow fading out
    }, 1500); // After 1.5 seconds
  });
});
