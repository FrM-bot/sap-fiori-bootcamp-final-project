const Endpoints = {
    suppliers:"/Suppliers"
}

sap.ui.define([], () => {

    return {
        async getSuppliers (onModel, onFilters) {
            const aPromiseRequest = [
                new Promise((resolve, reject) => {
                    onModel.read(Endpoints.suppliers, {
                        filters: onFilters,
                        success: resolve,
                        error: reject
                    })
                })
            ]

            return Promise.all(aPromiseRequest)
        }
    }
})