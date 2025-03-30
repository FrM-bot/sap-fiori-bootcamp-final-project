## Application Details
|               |
| ------------- |
|**Generation Date and Time**<br>Sat Mar 29 2025 04:52:49 GMT+0000 (Coordinated Universal Time)|
|**App Generator**<br>@sap/generator-fiori-freestyle|
|**App Generator Version**<br>1.17.0|
|**Generation Platform**<br>SAP Business Application Studio|
|**Template Used**<br>simple|
|**Service Type**<br>SAP System (ABAP On Premise)|
|**Service URL**<br>https://services.odata.org/northwind/northwind.svc/|
|**Module Name**<br>final-project|
|**Application Title**<br>Proyecto Final|
|**Namespace**<br>com.bootcamp.sapui5|
|**UI5 Theme**<br>sap_horizon|
|**UI5 Version**<br>1.134.1|
|**Enable Code Assist Libraries**<br>False|
|**Enable TypeScript**<br>False|
|**Add Eslint configuration**<br>False|

## final-project

An SAP Fiori application.

### Starting the generated app

-   This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite.  In order to launch the generated app, simply run the following from the generated app root folder:

```
    npm start
```

- It is also possible to run the application using mock data that reflects the OData Service URL supplied during application generation.  In order to run the application with Mock Data, run the following from the generated app root folder:

```
    npm run start-mock
```

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)


# Checklist de tareas

- [ ] Agregar al menos un filtro de proveedor, que permita
filtrar tanto por ID de proveedor como por nombre. (Si encuentra más filtros por implementar es un extra)

- [x] Generar la navegación a una vista de detalle

- [x] En la vista de detalle generar un form donde se muestre más información del proveedor

- [x] En esta vista detalle se deben mostrar los materiales que sean de este proveedor en una tabla.

- [x] Al dar Click en alguno de los materiales se debe abrir un Dialog(sap.m.Dialog), que va incluido dentro de una definición de un Fragment y mostrar en un form algunos datos del material seleccionado.

- [ ] Agregar un botón que permita la simulación de creación de un nuevo material(Podrían reutilizar el Dialog anterior, validando un estado de Visualización y otro de Creación para habilitar o no la modificación de los campos ) y abra un Dialog(sap.m.Dialog), que va incluido dentro de una definición de un Fragment y mostrar en un form los principales campos para la creación del material(Incluir Combo Box para los campos que apliquen), se deben tener 2 botones que permitan la opción de creación(En realidad no van a crear pero simulan la creación, pero lo que si deben es validar que los campos que definan como obligatorios estén diligenciados sino mostrar un mensaje que le informe el error al usuario) y un botón para cancelar la creación que debe cerrar el Dialog