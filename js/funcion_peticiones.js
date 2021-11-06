function consultar(){    
    $.ajax(
        {
            url: 'https://gb4896c6dd4008f-bdgastos.adb.ca-montreal-1.oraclecloudapps.com/ords/admin/gastos/gastos',
            type: 'GET',
            dataType: 'json',

            error: function(xhr, status){
                alert('ha sucedido un error, ' + xhr.status);
            },
            complete: function(xhr, status){
                alert('peticion realizada, ' + xhr.status);
            },
            success: function(json){
                $("#resultado").empty();
                tabla = "<center><table border='1'><tr><th>ID<th>NOMBRE<th>DESCRIPCION<th>VALOR" //<th>FECHA<th>USUARIO
                total = 0;
                filas = ""
                for (let i = 0; i < json.items.length; i++) {
                    filas += "<tr>"
                    filas += "<td>" + json.items[i].id 
                    filas += "<td>" + json.items[i].nombre 
                    filas += "<td>" + json.items[i].descripcion 
                    filas += "<td>" + json.items[i].valor 
                    // filas += "<td>" + json.items[i].fecha 
                    // filas += "<td>" + json.items[i].usuario
                    total += json.items[i].valor
                }
                $("#resultado").append(tabla + filas +  "<tr><th colspan='3' align='right'>TOTAL:<td>$" + total + "</center>")
                console.log(json)
            }
        }
    );
}

/**
 * esta funcion limpia el form
 */
function limpiarFormulario(){
    if(confirm("¿seguro que desea limpiar la informacion visualizada?")){
        var campo = document.getElementById("Codigo")
        var resultado = document.getElementById("resultado")
        campo.value = "";
        resultado.innerHTML = ""
    }
}

function limpiarFormularioJQuery(){
    if(confirm("¿seguro que desea limpiar la informacion visualizada?")){
        var campo = $("#id")
        var resultado = $("#resultado")
        campo.val("")
        resultado.html("")
    }
}

function limpiarFormularioCRUD(){
    var id = $("#id")
    var nombre = $("#nombre")
    var precio = $("#precio")
    var usuario = $("#usuario")
    var descripcion = $("#descripcion")
    var fecha = $("#fecha")

    id.val("")
    nombre.val("")
    precio.val("")
    usuario.val("")
    descripcion.val("")
    fecha.val("")
}

/**
 * Funcion para consultar por ID
 * @param {*} campoId 
 */
function consultarPorId(campoId){
    if(campoId.val() == ""){
        alert('Campo ID no puede estar vacio !!!')
    }
    else{
        var id = campoId.val()
        $.ajax(
            {
                url: 'https://gb4896c6dd4008f-bdgastos.adb.ca-montreal-1.oraclecloudapps.com/ords/admin/gastos/gastos/'+id,
                type: 'GET',
                dataType: 'json',
                success: function(json){
                    $("#resultado").empty();
                    if(json.items.length==0){
                        alert("Campo ID no encontrado")
                        campoId.val("")
                    }
                    else{
                        tabla = "<center><table border='1'><tr><th>ID<th>NOMBRE<th>DESCRIPCION<th>VALOR" //<th>FECHA<th>USUARIO
                    total = 0;
                    filas = ""
                    for (let i = 0; i < json.items.length; i++) {
                        filas += "<tr>"
                        filas += "<td>" + json.items[i].id 
                        filas += "<td>" + json.items[i].nombre 
                        filas += "<td>" + json.items[i].descripcion 
                        filas += "<td>" + json.items[i].valor 
                        // filas += "<td>" + json.items[i].fecha 
                        // filas += "<td>" + json.items[i].usuario
                        total += json.items[i].valor
                    }
                    $("#resultado").append(tabla + filas +  "<tr><th colspan='3' align='right'>TOTAL:<td>$" + total + "</center>")
                    console.log(json)
                    }
                },
                complete: function(xhr, status){
                    alert('peticion realizada, ' + xhr.status);
                }, 
                error: function(xhr, status){
                    alert('ha sucedido un error, ' + xhr.status);
                }
            }
        );
    }
}

/**
 * Funcion para validar los campos del formulario
 * @returns 
 */
function validarForm(){
    if($("#nombre").val() == ""){
        alert("el campo nombre no puede estar vacio !!!")
        $("#nombre").focus();
        return false
    }
    if($("#precio").val() == "" ){
        alert("el campo precio no puede estar vacio !!!")
        $("#precio").focus();
        return false
    }
    if($("#usuario").val() == ""){
        alert("el campo usuario no puede estar vacio !!!")
        $("#usuario").focus();
        return false
    }
    if($("#descripcion").val() == ""){
        alert("el campo descripcion no puede estar vacio !!!")
        $("#descripcion").focus();
        return false
    }
    return true
}

/**
 * Funcion que solicita al API REST ORACLE, que guarde un registro de Gasto
 */
function guardarGastoUsuario(){
    if(validarForm()){
        if(confirm("¿Seguro desea continuar guardando la informacion del gasto?")){            
            $.ajax(
                {
                    url : 'https://gb4896c6dd4008f-bdgastos.adb.ca-montreal-1.oraclecloudapps.com/ords/admin/gastos/gastos',
                    type : 'POST',
                    dataType : 'json',
                    data: {
                        nombre : $("#nombre").val(),
                        fecha : "04/11/2021",
                        valor : $("#precio").val(),
                        descripcion : $("#descripcion").val(),                        
                        usuario : $("#usuario").val()
                    },
                    success: function(json){
                        
                    },
                    complete: function(xhr, status){
                        alert('peticion realizada, ' + xhr.status);
                    },
                    error: function(xhr, status){
                        alert('ha sucedido un error, ' + xhr.status);
                    },
                }                
            );
        }
        limpiarFormularioCRUD();
    }
}

function nuevoRegistro(){
    window.open("crud.html", '_self')
}

function volverInicio(){
    window.open("index.html", '_self')
}

function eliminarGastoUsuario(campoId){    
    if(campoId.val() == ""){
        alert("campo ID no puede estar vacio !!!")
        $("#id").focus();
        return;
    }
    var id = campoId.val()
    if(confirm("¿Desea eliminar el gasto No. " + id + "?")){            
        $.ajax(
            {
                url : 'https://gb4896c6dd4008f-bdgastos.adb.ca-montreal-1.oraclecloudapps.com/ords/admin/gastos/gastos',
                type : 'DELETE',
                dataType : 'json',
                
                data : {id : id }, 
                success: function(json){
                    alert("se elimino registro !!!")
                },
                complete: function(xhr, status){
                    alert('peticion realizada, ' + xhr.status);
                },
                error: function(xhr, status){
                    alert('ha sucedido un error, ' + xhr.status);
                },
            }                
        );
    }
    limpiarFormularioCRUD();
}

function openNav(){
    $('#sidenav').style.width = "250px";
    $('#main').style.marginLeft = "250px";
}

function closeNav(){
    alert('cerrar')
    $('#sidenav').style.width = "0";
    $('#main').style.marginLeft = "0";
}

$('.topnav a').click(
    alert('priena')
);

$('.closebtn').click(
    alert('priena')
);
