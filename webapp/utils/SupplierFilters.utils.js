sap.ui.define([
    "sap/ui/model/json/JSONModel"
], (JSONModel) => {

    return {
        init (oController) {
            this._oController = oController
            this.setInitModelLocalData([])
        },

        // function to set initial model local data
        setInitModelLocalData(oFilters) {
            let oFiltersModel = this._oController.getOwnerComponent().getModel(this.getModelNames().Filters)

            if (!oFiltersModel) {
                const oModel = new JSONModel([]);
                oModel.setSizeLimit(1000000);
                this._oController.getOwnerComponent().setModel(oModel, this.getModelNames().Filters);
                oFiltersModel = this._oController.getOwnerComponent().getModel(this.getModelNames().Filters);
            }

            oFiltersModel.setData(oFilters)
        },

        // function to get filters model
        getFiltersModel() {
            return this._oController.getOwnerComponent().getModel(this.getModelNames().Filters)
        },

        // function to add filter
        addFilter(oFilter) {
            const oFiltersModel = this.getFiltersModel(this._oController)
            const oFilters = oFiltersModel.getData()

            // if exist filter
            const indexFilter = oFilters.findIndex((filter) => {
                return filter.sPath === oFilter.sPath
            })

            const existFilter = indexFilter >= 0

            // edit filter
            if (existFilter) {
                oFilters[indexFilter] = oFilter
            } else {
                oFilters.push(oFilter)
            }

            oFiltersModel.setData(oFilters)
        },

        // function to remove filter
        removeFilter(oFilter) {
            const oFiltersModel = this.getFiltersModel(this._oController)
            const oFilters = oFiltersModel.getData()

            const indexFilter = oFilters.findIndex((filter) => {
                return filter.sPath === oFilter.sPath
            })

            oFilters.splice(indexFilter, 1)

            oFiltersModel.setData(oFilters)
        },

        getModelNames() {
            return {
                Filters: "SupplierFilters",
            }
        }
    }
})