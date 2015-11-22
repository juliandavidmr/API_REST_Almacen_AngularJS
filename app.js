/**
 * FRAMEWORK EXPRESS DE Node.js
 * Realizado por Julian David MR
 */
var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");
var Sequelize = require('sequelize');
//var multipart = require('connect-multiparty'); //Para que el cliente envíe archivos

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(multipart());

/** 
 * Funcion para acortar la escritura del metodo console.log(...);
 */
function m(ms) {
  console.log(ms);
}

// db config
var config = require('./database.json')["dev"];
var password = config.password ? config.password : null;

// Inicializar conexion con base de datos
var sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    logging: console.log,
    define: {
      timestamps: true
    }
  }
  );

sequelize.authenticate().complete(function (err) {
  if (err) {
    console.log('ERROR al conectarse.');
  } else {
    console.log('Conexion establecida con exito.');
  }
});

//------------------------------------------------------------------------------------------------------------------
// Cargar modelos
var models = [
  'Cliente',
  'DetalleFacturaCompra',
  'DetalleFacturaVenta',
  'DetalleListaPrecio',
  'Empleado',
  'Empresa',
  'FacturaCompra',
  'FacturaVenta',
  'Genero',
  'ListaPrecio',
  'Persona',
  'Producto',
  'Proveedor',
  'Rol',
  'Sucursal'
];

models.forEach(function (model) {
  module.exports[model] = sequelize.import('./Models/' + model + ".js");
});

sequelize.sync({ force: true })
  .then(function () {
    m("Sincronizacion forzada exitosa.\n\nServicio cargado completamente.");
  })
  .catch(function (error) {
    m("Error al sincronizar, posiblemente sean las credenciales de la BD.");
  });
//sequelize.sync();

module.exports.sequelize = sequelize;

/**
 * Permite dar permisos de acceso al publico, se podran realizar peticiones 
 * desde cualquier direccion.Si este metodo no se usa, entonces solamente se podrian realizar solicitudes locales. 
 */
function permitir_todo(res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}

//------------------------------------- Solicitud raiz
app.get('/', function (req, res) {
  permitir_todo(res);
  var data = {
    "Data": "",
    "OS": ""
  };
  data["Data"] = "Bienvenido al semillero de programacion...";
  data["OS"] = "Usted esta usando: " + req.get('user-agent');
  res.json(data);
});


//-------------------------------------- Consultar cuenta por Id
app.get('/cuenta/:id', function (req, res) {
  permitir_todo(res);
  console.log("Consultando usuario por id");
});

//--------------------------------------- 
app.post('/persona/insertar/:fk_idTipoDocumento/:NDocumento/:Nombres/:Apellidos/:Telefono/:Correo/:FK_idPrograma', function (req, res) {
  console.log("Entro al metodo de insertar persona");
  permitir_todo(res);
  sequelize.sync().success(function () {
    module.exports["persona"].create(req.params)
      .success(function (data) {
        console.log(data.values);
        res.status(200);
        res.send(data.values);
      })
      .error(function (err) {
        console.log(err);
        res.status(100);
        res.send(err);
      })
  });
});

//--------------------------------------- 
app.put('/persona/actualizar/:idPersona/:fk_idTipoDocumento/:NDocumento/:Nombres/:Apellidos/:Telefono/:Correo/:fk_idPrograma', function (req, res) {
  console.log("Entro al metodo de actualizar persona");
  permitir_todo(res);
  //Updating Laptop to Computer
  module.exports["persona"].find(
    { where: { idPersona: req.params.idPersona } })
    .complete(function (err, data) {
      if (err) {
        console.log(err);
        res.status(100);
        res.send("Error al actualizar la persona.");
      }
      if (data) {
        data.updateAttributes(req.params).success(function (data1) {
          console.log(data1);
          res.status(100);
          res.send(data1);
        })
      }
    });
});

//--------------------------------------- 
app.get('/auth/:email/:contrasenia', function (req, res) {
  console.log("Entro al metodo de login");
  permitir_todo(res);
  //Updating Laptop to Computer
  module.exports["cuenta"].find(
    { where: { NUsuario: req.params.email, Contrasenia: req.params.contrasenia } })
    .complete(function (err, data) {
      if (err) {
        console.log(err);
        res.status(100);
        res.send("Error al consultar usuario.");
      } else if (data) {
        if (data.length != 0) {
          console.log(data);
          res.status(200);
          res.json(data);
        } else {
          console.log("No hay registros en cuenta");
          res.status(404);
          res.send("No hay registros en cuenta");
        }
      }
    })
    .error(function (err) {
      console.log("Error al intentar autenticacion.");
      res.status(100);
      res.send("Error al intentar autenticacion.");
    });
});

