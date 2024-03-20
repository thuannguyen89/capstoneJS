const api = new Api();
const validation = new Validation();

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

getListProduct();

function renderUI(data) {
  let content = "";

  data.forEach(function (product) {
    content += `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.type}</td>
            <td>${product.price.toLocaleString('vi-VN', {style:"currency", currency:"VND"})}</td>
            <td>
                <img src="${product.img}" width="50" />
            </td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>${product.desc}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#productModal" onclick="editProduct(${
                  product.id
                })">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${
                  product.id
                })">Delete</button>
            </td>
        </tr>
    `;
  });

  getEle("tblDanhSachSP").innerHTML = content;
}

/**
 * Edit Product
 */
function editProduct(id) {
  // Change title model
  document.getElementsByClassName("modal-title")[0].innerHTML = "Cập Nhật Sản Phẩm";
  // Create button "Update Product"
  const btnUpdate = `<button class="btn btn-success" onclick="updateProduct(${id})">Cập Nhật Sản Phẩm</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  const promise = api.getProductById(id);
  promise
    .then(function (result) {
      const product = result.data;

      // Show thông tin ra ngoài các thẻ input
      getEle("idSP").value = product.id;
      getEle("tenSP").value = product.name;
      getEle("loaiSP").value = product.type;
      getEle("giaSP").value = product.price;
      getEle("hinhSP").value = product.img;
      getEle("manSP").value = product.screen;
      getEle("cameraSauSP").value = product.backCamera;
      getEle("cameraTruocSP").value = product.frontCamera;
      getEle("moTaSP").value = product.desc;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Update Product
 */
function updateProduct(id) {
  // Lấy thông tin SP từ người nhập liệu
  const _name = getEle("tenSP").value;
  const _type = getEle("loaiSP").value;
  const _price = getEle("giaSP").value;
  const _img = getEle("hinhSP").value;
  const _screen = getEle("manSP").value;
  const _backCamera = getEle("cameraSauSP").value;
  const _frontCamera = getEle("cameraTruocSP").value;
  const _desc = getEle("moTaSP").value;

  /**
   * Validation
   *  + Tên SP phải từ 4 ký tự trở lên, không để trống
   *  + Giá SP phải lớn hơn 0, không để trống
   *  + Thương hiệu phải chọn hợp lệ, không để trống
   *  + Hình ảnh phải là đường dẫn hợp lệ, không để trống
   */
  let isValid = true;

  // Kiểm tra rỗng
  isValid &= validation.kiemTraRong(_name, 'invalidTenSP', 'Tên SP không được trống.');
  isValid &= validation.kiemTraRong(_type, 'invalidLoaiSP', 'Thương hiệu SP không được trống.');
  isValid &= validation.kiemTraRong(_price, 'giaSP', 'Giá SP không được trống.');
  isValid &= validation.kiemTraRong(_img, 'hinhSP', 'Hình ảnh SP không được trống.');

  // Kiểm tra Tên SP phải từ 4 ký tự trở lên
  isValid &= validation.kiemTraTenSP(_name, 'invalidTenSP');

  // Kiểm tra thương hiệu hợp lệ
  isValid &= validation.kiemTraLoaiSP(_type, 'invalidLoaiSP');

  // Kiểm tra giá SP phải lớn hơn 0
  isValid &= validation.kiemTraGiaSP(_price, 'invalidGiaSP');

  // Kiểm tra hình SP là hợp lệ
  isValid &= validation.kiemTraFormatImage(_img, 'invalidHinhSP');

  if (isValid == false) {
    return;
  }

  // tạo object product từ Product
  const product = new Product(id, _name, Number(_price), _screen, _backCamera, _frontCamera, _img, _desc, _type);

  const promise = api.editProduct(product);
  promise
    .then(function (result) {
      // close modal
      document.getElementsByClassName("close")[0].click();
      //re-fetch data
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Delete Product
 */
function deleteProduct(id) {
  const promise = api.deleteProduct(id);
  promise
    .then(function (reslut) {
      // re-fetch new data
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemSP").onclick = function () {
  // Change title model
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Mới Sản Phẩm";

  // Create button "Add Product"
  const btnAdd = `<button class="btn btn-success" onclick="addProduct()">Thêm SP</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
};

