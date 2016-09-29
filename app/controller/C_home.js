Ext.define('CL.controller.C_home', {
    extend: 'Ext.app.Controller',

    routes: {
        'home' : 'showView'
    },

    stores: [
        //
    ],
    models: [
        //
    ],
    views: [
        'home.V_home'
    ],

    /////////////////////////////////////////////////
    init: function() {
        this.control( {

        },
        this);
    },
    /////////////////////////////////////////////////

    //ROUTES
    showView: function() {
        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('home').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'home'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('home_id');
        }
        else
            this.redirectTo('login');
    }

    /////////////////////////////////////////////////


});
