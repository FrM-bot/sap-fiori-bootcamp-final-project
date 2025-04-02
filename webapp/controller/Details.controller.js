sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"com/bootcamp/sapui5/finalproject/utils/Routes.utils",
		"com/bootcamp/sapui5/finalproject/utils/Details.utils",
		"sap/ui/core/routing/History",
		"sap/ui/core/UIComponent",
		"com/bootcamp/sapui5/finalproject/utils/Products.utils",
		"com/bootcamp/sapui5/finalproject/utils/Categories.utils",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"com/bootcamp/sapui5/finalproject/utils/Formatter.utils",
	],
	(
		Controller,
		RoutesUtils,
		DetailsUtils,
		History,
		UIComponent,
		ProductsUtils,
		CategoriesUtils,
		Filter,
		FilterOperator,
		Formatter,
	) => {
		return Controller.extend(
			"com.bootcamp.sapui5.finalproject.controller.Details",
			{
				formatter: Formatter,

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

					const oSupplierIDFilter = new Filter(
						"SupplierID",
						FilterOperator.EQ,
						this._oSupplierID,
					);

					const oProducts = await ProductsUtils.getDataProducts([
						oSupplierIDFilter,
					]);

					const [{ results: productsResults }] = oProducts;

					await ProductsUtils.setProductsModel(this, productsResults);

					ProductsUtils.setNewProductModel(this, {
						ProductID: 0,
						ProductName: "",
						UnitPrice: 0,
						UnitsInStock: 0,
						Discontinued: false,
						CategoryID: 0,
						SupplierID: this._oSupplierID,
					});
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

					this._oSupplierID = SupplierID;

					// Bind the supplier
					this.getView().bindElement({
						path: `/Suppliers(${SupplierID})`,
						// parameters: {
						// 	expand: "Products/Category",
						// },
					});
				},

				onOpenPopoverDialog(oEvent) {
					// Obtener el ítem seleccionado (fila)
					const oItem = oEvent.getSource();

					// Obtener el contexto de binding del ítem - especificando el modelo Products
					const oBindingContext = oItem.getBindingContext("Products");
					
					// Obtener el objeto completo del producto
					const oProduct = oBindingContext.getObject();
					
					console.log({oItem, oProduct, oBindingContext});
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

				// Funciones de validación para el formulario de nuevo producto
				onValidateProductName: function(oEvent) {
					const oInput = oEvent.getSource();
					const sValue = oInput.getValue().trim();
					
					if (!sValue) {
						oInput.setValueState("Error");
						this._updateSaveButtonState();
						return;
					}
					
					oInput.setValueState("None");
					this._updateSaveButtonState();
				},
				
				onValidateUnitPrice: function(oEvent) {
					const oInput = oEvent.getSource();
					const sValue = oInput.getValue().trim();
					const nValue = Number.parseFloat(sValue);

					console.log({sValue, nValue});
					
					if (Number.isNaN(nValue) || nValue <= 0) {
						oInput.setValueState("Error");
						this._updateSaveButtonState();
						return;
					}
					
					oInput.setValueState("None");
					this._updateSaveButtonState();
				},
				
				onValidateUnitsInStock: function(oEvent) {
					const oInput = oEvent.getSource();
					const sValue = oInput.getValue().trim();
					const nValue = Number.parseInt(sValue, 10);
					
					if (Number.isNaN(nValue) || nValue < 0 || nValue % 1 !== 0) {
						oInput.setValueState("Error");
						this._updateSaveButtonState();
						return;
					}
					
					oInput.setValueState("None");
					this._updateSaveButtonState();
				},
				
				onValidateCategory: function(oEvent) {
					const oSelect = oEvent.getSource();
					const sValue = oSelect.getSelectedKey();
					
					if (!sValue) {
						oSelect.setValueState("Error");
						this._updateSaveButtonState();
						return;
					}
					
					oSelect.setValueState("None");
					this._updateSaveButtonState();
				},
				
				_updateSaveButtonState: function() {
					// Obtener referencias a todos los campos obligatorios
					const oFragment = this.oDialog;
					
					if (!oFragment) {
						return;
					}
					
					const oProductNameInput = oFragment.getContent()[0].getContent()[1]; // SimpleForm->Input for ProductName
					const oUnitPriceInput = oFragment.getContent()[0].getContent()[3]; // SimpleForm->Input for UnitPrice
					const oUnitsInStockInput = oFragment.getContent()[0].getContent()[5]; // SimpleForm->Input for UnitsInStock
					const oCategorySelect = oFragment.getContent()[0].getContent()[11]; // SimpleForm->Select for Category
					
					// Verificar que todos los campos obligatorios tengan valores válidos
					const bValid = 
						oProductNameInput.getValue().trim() !== "" && oProductNameInput.getValueState() !== "Error" &&
						oUnitPriceInput.getValue().trim() !== "" && oUnitPriceInput.getValueState() !== "Error" &&
						oUnitsInStockInput.getValue().trim() !== "" && oUnitsInStockInput.getValueState() !== "Error" &&
						oCategorySelect.getSelectedKey() !== "" && oCategorySelect.getValueState() !== "Error";
					
					// Actualizar estado del botón Guardar
					const oSaveButton = oFragment.getButtons()[0];
					oSaveButton.setEnabled(bValid);
				},

				onSaveNewProduct() {
					// Primero valida el formulario completo
					const oFragment = this.oDialog;
					const oProductNameInput = oFragment.getContent()[0].getContent()[1];
					const oUnitPriceInput = oFragment.getContent()[0].getContent()[3];
					const oUnitsInStockInput = oFragment.getContent()[0].getContent()[5];
					const oCategorySelect = oFragment.getContent()[0].getContent()[11];
					
					// Verificar cada campo individualmente para actualizar su estado visual
					if (oProductNameInput.getValue().trim() === "") {
						oProductNameInput.setValueState("Error");
					}
					
					if (oUnitPriceInput.getValue().trim() === "") {
						oUnitPriceInput.setValueState("Error");
					}
					
					if (oUnitsInStockInput.getValue().trim() === "") {
						oUnitsInStockInput.setValueState("Error");
					}
					
					if (oCategorySelect.getSelectedKey() === "") {
						oCategorySelect.setValueState("Error");
					}
					
					// Actualiza el estado del botón (esto también verifica si todos los campos son válidos)
					this._updateSaveButtonState();
					
					// Si el botón está habilitado, procedemos a guardar
					const oSaveButton = oFragment.getButtons()[0];
					if (!oSaveButton.getEnabled()) {
						// Mostrar mensaje de error
						sap.m.MessageToast.show("Please fill in all required fields correctly");
						return;
					}
					
					// Obtener el modelo de nuevo producto
					const oNewProductModel = ProductsUtils.getNewProductModel(this);
					const oNewProductData = oNewProductModel.getData();

					// Generar un ID único para el nuevo producto (simulación)
					const iNewProductId = Math.floor(Math.random() * 1000) + 1000;

					// Crear el objeto de producto
					const oProductData = {
						ProductID: iNewProductId,
						ProductName: oNewProductData.ProductName,
						UnitPrice: oNewProductData.UnitPrice || "0",
						UnitsInStock:
							Number.parseInt(oNewProductData.UnitsInStock, 10) || 0,
						QuantityPerUnit: oNewProductData.QuantityPerUnit || "",
						Discontinued: oNewProductData.Discontinued || false,
						CategoryID: Number(oNewProductData.CategoryID),
						SupplierID: Number(this._oSupplierID)
					};

					// Obtener la categoría seleccionada para agregarla al producto
					const oCategoriesModel = CategoriesUtils.getCategoriesModel(this);
					const aCategories = oCategoriesModel.getData()

					const oSelectedCategory = aCategories.find(
						(cat) => cat.CategoryID === Number(oNewProductData.CategoryID),
					)

					if (oSelectedCategory) {
						oProductData.Category = {
							CategoryID: oSelectedCategory.CategoryID,
							CategoryName: oSelectedCategory.CategoryName,
						};
					}

					// 2. Agrego el nuevo producto
					ProductsUtils.addNewProduct(this, oProductData);

					// Cerrar el diálogo
					this.oDialog.close();

					// Mostrar mensaje de éxito
					sap.m.MessageToast.show("Producto creado con éxito");

					// Limpiar el modelo de nuevo producto para futuras creaciones
					oNewProductModel.setData({
						ProductID: 0,
						ProductName: "",
						UnitPrice: 0,
						UnitsInStock: 0,
						QuantityPerUnit: "",
						Discontinued: false,
						CategoryID: 0,
						SupplierID: oNewProductData.SupplierID,
					});
				},
			},
		);
	},
);
