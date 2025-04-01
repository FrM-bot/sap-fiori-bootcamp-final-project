sap.ui.define([], () => {
    return {
        async getCategories(onModel, onFilters) {
            const aPromiseRequest = [
                new Promise((resolve, reject) => {
                    onModel.read(this.getEndpoints().categories, {
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
                categories: "/Categories"
            }
        }
    }
})
