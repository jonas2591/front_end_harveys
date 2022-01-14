
(function() { //PARTE DO MENU
    //
    let documentWidth = $(window).width()
    
    if(documentWidth > 800){
        //$('#nav').show(); //Computador
        $('#menu').hide();
        $('#container-menu').hide();
        
    }

    if(documentWidth <= 600){
        //$('#nav').hide(); //Celular
        $('#menu').show();
        $('#menu-lateral').hide();
    }

    $("#menu").click(function() {
        let isHidden = $( ".menu-lateral" ).is( ":hidden" );
        if(isHidden){
            $('#bar1').attr('id','bar1-close');
            $('#bar2').attr('id','bar2-close');
            $('#bar3').attr('id','bar3-close');
            $('#menu-lateral').show();
            
        }else{
            $('#bar1-close').attr('id','bar1');
            $('#bar2-close').attr('id','bar2');
            $('#bar3-close').attr('id','bar3');
            $('#menu-lateral').hide();
        }
    });
})()