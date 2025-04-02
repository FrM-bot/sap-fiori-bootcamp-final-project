## Proyecto final

Proyecto final de la bootcamp de SAP Fiori.

`Al momento de crear el SAP Build Work Zone, standard edition da error.`
# Checklist de tareas

- [x] Agregar al menos un filtro de proveedor, que permita
filtrar tanto por ID de proveedor como por nombre. (Si encuentra más filtros por implementar es un extra)

- [x] Generar la navegación a una vista de detalle

- [x] En la vista de detalle generar un form donde se muestre más información del proveedor

- [x] En esta vista detalle se deben mostrar los materiales que sean de este proveedor en una tabla.

- [x] Al dar Click en alguno de los materiales se debe abrir un Dialog(sap.m.Dialog), que va incluido dentro de una definición de un Fragment y mostrar en un form algunos datos del material seleccionado.

- [x] Agregar un botón que permita la simulación de creación de un nuevo material(Podrían reutilizar el Dialog anterior, validando un estado de Visualización y otro de Creación para habilitar o no la modificación de los campos ) y abra un Dialog(sap.m.Dialog), que va incluido dentro de una definición de un Fragment y mostrar en un form los principales campos para la creación del material(Incluir Combo Box para los campos que apliquen), se deben tener 2 botones que permitan la opción de creación(En realidad no van a crear pero simulan la creación, pero lo que si deben es validar que los campos que definan como obligatorios estén diligenciados sino mostrar un mensaje que le informe el error al usuario) y un botón para cancelar la creación que debe cerrar el Dialog.
