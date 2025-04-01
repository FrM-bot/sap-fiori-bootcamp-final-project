sap.ui.define([ 
    'com/bootcamp/sapui5/finalproject/services/Suppliers.services',
    "sap/ui/model/json/JSONModel"
], (SuppliersService, JSONModel) => {

    return {
        init: function(onNorthwindModel) {
            this._onNorthwindModel = onNorthwindModel
        },

        getDataSuppliers: async function(onFilters) {
            return SuppliersService.getSuppliers(this._onNorthwindModel, onFilters)
        },

        setSuppliersModel: async function(oController, oDatos) {
            let oListModel = oController.getOwnerComponent().getModel(this.getModelNames().Suppliers)

            if (!oListModel) {
                const oModel  = new JSONModel([]);
                oModel.setSizeLimit(1000000);	
                oController.getOwnerComponent().setModel(oModel, this.getModelNames().Suppliers);  
                oListModel = oController.getOwnerComponent().getModel(this.getModelNames().Suppliers);
            }

            oListModel.setData(oDatos)
        },

        getSuppliersModel: function(oController) {
            return oController.getOwnerComponent().getModel(this.getModelNames().Suppliers)
        },

        getModelNames() {
            return {
                Suppliers: "Suppliers"
            }            
        }
    }
})