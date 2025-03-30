const DetailsModelNames = {
	DialogProduct: "DialogProduct",
};

sap.ui.define(["sap/ui/model/json/JSONModel"], (JSONModel) => {
	return {
		setDialogProductModel(oController, oProduct) {
            let oDialogProductModel = oController.getOwnerComponent().getModel(DetailsModelNames.DialogProduct)

            if (!oDialogProductModel) {
                const oModel  = new JSONModel({});
                oModel.setSizeLimit(1);	
                oController.getOwnerComponent().setModel(oModel, DetailsModelNames.DialogProduct);  
                oDialogProductModel = oController.getOwnerComponent().getModel(DetailsModelNames.DialogProduct);
            }

            oDialogProductModel.setData(oProduct)
        }
	};
});
