async function setupFilters() {
  const res = await fetch('data/products.json');
  const products = await res.json();

  const categorySelect = document.getElementById('filter-category');
  const brandSelect = document.getElementById('filter-brand');

  const categories = [...new Set(products.map(p => p.category))];
  categories.forEach(cat => categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`);

  const brands = [...new Set(products.map(p => p.brand))];
  brands.forEach(brand => brandSelect.innerHTML += `<option value="${brand}">${brand}</option>`);

  categorySelect.addEventListener('change', () => filterProducts(products));
  brandSelect.addEventListener('change', () => filterProducts(products));
}

function filterProducts(products) {
  const category = document.getElementById('filter-category').value;
  const brand = document.getElementById('filter-brand').value;

  let filtered = products;
  if(category) filtered = filtered.filter(p => p.category === category);
  if(brand) filtered = filtered.filter(p => p.brand === brand);

  renderFilteredProducts(filtered);
}

function renderFilteredProducts(products) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'border rounded-md overflow-hidden shadow hover:shadow-lg transition duration-200 relative';
    card.innerHTML = `
      ${product.onSale ? `<span class="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">Sale</span>` : ''}
      <img src="${product.images[0]}" alt="${product.title}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="font-bold text-lg mb-2">${product.title}</h3>
        <p class="text-gray-700 mb-2">$${product.price.toFixed(2)}</p>
        <button class="bg-red-600 text-white px-4 py-2 rounded add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });

  setupAddToCartButtons();
}

// Run filters setup
setupFilters();
