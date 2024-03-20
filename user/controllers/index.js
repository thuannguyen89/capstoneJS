const api = new Api();

// Lấy element theo id
function getEle(id) {
    return document.getElementById(id);
}

function getListProduct() {
    let promise = api.fetchData();

    promise.then(function (response) {
        renderUI(response.data);
    }).catch(function (error) {
        console.log(error);
    });
}

function renderUI(data) {
    let content = '';

    if (data.length > 0) {
        data.forEach(function (product) {
            content += `
        <div class="col-md-4">
            <div class="card mb-4 box-shadow">
                <img class="card-img-top"
                    data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                    alt="Thumbnail [100%x225]" style="width: 100%; display: block;"
                    src="${product.img}"
                    data-holder-rendered="true">
                <div class="card-body">
                    <p class="card-brand">
                        <span>Thương hiệu:</span>
                        <b>${product.type}</b>
                    </p>
                    <h3>${product.name}</h3>
                    <div class="card-item-compare gray-bg">
                        <span>${product.screen}</span>
                        <span>${product.backCamera}</span>
                        <span>${product.frontCamera}</span>
                    </div>
                    <strong class="price">${product.price.toLocaleString('vi-VN', {style:"currency", currency:"VND"})}</strong>
                    <p class="card-text">${product.desc}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary" onclick="addToCart(${product.id})">Thêm giỏ hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        });
    } else {
        content = `<div class="col-md-12">Không tồn tại sản phẩm nào.</div>`;
    }

    getEle("gridDanhSachSP").innerHTML = content;
}

getListProduct();


// Tìm kiếm theo loại
getEle("selLoai").onchange = function () {
    const typeValue = getEle("selLoai").value;

    let promise = api.fetchData();
    promise.then(function (response) {
        const listProducts = response.data;
        let listFilter = [];

        if (typeValue == 'all') {
            listFilter = listProducts;
        } else {
            listProducts.forEach(function (product) {
                if (product.type == typeValue) {
                    listFilter.push(product);
                }
            });
        }

        // Show list products is filtered.
        renderUI(listFilter);
    }).catch(function (error) {
        console.log(error);
    });
}