Ext.define('CL.controller.C_tipi_hw', {
    extend: 'Ext.app.Controller',

    routes: {
        'tipi_hw' : 'showView'
    },

    stores: [
        //
    ],
    models: [
        //
    ],
    views: [
        'tipi_hw.V_list'
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
            if(Ext.ComponentQuery.query('tipi_hw_list').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'tipi_hw_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('tipi_hw_list_id');
        }
        else
            this.redirectTo('login');
    }

    /////////////////////////////////////////////////


});
