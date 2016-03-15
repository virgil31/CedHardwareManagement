Ext.define('CL.controller.C_sede', {
    extend: 'Ext.app.Controller',

    routes: {
        'sedi' : 'showView'
    },

    stores: [
        'S_sede'
    ],
    models: [
        'M_generic'
    ],
    views: [
        'sede.V_list',
        'sede.V_create',
        'sede.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({
            //ON CREATE
            'sede_list button[action=on_create]': {
                click: this.onCreate
            },

            //DO CREATE
            'sede_create button[action=do_create]':{
                click: this.doCreate
            },

            //DO EDIT
            'sede_edit button[action=do_edit]':{
                click: this.doEdit
            }
        }, this);
    },
    /////////////////////////////////////////////////

    //ON DESTROY
    onDestroy: function(record){

        Ext.Msg.confirm('Attenzione!', 'Eliminare '+record.get("nome")+"?",function(btn){
            if (btn === 'yes')
                Ext.StoreManager.lookup("S_sede").remove(record);
        });

    },

    //ON EDIT
    onEdit: function(animateTargetEl,record){
        var win = Ext.widget("sede_edit",{
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

        Ext.Msg.confirm('Attenzione!', 'Modificare la sede?',function(btn){
            if (btn === 'yes'){
                record.set(values);
                window.close();
            }
        });
    },

    //ON CREATE
    onCreate: function(btn){
        Ext.widget("sede_create",{
            animateTarget: btn.el
        });
    },


    //DO CREATE
    doCreate: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            values = form.getValues();

        if(form.isValid()){
            Ext.StoreManager.lookup("S_sede").add(values);

            if(window.callbackOnCreated != null)
                window.callbackOnCreated();

            window.close();
        }
    },

    //SHOW VIEW
    showView: function(){
        //Ext.ComponentQuery.query("window").forEach(function(win){win.destroy();});  //per eliminare le vecchie windows

        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('sede_list').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'sede_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('sede_list_id');

            Ext.StoreManager.lookup("S_sede").loadPage(1);
        }
        else
            this.redirectTo('login');
    }



});
