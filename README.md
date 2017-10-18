# Inventory api
This api expose database inventory. HW for web programming class

### Base url
* http://inventory-api.openode.io/

### Tech
Different npm package used to build this api

* [Express] framework for building web app and restful api in nodejs
* [Mysql] npm package that allows to connect and query to a mysql database
* [Body-parser] npm package that allows you to parse url etc

### Routes
- GET: /api/product/id
- GET: /api/products
- GET: /api/product/id/field/value
  ##### fields
  - name
  - description
  - price
  - number
  - path
- POST: /api/product
- GET: /api/static/pictures/name.ext



[Express]: <https://expressjs.com/>
[Mysql]: <https://www.npmjs.com/package/mysql>
[Body-parser]: <https://www.npmjs.com/package/body-parser>



