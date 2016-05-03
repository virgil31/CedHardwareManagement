Ext.define('CL.controller.C_albero_risorse', {
    extend: 'Ext.app.Controller',

    routes: {
        'albero_risorse' : 'showView'
    },

    stores: [
        'S_albero_risorse'
    ],
    models: [
        //
    ],
    views: [
        'albero_risorse.V_albero_risorse'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

        }, this);
    },
    /////////////////////////////////////////////////

    //ROUTES

    showView: function(){

        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('albero_risorse').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'albero_risorse'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('albero_risorse_id');
        }
        else
            this.redirectTo('login');
    }

    /////////////////////////////////////////////////


});
