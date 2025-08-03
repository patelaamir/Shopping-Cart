const products = [
  { name: "Product A", price: 5, image: "./images/image4.jpg" },
  { name: "Product B", price: 10, image: "./images/image3.jpg" },
  { name: "Product C", price: 15, image: "./images/image2.jpg" },
  { name: "Product D", price: 20, image: "./images/image1.jpg" },
  { name: "Product E", price: 25, image: "./images/image8.jpg" },
  { name: "Product F", price: 30, image: "./images/image7.jpg" },
  { name: "Product G", price: 35, image: "./images/image6.jpg" },
  { name: "Product H", price: 40, image: "./images/image5.jpg" },
  { name: "Product I", price: 45, image: "./images/image10.jpg" },
  { name: "Product J", price: 50, image: "./images/image9.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach(prod => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}" />
      <h3>${prod.name}</h3>
      <p>$${prod.price}</p>
      <button onclick="addToCart('${prod.name}', ${prod.price})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function filterProducts() {
  const query = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll(".product").forEach(product => {
    const title = product.querySelector("h3").textContent.toLowerCase();
    product.style.display = title.includes(query) ? "" : "none";
  });
}

function addToCart(name, price) {
  const index = cart.findIndex(item => item.name === name);
  if (index > -1) {
    cart[index].quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart();
  renderCart();
}

function changeQuantity(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.name !== name);
  }
  saveCart();
  renderCart();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cart");
  const totalSpan = document.getElementById("total");
  cartDiv.innerHTML = "";

  let total = 0;
  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} (${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
      <div>
        <button onclick="changeQuantity('${item.name}', 1)">+</button>
        <button onclick="changeQuantity('${item.name}', -1)">-</button>
        <button onclick="removeFromCart('${item.name}')">Remove</button>
      </div>
    `;
    cartDiv.appendChild(div);
    total += item.price * item.quantity;
  });

  totalSpan.textContent = total.toFixed(2);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function checkout() {
  document.getElementById("checkoutForm").style.display = "block";
}

function submitOrder() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) {
    alert("Please fill out your name and email.");
    return;
  }

  alert(`Thank you, ${name}! Your order of $${document.getElementById("total").textContent} has been received.`);

  cart = [];
  saveCart();
  renderCart();
  document.getElementById("checkoutForm").style.display = "none";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

renderProducts();
renderCart();