sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"com/bootcamp/sapui5/finalproject/utils/Routes.utils",
		"com/bootcamp/sapui5/finalproject/utils/Details.utils",
		"sap/ui/core/routing/History",
		"sap/ui/core/UIComponent",
		"com/bootcamp/sapui5/finalproject/utils/Products.utils",
		"com/bootcamp/sapui5/finalproject/utils/Categories.utils",
	],
	(
		Controller,
		RoutesUtils,
		DetailsUtils,
		History,
		UIComponent,
		ProductsUtils,
		CategoriesUtils,
	) => {
		return Controller.extend(
			"com.bootcamp.sapui5.finalproject.controller.Details",
			{
				async onInit() {
					const oRouteNames = RoutesUtils.getRouteNames();
					this.oRouteNames = RoutesUtils.getRouteNames();

					ProductsUtils.setNewProductModel(this, {});

					const oRouter = this.getRouter();

					oRouter
						.getRoute(oRouteNames.details)
						.attachPatternMatched(this._onObjectMatched, this);

					const oCategories = await CategoriesUtils.getDataCategories([]);
					const [{ results: categoriesResults }] = oCategories;
					await CategoriesUtils.setCategoriesModel(this, categoriesResults);

					// const oProducts = await ProductsUtils.getDataProducts([])

					// const [{ results: productsResults }] = oProducts

					// console.log({ productsResults })

					//  get the supplier ID from the route
					const { SupplierID } = this.getRouter().getParameters();

					ProductsUtils.setNewProductModel(this, {
						ProductID: 0,
						ProductName: "",
						UnitPrice: 0,
						UnitsInStock: 0,
						Discontinued: false,
						CategoryID: 0,
						SupplierID
					})

					console.log(this.getOwnerComponent());
				},

				getRouter() {
					return UIComponent.getRouterFor(this);
				},

				onNavBack() {
					const oHistory = History.getInstance();
					const sPreviousHash = oHistory.getPreviousHash();

					if (sPreviousHash !== undefined) {
						window.history.go(-1);
					} else {
						this.getRouter().navTo(
							this.oRouteNames.home,
							{},
							true /*no history*/,
						);
					}
				},

				_onObjectMatched(oEvent) {
					const SupplierID = oEvent.getParameter("arguments").SupplierID;

					this.getView().bindElement({
						path: `/Suppliers(${SupplierID})`,
						parameters: {
							expand: "Products/Category",
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
					if (!this.oProductDetailsDialog) {
						this.oProductDetailsDialog = this.loadFragment({
							name: "com.bootcamp.sapui5.finalproject.view.fragments.DialogProductDetails",
						});
					}
					this.oProductDetailsDialog.then(
						function (oDialog) {
							this.oDialog = oDialog;
							this.oDialog.open();
						}.bind(this),
					);
				},

				_closeDialog() {
					this.oDialog.close();
				},

				onOpenNewProductModal() {
					// create dialog lazily
					if (!this.oNewProductDialog) {
						this.oNewProductDialog = this.loadFragment({
							name: "com.bootcamp.sapui5.finalproject.view.fragments.DialogNewProduct",
						});
					}
					this.oNewProductDialog.then(
						function (oDialog) {
							this.oDialog = oDialog;
							this.oDialog.open();
						}.bind(this),
					);
				},

				onCancelNewProduct() {
					this.oDialog.close();
				},
				
				onSaveNewProduct() {
					// Obtener el modelo de nuevo producto
					const oNewProductModel = this.getView().getModel("NewProduct");
					const oNewProductData = oNewProductModel.getData();
					
					// Generar un ID único para el nuevo producto (simulación)
					const iNewProductId = Math.floor(Math.random() * 1000) + 1000;
					
					// Crear el objeto de producto
					const oProductData = {
						ProductID: iNewProductId,
						ProductName: oNewProductData.ProductName,
						UnitPrice: Number.parseFloat(oNewProductData.UnitPrice) || 0,
						UnitsInStock: Number.parseInt(oNewProductData.UnitsInStock, 10) || 0,
						QuantityPerUnit: oNewProductData.QuantityPerUnit || "",
						Discontinued: oNewProductData.Discontinued || false,
						CategoryID: oNewProductData.CategoryID,
						SupplierID: oNewProductData.SupplierID
					};
					
					// Obtener la categoría seleccionada para agregarla al producto
					const oCategoriesModel = this.getView().getModel("Categories");
					const aCategories = oCategoriesModel.getData();
					const oSelectedCategory = aCategories.find(cat => cat.CategoryID === oNewProductData.CategoryID);
					
					if (oSelectedCategory) {
						oProductData.Category = {
							CategoryID: oSelectedCategory.CategoryID,
							CategoryName: oSelectedCategory.CategoryName
						};
					}
					
					// Simular la creación del producto agregándolo al modelo local
					// 1. Obtener el binding context actual (proveedor)
					const oBindingContext = this.getView().getBindingContext();
					const oSupplier = oBindingContext.getObject();
					
					// 2. Obtener la lista actual de productos del proveedor
					const aProducts = oSupplier.Products ? [...oSupplier.Products] : [];
					
					// 3. Agregar el nuevo producto a la lista
					aProducts.push(oProductData);
					
					// 4. Actualizar el modelo local (simulando la respuesta del servidor)
					const oModel = this.getView().getModel();
					const sPath = `${oBindingContext.getPath()}/Products`;
					oModel.setProperty(sPath, aProducts);
					
					// Cerrar el diálogo
					this.oDialog.close();
					
					// Mostrar mensaje de éxito
					sap.m.MessageToast.show("Producto creado con éxito (simulación)");
					
					// Limpiar el modelo de nuevo producto para futuras creaciones
					oNewProductModel.setData({
						ProductID: 0,
						ProductName: "",
						UnitPrice: 0,
						UnitsInStock: 0,
						QuantityPerUnit: "",
						Discontinued: false,
						CategoryID: 0,
						SupplierID: oNewProductData.SupplierID
					});
				},
			},
		);
	},
);
