sap.ui.define([ 
    "sap/ui/model/json/JSONModel",
    'com/bootcamp/sapui5/finalproject/services/Categories.services'
], (JSONModel, CategoriesService) => {

    return {
        init: function(onNorthwindModel) {
            this._oNorthwindModel = onNorthwindModel
        },

        getDataCategories: async function(onFilters) {
            return CategoriesService.getCategories(this._oNorthwindModel, onFilters)
        },

        setCategoriesModel: async function(oController, oDatos) {
            let oListModel = oController.getOwnerComponent().getModel(this.getModelNames().Categories)

            if (!oListModel) {
                const oModel = new JSONModel([]);
                oModel.setSizeLimit(1000000);	
                oController.getOwnerComponent().setModel(oModel, this.getModelNames().Categories);  
                oListModel = oController.getOwnerComponent().getModel(this.getModelNames().Categories);
            }

            oListModel.setData(oDatos)
        },
        
        getCategoriesModel: function(oController) {
            return oController.getOwnerComponent().getModel(this.getModelNames().Categories);
        },

        getModelNames() {
            return {
                Categories: "Categories"
            }            
        }
    }
})
