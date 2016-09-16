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
            },

            //DO LOGIN RICHIESTA
            'window button[action=do_login_richiesta]':{
                click: this.doLoginRichiesta
            }

        }, this);
    },
    /////////////////////////////////////////////////

    //SHOW VIEW
    showView: function(){
        if(Ext.util.Cookies.get("ced_logged") == null){
            if(Ext.ComponentQuery.query('login').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'login'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('login_id');
        }
        else
            this.redirectTo('home');
    },

    //DO LOGIN
    doLogin: function(btn){
        var form = btn.up("form");
        if(form.isValid()){
            Ext.Ajax.request({
                url: 'data/session/login.php',
                method: "POST",

                params: {
                    username: Ext.ComponentQuery.query("login textfield[name=username]")[0].getValue(),
                    password: btoa(btoa(btoa(Ext.ComponentQuery.query("login textfield[name=password]")[0].getValue())))
                },

                success: function(response, opts) {
                    var risposta = Ext.decode(response.responseText);
                    if(!risposta.success)
                        Ext.Msg.alert("Attenzione",risposta.message);
                    else{
                        Ext.util.Cookies.set("ced_logged", true);
                        location.reload();
                    }
                }
            });
        }
    },

    //DO LOGIN RICHIESTA
    doLoginRichiesta: function(btn){
        var form = btn.up("form");
        if(form.isValid()){
            var values = form.getValues();        

            Ext.Ajax.request({
                url: 'data/session/login_richiesta.php',
                method: "POST",

                params: {
                    username: values.username,
                    password: btoa(btoa(btoa(values.password)))
                },

                success: function(response, opts) {
                    var risposta = Ext.decode(response.responseText);
                    if(!risposta.success)
                        Ext.Msg.alert("Attenzione",risposta.message);
                    else{
                        //Ext.util.Cookies.set("richiesta_logged", true);
                        Ext.util.Cookies.set("richiedente_id", risposta.utente.id);
                        Ext.util.Cookies.set("richiedente_nome", risposta.utente.nome);
                        Ext.util.Cookies.set("richiedente_cognome", risposta.utente.cognome);

                        btn.up("window").close();
                        CL.app.getController("C_login").redirectTo("richiesta");
                    }
                }
            });
        }
    }

});
