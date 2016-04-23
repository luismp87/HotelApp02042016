var server = {
    
    sincronizar: function(pr, di, th){
    
           $.ajax({
			  method: "POST",
			  url: "http://carlos.igitsoft.com/apps/test.php",
			  data: { Persona: pr, dia: di, tipo: th },
               error: function(jq,txt){
               $.mobile.loading("hide");
              navigator.notification.alert("Reserva guardada en espera de sincronización",null, "Error", "Aceptar");
               
           }
			}).done(server.sincronizado);
    },
    sincronizado: function(msg){
        if(msg == 1 )
        {
             navigator.notification.alert("Sincrinizado",null, "Error", "Aceptar");
        }
        else
        {
                 navigator.notification.alert("Sin sincronizar",null, "Error", "Aceptar");
        }
    
    
}
       
    }        
  