/**
 * Add Product
 */
function addProduct() {
  // Lấy thông tin SP từ người nhập liệu
  const _name = getEle("tenSP").value;
  const _type = getEle("loaiSP").value;
  const _price = getEle("giaSP").value;
  const _img = getEle("hinhSP").value;
  const _screen = getEle("manSP").value;
  const _backCamera = getEle("cameraSauSP").value;
  const _frontCamera = getEle("cameraTruocSP").value;
  const _desc = getEle("moTaSP").value;

  /**
   * Validation
   *  + Tên SP phải từ 4 ký tự trở lên, không để trống
   *  + Giá SP phải lớn hơn 0, không để trống
   *  + Thương hiệu phải chọn hợp lệ, không để trống
   *  + Hình ảnh phải là đường dẫn hợp lệ, không để trống
   */
  let isValid = true;

  // Kiểm tra rỗng
  isValid &= validation.kiemTraRong(_name, 'invalidTenSP', 'Tên SP không được trống.');
  isValid &= validation.kiemTraRong(_type, 'invalidLoaiSP', 'Thương hiệu SP không được trống.');
  isValid &= validation.kiemTraRong(_price, 'giaSP', 'Giá SP không được trống.');
  isValid &= validation.kiemTraRong(_img, 'hinhSP', 'Hình ảnh SP không được trống.');

  // Kiểm tra Tên SP phải từ 4 ký tự trở lên
  isValid &= validation.kiemTraTenSP(_name, 'invalidTenSP');

  // Kiểm tra thương hiệu hợp lệ
  isValid &= validation.kiemTraLoaiSP(_type, 'invalidLoaiSP');

  // Kiểm tra giá SP phải lớn hơn 0
  isValid &= validation.kiemTraGiaSP(_price, 'invalidGiaSP');

  // Kiểm tra hình SP là hợp lệ
  isValid &= validation.kiemTraFormatImage(_img, 'invalidHinhSP');

  if (isValid == false) {
    return;
  }

  // tạo object product từ Product
  const product = new Product("", _name, Number(_price), _screen, _backCamera, _frontCamera, _img, _desc, _type);

  const promise = api.addProduct(product);
  promise
    .then(function () {
      // close modal
      document.getElementsByClassName("close")[0].click();
      //re-fetch data
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Search Product by Type
 */
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

/**
 * Search product by name
 */
getEle("btnTimSP").onclick = function () {
  let searchTenSP = getEle("searchTenSP").value;
  let promise = api.fetchData();
  promise.then(function (response) {
    const listProducts = response.data;

    let regex = new RegExp(searchTenSP);
    let listFilter = [];
    listProducts.forEach(function (product) {
      if (product.name.search(regex) > -1) {
        listFilter.push(product);
      }
    })

    // Show list products is filtered.
    renderUI(listFilter);
  }).catch(function (error) {
    console.log(error);
  });
}

/**
 * Sort list products by price
 */
getEle("selGiaSP").onchange = function () {
  const sortValue = getEle("selGiaSP").value;

  let promise = api.fetchData();
  promise.then(function (response) {
    let listProducts = response.data;
    // Sort list
    listProducts = this.sortListProducts(listProducts, sortValue);

    // Show list products is filtered.
    renderUI(listProducts);
  }).catch(function (error) {
    console.log(error);
  });
}

// Sort list products by price
function sortListProducts(products, sortBy) {
  for (let i = 0; i < products.length; i++) {
    for (let j = i + 1; j < products.length; j++) {
      if (sortBy == 'tang') {
        if (products[i].price > products[j].price) {
          let temp = products[i];
          products[i] = products[j];
          products[j] = temp;
        }
      } else if (sortBy == 'giam') {
        if (products[i].price < products[j].price) {
          let temp = products[i];
          products[i] = products[j];
          products[j] = temp;
        }
      }

    }
  }

  return products;
}