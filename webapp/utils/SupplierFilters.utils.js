sap.ui.define([
    "sap/ui/model/json/JSONModel"
], (JSONModel) => {

    return {
        init (oController) {
            this._oController = oController
            this.setInitModelLocalData([])
        },

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

        getFiltersModel() {
            return this._oController.getOwnerComponent().getModel(this.getModelNames().Filters)
        },

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