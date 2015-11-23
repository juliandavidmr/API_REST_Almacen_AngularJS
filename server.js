/**
 * FRAMEWORK EXPRESS DE Node.js
 * Realizado por Julian David MR
 */
var database = require('./database.json');
var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Puerto de escucha
var puerto = 3000;

var connection = mysql.createConnection(database.local);

connection.connect(function (err) {
	if (!err) {
		console.log("Database conectada ...\n");
	} else {
		console.log("Error al conectar database ... \n\n");
	}
});

/** 
 * Funcion para acortar la escritura del metodo console.log(...);
 */
function m(ms) {
	console.log(ms);
}

/**
 * Funcion que permite dar permisos de acceso al publico, se podran realizar peticiones 
 * desde cualquier direccion.
 * Si este metodo no se usa, entonces solamente se podrian realizar solicitudes locales. 
 */
function permitir_todo(res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}

//Solicitud raiz
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

app.get('/generos', function (req, res) {
	console.log("Consultando todos los generos.");
	permitir_todo(res);

	connection.query("SELECT * from Genero;", function (err, rows, fields) {
		if (err) {
			res.status(100);
			res.send("Error al consultar las cuentas.");
		} else if (rows.length != 0) {
			res.status(200);
			res.json(rows);
		} else {
			res.status(100);
			res.send("No hay cuentas registradas.");
		}
	});
});


app.post('/genero/add/:Descripcion', function (req, res) {
	console.log("Entro al metodo de insertar genero");

	permitir_todo(res);
	//variables de persona
	var Descripcion = req.params.Descripcion;

	if (!!Descripcion) {

		//Personas
		var sql = "INSERT INTO Genero(Descripcion) VALUES(?)";
		console.log(sql);
		connection.query(sql, [Descripcion], function (err, rows) {
			if (err) {
				res.status(100);
				res.send("Error: " + err);
			} else {
				console.log("Se insertaron los datos de persona.");
				var aql = "SELECT * from Genero WHERE Descripcion='" + Descripcion + "';";
				connection.query(aql, function (err, rows, fields) {
					if (err) {
						console.log("Error al realizar la consulta, " + err);
						res.send("Error al realizar la consulta, " + err);
					} else if (rows.length != 0) {
						console.log("Filas consultadas: " + rows);
						res.json(rows);
					}
				});
			}
		});
	}
});

app.get('/categorias', function (req, res) {
	console.log("Consultando todos las categorias.");
	permitir_todo(res);

	connection.query("SELECT * from Categoria;", function (err, rows, fields) {
		if (err) {
			res.status(100);
			res.send("Error al consultar las categorias.");
		} else if (rows.length != 0) {
			res.status(200);
			res.json(rows);
		} else {
			res.status(100);
			res.send("No hay categoria registradas.");
		}
	});
});


app.post('/categoria/add/:Descripcion', function (req, res) {
	console.log("Entro al metodo de insertar categoria");

	permitir_todo(res);
	//variables de persona
	var Descripcion = req.params.Descripcion;

	if (!!Descripcion) {

		//Personas
		var sql = "INSERT INTO Categoria(Descripcion) VALUES(?)";
		console.log(sql);
		connection.query(sql, [Descripcion], function (err, rows) {
			if (err) {
				res.status(100);
				res.send("Error: " + err);
			} else {
				console.log("Se insertaron los datos de persona.");
				var aql = "SELECT * from Categoria WHERE Descripcion='" + Descripcion + "';";
				connection.query(aql, function (err, rows, fields) {
					if (err) {
						console.log("Error al realizar la consulta, " + err);
						res.send("Error al realizar la consulta, " + err);
					} else if (rows.length != 0) {
						console.log("Filas consultadas: " + rows);
						res.json(rows);
					}
				});
			}
		});
	}
});

