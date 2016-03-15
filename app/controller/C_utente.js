Ext.define('CL.controller.C_utente', {
    extend: 'Ext.app.Controller',

    routes: {
        'utenti' : 'showView'
    },

    stores: [
        'S_utente'
    ],
    models: [
        'M_utente'
    ],
    views: [
        'utente.V_list',
        'utente.V_create',
        'utente.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({
            //ON CREATE
            'utente_list button[action=on_create]': {
                click: this.onCreate
            },

            //DO CREATE
            'utente_create button[action=do_create]':{
                click: this.doCreate
            },

            //DO EDIT
            'utente_edit button[action=do_edit]':{
                click: this.doEdit
            }
        }, this);
    },
    /////////////////////////////////////////////////

    //ON DESTROY
    onDestroy: function(record){

        Ext.Msg.confirm('Attenzione!', 'Eliminare <b>'+record.get("nome")+"</b>?",function(btn){
            if (btn === 'yes')
                Ext.StoreManager.lookup("S_utente").remove(record);
        });

    },

    //ON EDIT
    onEdit: function(animateTargetEl,record){
        var win = Ext.widget("utente_edit",{
            animateTarget: animateTargetEl
        });

        win.down("form").loadRecord(record);
    },

    //DO EDIT
    doEdit: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            record = form.getRecord(),
            values = form.getValues();

        Ext.Msg.confirm('Attenzione!', 'Modificare la utente?',function(btn){
            if (btn === 'yes'){
                record.set(values);
                window.close();
            }
        });
    },

    //ON CREATE
    onCreate: function(btn){
        Ext.widget("utente_create",{
            animateTarget: btn.el
        });
    },


    //DO CREATE
    doCreate: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            values = form.getValues();

        if(form.isValid()){
            Ext.StoreManager.lookup("S_utente").add(values);

            if(window.callbackOnCreated != null)
                window.callbackOnCreated();

            window.close();
        }
    },

    //SHOW VIEW
    showView: function(){
        //Ext.ComponentQuery.query("window").forEach(function(win){win.destroy();});  //per eliminare le vecchie windows

        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('utente_list').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'utente_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('utente_list_id');

            Ext.StoreManager.lookup("S_utente").loadPage(1);
        }
        else
            this.redirectTo('login');
    }



});
