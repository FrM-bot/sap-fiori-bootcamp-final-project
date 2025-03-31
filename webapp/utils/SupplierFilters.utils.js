sap.ui.define([
    "sap/ui/model/json/JSONModel"
], (JSONModel) => {

    return {
        setInitModelLocalData(oController, oFilters) {
            let oFiltersModel = oController.getOwnerComponent().getModel(this.getModelNames().Filters)

            if (!oFiltersModel) {
                const oModel = new JSONModel([]);
                oModel.setSizeLimit(1000000);
                oController.getOwnerComponent().setModel(oModel, this.getModelNames().Filters);
                oFiltersModel = oController.getOwnerComponent().getModel(this.getModelNames().Filters);
            }

            oFiltersModel.setData(oFilters)
        },

        getFiltersModel(oController) {
            return oController.getOwnerComponent().getModel(this.getModelNames().Filters)
        },

        addFilter(oController, oFilter) {
            const oFiltersModel = this.getFiltersModel(oController)
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

        removeFilter(oController, oFilter) {
            const oFiltersModel = this.getFiltersModel(oController)
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