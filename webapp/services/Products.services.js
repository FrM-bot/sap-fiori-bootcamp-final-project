sap.ui.define([], () => {
    return {
        async getProducts(onModel, onFilters) {
            const aPromiseRequest = [
                new Promise((resolve, reject) => {
                    onModel.read(this.getEndpoints().products, {
                        filters: onFilters,
                        urlParameters: {
                            "$expand": "Category"
                        },
                        success: resolve,
                        error: reject
                    })
                })
            ]

            return Promise.all(aPromiseRequest)
        },

        getEndpoints() {
            return {
                products: "/Products"
            }
        }
    }
})
