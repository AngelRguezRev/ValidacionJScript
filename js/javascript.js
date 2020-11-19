//Este metodo borra todo el formulario mostrando un aviso al usuario
function borrar(){
    alert("Se borrar el formulario");
    window.location.reload();
}

//Este metodo gestiona la validacion del formulario
function validar(){
    document.getElementById("dni").style.backgroundColor="white";
    document.getElementById("email").style.backgroundColor="white";
    document.getElementById("telefono").style.backgroundColor="white";
    document.getElementById("nacimiento").style.backgroundColor="white";
    document.getElementById("destino").style.backgroundColor="white";
    document.getElementById("ida").style.backgroundColor="white";
    document.getElementById("vuelta").style.backgroundColor="white";
    let email=validaCorreo();
    let tlf=validaTelefono();
    let fNac=validaNacimiento();
    let dest=validaDestino();
    let salida=validaFechaSalida();
    let regreso=validaFechaRegreso();
    let dni=validaDNI();
    //Comprobamos que todos los campos esten validados
    if(email && tlf && fNac && dest && salida && regreso && dni){
        alert("Se enviaran los datos del formulario");
        window.location.reload();
    }else{
        //Si alguno no lo esta añadimos al alert un mensaje que indique cual es y teñimos la casilla de rojo
        let cad="<ul>";
        if(!dni){
            document.getElementById("dni").style.backgroundColor="lightcoral";
            cad+="<li>DNI Incorrecto, introduce uno valido</li>";
        }
        if(!email){
            document.getElementById("email").style.backgroundColor="lightcoral";
            cad+="<li>Email incorrecto, introduce uno valido</li>";
        }
        if(!tlf){
            document.getElementById("telefono").style.backgroundColor="lightcoral";
            cad+="<li>Telefono incorrecto, introduce uno valido</li>";
        }
        if(!fNac){
            document.getElementById("nacimiento").style.backgroundColor="lightcoral";
            cad+="<li>Fecha incorrecta. Este sorteo solo puede ser accedido por mayores de edad</li>";
        }
        if(!dest){
            document.getElementById("destino").style.backgroundColor="lightcoral";
            cad+="<li>Destino incorrecto, por favor selecciona un destino</li>";
        }
        if(!salida){
            document.getElementById("ida").style.backgroundColor="lightcoral";
            cad+="<li>Fecha de salida incorrecta. La fecha debe ser un dia a partir del día de cumplimentación del formulario</li>";
        }
        if(!regreso){
            document.getElementById("vuelta").style.backgroundColor="lightcoral";
            cad+="<li>Fecha de regreso incorrecta. La fecha de regreso debe ser como máximo 5 dias posterior"+
            "a la de salida</li>";
        }
        document.getElementById("errores").innerHTML=cad+"</ul>";
    }
}

//Funcion que valida el dni tanto por forma como por el digito de control
// http://www.interior.gob.es/web/servicios-al-ciudadano/dni/calculo-del-digito-de-control-del-nif-nie
function validaDNI(){
    const REGEX=/^(\d{8,8})+[A-Za-z]$/;
    let LETRAS = ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E'];
    let dni=document.getElementById("dni").value;
    let esValido=false;
    //Comprobamos que tiene la forma
    if(REGEX.test(dni)){
        //Si tiene la forma verificamos la letra
        esValido=dni.charAt(8).toUpperCase()==LETRAS[parseInt(dni.substring(0,8))%23];
    }
    return esValido;
}

//Este metodo valida el correo por medio de una expresion regular
function validaCorreo(){
    const REGEX =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let email=document.getElementById("email").value;
    return REGEX.test(email);
}

//Este metodo valida el telefono por medio de una expresion regular
function validaTelefono(){
    const REGEX=/^(\d{9})$/;
    let telefono=document.getElementById("telefono").value;
    return REGEX.test(telefono);
}

//Este metodo valida la fecha de nacimiento comprobando que corresponde a una persona mayor de edad
//Es decir, comprueba que han pasado 18 años desde la fecha introducida
function validaNacimiento(){
    let hoy = new Date();
    let fecha = Date.parse(document.getElementById("nacimiento").value);
    return Math.ceil(hoy-fecha)/(1000*60*60*24*365)>18;
}

//Este metodo comprueba que se ha elegido algun destino
function validaDestino(){
    return document.getElementById("destino").value!=0;
}

//Este metodo valida la fecha de salida del viaje haciendo que tenga que ser mas tarde que el dia
//en que se relleno el formulario
function validaFechaSalida(){
    let hoy = new Date();
    let fecha = Date.parse(document.getElementById("ida").value);
    return fecha >= hoy;
}

function validaFechaRegreso(){
    let salida = Date.parse(document.getElementById("ida").value);
    let regreso = Date.parse(document.getElementById("vuelta").value);
    let diferencia = Math.ceil(regreso-salida)/(1000*60*60*24);
    return diferencia>0 && diferencia<=5;
}

//Este metodo calcula la fecha del dia siguiente al que se solicita
function fechaManana(){
    let hoy = new Date();
    hoy = hoy+(1000*60*60*24);
    return hoy;
}