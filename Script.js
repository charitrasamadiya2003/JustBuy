// Detect current page
const currentPage = window.location.pathname;
console.log("Current page:", currentPage);

// ---------------- INDEX PAGE ----------------
if (currentPage.includes("index.html") || currentPage.endsWith("/")) {
  console.log("Index page js is active");

  const welcomeText = document.querySelector("h1.display-4");
  if (welcomeText) {
    welcomeText.innerText = "Welcome to JustBuy - Shop Smarter!";
  }

  const categoryItems = document.querySelectorAll(".list-group-item");

  categoryItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.backgroundColor = "#f0f0f0";
      item.style.cursor = "pointer";
    });

    item.addEventListener("mouseleave", () => {
      item.style.backgroundColor = "white";
    });
  });
}

// ---------------- PRODUCTS PAGE ----------------
if (currentPage.includes("products.html")) {
  console.log("Products page js is active");

  const products = document.querySelectorAll(".card");

  products.forEach((card) => {
    const title = card.querySelector(".card-title")?.innerText;
    const priceText = card.querySelector(".card-text")?.innerText;
    const productImage = card.getAttribute("data-image");

    let price = 0;
    if (priceText) {
      price = parseInt(priceText.replace(/[^0-9]/g, ""));
    }

    const btn = card.querySelector(".btn-primary");

    if (btn) {
      btn.addEventListener("click", (event) => {
        event.preventDefault();

        console.log("Added to cart:", title, price);

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({
          name: title,
          price: price,
          quantity: 1,
          image: productImage,
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${title} added to cart!`);

        window.location.href = "cart.html";
      });
    }
  });
}

// ---------------- CONTACT PAGE ----------------
if (currentPage.includes("contact.html")) {
  console.log("Contact page is active");

  const form = document.querySelector("form");
  const nameInput = document.querySelector(
    "input[placeholder='Enter your name']"
  );
  const emailInput = document.querySelector(
    "input[placeholder='Enter your email']"
  );
  const messageInput = document.querySelector(
    "textarea[placeholder='Write your message']"
  );

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name === "" || email === "" || message === "") {
      alert("Please fill all the fields before submitting.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("Thank you! Your message has been submitted.");

    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
  });
}

// ---------------- CART PAGE ----------------
if (currentPage.includes("cart.html")) {
  console.log("Cart page js is active");

  const totalSection = document.querySelector(".container.my-4 h2");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    const itemsSection = document.querySelector(".container.my-5");
    itemsSection.innerHTML = `<h2 class="mb-4">Items in Your Cart</h2>`;

    if (cart.length === 0) {
      itemsSection.innerHTML += `<p class="text-muted">Your cart is empty.</p>`;
      if (totalSection) totalSection.innerText = "Total: ₹0";
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * (item.quantity || 1);

      itemsSection.innerHTML += `
        <div class="d-flex flex-wrap align-items-center gap-3 p-3 border rounded mb-3">
          <img src="${item.image}" class="rounded img-fluid" style="max-width: 200px;">
          <div>
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
            <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
    });

    if (totalSection) {
      totalSection.innerText = `Total: ₹${total}`;
    }

    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });
  }

  renderCart();
}