app.get('/roles', function (req, res) {
	console.log("Consultando todos Rol.");
	permitir_todo(res);

	connection.query("SELECT * from Rol;", function (err, rows, fields) {
		if (err) {
			res.status(100);
			res.send("Error al consultar las categorias.");
		} else if (rows.length != 0) {
			res.status(200);
			res.json(rows);
		} else {
			res.status(100);
			res.send("No hay categoria registradas.");
		}
	});
});


app.post('/rol/add/:Nombre', function (req, res) {
	console.log("Entro al metodo de insertar rol");
	permitir_todo(res);
	var Nombre = req.params.Nombre;
	if (!!Nombre) {
		var sql = "INSERT INTO Rol(Nombre) VALUES(?)";
		console.log(sql);
		connection.query(sql, [Nombre], function (err, rows) {
			if (err) {
				res.status(100);
				res.send("Error: " + err);
			} else {
				var aql = "SELECT * from Rol WHERE Nombre='" + Nombre + "';";
				connection.query(aql, function (err, rows, fields) {
					if (err) {
						console.log("Error al realizar la consulta, " + err);
						res.send("Error al realizar la consulta, " + err);
					} else if (rows.length != 0) {
						console.log("Filas consultadas: " + rows);
						res.json(rows);
					}
				});
			}
		});
	}
});


app.get('/Clientes', function (req, res) {
	console.log("Consultando todos clientes.");
	permitir_todo(res);

	connection.query("SELECT * from Cliente INNER JOIN Persona ON Persona.idPersona = Cliente.fk_idPersona ", function (err, rows, fields) {
		if (err) {
			res.status(100);
			res.send("Error al consultar clientes.");
		} else if (rows.length != 0) {
			res.status(200);
			res.json(rows);
		} else {
			res.status(100);
			res.send("No hay categoria registradas.");
		}
	});
});

app.post('/cliente/add/:Nombre1/:Nombre2/:Apellido1/:Apellido2/:Direccion/:Celular/:Correo/:fk_idGenero', function (req, res) {
	console.log("Entro al metodo de insertar cliente");
	permitir_todo(res);
	var Nombre1 = req.params.Nombre1;
	var Nombre2 = req.params.Nombre2;
	var Apellido1 = req.params.Apellido1;
	var Apellido2 = req.params.Apellido2;
	var Direccion = req.params.Direccion;
	var Celular = req.params.Celular;
	var Correo = req.params.Correo;
	var Ciudad = req.params.Ciudad;
	var fk_idGenero = req.params.fk_idGenero;

	if (!!Nombre1) {
		var sql = "INSERT INTO Persona(Nombre1,Nombre2,Apellido1,Apellido2,Direccion,Celular,Correo,Ciudad,fk_idGenero) VALUES(?,?,?,?,?,?,?,?,?)";
		connection.query(sql, [Nombre1, Nombre2, Apellido1, Apellido2, Direccion, Celular, Correo, Ciudad, fk_idGenero], function (err, rows) {
			if (err) {
				res.status(100);
				res.send("Error: " + err);
			} else {
				var aql = "SELECT idPersona from Persona WHERE Nombre1='" + Nombre1 + "' && Nombre2='" + Nombre2 + "' && Correo='" + Correo + "';";
				console.log("CONSULTA DE PERSONA: " + aql);
				connection.query(aql, function (err, rows, fields) {
					if (err) {
						console.log("Error al realizar la consulta, " + err);
						res.send("Error al realizar la consulta, " + err);
					} else if (rows.length != 0) {
						console.log("Filas consultadas: " + rows[0]);

						var idPersona = rows[0].idPersona;
						//INSERTAR CLIENTE
						var sql = "INSERT INTO Cliente(fk_idPersona) VALUES('" + idPersona + "');";
						console.log(sql);
						connection.query(sql, function (err, rows) {
							if (err) {
								res.status(100);
								res.send("Error: " + err);
							} else {
								res.status(100);
								res.send("Cliente registrado con exito.");
							}
						});
					}
				});
			}
		});
	}
});

