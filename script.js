let allProducts = [];
let filteredProducts = [];

// Fetch API
fetch('https://fakestoreapi.com/products')
.then(res => res.json())
.then(data => {
    allProducts = data;
    filteredProducts = data;
    displayProducts(data);
    updateCounts();
});

// Display
function displayProducts(products) {
    let container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
        <div class="card">
            <button class="fav-btn" onclick="addToFav(${product.id})">❤️</button>
            <img src="${product.image}">
            <h3>${product.title.substring(0,40)}...</h3>
            <p>₹${Math.round(product.price*80)}</p>
            <p>⭐ ${product.rating.rate}</p>
            <button onclick="addToCart(${product.id})">🛒 Add to Cart</button>
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

// Category
function filterCategory(cat) {
    if(cat==="all") filteredProducts=allProducts;
    else filteredProducts=allProducts.filter(p=>p.category.includes(cat));
    displayProducts(filteredProducts);
}

// Price
function filterPrice(val){
    if(val==="all") return displayProducts(filteredProducts);
    let res=filteredProducts.filter(p=>p.price*80<=val);
    displayProducts(res);
}

// Rating
function filterRating(val){
    if(val==="all") return displayProducts(filteredProducts);
    let res=filteredProducts.filter(p=>p.rating.rate>=val);
    displayProducts(res);
}

// Sort
function sortProducts(type){
    let sorted=[...filteredProducts];
    if(type==="low") sorted.sort((a,b)=>a.price-b.price);
    if(type==="high") sorted.sort((a,b)=>b.price-a.price);
    displayProducts(sorted);
}

// Cart
function addToCart(id){
    let cart=JSON.parse(localStorage.getItem("cart"))||[];
    let product=allProducts.find(p=>p.id===id);
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    showToast("Added to cart 🛒");
    updateCounts();
}

// Fav
function addToFav(id){
    let fav=JSON.parse(localStorage.getItem("fav"))||[];
    let product=allProducts.find(p=>p.id===id);
    fav.push(product);
    localStorage.setItem("fav",JSON.stringify(fav));
    showToast("Added to wishlist ❤️");
    updateCounts();
}

// Counts
function updateCounts(){
    document.getElementById("cartCount").innerText =
        (JSON.parse(localStorage.getItem("cart"))||[]).length;
    document.getElementById("favCount").innerText =
        (JSON.parse(localStorage.getItem("fav"))||[]).length;
}

// Toast
function showToast(msg){
    let t=document.getElementById("toast");
    t.innerText=msg;
    t.classList.add("show");
    setTimeout(()=>t.classList.remove("show"),2000);
}

function toggleDark() {
    document.body.classList.toggle("dark");
}
function showDetails(product) {
    let popup = document.getElementById("popup");

    popup.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image}" width="200">
        <p>${product.description}</p>
        <button onclick="popup.style.display='none'">Close</button>
    `;

    popup.style.display = "block";
}
onclick="showDetails(${JSON.stringify(product)})"