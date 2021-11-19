var urlAPIMsg = "https://gb4896c6dd4008f-bdgastos.adb.ca-montreal-1.oraclecloudapps.com/ords/admin/message/message"; 
var urlAPI = "https://gb4896c6dd4008f-bdgastos.adb.ca-montreal-1.oraclecloudapps.com/ords/admin/client/client";

var countRow = 0;
var countRowMsg = 0;

function getData(page, urlActual){    
    
    $.ajax({
        url: urlActual, 
        datatype: 'JSON',
        type: 'GET',
        success: function(data){
            console.log(data);
            if(page =='Clientes'){
                upDatatable(data.items);
            }
            else{
                upDatatableMsg(data.items);
            }        
            console.log(countRow)  
        }, 
        error: function(XHR, status, error){
            alert("Error: " + error)
        }
    });
}

function getDatabyId(campoId, page, urlActual){
    var id = campoId.val();
    if(id == ""){
        alert('Campo ID no puede estar vacio !!!');
        return;
    }

    $.ajax(
        {
            url: urlActual + '/' + id,
            dataType: 'JSON',
            type: 'GET',
            success: function(data){
                if(data.items.length == 0){
                    alert("Campo ID no encontrado")
                    if(page=="Clientes"){
                        $('#consultaID').val("");
                    }
                    else{
                        $('#consultaIDMsg').val("");
                    }
                    getData(page, urlActual);
                    return
                }

                // $('#listClientes > tbody').empty();
                if(page =='Clientes'){
                    upDatatable(data.items);
                }
                else{
                    upDatatableMsg(data.items);
                }
            },
            error: function(xhr, status, error){
                alert('ha sucedido un error, ' + xhr.status + ' ' + error);
                // $('#consultaID').val("");
                if(page=="Clientes"){
                    $('#consultaID').val("");
                }
                else{
                    $('#consultaIDMsg').val("");
                }
            }
        }
    );
}

function insertDataClient(){ 
    console.log('insertDataClient');
    let name = $('#nombre_modal').val();
    let email = $('#email_modal').val();
    let age = parseInt($('#edad_modal').val());

    $.ajax({
        type: "POST",
        url: urlAPI,
        dataType: "json",
        data: {
            'id': countRow+1,
            'name' :name, 
            'email' : email,
            'age' : age
        },
        complete: function (xhr, status) {
            console.log('Petición realizada, ' + xhr.status);
        },
        success: function(info){
            console.log('Registro guardado !!!')
        }
    });
}

function insertDataMsg(){ 
    console.log('insertDataMsg');
    let msg = $('#msg_modal').val();
    
    $.ajax({
        type: "POST",
        url: urlAPIMsg,
        dataType: "json",
        data: {
            'id': countRowMsg+1,
            'messagetext' :msg
        },
        complete: function (xhr, status) {
            console.log('Petición realizada, ' + xhr.status);
        },
        success: function(info){
            console.log('Registro guardado !!!')
        }
    });
}

function updateDataClient(){
    console.log('updateDataClient');
    let MyData = {
        id : $("#id_modal").val(),
        name : $("#nombre_modal").val(),
        email : $("#email_modal").val(),
        age : parseInt($("#edad_modal").val())
    };

    console.log(MyData);
    let dataToSend = JSON.stringify(MyData);

    $.ajax({
        url: urlAPI, 
        type: "PUT",
        data:dataToSend,
        contentType:"application/JSON",
        dataType: "JSON",
        complete: function (xhr, status) {
            console.log('Petición realizada, ' + xhr.status);
        },
        success: function(data){
            console.log(`Registro guardado !!!`);
        }        
    });
}

function updateDataMsg(){
    console.log('updateDataMsg');
    let MyData = {
        id : $("#idmsg_modal").val(),
        messagetext : $("#msg_modal").val()
    };

    console.log(MyData);
    let dataToSend = JSON.stringify(MyData);

    $.ajax({
        url: urlAPIMsg, 
        type: "PUT",
        data:dataToSend,
        contentType:"application/JSON",
        dataType: "JSON",
        complete: function (xhr, status) {
            console.log('Petición realizada, ' + xhr.status);
        },
        success: function(data){
            console.log(`Registro guardado !!!`);
        }        
    });
}

