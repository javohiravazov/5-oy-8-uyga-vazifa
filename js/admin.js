import { findElement } from "./helpers.js";
import { products } from "./html.js";

const elWrapperProducts = findElement(".arzon__big-div");
const elProductTemplate = findElement("#template");
const elFormAdd = findElement("#form-add");
const elFormEdit = findElement("#form-edit");
const elAddBtn = findElement("#add-btn");
const elEditBtn = findElement("#edit-modal-btn");
const elEditImg = findElement("#edit-img");

let productsList = JSON.parse(localStorage.getItem("products")) || products;
function renderProducts(list = productsList, parent = elWrapperProducts) {
  parent.textContent = null;

  list.forEach((product) => {
    const newTemplate = elProductTemplate.content.cloneNode(true);
    const elTopImg = findElement(".mahsulot", newTemplate);
    const elTitle = findElement(".tanlov", newTemplate);
    const elPrice = findElement(".yulov__sum", newTemplate);
    const elRealPrice = findElement(".anarxi", newTemplate);
    const elDiccountPrice = findElement(".sikidga", newTemplate);
    const elFavoritBtn = findElement(".btn-yurak", newTemplate);
    const elShopBtn = findElement(".shop-btn", newTemplate);
    const elEditBtn = findElement(".btn-info", newTemplate);
    const elDeleteBtn = findElement(".btn-danger", newTemplate);

    elEditBtn.dataset.id = product.id;
    elDeleteBtn.dataset.id = product.id;
    if (product.isLiked) {
      elFavoritBtn.src = "imgs/liked.svg";
    }

    elFavoritBtn.dataset.id = product.id;
    elShopBtn.dataset.id = product.id;
    elTopImg.src = product.img;
    elTitle.textContent = product.title;
    elPrice.textContent = `${product.monthly_payment} so'm/`;
    elRealPrice.textContent = `${product.real_price} so'm`;
    elDiccountPrice.textContent = `${product.discount_price} so'm`;
    parent.appendChild(newTemplate);
  });
}
renderProducts();
elAddBtn.addEventListener("click", () => {
  const newProduct = {
    id:
      productsList.length > 0
        ? productsList[productsList.length - 1].id + 1
        : 1,
    title: elFormAdd.title.value,
    img: elFormAdd.img.value,
    real_price: elFormAdd.real_price.value,
    discount_price: elFormAdd.discount_price.value,
    monthly_payment: elFormAdd.monthly.value,
    isLiked: false,
    rating: "4",
  };
  productsList.push(newProduct);
  localStorage.setItem("products", JSON.stringify(productsList));
  elFormAdd.reset();
  renderProducts();
});
elWrapperProducts.addEventListener("click", (evt) => {
  if (evt.target.className.includes("btn-yurak")) {
    const id = Number(evt.target.dataset.id);
    productsList.forEach((product) => {
      if (product.id === id) {
        product.isLiked = !product.isLiked;
      }
    });
    localStorage.setItem("products", JSON.stringify(productsList));
    renderProducts();
  }
  if (evt.target.className.includes("btn-danger")) {
    const id = Number(evt.target.dataset.id);
    productsList = productsList.filter((product) => product.id !== id);
    localStorage.setItem("products", JSON.stringify(productsList));
    renderProducts();
  }
  if (evt.target.className.includes("btn-info")) {
    const id = Number(evt.target.dataset.id);
    const product = productsList.find((product) => product.id === id);
    elEditImg.src = product.img;
    elFormEdit.title.value = product.title;
    elFormEdit.img.value = product.img;
    elFormEdit.real_price.value = product.real_price;
    elFormEdit.discount_price.value = product.discount_price;
    elFormEdit.monthly.value = product.monthly_payment;
    elEditBtn.dataset.id = id;
  }
});
elEditBtn.addEventListener("click", (evt) => {
  const id = Number(evt.target.dataset.id);
  productsList.forEach((product) => {
    if (product.id === id) {
      product.title = elFormEdit.title.value;
      product.img = elFormEdit.img.value;
      product.real_price = elFormEdit.real_price.value;
      product.discount_price = elFormEdit.discount_price.value;
      product.monthly_payment = elFormEdit.monthly.value;
    }
  });
  elFormEdit.reset();
  localStorage.setItem("products", JSON.stringify(productsList));
  renderProducts();
});