//--------------------------------------- Ingresar usuario
app.post('/cuenta/insertar/:NUsuario/:Contrasenia/:FK_idRol/:FK_idPersona', function (req, res) {
  console.log("Entro al metodo de insertar persona");
  permitir_todo(res);
});

//--------------------------------------- 
app.get('/envios/:idUsuario', function (req, res) {
  console.log("Consultando todos los envios.");
  permitir_todo(res);

  module.exports["envio"].findById(req.params.idUsuario).then(function (data) {
    // project will be an instance of Project and stores the content of the table entry
    // with id 123. if such an entry is not defined you will get null
    
  })

  // search for attributes
  module.exports["envio"].findOne({ where: { title: 'aProject' } }).then(function (project) {
    // project will be the first entry of the Projects table with the title 'aProject' || null
  })

  /* Project.findOne({
     where: { title: 'aProject' },
     attributes: ['id', ['name', 'title']]
   }).then(function (project) {
     // project will be the first entry of the Projects table with the title 'aProject' || null
     // project.title will contain the name of the project
   })*/
   
  // Find all projects with a least one task where task.state === project.task
  //Para hacer una busqueda incluyendo resultados de otros modelos
  Project.findAll({
    include: [{
      model: Task,
      where: { state: Sequelize.col('project.state') }
    }]
  })
});

//--------------------------------------- 
app.post('/grupo/insertar/:NombreGrupo/:UserGrupo/:Contrasenia', function (req, res) {
  console.log("Entro al metodo de insertar grupo.");
  permitir_todo(res);
});

//														BASE
/*app.get('/users/:id([0-9]+)/:action(edit|delete|create)', function (req, res) {
  res.write('handler: /users/:id \n');
  res.write('parametros: \n');
  for (key in req.params) {
    res.write('\t' + key + ' : ' + req.params[key] + '\n');
  }
  res.end();
});*/

//--------------------------------------- 
app.post('/grupo/integrantes/insertar/:FK_idGrupo/:FK_idCompetencia/:FK_idParticipacion/:FK_idPersona?', function (req, res) {
  console.log("Entro al metodo de insertar integrantes de grupo.");
  permitir_todo(res);
});


//--------------------------------------------------------------------------------------------------------------------
//                                                      Metodo de consulta general

var models_get = [
  'competencia',
  'cuenta',
  'cursos',
  'ejercicios',
  'envios',
  'estudiantes_cursos',
  'grupos',
  'historialejercicios',
  'horarios_cursos',
  'integrantesgrupo',
  'nivel',
  'participacion_grupos',
  'persona',
  'programa',
  'respuesta',
  'resultados',
  'rol',
  'tipocompetencia',
  'tipodocumento'
];

app.get('/get/:tabla', function (req, res) {
  console.log("Entró al metodo de consulta general.");
  permitir_todo(res);
  var enc = false;
  for (var i = 0; i < models_get.length; i++) {
    var t_model = models_get[i];
    console.log("Revisando " + t_model);
    if (t_model == req.params.tabla) {
      console.log("Consultando " + t_model + "s");
      enc = true;
      module.exports[t_model].findAll()
        .then(function (m) {
          if (m.length != 0) {
            console.log(m);
            res.status(200);
            res.json(m);
          } else {
            console.log("No hay registros en " + t_model);
            res.status(404);
            res.send("No hay registros en " + t_model);
          }
        })
        .error(function (err) {
          console.log(err);
          res.status(100);
          res.send(err);
        });
      break;
    }
  }
  if (!enc) {
    console.log("No se encontro la tabla " + req.params.tabla);
    res.status(200);
    res.send("No se encontro la tabla " + req.params.tabla);
  }
});

//------------------------------------------------------------------------------------------------------------------------

app.all('*', function (req, res) {
  res.write('Solicitud erronea: *\n');
  res.write('ERR, no regex match\n');
  res.write(req.body);
  res.end();
});

//------------------------------------------------------------------------------------------------------------------------
var ip = '127.0.0.1';
var puerto = 3000;
http.listen(puerto, ip, function () {
  console.log('Servidor NodeJS APP corriendo.');
  console.log("Conectado & Escuchando el puerto " + puerto);
  console.log("Ingrese a http://" + ip + ":" + puerto);
});