app.post('/persona/add/:Nombre1/:Nombre2/:Apellido1/:Apellido2/:Direccion/:Celular/:Correo/:fk_idGenero', function (req, res) {
	console.log("Entro al metodo de insertar cliente");
	permitir_todo(res);
	var Nombre1 = req.params.Nombre1;
	var Nombre2 = req.params.Nombre2;
	var Apellido1 = req.params.Apellido1;
	var Apellido2 = req.params.Apellido2;
	var Direccion = req.params.Direccion;
	var Celular = req.params.Celular;
	var Correo = req.params.Correo;
	var Ciudad = req.params.Ciudad;
	var fk_idGenero = req.params.fk_idGenero;

	if (!!Nombre1) {
		var sql = "INSERT INTO Persona(Nombre1,Nombre2,Apellido1,Apellido2,Direccion,Celular,Correo,Ciudad,fk_idGenero) VALUES(?,?,?,?,?,?,?,?,?)";
		connection.query(sql, [Nombre1, Nombre2, Apellido1, Apellido2, Direccion, Celular, Correo, Ciudad, fk_idGenero], function (err, rows) {
			if (err) {
				res.status(100);
				res.send("Error: " + err);
			} else {
				res.status(100);
				res.send("Persona registrada con exito.");
			}
		});
	}
});


app.get('/productos', function (req, res) {
	console.log("Consultando todos productos.");
	permitir_todo(res);

	connection.query("SELECT * from Producto;", function (err, rows, fields) {
		if (err) {
			res.status(100);
			res.send("Error al consultar producto.");
		} else if (rows.length != 0) {
			res.status(200);
			res.json(rows);
		} else {
			res.status(100);
			res.send("No hay productos registradas.");
		}
	});
});


app.post('/producto/add/:Nombre/:Medida/:IVA/:fk_idCategoria', function (req, res) {
	console.log("Entro al metodo de insertar producto");
	permitir_todo(res);
	var Nombre = req.params.Nombre;
	var Medida = req.params.Medida;
	var IVA = req.params.IVA;
	var fk_idCategoria = req.params.fk_idCategoria;

	if (!!Nombre && !!fk_idCategoria) {
		var sql = "INSERT INTO Producto(Nombre, Medida, IVA, fk_idCategoria) VALUES(?,?,?,?)";
		console.log(sql);
		connection.query(sql, [Nombre, Medida, IVA, fk_idCategoria], function (err, rows) {
			if (err) {
				res.status(100);
				res.send("Error: " + err);
			} else {
				var aql = "SELECT * from Producto;";
				connection.query(aql, function (err, rows, fields) {
					if (err) {
						console.log("Error al realizar la consulta, " + err);
						res.send("Error al realizar la consulta, " + err);
					} else if (rows.length != 0) {
						console.log("Filas consultadas: " + rows);
						res.json(rows);
					}
				});
			}
		});
	}
});


app.get('/empresas', function (req, res) {
	console.log("Consultando todos Empresa.");
	permitir_todo(res);

	connection.query("SELECT * from Empresa;", function (err, rows, fields) {
		if (err) {
			res.status(100);
			res.send("Error al consultar empresa.");
		} else if (rows.length != 0) {
			res.status(200);
			res.json(rows);
		} else {
			res.status(100);
			res.send("No hay empresa registradas.");
		}
	});
});


app.post('/empresa/add/:Nombre/:RegistroDIAN/:Correo', function (req, res) {
	console.log("Entro al metodo de insertar empresa");
	permitir_todo(res);
	var Nombre = req.params.Nombre;
	var RegistroDIAN = req.params.RegistroDIAN;
	var Correo = req.params.Correo;

	if (!!Nombre && !!RegistroDIAN && !!Correo) {
		var sql = "INSERT INTO Empresa(Nombre, RegistroDIAN, Correo) VALUES(?,?,?);";
		console.log(sql);
		connection.query(sql, [Nombre, RegistroDIAN, Correo], function (err, rows) {
			if (err) {
				res.status(100);
				res.send("Error: " + err);
			} else {
				res.status(500);
				res.send("Insertado con exito.");
			}
		});
	}
});


