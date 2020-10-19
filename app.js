//selecting 
const filter = document.querySelector('#filter');
const inputProduct = document.querySelector('#inputProduct');
const inputPrice = document.querySelector('#inputPrice');
const addProduct = document.querySelector('.addProduct');
const productListUl = document.querySelector('.productListUl');
const deleteBtn = document.querySelector('.delete-btn');
const noItemMsg = document.querySelector('#noItemMsg');

//data store
/* console.log('connected') */
let productList = [];

function getData(productList) {
    if (productList.length > 0) {
        let li = '';
        noItemMsg.innerHTML = '';
        productList.forEach(element => {
            li = document.createElement('li');
            li.className = 'list-group-item m-1 p-3 emon';
            li.id = `product-${element.id}`;
            li.innerHTML = `<strong>${element.name}</strong> : $<span>${element.price}</span> <i class="fa fa-trash float-right deletebtn" ></i> `
            productListUl.appendChild(li);
        });
    } else {
        noItemMsg.innerHTML = 'No product to show';
    }


}
getData(productList)

//to show or append product
addProduct.addEventListener('click', (e) => {
    e.preventDefault();
    const productName = inputProduct.value;
    const productPrice = inputPrice.value;
    if (productName === '' || productPrice === '' || !(!isNaN(parseFloat(productPrice)) && isFinite(productPrice))) {
        alert('please fill the form!')
    } else {
        let id;
        if (productList.length === 0) { // 1st time length 0 tai id=0 push hobe 
            id = 0;
        } else {
            id = productList[productList.length - 1].id + 1;
        }
        productList.push({
            id,
            name: productName,
            price: productPrice
        });
        productListUl.innerHTML = '';
        getData(productList);
        inputProduct.value = '';
        inputPrice.value = '';
    }
});

//to Delete product
productListUl.addEventListener('click', (e) => {
    if (e.target.classList.contains('deletebtn')) {
        e.target.parentElement.remove();
    }
    const id = parseInt(e.target.parentElement.id.split("-")[1])
    let result = productList.filter((product) => {
        return product.id !== id;
    });
    //console.log(productList);
    productList = result;
});
//search option
filter.addEventListener('keyup', (e) => {
    const searchText = e.target.value.toLowerCase();
    document.querySelectorAll('.list-group-item').forEach((products) => {
        const searchProduct = products.firstElementChild.textContent.toLowerCase();
        if (searchProduct.includes(searchText)) {
            products.style.display = "block";
            noItemMsg.innerHTML = '';
        } else {
            products.style.display = "none";
            noItemMsg.innerHTML = 'No product found';
        }

    });
});