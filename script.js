let allProducts = [];
let filteredProducts = [];

// Load
window.onload = function () {
    fetchProducts();
    updateCounts();
};

// ✅ FETCH FROM DUMMY API
function fetchProducts() {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
            allProducts = data.products;
            filteredProducts = data.products;
            displayProducts(allProducts);
        })
        .catch(err => console.log("API Error:", err));
}

// Display
function displayProducts(products) {
    let container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
        <div class="card">
            <button class="fav-btn" onclick="addToFav(${product.id})">❤️</button>

            <img src="${product.thumbnail}">

            <h3>${product.title}</h3>

            <p class="category">${product.category}</p>

            <p>₹${product.price * 80}</p>

            <p>⭐ ${product.rating}</p>

            <button onclick="addToCart(${product.id})">🛒 Add to Cart</button>
            <button onclick="showDetailsById(${product.id})">👁 View</button>
        </div>
        `;
    });
}

// Search
function searchProducts() {
    let val = document.getElementById("searchBox").value.toLowerCase();
    let res = allProducts.filter(p => p.title.toLowerCase().includes(val));
    displayProducts(res);
}

// ✅ FIXED CATEGORY FILTER
function filterCategory(cat) {
    if (cat === "all") {
        filteredProducts = allProducts;
    } else {
        filteredProducts = allProducts.filter(p =>
            p.category.toLowerCase().includes(cat.toLowerCase())
        );
    }
    displayProducts(filteredProducts);
}

// Price
function filterPrice(val) {
    if (val === "all") return displayProducts(filteredProducts);
    let res = filteredProducts.filter(p => p.price * 80 <= val);
    displayProducts(res);
}

// Rating
function filterRating(val) {
    if (val === "all") return displayProducts(filteredProducts);
    let res = filteredProducts.filter(p => p.rating >= val);
    displayProducts(res);
}

// Sort
function sortProducts(type) {
    let sorted = [...filteredProducts];
    if (type === "low") sorted.sort((a, b) => a.price - b.price);
    if (type === "high") sorted.sort((a, b) => b.price - a.price);
    displayProducts(sorted);
}

// Cart
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = allProducts.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast("Added to cart 🛒");
    updateCounts();
}

// Fav
function addToFav(id) {
    let fav = JSON.parse(localStorage.getItem("fav")) || [];
    let product = allProducts.find(p => p.id === id);
    fav.push(product);
    localStorage.setItem("fav", JSON.stringify(fav));
    showToast("Added to wishlist ❤️");
    updateCounts();
}

// Counts
function updateCounts() {
    document.getElementById("cartCount").innerText =
        (JSON.parse(localStorage.getItem("cart")) || []).length;
    document.getElementById("favCount").innerText =
        (JSON.parse(localStorage.getItem("fav")) || []).length;
}

// Toast
function showToast(msg) {
    let t = document.getElementById("toast");
    t.innerText = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2000);
}

// Dark mode
function toggleDark() {
    document.body.classList.toggle("dark");
}

// Popup
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