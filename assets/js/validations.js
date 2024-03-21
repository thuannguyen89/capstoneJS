function Validation() {
    this.kiemTraRong = function (value, spanId, message) {
        if (value === "") {
            getEle(spanId).innerHTML = message;
            return false;
        }

        getEle(spanId).innerHTML = "";
        return true;
    };

    this.kiemTraTenSP = function (tenSP, spanId) {
        // Độ dài tài khoản phải từ 4 ký tự trở lên
        let isValid = true;
        let message = '';
        if (4 > tenSP.length) {
            message = `Độ dài tên SP phải từ 4 ký tự trở lên`;
            isValid = false;
        }

        getEle(spanId).innerHTML = message;
        return isValid;
    }

    this.kiemTraGiaSP = function (giaSP, spanId) {
        if (giaSP <= 0) {
            getEle(spanId).innerHTML = `Giá SP phải lớn hơn 0`;
            return false;
        }

        getEle(spanId).innerHTML = "";
        return true;
    }

    this.kiemTraLoaiSP = function (loaiSP, spanId) {
        if (loaiSP === "Chọn Thương hiệu") {
            getEle(spanId).innerHTML = 'Phải chọn thương hiệu hợp lệ.';
            return false;
        }

        getEle(spanId).innerHTML = "";
        return true;
    }

    this.kiemTraFormatImage = function (hinhSP, spanId) {
        let regrexImageUrl = /(https?:\/\/.*\.(?:png|jpg))/i;

        if (!regrexImageUrl.test(hinhSP)) {
            getEle(spanId).innerHTML = 'Đường dẫn hình SP sai định dạng.';
            return false;
        }

        getEle(spanId).innerHTML = "";
        return true;
    }
}