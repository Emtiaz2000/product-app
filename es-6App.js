const filter = document.querySelector('#filter');
const inputProduct = document.querySelector('#inputProduct');
const inputPrice = document.querySelector('#inputPrice');
const addProduct = document.querySelector('.addProduct');
const productListUl = document.querySelector('.productListUl');
const deleteBtn = document.querySelector('.delete-btn');
const noItemMsg = document.querySelector('#noItemMsg');

class Product{
    constructor(id,name,price){
        this.id = id;
        this.name=name;
        this.price= price;
    }
}

class UI{


//adding product to ui
    creatElement({id,name,price}){
        const li = document.createElement('li');
        li.className = 'list-group-item m-1 p-3 ';
        li.id = `product-${id}`;
            li.innerHTML = `<strong>${name}</strong> : $<span>${price}</span> <i class="fa fa-trash float-right deletebtn" ></i> `
            productListUl.appendChild(li);
            inputProduct.value = '';
            inputPrice.value = '';
    }

    //showing massage after deletiong or adding product
    alarting(massage,value){
        const alarting1 = document.querySelector('#alarting')
        const div = document.createElement('div')
        div.className = `alert alert-${value} text-center`;
        div.textContent = `${massage}`
        alarting1.insertBefore(div,productListUl)
        setTimeout(function(){
            div.remove();
        },2000);

    }
}


class Store{

//addd to local storage
   static addToLocalStorage(product){
        let products;
        if(localStorage.getItem('products')=== null){
            products = []
        }else{
            products = JSON.parse(localStorage.getItem('products'))
        }
        products.push(product)
        localStorage.setItem('products',JSON.stringify(products))
    }

    //check if localStorage contains  any product 
    static getpProduct(){
        let products;
        if(localStorage.getItem('products')=== null){
            products =[];
        }else{
            products = JSON.parse(localStorage.getItem('products'))
        }
        return products
    }

    //show to ui from localstorage
    static showLocalStorage(){
        const products = Store.getpProduct()
        products.forEach((e) =>{
            const ui =new UI()
            ui.creatElement(e)
        })
    }


    //delete from localStorage
     static deleting(id){
        const products = Store.getpProduct()
        products.forEach((e,index) =>{
            if(e.id===id){
                products.splice(index,1)
            }
            localStorage.setItem('products',JSON.stringify(products))
        })
     }
    

}
window.addEventListener('DOMContentLoaded',Store.showLocalStorage)

//to show or append product
addProduct.addEventListener('click', (e) => {
    e.preventDefault();
    const productName = inputProduct.value;
    const productPrice = inputPrice.value;
    const ui =new UI()
    if (productName === '' || productPrice === '' || !(!isNaN(parseFloat(productPrice)) && isFinite(productPrice))) {
        ui.alarting(`Please fill the necessary information`,'danger')
    } else {
         const id = document.querySelectorAll('li').length;
        const product = new Product(id,productName,productPrice)
        ui.creatElement(product);
        ui.alarting(`product added successfully`,'success')
        Store. addToLocalStorage(product);

    }
});




//to Delete product
productListUl.addEventListener('click', (e) => {
    if (e.target.classList.contains('deletebtn')) {
        e.target.parentElement.remove();
        const id = Number(e.target.parentElement.id.split('-')[1]);
        //console.log(id);
        Store.deleting(id);
        const ui = new UI();
        ui.alarting(`product deleted successfully`,'success');
    }
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

