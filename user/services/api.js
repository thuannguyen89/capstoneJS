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
}