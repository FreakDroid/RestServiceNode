# RestServiceNode
Un servicio rest hecho en node, en que el cual se usa el wrapper de github para consumo del servicio.

#Go live
``` node server.js ``` <br>
```Escuchando en el puerto 4333```

# consumo Ejemplo de llamadas
```Localhost:4333/user/Freakdroid``` Devuelve la infomacion de un usuario cualquiera
```Localhost:4333/org/test``` Devuelve la informacion de una organizacion cualquiera
```Localhost:4333/team/:org``` Devuelve los teams de una organizacion cualquiera

#Nota
Colocar tu token en esta seccion, del server.js en el github.authenticate <br>
```//Autenticacion necesaria para enlazar el API <br>
```    type: "oauth", <br>
```    token: 'your Token' //Tu token de desarrollo acá
