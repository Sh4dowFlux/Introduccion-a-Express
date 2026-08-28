import express from 'express';
import { configDotenv } from "dotenv";
configDotenv()

const app = express()
const puerto = process.env.PUERTO || 3030;

//uso de middwealer body_parse
app.use(express.json())

app.get("/", (_, res) => {
  res.send(`Hola, estoy aprendiendo express, ficha 3407181 ADSO en el sena`, );
});

app.get("/otraruta", (req, res) => {
    res.send(`<h1> Otro ejemplo de ruta </h1>
        <h2> End point con res.send </h2>`)
})

app.get("/ruta2", (req, res)=>{
    res.json({"nombre": "David", "Apellido": "Torres", "cargo": "Aprendiz" })
})

app.get("/ruta3/:aprendiz/:otrodato", (req, res)=>{ 
    const dato_aprendiz = req.params.aprendiz
    const otrodato = req.params.otrodato
    res.json({"Nombre": dato_aprendiz, "Otro": otrodato})
})

app.get("/ruta4", (req, res) => {
    const orden = req.query.orden || "sin ordenar"
    const pagina = req.query.pagina || 1 
    res.send(`<h1>Listado aprendices</h1>
        <p> El listado esta en orden ${orden}</p>
        <p>Pagina ${pagina}</p>´`)
}
)

//endpoint para envio de datos
app.post("/ruta2",(req,res)=>{
  const todosDatos = req.body
  const name = req.body.nombre
  const lastname = req.body.cargo
  res.status(201).json({Datos: todosDatos, nombre: name, cargo: lastname})
})

// Endpoint de login con validaciones
app.post("/login", (req, res) => {
  const { usuario, perfil, contraseña } = req.body;
  
  // Validar datos faltantes
  if (!usuario && !perfil && !contraseña) {
    return res.status(400).json({
      mensaje: "No se enviaron datos. Por favor proporcione usuario, perfil y contraseña."
    });
  }
  
  if (!usuario) {
    return res.status(400).json({
      mensaje: "Falta el campo 'usuario'. Por favor ingrese su usuario."
    });
  }
  
  if (!perfil) {
    return res.status(400).json({
      mensaje: "Falta el campo 'perfil'. Por favor ingrese su perfil (Admin/User)."
    });
  }
  
  if (!contraseña) {
    return res.status(400).json({
      mensaje: "Falta el campo 'contraseña'. Por favor ingrese su contraseña."
    });
  }
  
  // Validar el perfil
  if (perfil !== "Admin" && perfil !== "User", "user") {
    return res.status(400).json({
      mensaje: "Perfil no válido. Los perfiles permitidos son: 'Admin' o 'User'."
    });
  }
  
  // Mensaje según el perfil
  if (perfil === "Admin") {
    return res.status(200).json({
      mensaje: "Bienvenido Administrador ${usuario}. Tiene acceso completo al sistema."
    });
  } else if (perfil === "User") {
    return res.status(200).json({
      mensaje: "Bienvenido Usuario ${usuario}. Tiene acceso limitado al sistema."
    });
  }
});

app.listen(3000, () => {
  console.log(`Servidor en funcionamiento en el puerto: http://localhost:3000`);
});