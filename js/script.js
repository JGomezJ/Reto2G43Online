// declaramos variables
var side_menu, btn_open, body, header_page, main_content, footer_page, 
container_footer, nuevo_registro, page_clientes, page_mensajes;

var urlAPIMsg = "https://gb4896c6dd4008f-bdgastos.adb.ca-montreal-1.oraclecloudapps.com/ords/admin/message/message"; 
var urlAPI = "https://gb4896c6dd4008f-bdgastos.adb.ca-montreal-1.oraclecloudapps.com/ords/admin/client/client";

$(document).ready(function(){    
    agregarMenu();
    getData("Clientes", urlAPI);
    getData("Mensajes", urlAPIMsg);
    agregarFooter();
    

    $('body').on('click', '#side_menu a', function(e){
        // $("a").addClass('selected');
        console.log(page_actual);
        
        var page_actual = $(this).attr('id');
        if(page_actual==page_clientes){
            console.log(page_actual);
            $(page_actual).addClass('selected');
        }
        //e.preventDefault();
    })

    var sm = $('#side_menu');
    var btn_op = $('#btn_open');
    var b = $('#body')
    var hp = $('#header_page')
    var m = $('#main_content')
    var nr = $('#btn_nuevoReg')
    var cfp = $('#container_footer')
    var pc = $('page_Clientes')
    var pm = $('page_Mensajes')

    side_menu = sm; 
    body = b;
    header_page = hp;
    main_content = m;
    nuevo_registro = nr;
    container_footer = cfp;
    page_clientes = pc;
    page_mensajes = pm;
    
});
// class="selected"

function agregarMenu(){
    var menu = $('#menu');
    menu.html('<header id="header_page">'+
            '<div class="icon_menu">'+
                '<i id="btn_open" class="fas fa-bars" onclick="openMenu()"></i>'+
            '</div>'+
        '</header>'+
        '<div id="side_menu" class="menu_side">'+
            '<div class="name_page">'+
                '<i class="fa fa-youtube"></i>'+
                '<h4>Reto2G43MT</h4>'+
            '</div>'+
            '<div class="options_menu">'+
                '<a id="page_Clientes" href="index.html">'+
                    '<div class="option">'+
                        '<i class="fas fa-home" title="Clientes"></i>'+
                        '<h4>Clientes</h4>'+
                    '</div>'+
                '</a>'+
                '<a id="page_Mensajes" href="mensajes.html">'+
                    '<div class="option">'+
                        '<i class="fas fa-file" title="Mensajes"></i>'+
                        '<h4>Mensajes</h4>'+
                    '</div>'+
                '</a>'+
                '<a href="#" hidden>'+
                    '<div class="option">'+
                        '<i class="fas fa-video" title="Cursos"></i>'+
                        '<h4>Cursos</h4>'+
                    '</div>'+
                '</a>'+
                '<a href="#" hidden>'+
                    '<div class="option">'+
                        '<i class="fas fa-sticky-note" title="Blog"></i>'+
                        '<h4>Blog</h4>'+
                    '</div>'+
                '</a>'+
                '<a href="#" hidden>'+
                    '<div class="option">'+
                        '<i class="fas fa-id-badge" title="Contacto"></i>'+
                        '<h4>Contacto</h4>'+
                    '</div>'+
                '</a>'+
                '<a href="#" hidden>'+
                    '<div class="option">'+
                        '<i class="fas fa-address-card" title="Nosotros"></i>'+
                        '<h4>Nosotros</h4>'+
                    '</div>'+
                '</a>'+
            '</div>'+
        '</div>'
    );
}

function agregarFooter(){
    var footer = $('#footer');
    footer.html(//'<footer>' + 
        '<div class="container_footer">' +
            '<div class="box_footer">' +
                '<div class="logo">' +
                    '<img src="https://misiontic2022.usergioarboleda.edu.co/assets/images/banner_mintic_logo.svg" alt="MisionTic2021">' +
                '</div>' +
                '<div class="terms">' +
                    '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo tenetur obcaecati omnis molestiae corporis sequi delectus modi nemo animi dolorem nam perspiciatis totam veniam blanditiis doloribus ipsa, temporibus nihil. Obcaecati?</p>' +
                '</div>' +
            '</div>' +
            '<div class="box_footer">' +
                '<h2>Soluciones</h2>' +
                '<a href="">App Desarrollo</a>' +
                '<a href="">App Marketing</a>' +
                '<a href="">IOS Desarrollo</a>' +
                '<a href="">Android Desarrollo</a>' +
            '</div>' +
            '<div class="box_footer">' +
                '<h2>Compañia</h2>' +
                '<a href="https://misiontic2022.usergioarboleda.edu.co/nosotros">Acerca de</a>' +
                '<a href="">Trabajos</a>' +
                '<a href="https://misiontic2022.usergioarboleda.edu.co/contacto">Procesos</a>' +
                '<a href="https://misiontic2022.usergioarboleda.edu.co/noticias">Servicios</a>' +
            '</div>' +
            '<div class="box_footer">' +
                '<h2>Redes Sociales</h2>' +
                '<a href="https://www.facebook.com/wolf.darksky/"><i class="fab fa-facebook-square"></i> Facebook</a>' +
                '<a href="#"><i class="fab fa-twitter-square"></i> Twitter</a>' +
                '<a href="https://www.linkedin.com/in/john-gomez-a654245b/"><i class="fab fa-linkedin"></i> Linkedin</a>' +
                '<a href="#"><i class="fab fa-instagram-square"></i> Instagram</a>' +
            '</div>' +
        '</div>' +
        '<div class="box_copyrigth">' +
            '<hr>' +
            '<p>Todos los derechos reservados. &copy; 2021 <b>by JGomezJ</b></p>' +
        '</div>' //+ '</footer>'
    );
}

function openMenu(){
    body.toggleClass('body_move');
    side_menu.toggleClass('menu_side_move');
    header_page.toggleClass('header_page_move');
    main_content.toggleClass('main_content_move');
    //footer_page.toggleClass('footer_move');
    nuevo_registro.toggleClass('nuevo_registro_move');
}
// evento para mostrar y ocultar menu
// ejecutar funcion en el evento click

if(window.innerWidth < 760){
    body.toggleClass('body_move');
    side_menu.toggleClass('menu_side_move');
    header_page.toggleClass('header_page_move');
    main_content.toggleClass('main_content_move');
    footer_page.toggleClass('footer_move')
    nuevo_registro.toggleClass('nuevo_registro_move')
}

// menu responsive
$(document).on('resize', function(){
    if(window.innerWidth > 760){
        body.removeClass('body_move');
        side_menu.removeClass('menu_side_move');
        header_page.removeClass('header_page_move');
        main_content.removeClass('main_content_move');
        footer_page.removeClass('footer_move')
        nuevo_registro.removeClass('nuevo_registro_move')
    }

    if(window.innerWidth < 760){
        body.addClass('body_move');
        side_menu.addClass('menu_side_move');
        header_page.addClass('header_page_move');
        main_content.addClass('main_content_move');
        footer_page.addClass('footer_move')
        nuevo_registro.addClass('nuevo_registro_move')
    }
});


// https://www.youtube.com/watch?v=idRdAgNnC5Q&list=RDCMUCgY6raSf9MhsMjXwmG83-Bg&start_radio=1&rv=idRdAgNnC5Q&t=16324
// https://code.tutsplus.com/es/tutorials/making-a-sliding-side-navigation-menu-for-responsive-designs--cms-28400
// https://codepen.io/AlberPedraza/pen/PbKeVb
// https://stackoverflow.com/questions/31789294/classlist-toggle-not-working