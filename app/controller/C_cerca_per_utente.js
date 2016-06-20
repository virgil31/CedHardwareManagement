Ext.define('CL.controller.C_cerca_per_utente', {
    extend: 'Ext.app.Controller',

    routes: {
        'cerca_per_utente' : 'showView'
    },

    stores: [
        'S_cerca_per_utente'
    ],

    models: [
        'M_cerca_per_utente'
    ],

    views: [
        'cerca_per_utente.V_list'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

        }, this);
    },
    /////////////////////////////////////////////////


    //SHOW VIEW
    showView: function(){
        //Ext.ComponentQuery.query("window").forEach(function(win){win.destroy();});  //per eliminare le vecchie windows

        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('cerca_per_utente_list').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'cerca_per_utente_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('cerca_per_utente_list_id');
            Ext.StoreManager.lookup("S_utente").load({
                params:{
                    flag_only_richiedenti: true
                }
            });
        }
        else
            this.redirectTo('login');
    }

});
