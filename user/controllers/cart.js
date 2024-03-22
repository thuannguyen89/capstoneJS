// Tạo đối tượng cart từ lớp đối tượng Cart
const cart = new Cart();

// Luon goi lay CART tu localStorage
getLocalStorage();

// Luu CART xuong localStorage
function setLocalStorage(items) {
    // Chuyen CART (JSON) thanh chuoi
    const arrString = JSON.stringify(items);

    // Luu xuong localStorage
    localStorage.setItem('CART', arrString);
}

// Lay CART tu localStorage
function getLocalStorage() {
    if (!localStorage.getItem('CART')) {
        return;
    }

    // Lay CART tu localStorage
    const arrString = localStorage.getItem('CART');

    // Chuyen chuoi lai thanh CART (JSON)
    const arrJson = JSON.parse(arrString);

    // Gan lai CART cho cart
    cart.items = arrJson;

    // Hien thi cart ra ben ngoai
    showCart();
}

function getEle(id) {
    return document.getElementById(id);
}

// Hiển thị Cart
function showCart() {
    let content = '';
    for (i = 0; i < cart.items.length; i++) {
        const item = cart.items[i];
        content += `
        <hr class="my-4">

        <div class="row mb-4 d-flex justify-content-between align-items-center">
            <div class="col-md-2">
                <img src="${item.img}"
                    class="img-fluid rounded-3" alt="${item.name}">
            </div>
            <div class="col-md-3">
                <h6 class="text-black mb-0">${item.name}</h6>
            </div>
            <div class="col-md-3 d-flex">
                <button class="btn btn-link px-2"
                    onclick="updateItem(${item.id}, ${i})">
                    <i class="fa fa-minus"></i>
                </button>

                <input id="inputQty_${i}" min="1" name="quantity" value="${item.qty}" type="number"
                    class="form-control form-control-sm" readonly />

                <button class="btn btn-link px-2"
                    onclick="updateItem(${item.id}, ${i}, true)">
                    <i class="fa fa-plus"></i>
                </button>
            </div>
            <div class="col-md-2">
                <h6 class="mb-0">${item.price.toLocaleString('vi-VN', {style:"currency", currency:"VND"})}</h6>
            </div>
            <div class="col-md-2">
                <button class="btn btn-danger" onclick="deleteItem(${item.id})">Delete</button>
            </div>
        </div>
        `;
    }

    // Hien thi content ra ngoai
    getEle("divGioHang").innerHTML = content;
    getEle("countItems").innerHTML = `${cart.items.length} sản phẩm`;

    // Show total price
    let totalPrice = cart.calcTotalPrice();
    getEle("totalPrices").innerHTML = totalPrice.toLocaleString('vi-VN', {
        style: "currency",
        currency: "VND"
    });

    if (totalPrice > 0) {
        getEle("btnPlaceOrder").disabled = false;
    } else {
        getEle("btnPlaceOrder").disabled = true;
    }
}

/**
 * Xóa Item
 */
function deleteItem(id) {
    // Xóa item khỏi cart
    cart.deleteItem(id);

    // Cap nhat lai localStorage
    setLocalStorage(cart.items);

    // Hien thi lai cart
    showCart();
}

/**
 * Cập nhật qty của giỏ hàng
 */
function updateItem(id, index, isPlus = false) {
    let inputQty = Number(getEle(`inputQty_${index}`).value);

    if (isPlus === true) {
        inputQty += 1;
    } else {
        inputQty -= 1;
    }

    // Nếu inputQty = 0 , thì delete item khỏi giỏ hàng.
    if (inputQty <= 0) {
        deleteItem(id);

        alert("Xóa sản phẩm thành công.");
    } else {
        let item = cart.findItemById(id);
        if (item) {
            item.qty = inputQty;
            cart.updateItem(item);

            // Cap nhat lai localStorage
            setLocalStorage(cart.items);

            showCart();
        } else {
            alert("Không cập nhật được QTY vào giỏ hàng vì không tìm thấy sản phẩm.")
        }
    }
}

/**
 * Thanh toán
 */
getEle("btnPlaceOrder").onclick = function() {
    // Clear localStorage
    setLocalStorage([]);

    // Clear gio hang
    getLocalStorage();

    // Load lai card
    showCart();
}