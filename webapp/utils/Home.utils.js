const ModelNames = {
    LocalModel: "LocalDataModel",
    Suppliers: "Suppliers"
}

sap.ui.define([
    'com/bootcamp/sapui5/finalproject/services/Home.services',
    "sap/ui/model/json/JSONModel"
], function (HomeService, JSONModel) {
    "use strict"

    return {
        init: function (onNorthwindModel) {
            this._onNorthwindModel = onNorthwindModel
        },

        getDataSuppliers: async function(onFilters) {
            return HomeService.getSuppliers(this._onNorthwindModel, onFilters)
        },

        // setInitModelLocalData: function (oComponent) {
        //     oComponent.setModel(new JSONModel({
        //         valueInput: '',
        //         categories: [],
        //         suppliers: []
        //     }), ModelNames.LocalModel)
        // },

        setSuppliersModel: async function(oController, oDatos) {
            let oListModel = oController.getOwnerComponent().getModel(ModelNames.Suppliers)

            if (!oListModel) {
                const oModel  = new JSONModel([]);
                oModel.setSizeLimit(1000000);	
                oController.getOwnerComponent().setModel(oModel, ModelNames.Suppliers);  
                oListModel = oController.getOwnerComponent().getModel(ModelNames.Suppliers);
            }

            oListModel.setData(oDatos)
        },

        getModelNames: function () {
            return ModelNames
        }
    }
})