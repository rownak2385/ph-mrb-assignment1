// Mobile menu
const menu = document.getElementById("mobile-menu");
const openBtn = document.getElementById("menu-toggle");
const closeBtn = document.getElementById("close-menu");

openBtn.addEventListener("click", () => {
  menu.style.right = "0";
});

closeBtn.addEventListener("click", () => {
  menu.style.right = "-100%";
});

// API
const url = "https://fakestoreapi.com";

const getAllProducts = async () => {
  const res = await fetch(`${url}/products`);
  return await res.json();
};

const getTopProducts = async () => {
  const products = await getAllProducts();
  return products.sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 3);
};

const showTopProducts = (products) => {
  const container = document.getElementById("top-products");
  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center";

card.innerHTML = `
  <article class="rounded-2xl overflow-hidden">
    <!-- Product Image -->
    <div class="h-64 bg-gray-50 flex items-center justify-center p-8">
      <img 
        src="${product.image}" 
        alt="${product.title}" 
        class="max-h-full max-w-full object-contain"
      >
    </div>
    
    <!-- Product Info -->
    <div class="p-5">
      <div class="flex items-center justify-between mb-3">
        <span class="inline-block px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded">
          ${product.category}
        </span>
        <div class="flex items-center gap-1">
          <i class="fa-solid fa-star text-yellow-400 text-sm"></i>
          <span class="text-sm font-semibold text-gray-800">${product.rating.rate}</span>
          <span class="text-xs text-gray-500">(${product.rating.count})</span>
        </div>
      </div>
      
      <h3 class="text-left font-semibold text-gray-900 mb-3 leading-snug">
        ${product.title.length > 30 ? product.title.slice(0, 50) + "..." : product.title}
      </h3>
  
      <p class="text-left text-2xl font-bold text-gray-900 mb-4">$${product.price}</p>
      
      <div class="flex gap-2.5">
        <button 
          class="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <i class="fa-regular fa-eye text-base"></i>
          Details
        </button>
        <button 
          class="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          <i class="fa-solid fa-cart-plus text-base"></i>
          Add
        </button>
      </div>
    </div>
  </article>
`;
    container.appendChild(card);
  });

  // Add cart functionality
  container.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cartCount = document.getElementById("cart-count");
      cartCount.textContent = parseInt(cartCount.textContent) + 1;
    });
  });
};

// Call function
getTopProducts()
  .then(showTopProducts)
  .catch((err) => console.error(err));