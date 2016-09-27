Ext.define('CL.controller.C_controlla_richieste', {
    extend: 'Ext.app.Controller',

    routes: {
        'controlla_richieste' : 'showView'
    },

    stores: [
        //
    ],
    models: [
        //
    ],
    views: [
        'controlla_richieste.V_controlla_richieste'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

        }, this);
    },
    /////////////////////////////////////////////////

    //ROUTES

    showView: function(){

        if(Ext.ComponentQuery.query('controlla_richieste').length == 0)
            Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'controlla_richieste'});

        Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('controlla_richieste_id');

        //

        var store = Ext.StoreManager.lookup("S_richiesta");

        store.proxy.extraParams.ric_id_richiedente = Ext.util.Cookies.get("richiedente_id");

        store.loadPage(1);

    }

});
