Ext.define('CL.controller.C_controlla_richiesta', {
    extend: 'Ext.app.Controller',

    routes: {
        'controlla_richiesta' : 'showView'
    },

    stores: [
        //
    ],
    models: [
        //
    ],
    views: [
        'controlla_richiesta.V_controlla_richiesta'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

        }, this);
    },
    /////////////////////////////////////////////////

    //ROUTES

    showView: function(){

        if(Ext.ComponentQuery.query('controlla_richiesta').length == 0)
            Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'controlla_richiesta'});

        Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('controlla_richiesta_id');

    }

});
