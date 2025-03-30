sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/finalproject/utils/Routes.utils"
], (Controller, RoutesUtils) => {

    return Controller.extend("com.bootcamp.sapui5.finalproject.controller.Details", {
        onInit() {
            const oRouteNames = RoutesUtils.getRouteNames()
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute(oRouteNames.details).attachPatternMatched(this._onObjectMatched, this);

            console.log(this.getView())
        },

        _onObjectMatched: function (oEvent) {
            const SupplierID = oEvent.getParameter("arguments").SupplierID;

            this.getView().bindElement({
                path: `/Suppliers(${SupplierID})`,
                parameters: {
                    expand: "Products"
                }
            });
        },
    });
});