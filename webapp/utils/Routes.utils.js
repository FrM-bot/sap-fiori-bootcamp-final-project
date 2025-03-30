const RouteNames = {
    home: 'home',
    details: 'details'
}

sap.ui.define([], () => {
    return {
        getRouteNames() {
            return RouteNames
        }
    }
})