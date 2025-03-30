const ModelNames = {
    LocalModel: "LocalDataModel",
    Suppliers: "Suppliers"
}

sap.ui.define([ 
    'com/bootcamp/sapui5/finalproject/services/Home.services',
    "sap/ui/model/json/JSONModel"
], (HomeService, JSONModel) => {

    return {
        init(onNorthwindModel) {
            this._onNorthwindModel = onNorthwindModel
        },

        async getDataSuppliers(onFilters) {
            return HomeService.getSuppliers(this._onNorthwindModel, onFilters)
        },

        // setInitModelLocalData: function (oComponent) {
        //     oComponent.setModel(new JSONModel({
        //         valueInput: '',
        //         categories: [],
        //         suppliers: []
        //     }), ModelNames.LocalModel)
        // },

        async setSuppliersModel (oController, oDatos) {
            let oListModel = oController.getOwnerComponent().getModel(ModelNames.Suppliers)

            if (!oListModel) {
                const oModel  = new JSONModel([]);
                oModel.setSizeLimit(1000000);	
                oController.getOwnerComponent().setModel(oModel, ModelNames.Suppliers);  
                oListModel = oController.getOwnerComponent().getModel(ModelNames.Suppliers);
            }

            oListModel.setData(oDatos)
        },

        getModelNames() {
            return ModelNames
        }
    }
})