sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"com/bootcamp/sapui5/finalproject/utils/Routes.utils",
		"com/bootcamp/sapui5/finalproject/utils/Details.utils",
		"sap/ui/core/routing/History",
		"sap/ui/core/UIComponent",
		"com/bootcamp/sapui5/finalproject/utils/Products.utils",
	],
	(Controller, RoutesUtils, DetailsUtils, History, UIComponent, ProductsUtils) => {
		return Controller.extend(
			"com.bootcamp.sapui5.finalproject.controller.Details",
			{
				onInit() {
					const oRouteNames = RoutesUtils.getRouteNames()
					this.oRouteNames = RoutesUtils.getRouteNames()

					ProductsUtils.init(this)

					const oRouter = this.getRouter()

					oRouter
						.getRoute(oRouteNames.details)
						.attachPatternMatched(this._onObjectMatched, this)
				},

				getRouter() {
					return UIComponent.getRouterFor(this);
				},

				onNavBack() {

					const oHistory = History.getInstance();
					const sPreviousHash = oHistory.getPreviousHash();

					console.log({ sPreviousHash, oHistory });

					if (sPreviousHash !== undefined) {
						window.history.go(-1)
					} else {
						this.getRouter().navTo(this.oRouteNames.home, {}, true /*no history*/);
					}
				},

				_onObjectMatched(oEvent) {
					const SupplierID = oEvent.getParameter("arguments").SupplierID;

					this.getView().bindElement({
						path: `/Suppliers(${SupplierID})`,
						parameters: {
							expand: "Products",
						},
					});
				},

				onOpenPopoverDialog(oEvent) {
					// Obtener el ítem seleccionado (fila)
					const oItem = oEvent.getSource();

					// Obtener el contexto de binding del ítem
					const oBindingContext = oItem.getBindingContext();

					// Obtener el objeto completo del producto
					const oProduct = oBindingContext.getObject();

					// Crear un modelo específico para el diálogo con los datos del producto
					DetailsUtils.setDialogProductModel(this, oProduct);

					// create dialog lazily
					if (!this.oMPDialog) {
						this.oMPDialog = this.loadFragment({
							name: "com.bootcamp.sapui5.finalproject.view.fragments.DialogProductDetails",
						})
					}
					this.oMPDialog.then(
						function (oDialog) {
							this.oDialog = oDialog;
							this.oDialog.open();
						}.bind(this),
					)
				},

				_closeDialog() {
					this.oDialog.close();
				},

				onOpenNewProductModal() {
					// create dialog lazily
					if (!this.oMPDialog) {
						this.oMPDialog = this.loadFragment({
							name: "com.bootcamp.sapui5.finalproject.view.fragments.DialogNewProduct",
						})
					}
					this.oMPDialog.then(
						function (oDialog) {
							this.oDialog = oDialog
							this.oDialog.open()
						}.bind(this),
					)
				},

				onCancelNewProduct() {
					this.oDialog.close();
				},
			},
		);
	},
);