app.get('/sucursales', function (req, res) {
	console.log("Consultando todos sucursales.");
	permitir_todo(res);
	connection.query("SELECT * from Sucursal;", function (err, rows, fields) {
		if (err) {
			res.status(100);
			res.send("Error al consultar las categorias.");
		} else if (rows.length != 0) {
			res.status(200);
			res.json(rows);
		} else {
			res.status(100);
			res.send("No hay categoria registradas.");
		}
	});
});



app.get('/proveedores', function (req, res) {
	console.log("Consultando todos proveedores.");
	permitir_todo(res);

	connection.query("SELECT * from Proveedor;", function (err, rows, fields) {
		if (err) {
			res.status(100);
			res.send("Error al consultar proveedor.");
		} else if (rows.length != 0) {
			res.status(200);
			res.json(rows);
		} else {
			res.status(100);
			res.send("No hay proveedor registradas.");
		}
	});
});

app.post('/proveedor/add/:Nombre/:Ciudad/:Direccion/:Correo/:Telefono1/:Telefono2/', function (req, res) {
	console.log("Entro al metodo de insertar proveedor");
	permitir_todo(res);
	var Nombre = req.params.Nombre;
	var Ciudad = req.params.Ciudad;
	var Direccion = req.params.Direccion;
	var Correo = req.params.Correo;
	var Telefono1 = req.params.Telefono1;
	var Telefono2 = req.params.Telefono2;

	if (!!Nombre && !!Ciudad && !!Correo) {
		var sql = "INSERT INTO Proveedor(Nombre, Ciudad, Direccion, Correo, Telefono1, Telefono2) VALUES(?,?,?,?,?,?);";
		console.log(sql);
		connection.query(sql, [Nombre, Ciudad, Correo, Direccion, Telefono1, Telefono2], function (err, rows) {
			if (err) {
				res.status(100);
				res.send("Error: " + err);
			} else {
				res.status(500);
				res.send("Insertado con exito.");
			}
		});
	}
});


/**Iniciar sesion:
 * Consultar un usuario por email y contrasenia
 * Retorna un json si con los datos de la persona siempre y cuando el usuario este
 * activado.
 **/
app.get('/usuarios/auth/:email/:pass', function (req, res) {
	permitir_todo(res);

	var email = req.params.email;
	var pass = req.params.pass;

	var data = {
		"error": 1,
		"usuarios": "Valor por defecto de Json no cambiado."
	};

	console.log("Iniciando sesión. Credenciales: " + email + " - " + pass);

	if (!!email && !!pass) {
		connection.query("SELECT * from " + cuenta + " WHERE NUsuario='" + email + "' && Contrasenia='" + pass + "';",
			function (err, rows, fields) {
				if (rows.length != 0) {
					console.log("Inicio sesion: " + rows);
					res.json(rows);
				} else {
					console.log("Error al iniciar sesion: " + rows);
					data["usuarios"] = "No se encontró un usuario con esas credenciales.";
					res.send(data);
				}
			});
	} else {
		data["usuarios"] = "Por favor verifica los datos";
		res.json(data);
	}
});

app.get('/personas', function (req, res) {
	console.log("Consultando todas las personas.");
	permitir_todo(res);

	connection.query("SELECT * from Persona;", function (err, rows, fields) {
		if (err) {
			res.status(100);
			res.send("Error al consultar personas.");
		} else if (rows.length != 0) {
			res.status(200);
			res.json(rows);
		} else {
			res.status(100);
			res.send("No hay personas registradas.");
		}
	});
});

app.all('*', function (req, res) {
	res.write('Solicitud erronea: *\n');
	res.write('ERR, no regex match\n');
	res.write(req.body);
	res.end();
});


/**
		 *.							  Activando escucha
		 *  						Corriendo el servidor
		 */
var ip = '127.0.0.1';
http.listen(puerto, ip, function () {
	console.log('Servidor NodeJS APP corriendo.');
	console.log("Conectado & Escuchando el puerto " + puerto);
	console.log("Ingrese a http://" + ip + ":" + puerto);
});