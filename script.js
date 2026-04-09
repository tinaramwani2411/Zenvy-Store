let allProducts = [];
let filteredProducts = [];

// PAGE LOAD
window.onload = function () {
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

    products.forEach(product => {
        container.innerHTML += `
        <div class="card">
            <button class="fav-btn" onclick="addToFav(${product.id})">❤️</button>

            <img src="${product.thumbnail}">
            <h3>${product.title}</h3>
            <p>${product.category}</p>
            <p>₹${product.price * 80}</p>
            <p>⭐ ${product.rating}</p>

            <button onclick="addToCart(${product.id})">🛒 Add to Cart</button>
            <button onclick="showDetailsById(${product.id})">👁 View</button>
        </div>
        `;
    });
}

// SEARCH
function searchProducts() {
    let val = document.getElementById("searchBox").value.toLowerCase();
    let res = allProducts.filter(p => p.title.toLowerCase().includes(val));
    displayProducts(res);
}

// CATEGORY FILTER
function filterCategory(cat) {
    filteredProducts = cat === "all"
        ? allProducts
        : allProducts.filter(p => p.category.toLowerCase().includes(cat));

    displayProducts(filteredProducts);
}

// PRICE FILTER
function filterPrice(val) {
    if (val === "all") return displayProducts(filteredProducts);

    let res = filteredProducts.filter(p => (p.price * 80) <= val);
    displayProducts(res);
}

// RATING FILTER
function filterRating(val) {
    if (val === "all") return displayProducts(filteredProducts);

    let res = filteredProducts.filter(p => p.rating >= val);
    displayProducts(res);
}

// SORT
function sortProducts(type) {
    let sorted = [...filteredProducts];

    if (type === "low") sorted.sort((a, b) => a.price - b.price);
    if (type === "high") sorted.sort((a, b) => b.price - a.price);

    displayProducts(sorted);
}

// ADD TO CART
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = allProducts.find(p => p.id === id);

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    showToast("Added to cart 🛒");

    updateCounts();
    displayCart();
}

// FAVORITES
function addToFav(id) {
    let fav = JSON.parse(localStorage.getItem("fav")) || [];
    let product = allProducts.find(p => p.id === id);

    fav.push(product);
    localStorage.setItem("fav", JSON.stringify(fav));

    showToast("Added to wishlist ❤️");

    updateCounts();
}

// UPDATE COUNT
function updateCounts() {
    document.getElementById("cartCount").innerText =
        (JSON.parse(localStorage.getItem("cart")) || []).length;

    document.getElementById("favCount").innerText =
        (JSON.parse(localStorage.getItem("fav")) || []).length;
}

// DISPLAY CART
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cartItems");

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>Cart is empty 😢</p>";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * 80;

        container.innerHTML += `
            <div class="cart-item">
                <h4>${item.title}</h4>
                <p>₹${item.price * 80}</p>
                <button onclick="removeFromCart(${index})">❌ Remove</button>
            </div>
        `;
    });

    container.innerHTML += `<h3 style="text-align:center;">Total: ₹${total}</h3>`;
}

// REMOVE ITEM
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    updateCounts();
}

// PLACE ORDER
function placeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Cart empty ❌");
        return;
    }

    let total = cart.reduce((sum, p) => sum + (p.price * 80), 0);

    fetch('http://localhost:5000/api/orders/place', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            items: cart,
            totalAmount: total
        })
    })
    .then(res => res.text())
    .then(() => {
        alert("Order Placed 🎉");
        localStorage.removeItem("cart");
        displayCart();
        updateCounts();
    });
}

// DARK MODE
function toggleDark() {
    document.body.classList.toggle("dark");
}

// TOAST
function showToast(msg) {
    let t = document.getElementById("toast");
    t.innerText = msg;
    t.classList.add("show");

    setTimeout(() => t.classList.remove("show"), 2000);
}

// POPUP
function showDetailsById(id) {
    let product = allProducts.find(p => p.id === id);
    let popup = document.getElementById("popup");

    popup.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.thumbnail}" width="200">
        <p>${product.description}</p>
        <button onclick="popup.style.display='none'">Close</button>
    `;

    popup.style.display = "block";
}

// 🔥 SCROLL TO CART
function scrollToCart() {
    document.getElementById("cartItems").scrollIntoView({
        behavior: "smooth"
    });
}