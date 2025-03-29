const Endoints = {
    suppliers:"/Suppliers"
}

sap.ui.define([], function () {
    "use strict"

    return {
        getSuppliers: async function (onModel, onFilters) {
            const aPromiseRequest = [
                new Promise(function (resolve, reject) {
                    onModel.read(Endoints.suppliers, {
                        filters: onFilters,
                        success: resolve,
                        error: reject
                    })
                }.bind(this))
            ]

            return Promise.all(aPromiseRequest)
        }
    }
})