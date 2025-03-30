sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/library",
    "com/bootcamp/sapui5/finalproject/utils/Home.utils",
    "com/bootcamp/sapui5/finalproject/utils/Routes.utils",
	"sap/ui/table/RowAction",
	"sap/ui/table/RowActionItem",
], (Controller, CoreLibrary, HomeUtils, RoutesUtils, RowAction, RowActionItem,) => {
	const SortOrder = CoreLibrary.SortOrder;
    return Controller.extend("com.bootcamp.sapui5.finalproject.controller.Home", {
		onInit: async function() {
			this.oModelNames = HomeUtils.getModelNames()
			
            this.oRouteNames = RoutesUtils.getRouteNames()

            this.oRouter = this.getOwnerComponent().getRouter();

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
						const oTemplate = new RowAction({items: [
							new RowActionItem({
								type: "Navigation",
								press: fnPress,
								visible: "{Available}"
							})
						]});
						return [1, oTemplate];
					}
				}
			];

			this.switchState("Navigation");
		},

		switchState: function(sKey) {
			const oTable = this.byId("table");
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

		clearAllSortings: function(oEvent) {
			const oTable = this.byId("table");
			oTable.getBinding().sort(null);
			this._resetSortingState();
		},

		_resetSortingState: function() {
			const oTable = this.byId("table");
			const aColumns = oTable.getColumns();
			for (let i = 0; i < aColumns.length; i++) {
				aColumns[i].setSortOrder(SortOrder.None);
			}
		},

		onPressSupplierCell (oEvent) {
			const oRow = oEvent.getParameter("row")

			const SupplierID = this.getView().getModel().getProperty("SupplierID", oRow.getBindingContext());

            this.oRouter.navTo(this.oRouteNames.details, {
                SupplierID
            });
        }
    });
});