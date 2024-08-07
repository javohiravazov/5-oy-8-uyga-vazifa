import { findElement } from "./helpers.js";
import { products } from "./html.js";

const elWrapperProducts = findElement(".arzon__big-div");
const elProductTemplate = findElement("#template");
const elFormAdd = findElement("#form-add");
const elAddBtn = findElement("#add-btn");
const elToTop = findElement("#to-top");

function renderProducts(list = products, parent = elWrapperProducts) {
  parent.textContent = null;

  list.forEach((product) => {
    const newTemplate = elProductTemplate.content.cloneNode(true);
    const elTopImg = findElement(".mahsulot", newTemplate);
    const elTitle = findElement(".tanlov", newTemplate);
    const elPrice = findElement(".yulov", newTemplate);
    const elRealPrice = findElement(".anarxi", newTemplate);
    const elDiccountPrice = findElement(".sikidga", newTemplate);
    const elFavoritBtn = findElement(".btn-yurak", newTemplate);
    const elShopBtn = findElement(".shop-btn", newTemplate);
    if (product.isLiked) {
      elFavoritBtn.src = "imgs/liked.svg";
    }

    elFavoritBtn.dataset.id = product.id;
    elShopBtn.dataset.id = product.id;
    elTopImg.src = product.img;
    elTitle.textContent = product.title;
    elPrice.textContent = product.monthly_payment;
    elRealPrice.textContent = product.real_price;
    elDiccountPrice.textContent = product.discount_price;

    parent.appendChild(newTemplate);
  });
}
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    elToTop.style.display = "inline-block";
  } else {
    elToTop.style.display = "none";
  }
});

elToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

renderProducts();

elAddBtn.addEventListener("click", () => {
  const newProduct = {
    id: products.length + 1,
    title: elFormAdd.title.value,
    img: elFormAdd.img.value,
    real_price: elFormAdd.real_price.value,
    discount_price: elFormAdd.discount_price.value,
    monthly_payment: elFormAdd.monthly.value,
    isLiked: false,
    reting: "4",
  };

  products.push(newProduct);

  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
});

elWrapperProducts.addEventListener("click", (evt) => {
  if (evt.target.className.includes("btn-yurak")) {
    const id = Number(evt.target.dataset.id);

    products.forEach((product) => {
      if (product.id === id) {
        product.isLiked = !product.isLiked;
      }
    });

    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }
});
