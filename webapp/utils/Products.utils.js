sap.ui.define([ 
    "sap/ui/model/json/JSONModel",
    'com/bootcamp/sapui5/finalproject/services/Products.services'
], (JSONModel, ProductsService) => {

    return {
        init: function(onNorthwindModel) {
            this._onNorthwindModel = onNorthwindModel
        },

        getDataProducts: async function(onFilters) {
            return ProductsService.getProducts(this._onNorthwindModel, onFilters)
        },

        setProductsModel: async function(oController, oDatos) {
            // Procesar los datos para agregar CategoryName a cada producto
            const processedData = oDatos.map(product => {
                // Si el producto tiene una categoría expandida, usar su nombre
                if (product.Category) {
                    return {
                        ...product,
                        CategoryName: product.Category.CategoryName
                    };
                }
                return product;
            });
            
            let oListModel = oController.getOwnerComponent().getModel(this.getModelNames().Products)

            if (!oListModel) {
                const oModel = new JSONModel([]);
                oModel.setSizeLimit(1000000);	
                oController.getOwnerComponent().setModel(oModel, this.getModelNames().Products);  
                oListModel = oController.getOwnerComponent().getModel(this.getModelNames().Products);
            }

            oListModel.setData(processedData);
        },
        
        getProductsModel: function(oController) {
            return oController.getOwnerComponent().getModel(this.getModelNames().Products)
        },

        setNewProductModel: async function(oController, oDatos) {
            let oNewProductModel = oController.getOwnerComponent().getModel(this.getModelNames().NewProduct)

            if (!oNewProductModel) {
                const oModel  = new JSONModel({});
                oModel.setSizeLimit(1);	
                oController.getOwnerComponent().setModel(oModel, this.getModelNames().NewProduct);  
                oNewProductModel = oController.getOwnerComponent().getModel(this.getModelNames().NewProduct);
            }

            oNewProductModel.setData(oDatos)
        },

        getModelNames() {
            return {
                NewProduct: "NewProduct",
                Products: "Products"
            }            
        }
    }
})