let allProducts = [];
let filteredProducts = [];

// 🔄 Fetch products from API
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    filteredProducts = data;
    displayProducts(data);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

  //seaerch products
function searchProducts() {
    let value = document.getElementById("searchBox").value.toLowerCase();

    let result = allProducts.filter(p =>
        p.title.toLowerCase().includes(value)
    );

    displayProducts(result);
}

// 🖼️ Display Products
function displayProducts(products) {
    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="card">
                <img src="${product.image}" />
                <h3>${product.title}</h3>
                <p>₹${Math.round(product.price * 80)}</p>
                <p>⭐ ${product.rating?.rate || 4}</p>
                <button onclick="addToCart(${product.id})">🛒 Add to Cart</button>
            </div>
        `;
    });
}


// 🗂️ Category Filter
function filterCategory(category) {
    if (category === "all") {
        filteredProducts = allProducts;
    } else {
        filteredProducts = allProducts.filter(p =>
            p.category.toLowerCase().includes(category.toLowerCase())
        );
    }
    displayProducts(filteredProducts);
}


// 💰 Price Filter
function filterPrice(value) {
    if (value === "all") {
        displayProducts(filteredProducts);
        return;
    }

    let price = parseInt(value);
    let result = filteredProducts.filter(p =>
        (p.price * 80) <= price
    );

    displayProducts(result);
}


// ⭐ Rating Filter
function filterRating(value) {
    if (value === "all") {
        displayProducts(filteredProducts);
        return;
    }

    let rating = parseFloat(value);
    let result = filteredProducts.filter(p =>
        (p.rating?.rate || 4) >= rating
    );

    displayProducts(result);
}


// 🔄 Sorting
function sortProducts(type) {
    let sorted = [...filteredProducts];

    if (type === "low") {
        sorted.sort((a, b) => a.price - b.price);
    } else if (type === "high") {
        sorted.sort((a, b) => b.price - a.price);
    }

    displayProducts(sorted);
}


// 🛒 Add to Cart (localStorage)
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = allProducts.find(p => p.id === id);
    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(product.title + " added to cart!");
}