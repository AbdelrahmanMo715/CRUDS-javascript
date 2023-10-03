let titleInput = document.querySelector(".title");
let priceInput = document.querySelector(".price");
let taxesInput = document.querySelector(".taxes");
let adsInput = document.querySelector(".ads");
let discountInput = document.querySelector(".discount");
let totalPrice = document.querySelector(".total");
let numCount = document.querySelector(".num-count");
let categoryInput = document.querySelector(".category");
let createBtn = document.querySelector(".create");
let searchInput = document.querySelector(".search");
let searchBytitleBtn = document.querySelector(".srch-title");
let searchByCategory = document.querySelector(".srch-category");
let allInputCount = document.querySelectorAll(".count input");
let table = document.querySelector("table tbody");
let deleteAllDiv = document.querySelector(".deleteAllDiv");
let mode = "create";
let temp;
let productData = JSON.parse(window.localStorage.getItem("products")) || [];
displayDataOf(productData);
function getTotal(){
allInputCount.forEach(x=>{
    x.addEventListener("keyup",()=>{
        if(priceInput.value != ""){
            let resault = (+priceInput.value + +taxesInput.value + +adsInput.value)- discountInput.value;
             totalPrice.innerHTML = `${resault}`;
             totalPrice.style.setProperty("background-color","green","important");
        }
        else{
            totalPrice.innerHTML = `Total`;
            totalPrice.style.setProperty("background-color","#17a2b8","important")
        }
    })
})
}
getTotal();

function createProductData(){
    createBtn.addEventListener("click",()=>{
        
        if(mode == "create"){
        if(numCount.value > 1){
        for(let i=0;i < +numCount.value;i++){
        productData.push(
        {
            title : titleInput.value,
            price : priceInput.value,
            taxes : taxesInput.value,
            ads : adsInput.value,
            discount : discountInput.value,
            total : parseInt(totalPrice.innerHTML),
            category : categoryInput.value,
            count : numCount.value
        });
    }
}       else{
             productData.push(
                    {
                        title : titleInput.value,
                        price : priceInput.value,
                        taxes : taxesInput.value,
                        ads : adsInput.value,
                        discount : discountInput.value,
                        total : parseInt(totalPrice.innerHTML),
                        category : categoryInput.value,
                        count : numCount.value
                    });
                
        }
    }
    else{
         productData[temp] =  {
            title : titleInput.value,
            price : priceInput.value,
            taxes : taxesInput.value,
            ads : adsInput.value,
            discount : discountInput.value,
            total : parseInt(totalPrice.innerHTML),
            category : categoryInput.value,
            count : numCount.value
        }
        mode = "create";
        createBtn.innerHTML = "Create";
        numCount.style.display = "block";
    }
        
        console.log(productData);
        addProductsToLocal(productData);
        displayDataOf(productData);
        clearValues();
    })
}
createProductData();
function clearValues(){
    titleInput.value = "";
    allInputCount.forEach(x=>{
        x.value="";
    });
    totalPrice.innerHTML="total";
    categoryInput.value="";
    numCount.value="";
}


function addProductsToLocal(products){
    window.localStorage.setItem("products",JSON.stringify(products));
}


function displayDataOf(productData){
    deleteAllDisplay();
    return(table.innerHTML = productData.map(x=>{
        return `
        <tr class="text-uppercase">
        <td>${productData.indexOf(x)}</td>
        <td>${x.title}</td>
        <td>${x.price}</td>
        <td>${x.taxes}</td>
        <td>${x.ads}</td>
        <td>${x.discount}</td>
        <td>${x.total}</td>
        <td>${x.category}</td>
        <td><button class="btn btn-danger"onclick="update(${productData.indexOf(x)})">Update</button></td>
        <td><button class="btn btn-danger"onclick="deleteOne(${productData.indexOf(x)})">Delete</button></td>
    </tr>
        `
    }).join(""))
}

function deleteOne(id){
    console.log(id)
    productData = productData.filter((y,i)=>{return i != id});
    console.log(productData);
    addProductsToLocal(productData);
    displayDataOf(productData.le);
}

function deleteAllDisplay(){
    if(productData.length > 0){
        deleteAllDiv.innerHTML = `<button class="btn btn-primary w-100" onclick="deleteAll()">DeleteAll (${productData.length})</button>`;
    }
    else{
        deleteAllDiv.innerHTML = ``;
    }
   
}


function deleteAll(){
    productData = [];
    addProductsToLocal(productData);
    displayDataOf(productData);
}

let searchMood = "title";

function getSearchMood(id){
    if(id == "searchTitle"){
        searchMood = "title";
    }else{
        searchMood = "category";
    }
    searchInput.placeholder="Search By " + searchMood;
    searchInput.focus();
}



function searchData(val){
     if(searchMood == "title"){
        newproduct = productData.filter(x=>x.title.includes(val));
        displayDataOf(newproduct);
    }
     else{
        newproduct = productData.filter(x=>x.category.includes(val));
        displayDataOf(newproduct);
    
    }
}



function update(index){
    titleInput.value = productData[index].title;
    priceInput.value = productData[index].price;
    taxesInput.value = productData[index].taxes;
    adsInput.value = productData[index].ads;
    discountInput.value = productData[index].discount;
    categoryInput.value = productData[index].category;
    let resault = (+priceInput.value + +taxesInput.value + +adsInput.value)- discountInput.value;
    totalPrice.innerHTML = `${resault}`;
    numCount.style.display = "none";
    createBtn.innerHTML = "Update";
    mode = "update";
    temp = index;
    window.scrollTo({top:0,behavior:"smooth"});
    titleInput.focus();
}








