import { menuArray } from "/data.js"
const footer = document.getElementById("footer")
const paymentFormContainer = document.getElementById("payment-form-container")
const paymentForm = document.getElementById("payment-form")

let orderArray = []

const menuHtml = menuArray.map(function(menu) {
    return `
<section class="card">
    <div class="card-start">
        <p>${menu.emoji}</p>
    </div>
    <div class="card-mid">
        <h2 class="card-title">${menu.name}</h2>
        <p class="card-desc">${menu.ingredients}</p>
        <h3 class="card-price">$${menu.price}<h3>
    </div>
    <div class="card-end">
        <button class="add-btn" id="add-btn" data-add="${menu.id}">+</button>
    </div> 
</section>
    `
}).join("")

document.getElementById("container").innerHTML = menuHtml

document.addEventListener('click', function(e) {
    if(e.target.dataset.add) {
        const menuId = e.target.dataset.add
        footer.style.display = "block"
        handleAddBtnClick(menuId)
    } else if(e.target.dataset.remove) {
        const orderId = e.target.dataset.remove
        handleRemoveBtnClick(orderArray, orderId)
    }else if(e.target.id === "order-btn") {
        paymentFormContainer.style.display = "inline"
    } else if(e.target.id === "pay-btn") {
        e.preventDefault()
        const paymentFromData = new FormData(paymentForm)
        const fullName = paymentFromData.get("fullName")
        paymentFormContainer.style.display = "none"
        footer.innerHTML = `
            <div class="message">
                <h2>Thanks, ${fullName}!</h2>
                <h2>Your order is on its way!</h2>
            </div>
            `
    }
})

function handleAddBtnClick(menuId) {
    const targetMenuObj = menuArray.find(function(menu) {
        return menu.id === parseInt(menuId)
    })
    
    orderArray.push(targetMenuObj)
    render()
}

function getOrderHtml() {
    let orderHtml = ""
    orderHtml = orderArray.map(function(order) {
        return  `
        <section class="order-list">
            <h2 class="card-title">${order.name}</h2>
            <button class="remove-btn" id="remove-btn" data-remove="${order.id}">remove</button>
            <div class="align-right">
                <h3 class="card-price">$${order.price}</h3>
            </div>
        </section>
    `
    }).join("")
    
    return orderHtml
    render()
}

function handleRemoveBtnClick(arr, orderId) {
    const targetOrderObjIndex = arr.findIndex(function(order) {
        return order.id === parseInt(orderId);
    })

    if (targetOrderObjIndex !== -1) {
        arr.splice(targetOrderObjIndex, 1)
        render()
    }
}

function getTotalPriceHtml() {
    let totalPriceHtml = ""
    
    const totalPrice = orderArray.reduce(function(total, currentOrder) {
        return total + currentOrder.price
    }, 0)
    
    totalPriceHtml = `
        <h2 class="card-title">Total price:</h2>
        <h3 class="card-price">$${totalPrice}</h3>
    `
    
    return totalPriceHtml
}

function render() {
    document.getElementById("order").innerHTML = getOrderHtml()
    document.getElementById("order-total").innerHTML = getTotalPriceHtml()
}