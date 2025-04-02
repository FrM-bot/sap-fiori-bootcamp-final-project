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
            
            let oProductsModel = oController.getOwnerComponent().getModel(this.getModelNames().Products)

            if (!oProductsModel) {
                const oModel = new JSONModel([]);
                oModel.setSizeLimit(1000000);	
                oController.getOwnerComponent().setModel(oModel, this.getModelNames().Products);  
                oProductsModel = oController.getOwnerComponent().getModel(this.getModelNames().Products);
            }

            oProductsModel.setData(processedData)
        },

        addNewProduct: function(oController, oNewProduct) {
            const oProductsModel = this.getProductsModel(oController)
            const oCurrentProducts = oProductsModel.getData()
            const oNewProductList = oCurrentProducts.concat(oNewProduct)
            oProductsModel.setData(oNewProductList)
        },
        
        getProductsModel: function(oController) {
            return oController.getOwnerComponent().getModel(this.getModelNames().Products)
        },

        getNewProductModel: function(oController) {
            return oController.getOwnerComponent().getModel(this.getModelNames().NewProduct)
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