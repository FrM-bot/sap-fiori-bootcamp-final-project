sap.ui.define([ 
    'com/bootcamp/sapui5/finalproject/services/Home.services',
    "sap/ui/model/json/JSONModel"
], (HomeService, JSONModel) => {

    return {
        init: function(onNorthwindModel) {
            this._onNorthwindModel = onNorthwindModel
        },

        getDataSuppliers: async function(onFilters) {
            return HomeService.getSuppliers(this._onNorthwindModel, onFilters)
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

        getModelNames() {
            return {
                Suppliers: "Suppliers"
            }            
        }
    }
})