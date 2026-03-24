let allProducts = [];

// Fetch data from JSON (mock API)
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    displayProducts(allProducts);
  });

// Display products
function displayProducts(products) {
    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="card">
                <img src="${product.image}" />
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button onclick="addToCart('${product.name}')">🛒 Add to Cart</button>
            </div>
        `;
    });
}

// Filter function
function filterCategory(category) {
    if (category === "all") {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// Add to cart (basic interaction)
function addToCart(name) {
    alert(name + " added to cart!");
}