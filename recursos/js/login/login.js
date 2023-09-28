
$(document).ready(function () {
    getUserSession();
});

let userValidate=localStorage.getItem("userlogged");
let codValidate=localStorage.getItem("userCod");
let dniValidate=localStorage.getItem("userDni");

if (window.location != "../../../index.html"){
    
    if(userValidate==="blank" && codValidate==="blank" && dniValidate==="blank"){
        Swal.fire({
            customClass: {
                confirmButton: 'confirm-button-class2',
                title: 'title-class',
                icon: 'icon-class'
              },   
            title: 'Error de inicio de sesión',
            text: 'Por favor inicie sesión',
            icon: 'error',
            confirmButtonText: 'OK',
          })
          setTimeout(function(){
            window.location = "../../../index.html";
            ;
          }, 2000);
    }
} 



$(".finit").on('click', function () {
    //debugger
    if (validarFormulario()) {
        let aux_Usuario = $("#ID_Usuario").val().trim();
        let aux_Contrasenia = $("#ID_Contrasenia").val();
        let respuestaUsuario = validarUsaurio(aux_Usuario, aux_Contrasenia);
        if (respuestaUsuario.existe && respuestaUsuario.contrasenia) {

            console.log(respuestaUsuario);

            $("#ID_MsjError").hide();
            iniciarAPP(respuestaUsuario);
        } else {
            console.log(respuestaUsuario);
            $("#ID_MsjError").show();
            Swal.fire({
                icon: 'error',
                title: 'Acceso denegado',
                text: 'Revise su usuario o contraseña',
              })
        }
    } else {
        $("#ID_MsjError").show();
        Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Algún campo está vacío',
          })
    }
});

function validarFormulario() {
    let tokenVal;
    let aux_Usuario = $("#ID_Usuario").val().trim();
    let aux_Contrasenia = $("#ID_Contrasenia").val();

    if (aux_Usuario.length > 0 && aux_Usuario != undefined &&
        aux_Contrasenia.length > 0 && aux_Contrasenia != undefined) {
        tokenVal = true;
    } else {
        tokenVal = false;
    }
    return tokenVal;
}

function iniciarAPP(respuestaUsuario){
    let userAux = respuestaUsuario.usuario.usuario;
    let codAux = respuestaUsuario.usuario.rol.cod;
    let dniAux = respuestaUsuario.usuario.dni;

    Swal.fire({
        customClass: {
            confirmButton: 'confirm-button-class2',
            title: 'title-class',
            icon: 'icon-class'
          },   
        title: 'Bienvenido: '+ userAux,
        text: 'Inicio de sesión satisfactoria',
        icon: 'success',
        confirmButtonText: 'OK',
      })
      setTimeout(function(){
        window.location = "./modulos/programas/bandeja.html?U="+userAux;
        ;
      }, 2000);
      //guardando en nuestro storage al usuario logeado
      localStorage.setItem("userlogged",userAux);
      localStorage.setItem("userCod",codAux);
      localStorage.setItem("userDni",dniAux);
}

function validarUsaurio(usuario, contrasenia) {

    let objetoValidado;

    let usuarioRecuperado = lista_Usuario.find(x => x.usuario == usuario);

    try {
        if (usuarioRecuperado.usuario.length > 0 && usuarioRecuperado != undefined && usuarioRecuperado != null) {

            if (usuarioRecuperado.contrasenia === contrasenia) {

                let userRol = lista_Roles.find(r => r.id == usuarioRecuperado.id_rol);

                objetoValidado = {
                    existe: true,
                    contrasenia: true,
                    usuario: {
                        nombres: usuarioRecuperado.nombres,
                        correo: usuarioRecuperado.correo,
                        dni: usuarioRecuperado.dni,
                        telefono: usuarioRecuperado.telefono,
                        usuario: usuarioRecuperado.usuario,
                        rol: {
                            nombre: userRol.nombre,
                            cod: userRol.cod
                        }
                    }
                }

            } else {
                objetoValidado = {
                    existe: true,
                    contrasenia: false,
                    usuario: null
                }
            }

        } else {
            objetoValidado = {
                existe: false,
                contrasenia: false,
                usuario: null
            }
        }

    } catch (error) {
        console.log(error);
        objetoValidado = {
            existe: false,
            contrasenia: false,
            usuario: null
        }
    }


    return objetoValidado;

}

function getUserSession(){

    /*
    let getUrl=""+window.location;
    let userSession=getUrl.split("=");

    $("#titulo").html("Bienvenido : " + userSession[1]);
    */
    let userSession=localStorage.getItem("userlogged");
    let userSessionCod=localStorage.getItem("userCod");
    let userSessionDni=localStorage.getItem("userDni");
    $("#titulo").html("Bienvenido : " +userSession);
    $("#codigo").html("Código : " +userSessionCod);
    $("#dni").html("DNI : " +userSessionDni);


}



function endSession(){
    
}

$( "#endSesion" ).on( "click", function() {
    Swal.fire({
        title: '¿Realmente deseas cerrar la sesión?',
        showDenyButton: true,
        confirmButtonText: 'Sí',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Cerraste sesión');
          localStorage.setItem("userlogged","blank");
          localStorage.setItem("userCod","blank");
          localStorage.setItem("userDni","blank");
          window.location = "/index.html";

        }
      })
  });

var lista_Usuario = [
    {
        nombres: "Soy el Admin",
        correo: "admin@gmail.com",
        dni: "12345678",
        telefono: "123456789",
        usuario: "admin",
        contrasenia: "admin123456",
        id_rol: 1
    },
    {
        nombres: "Soy el Docente",
        correo: "docentet@gmail.com",
        dni: "12345678",
        telefono: "123456789",
        usuario: "docente",
        contrasenia: "docente123456",
        id_rol: 2
    },
    {
        nombres: "Soy el Alumno",
        correo: "alumno@gmail.com",
        dni: "12345678",
        telefono: "123456789",
        usuario: "admin",
        contrasenia: "alumno123456",
        id_rol: 2
    }
]


var lista_Roles = [
    {
        id: 1,
        nombre: "Administrador",
        cod: "ADM"
    },
    {
        id: 2,
        nombre: "Docente",
        cod: "DOC"
    },
    {
        id: 3,
        nombre: "Alumno",
        cod: "ALU"
    }
]