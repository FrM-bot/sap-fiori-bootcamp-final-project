sap.ui.define([], () => {
    return {
        async getSuppliers(onModel, onFilters) {
            const aPromiseRequest = [
                new Promise((resolve, reject) => {
                    onModel.read(this.getEndpoints().suppliers, {
                        filters: onFilters,
                        success: resolve,
                        error: reject
                    })
                })
            ]

            return Promise.all(aPromiseRequest)
        },

        getEndpoints() {
            return {
                suppliers: "/Suppliers"
            }
        }
    }
})
