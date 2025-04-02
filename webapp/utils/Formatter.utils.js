sap.ui.define([], () => {
    return {
        /**
         * Determina el estado visual de las unidades en stock
         * @param {string} value - Cantidad de unidades en stock
         * @returns {string} Estado visual (Error, Warning, Success)
         */
        getStateUnitStock: (value) => {
            const nValue = Number.parseInt(value, 10);
            if (nValue <= 20) {
                return "Error";
            }
            if (nValue > 20 && nValue <= 100) {
                return "Warning"
            }
            return "Success";
        }
    };
});