function deleteData(idElement, page, urlActual){
    console.log('deleteData');
    let MyData = {
        id: parseInt(idElement)
    };

    let dataToSendDelete=JSON.stringify(MyData);
    $.ajax({
        url: urlActual, //"https://gb4896c6dd4008f-bdgastos.adb.ca-montreal-1.oraclecloudapps.com/ords/admin/client/client",
        type:"DELETE",        
        data: dataToSendDelete,
        contentType:"application/JSON",
        dataType: "JSON",        
        complete: function (xhr, status) {
            console.log('Petición realizada, ' + xhr.status);
        },success : function(info){
            console.log(`registro eliminado !!!`);
            getData(page, urlActual);
        }
    });
}

function upDatatable(items){
    //countRow = 0;
    var lstClientes = "";
    var lastId = 0;
    for (let i = 0; i < items.length; i++) { 
        lastId = items[i].id;

        lstClientes += "<tr>"
        lstClientes += "<td id='id_item' class='dataCenter ajustarCol'>" + items[i].id 
        lstClientes += "<td>" + items[i].name
        lstClientes += '<td class="dataCenter">' + items[i].email
        lstClientes += "<td class='dataRight'>" + items[i].age
        lstClientes += "<td class='ajustarCol'><center><button id='btn_nuevoReg' type='button' class='btn btn-danger' onclick='eliminarReg()'><i class='far fa-minus-square'></i></button>"
        lstClientes += "<td class='ajustarCol'><center><button id='btn_editarReg' type='button' class='btn btn-warning' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='cargarInfoModal()'><i class='far fa-edit'></i></button>"
    }
    $('#listClientes').append(lstClientes);
    countRow = lastId;
}

function upDatatableMsg(items){
    //countRow = 0;
    var lstMsg = "";
    var lastId = 0;
    for (let i = 0; i < items.length; i++) { 
        lastId = items[i].id;

        lstMsg += "<tr>"
        lstMsg += "<td id='id_item' class='dataCenter ajustarCol'>" + items[i].id 
        lstMsg += "<td>" + items[i].messagetext
        lstMsg += "<td class='ajustarCol'><center><button id='btn_nuevoRegMsg' type='button' class='btn btn-danger' onclick='eliminarRegMsg()'><i class='far fa-minus-square'></i></button>"
        lstMsg += "<td class='ajustarCol'><center><button id='btn_editarRegMsg' type='button' class='btn btn-warning' data-bs-toggle='modal' data-bs-target='#exampleModalMsg' onclick='cargarInfoModalMsg()'><i class='far fa-edit'></i></button>"
    }
    $('#listMensajes').append(lstMsg);
    countRowMsg = lastId;
}

function ConvertirStringToDate(fechaString)
{
    var fechasplit = fechaString.split('-');
    let dd = fechasplit[2];
    let mm = fechasplit[1];
    let aaaa = fechasplit[0];
    let fecha_corregida = `${dd}-${mm}-${aaaa}`;
       
    return fecha_corregida;
}

function ConvertirStringToDate2(fechaString)
{
    var fechasplit = fechaString.split('/');
    let dd = fechasplit[2];
    let mm = fechasplit[1];
    let aaaa = fechasplit[0];
    let fecha_corregida = `${dd}-${mm}-${aaaa}`;
       
    return fecha_corregida;
}

/* Funciones llamadas desde el form Clientes */
function consultarCliente(campoId){
    $('#listClientes > tbody').empty();
    getDatabyId(campoId, "Clientes", urlAPI);
}

function cargarDatos(){
    $('#consultaID').val('');
    $('#listClientes > tbody').empty();
    getData("Clientes", urlAPI);
}

function validarCamposClientes(){
    if($("#nombre_modal").val()==""){
        alert('El campo Nombre no puede estar vacio!!!.');
        return false;
    }

    if($("#email_modal").val().indexOf('@',0) == -1 || $("#email_modal").val().indexOf('.', 0) == -1){
        alert('El campo Email no puede estar vacio ó el introducido no es correcto.');
            return false;
    }

    if($("#edad_modal").val()=="" || parseInt($("#edad_modal").val())<1){
        alert('El campo Edad debe ser mayor a 1.');
        return false;
    }
    return true;
}

