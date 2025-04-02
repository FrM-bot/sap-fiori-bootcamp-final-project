sap.ui.define(["sap/ui/model/json/JSONModel"], (JSONModel) => {
	return {
		setDialogProductModel(oController, oProduct) {
			let oDialogProductModel = oController
				.getOwnerComponent()
				.getModel(this.getModelNames().DialogProduct);

			if (!oDialogProductModel) {
				const oModel = new JSONModel({});
				oModel.setSizeLimit(1);
                
				oController
					.getOwnerComponent()
					.setModel(oModel, this.getModelNames().DialogProduct);
    
				oDialogProductModel = oController
					.getOwnerComponent()
					.getModel(this.getModelNames().DialogProduct);
			}

			oDialogProductModel.setData(oProduct);
		},

		getModelNames() {
			return {
				DialogProduct: "DialogProduct",
			};
		},
	};
});
