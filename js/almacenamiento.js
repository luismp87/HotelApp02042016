var almacen = {
    pr: null,
    di: null,
    th: null,
    db: null,
    guardarReserva: function(pr,di,th){
        almacen.pr = pr;
        alamcen.di = di;
        alamcen.th = th;
        almacen.db = window.openDatabase("hotelApp","1.0","HotelApp Storage",200000);
        almacen.db.transaction(almacen.hacerReserva,almacen.error, almacen.guardarReserva);
        
    },
    hacerReserva: function(tx)
    {
        tx.executeSql("CREATE TABLE IF NOT EXISTS reservas (pr,di,th)");
        tx.executeSql("INSERT INTO reservas (pr,di,th) VALUES ('"+almacen.pr+"','"+almacen.di+"','"+almacen.th+"')");         
    },
    error: Function()
    {
        alert("Error al acceder a la base de datos");  
    },
    reservaGuardada: function()
    {        
        navigator.notification.alert("Reserva guardada en espera de sincronizacion", almacen.leerReservas, "Felicidades","Aceptar");
    },
    leerReservas: function()
    {
        almacen.db.trasaction(almacen.consultaReserva, almacen.error,null);
    },
        consultaReserva: function(tx)
    {
        tx.executeSql("SELECT * FROM reservas",[],function(tx2,tabla)
        {
            for(i =0;i<tabla.rows.length; i++)
                {
                    navigator.notification.confirm("Personas: " + tabla.rows.item(i).pr + "\n" 
                                                   + "Dias: " + tabla.rows.item(i).di + "\n"
                                                  + "Tipo de habitacion: " + tabla.rows.item(i).th,
                                                  function(btn)
                                                   {
                                                        if(btn == 1)  navigator.vibrate(500);
                                                        if(btn == 1)  navigator.notification.beep(1)
                                                    },"tabla reserva","Vibrar, Sonar, Cancelar ");
                }
        }
    }
}