function nuevoCliente(){
    if(!validarCamposClientes())
        return;
    
    $('#listClientes > tbody').empty();
    insertDataClient();
    limpiarControles();
    $('#exampleModal').modal('toggle');
    getData("Clientes", urlAPI);
}

function cargarInfoModal(){
    $('#nuevoRegC').hide();
    $('#btn_NewRec').hide();

    $('#editarRegC').show();
    $('#btn_EditRec').show();
    $('#id_modal_div').show();
    $('#id_modal').prop( 'disabled', true);

    $('#listClientes tbody tr').click(function () {
        $('#id_modal').val($(this).find('td:first-child').html()),
        $('#nombre_modal').val($(this).find('td:nth-child(2)').html()),
        $('#email_modal').val($(this).find('td:nth-child(3)').html()),
        $('#edad_modal').val($(this).find('td:nth-child(4)').html())
    });
}

function editarCliente(){
    if(!validarCamposClientes()){
        return;
    }

    $('#listClientes > tbody').empty();
    updateDataClient();
    limpiarControles();
    $('#exampleModal').modal('toggle');
    getData("Clientes", urlAPI);
}

function eliminarReg(){     
    if(confirm("desea eliminar el registro seleccionado?"))
    {
        $('#listClientes tbody tr').click(function () { 
            var deleteid = $(this).find('td:first-child').html();
            deleteData(parseInt($(this).find('td:first-child').html()),"Clientes", urlAPI);
            $('#listClientes > tbody').empty();
        }); 
    }
}

function viewContentModalNew(){
    $('#nuevoRegC').show();
    $('#btn_NewRec').show();

    $('#editarRegC').hide();
    $('#btn_EditRec').hide();
    $('#id_modal_div').hide();
    limpiarControles();
}

function limpiarControles(){
    $('#nombre_modal').val(''),
    $('#email_modal').val(''),
    $('#edad_modal').val('')
}

/* Funciones llamadas desde el form Mensajes */
function consultarMsg(campoId){
    $('#listMensajes > tbody').empty();
    getDatabyId(campoId, "Mensajes", urlAPIMsg);
}

function cargarDatosMsg(){
    $('#consultaIDMsg').val('');
    $('#listMensajes > tbody').empty();
    getData("Mensajes", urlAPIMsg);
}

function nuevoMsg(){
    if(!validarCampoMsg()){
        return;
    }
    $('#listMensajes > tbody').empty();
    insertDataMsg();
    $('#msg_modal').val('')
    $('#exampleModalMsg').modal('toggle');
    getData("Mensajes", urlAPIMsg);
}

function cargarInfoModalMsg(){
    $('#nuevoRegMsg').hide();
    $('#btn_NewRecMsg').hide();

    $('#editarRegMsg').show();
    $('#btn_EditRecMsg').show();
    $('#idMsg_modal_div').show();
    $('#idmsg_modal').prop('disabled', true);

    $('#listMensajes tbody tr').click(function () {
        $('#idmsg_modal').val($(this).find('td:first-child').html()),
        $('#msg_modal').val($(this).find('td:nth-child(2)').html())
    });
}

function editarMsg(){
    if(!validarCampoMsg()){
        return;
    }
    $('#listMensajes > tbody').empty();
    updateDataMsg();
    getData("Mensajes", urlAPIMsg);
    $('#msg_modal').val('');
    $('#exampleModalMsg').modal('toggle');
}

function eliminarRegMsg(){     
    if(confirm("desea eliminar el registro seleccionado?"))
    {
        $('#listMensajes tbody tr').click(function () { 
            var deleteid = $(this).find('td:first-child').html();
            deleteData(parseInt($(this).find('td:first-child').html()), "Mensajes", urlAPIMsg);
            $('#listMensajes > tbody').empty();
        }); 
    }
}

function viewContentModalNewMsg(){
    $('#nuevoRegMsg').show();
    $('#btn_NewRecMsg').show();

    $('#editarRegMsg').hide();
    $('#btn_EditRecMsg').hide();
    $('#idMsg_modal_div').hide();
}

function validarCampoMsg(){
    if($("#msg_modal").val()==""){
        alert('El campo Mensaje no puede estar vacio!!!.');
        return false;
    }
    return true;
}