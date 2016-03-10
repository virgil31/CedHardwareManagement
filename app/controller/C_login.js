Ext.define('CL.controller.C_login', {
    extend: 'Ext.app.Controller',

    routes: {
        'login' : 'showView'
    },

    stores: [
        //
    ],
    models: [
        //
    ],
    views: [
        'login.V_login'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            //DO LOGIN
            'login button[action=do_login]':{
                click: this.doLogin
            }

        }, this);
    },
    /////////////////////////////////////////////////

    //SHOW VIEW
    showView: function(){
        if(Ext.util.Cookies.get("user_id") == null){
            if(Ext.ComponentQuery.query('login').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'login'});            

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('login_id');
        }
        else
            this.redirectTo('home');
    },

    //DO LOGIN
    doLogin: function(btn){       
        Ext.util.Cookies.set("user_id",123);
        location.reload();
    }

});
