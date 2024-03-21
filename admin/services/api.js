function Api() {
    this.fetchData = function () {
        const promise = axios({
            method: 'get',
            url: 'https://65d8a73dc96fbb24c1bc0621.mockapi.io/api/Products'
        });

        return promise;
    }

    this.getProductById = function (id) {
        const promise = axios({
            method: 'get',
            url: `https://65d8a73dc96fbb24c1bc0621.mockapi.io/api/Products/${id}`
        });

        return promise;
    }

    this.addProduct = function (product) {
        return axios({
            method: 'POST',
            url: 'https://65d8a73dc96fbb24c1bc0621.mockapi.io/api/Products',
            data: product,
        });
    }

    this.deleteProduct = function (id) {
        return axios({
            method: 'DELETE',
            url: `https://65d8a73dc96fbb24c1bc0621.mockapi.io/api/Products/${id}`,
        });
    }

    this.editProduct = function (product) {
        return axios({
            method: 'PUT',
            url: `https://65d8a73dc96fbb24c1bc0621.mockapi.io/api/Products/${product.id}`,
            data: product,
        });
    }
}