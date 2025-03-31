sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/library",
	"com/bootcamp/sapui5/finalproject/utils/Home.utils",
	"com/bootcamp/sapui5/finalproject/utils/Routes.utils",
	"sap/ui/table/RowAction",
	"sap/ui/table/RowActionItem",
	"com/bootcamp/sapui5/finalproject/utils/SupplierFilters.utils",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
], (Controller, CoreLibrary, HomeUtils, RoutesUtils, RowAction, RowActionItem, SupplierFilters, Filter, FilterOperator) => {
	const SortOrder = CoreLibrary.SortOrder;
	return Controller.extend("com.bootcamp.sapui5.finalproject.controller.Home", {
		onInit: async function() {
			this.oModelNames = HomeUtils.getModelNames()

			this.oRouteNames = RoutesUtils.getRouteNames()

			this.oRouter = this.getOwnerComponent().getRouter()

			SupplierFilters.init(this)

			try {
				const oDatos = await HomeUtils.getDataSuppliers([])

				const [{ results }] = oDatos

				await HomeUtils.setSuppliersModel(this, results);
			} catch (error) {
				MessageToast.show("Error al obtener los datos", {
					width: "auto"
				})
			}

			const fnPress = this.onPressSupplierCell.bind(this);

			this.modes = [
				{
					key: "Navigation",
					text: "Navigation",
					handler: () => {
						const oTemplate = new RowAction({
							items: [
								new RowActionItem({
									type: "Navigation",
									press: fnPress,
									visible: "{Available}"
								})
							]
						});
						return [1, oTemplate];
					}
				}
			];

			this.switchState("Navigation");
		},

		switchState: function(sKey) {
			const oTable = this.byId("suppliersTable");
			let iCount = 0;
			let oTemplate = oTable.getRowActionTemplate();
			if (oTemplate) {
				oTemplate.destroy();
				oTemplate = null;
			}

			for (let i = 0; i < this.modes.length; i++) {
				if (sKey === this.modes[i].key) {
					const aRes = this.modes[i].handler();
					iCount = aRes[0];
					oTemplate = aRes[1];
					break;
				}
			}

			oTable.setRowActionTemplate(oTemplate);
			oTable.setRowActionCount(iCount);
		},

		clearAllSortings() {
			const oTable = this.byId("suppliersTable");
			oTable.getBinding().sort(null);
			this._resetSortingState();
		},

		_resetSortingState: function() {
			const oTable = this.byId("suppliersTable");
			const aColumns = oTable.getColumns();
			for (let i = 0; i < aColumns.length; i++) {
				aColumns[i].setSortOrder(SortOrder.None);
			}
		},

		onPressSupplierCell: function(oEvent) {
			const oRow = oEvent.getParameter("row")

			const SupplierID = this.getView().getModel().getProperty("SupplierID", oRow.getBindingContext());

			this.oRouter.navTo(this.oRouteNames.details, {
				SupplierID
			});
		},

		onCancelNewProduct: function() {
			this.oDialog.close();
		},

		onSearch: function(oEvent, field) {
			// add filter for search
			// const aFilters = [];
			const sQuery = oEvent.getSource().getValue()

			const isSearchingSupplierID = field === 'SupplierID'

			if (isSearchingSupplierID) {
				console.log(Number(sQuery))
				const filter = new Filter(field, FilterOperator.EQ, Number(sQuery))
				SupplierFilters.addFilter(filter)
			}

			if (!isSearchingSupplierID && sQuery && sQuery.length > 0) {
				const filter = new Filter(field, FilterOperator.Contains, sQuery);
				SupplierFilters.addFilter(filter)
			} 
			
			if (!sQuery || sQuery.length === 0) {
				// remove filter
				SupplierFilters.removeFilter(field)
			}

			const currentFilters = SupplierFilters.getFiltersModel().oData
			console.log({currentFilters})

			// update list binding
			const oList = this.byId("suppliersTable");
			const oBinding = oList.getBinding("rows");
			oBinding.filter(currentFilters, "Application");
		},
	});
});