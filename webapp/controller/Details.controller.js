sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"com/bootcamp/sapui5/finalproject/utils/Routes.utils",
		"sap/ui/model/json/JSONModel",
		"com/bootcamp/sapui5/finalproject/utils/Details.utils",
	],
	(Controller, RoutesUtils, JSONModel, DetailsUtils) => {
		return Controller.extend(
			"com.bootcamp.sapui5.finalproject.controller.Details",
			{
				onInit() {
					const oRouteNames = RoutesUtils.getRouteNames();
					const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter
						.getRoute(oRouteNames.details)
						.attachPatternMatched(this._onObjectMatched, this);
				},

				_onObjectMatched: function (oEvent) {
					const SupplierID = oEvent.getParameter("arguments").SupplierID;

					this.getView().bindElement({
						path: `/Suppliers(${SupplierID})`,
						parameters: {
							expand: "Products",
						},
					});
				},

				onOpenPopoverDialog: function (oEvent) {
					// Obtener el ítem seleccionado (fila)
					const oItem = oEvent.getSource();

					// Obtener el contexto de binding del ítem
					const oBindingContext = oItem.getBindingContext();

					// Obtener el objeto completo del producto
					const oProduct = oBindingContext.getObject();

					console.log("Producto seleccionado:", oProduct);

					// Opcional: Crear un modelo específico para el diálogo con los datos del producto
					// const oDialogProductModel = new JSONModel(oProduct);
					// this.getView().setModel(oDialogProductModel, "DialogProduct");

					DetailsUtils.setDialogProductModel(this, oProduct);

					// this.getView().bindElement({
					//     path: `/Products(${oProduct.ProductID})`,
					// })

					// create dialog lazily
					if (!this.oMPDialog) {
						this.oMPDialog = this.loadFragment({
							name: "com.bootcamp.sapui5.finalproject.view.fragments.DialogProductDetails",
						});
					}
					this.oMPDialog.then(
						function (oDialog) {
							this.oDialog = oDialog;
							this.oDialog.open();
							console.log(this.oDialog);
						}.bind(this),
					);
				},

				_closeDialog: function () {
					this.oDialog.close();
				},
			},
		);
	},
);
