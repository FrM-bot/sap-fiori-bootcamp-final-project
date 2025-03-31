sap.ui.define([ 
    "sap/ui/model/json/JSONModel"
], (JSONModel) => {

    return {
        init: function(oController) {
            this._oController = oController
            this.setNewProductModel(oController, {
                ProductName: 'Holi'
            })
        },


        setNewProductModel: async function(oDatos) {
            let oNewProductModel = this._oController.getOwnerComponent().getModel(this.getModelNames().NewProduct)

            if (!oNewProductModel) {
                const oModel  = new JSONModel({});
                oModel.setSizeLimit(1);	
                this._oController.getOwnerComponent().setModel(oModel, this.getModelNames().NewProduct);  
                oNewProductModel = this._oController.getOwnerComponent().getModel(this.getModelNames().NewProduct);
            }

            oNewProductModel.setData(oDatos)
        },

        getModelNames() {
            return {
                NewProduct: "NewProduct"
            }            
        }
    }
})