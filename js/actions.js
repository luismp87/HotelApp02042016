var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
    init: function(){
        //funcionalidades para el registro
        if(!fn.estaRegistrado())
            window.location.href = '#registro';
        // -- MANDO A LLAMAR EL BOTON QUE ESTA DENTRO DEL DIV ---
        $('#registro div[data-role=footer] a').tap(fn.registrar);
        // -- MANDO A LLAMAR EL BOTON QUE ESTA DENTRO DEL DIV ---
		
		// -- MANDO A LLAMAR EL BOTON TOMAR FOTO --
		$('#tomarFoto').click(capture.takePhoto);
		// -- MANDO A LLAMAR EL BOTON TOMAR FOTO --
        //funcionalidades para reserva
        $('#nr1 div[data-role=navbar] a:eq(0)').tap(fn.siguientePaso);
        $('#nr2 ul[data-role=listview] a').tap(fn.SeleccionaHabitacion);
        $('#nr2 div[data-role=navbar] a:eq(0)').tap(fn.obtenerReserva);
        //sincronizacion automTICA CUANDO SE CONECTE A INTERNET
        document.addEventListener("online",almacen.leerReservas,false);
            },
    // --- FUNCIONES DE REGISTRO ---
    estaRegistrado: function(){
		var usr = window.localStorage.getItem("user");
		if(usr == undefined || usr==''){			
        	return false;
		}
		else{
			return true;
		}
    },
    registrar: function(){
        // -- SE OBTIENE VALORES DE CAMPOS --
        var nom = $('#regNom').val();
        var mail = $('#regMail').val();
        var tel = $('#regTel').val();
        var foto = $('#regFoto').data('foto');
        // -- SE OBTIENE VALORES DE CAMPOS --
        
        // -- COMPROBAMOS SI LOS CAMPOS NO ESTAN VACIOS --
        if(nom != '' && mail != '' && tel != '' && foto != undefined){
            $.mobile.loading("show",{                
                theme:'b'
            });
            
        
           $.ajax({
			  method: "POST",
			  url: "http://carlos.igitsoft.com/apps/test.php",
			  data: { nom: nom, mail: mail, tel: tel },
               error: function(jq,txt){
               $.mobile.loading("hide");
               alert(jq+txt);
               
           }
			}).done(function( msg ) {
			   alert(msg);
				if(msg == 1){
					ft.transfer(foto);
				}
			});
        }else
            alert('Todos Los Campos Son Requeridos');        
        // -- COMPROBAMOS SI LOS CAMPOS NO ESTAN VACIOS --
    },
    
    // --- FUNCIONES DE reserva ---
    per: '',
    dia: '',
    th: '',
    siguientePaso: function(){
        navigator.notification.alert("hola ss",null,"Error al llenar","Aceptar");
        fn.per = $('#nrPer').val();
        fn.dia = $('#nrDia').val();
        if(fn.Per != '' && fn.dia != '')
            window.location.href="#nr2";
        else
            navigator.notification.alert("TOdos los campos son requeridos",null,"Error al llenar","Aceptar");
    },
    SeleccionaHabitacion: function(){
      $(this).parent().parent().find('a').css('background-color','transparent');  
      $(this).css('background-color','green');
        fn.th =$(this).parent().index();
        //alert(fn.th);
    },
        obtenerReserva: function(){
            if(fn.th != ''){
                if(navigator.connection.type != Connection.NONE)
                        server.sincronizar(fn.per, fn.dia, fn.th);
                        almacen.guardarHistorialReserva(fn.per,fn.dia,fn.th);
                    else
                        almacen.guardarReserva(fn.per,fn.dia,fn.th);
                        //navigator.notification.alert("Guarda localmente",null,"Error al llenar","Aceptar");
            }
            else{               
                navigator.notification.alert("Debe seleccionar tipo de habitacion",null,"Error al llenar","Aceptar");
            }
                
    }
};    
$(fn.ready);