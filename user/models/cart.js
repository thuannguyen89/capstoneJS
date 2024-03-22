// Lớp dôi tượng : Cart
function Cart() {
    this.items = [];

    this.addItem = function (item) {
        this.items.push(item);
    };

    this.findIndexItemById = function (id) {
        let index = -1;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.id == id) {
                index = i;
                break;
            }
        }

        return index;
    }

    this.findItemById = function (id) {
        let index = this.findIndexItemById(id);

        // Trả về tất cả thông tin của item nếu tìm thấy 
        if (index !== -1) {
            return this.items[index];
        }

        return null;
    };

    this.deleteItem = function (id) {
        // Tim vi tri cua item can xoa
        let index = this.findIndexItemById(id);

        // Xoa item
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    };

    this.updateItem = function (item) {
        let index = this.findIndexItemById(item.id);

        // Cập nhật item đến cart
        if (index !== -1) {
            this.items[index] = item;
        }
    };

    this.calcTotalPrice = function () {
        let totalPrice = 0;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            totalPrice += item.price * item.qty;
        }

        return totalPrice;
    }
}