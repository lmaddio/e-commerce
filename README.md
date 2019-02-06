## El Baraton 

Se puede ver en [heroku :D](https://el-baraton-l.herokuapp.com/)

- Ejercicio generado con create-react-app (CRA), esta desicion fue basada en dos hechos muy importantes, el tiempo para generar el proyecto y la comunidad detras de CRA que permite que el desarrollador pueda abstraerse a otras tareas.
- La estructura de carpetas es por dominio, pudiendo notarse a simple vista la logica de negocios, esta estructura me es muy interesante gracias a la facilidad con la que permite refactorizar codigo de una propia logica sin involucrar a las demas, asi como tambien la introduccion rapida que le genera a un desarrollador a entender en qué está trabajando.
- La libreria para el diseño la elegi por cuestiones de tiempo, me facilito pensar en los diseños.
- Los datos se almacenan con **redux**, permitiendo desde cualquier componente traer los datos en memoria, **redux-sagas** para el manejo de datos de la store, tanto para lo asyncronico como lo sincrono.
- Utilice **jest** y **enzyme** para el desarrollo de las pruebas unitarias.
- **json-server** para generar los endpoints a utilizar.
- El token tiene una duracion de 30 min! Luego de eso el usuario se deslogueara cuando haga un request que devuelva 401.

-----

Para levantar el server se deben tener disponibles los puertos **3000** y **3005**
Ejecutar el comando (yarn/npm)

`yarn install` o `npm install`

y luego

`yarn start` o `npm start`

- Para generar el build ejecutar
  
  `yarn build` o `npm build`

- Para ejecutar las **test**
  `yarn test --coverage`

El reporte se genera en la carpeta del proyecto **./coverage/lcov-report/index.html**

Tambien se suma un reporte generado con **lighthouse**, el nombre del archivo es **develop.html**
y otro **el-baraton-l.herokuapp.com.report.html** del server funcionando en [heroku](https://el-baraton-l.herokuapp.com/)