let allProducts = [];
let filteredProducts = [];

// LOAD
window.onload = () => {
    fetchProducts();
    updateCounts();
    displayCart();
};

// FETCH PRODUCTS
function fetchProducts() {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
            allProducts = data.products;
            filteredProducts = data.products;
            displayProducts(allProducts);
        });
}

// DISPLAY PRODUCTS
function displayProducts(products) {
    let container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(p => {
        container.innerHTML += `
        <div class="card">
            <button class="fav-btn" onclick="addToFav(${p.id})">❤️</button>
            <img src="${p.thumbnail}">
            <h3>${p.title}</h3>
            <p>${p.category}</p>
            <p>₹${p.price * 80}</p>
            <p>⭐ ${p.rating}</p>
            <button onclick="addToCart(${p.id})">🛒 Add to Cart</button>
            <button onclick="showDetailsById(${p.id})">👁 View</button>
        </div>`;
    });
}

// SEARCH
function searchProducts() {
    let val = document.getElementById("searchBox").value.toLowerCase();
    displayProducts(allProducts.filter(p => p.title.toLowerCase().includes(val)));
}

// FILTERS
function filterCategory(cat) {
    filteredProducts = cat === "all"
        ? allProducts
        : allProducts.filter(p => p.category.toLowerCase().includes(cat));
    displayProducts(filteredProducts);
}

function filterPrice(val) {
    if (val === "all") return displayProducts(filteredProducts);
    displayProducts(filteredProducts.filter(p => p.price * 80 <= val));
}

function filterRating(val) {
    if (val === "all") return displayProducts(filteredProducts);
    displayProducts(filteredProducts.filter(p => p.rating >= val));
}

// SORT
function sortProducts(type) {
    let sorted = [...filteredProducts];
    if (type === "low") sorted.sort((a, b) => a.price - b.price);
    if (type === "high") sorted.sort((a, b) => b.price - a.price);
    displayProducts(sorted);
}

// CART
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = allProducts.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    showToast("Added to cart 🛒");
    updateCounts();
    displayCart();
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cartItems");

    if (!cart.length) {
        container.innerHTML = "<p>Cart is empty 😢</p>";
        return;
    }

    let total = 0;
    container.innerHTML = "";

    cart.forEach((item, i) => {
        total += item.price * 80;
        container.innerHTML += `
        <div class="cart-item">
            <h4>${item.title}</h4>
            <p>₹${item.price * 80}</p>
            <button onclick="removeFromCart(${i})">❌</button>
        </div>`;
    });

    container.innerHTML += `<h3>Total: ₹${total}</h3>`;
}

function removeFromCart(i) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCounts();
}

// ORDER
function placeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart.length) {
        showToast("Cart empty ❌");
        return;
    }

    let total = cart.reduce((sum, p) => sum + (p.price * 80), 0);

    fetch('http://localhost:5000/api/orders/place', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            items: cart,
            totalAmount: total
        })
    })
    .then(res => res.text())
    .then(() => {

        // 🔥 PRODUCT LIST (better UI)
        let itemsHTML = cart.map(p => `
            <li style="margin:5px 0;">🛍 ${p.title} - ₹${(p.price * 80).toFixed(0)}</li>
        `).join("");

        // 🔥 FINAL POPUP DESIGN
        let details = `
            <h3 style="color:green;">✅ Order Confirmed!</h3>
            <p><b>Total Amount:</b> ₹${total.toFixed(2)}</p>
            <p><b>Products:</b></p>
            <ul style="text-align:left; padding-left:20px;">
                ${itemsHTML}
            </ul>
        `;

        document.getElementById("orderDetails").innerHTML = details;

        // 🔥 SHOW POPUP WITH ANIMATION
        let popup = document.getElementById("orderPopup");
        popup.style.display = "block";
        popup.style.animation = "fadeIn 0.3s ease";

        // 🔥 CLEAR CART
        localStorage.removeItem("cart");
        displayCart();
        updateCounts();

        showToast("Order placed successfully 🎉");
    })
    .catch(err => {
        console.log(err);
        showToast("Order failed ❌");
    });
}
// UTILS
function updateCounts() {
    document.getElementById("cartCount").innerText =
        (JSON.parse(localStorage.getItem("cart")) || []).length;
    document.getElementById("favCount").innerText =
        (JSON.parse(localStorage.getItem("fav")) || []).length;
}

function addToFav(id) {
    let fav = JSON.parse(localStorage.getItem("fav")) || [];
    let product = allProducts.find(p => p.id === id);
    fav.push(product);
    localStorage.setItem("fav", JSON.stringify(fav));
    showToast("Added to wishlist ❤️");
    updateCounts();
}

function toggleDark() {
    document.body.classList.toggle("dark");
}

function showToast(msg) {
    let t = document.getElementById("toast");
    t.innerText = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2000);
}

function showDetailsById(id) {
    let p = allProducts.find(x => x.id === id);
    let popup = document.getElementById("popup");

    popup.innerHTML = `
        <h2>${p.title}</h2>
        <img src="${p.thumbnail}" width="200">
        <p>${p.description}</p>
        <button onclick="popup.style.display='none'">Close</button>
    `;
    popup.style.display = "block";
}

function closeOrderPopup() {
    document.getElementById("orderPopup").style.display = "none";
}

function scrollToCart() {
    document.getElementById("cartItems").scrollIntoView({
        behavior: "smooth"
    });
}