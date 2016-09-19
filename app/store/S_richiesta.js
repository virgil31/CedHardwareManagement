Ext.define('CL.store.S_richiesta',{
    extend: 'Ext.data.Store',


    autoLoad: false, //prima era TRUE
    autoSync: false,

    model: 'CL.model.M_richiesta',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'ric_numero', direction : 'DESC' }, //lo ordiniamo per id

    //mostro un messaggio di errore quando non riesco a connetermi al db
    listeners:{
        load: function( store, records, successful){
            if(!successful){
                Ext.Msg.show({
                    title:"<b>Critical Error</b>",
                    message: "Impossibile connettersi al <b>database!</b><br>Risolvere il problema e ricaricare la pagina per continuare.",
                    icon: Ext.Msg.ERROR,
                    closable: false
                });
            }
        }
    }


});
