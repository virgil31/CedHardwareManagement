Ext.define('CL.controller.C_modello_hardware', {
    extend: 'Ext.app.Controller',

    routes: {
        'modelli_hardware' : 'showView'
    },

    stores: [
        'S_modello_hardware'
    ],

    models: [
        'M_modello_hardware'
    ],

    views: [
        'modello_hardware.V_list',
        'modello_hardware.V_create',
        'modello_hardware.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            //ON CREATE
            'modello_hardware_list button[action=on_create]': {
                click: this.onCreate
            },

            //DO CREATE
            'modello_hardware_create button[action=do_create]':{
                click: this.doCreate
            },

            //DO EDIT
            'modello_hardware_edit button[action=do_edit]':{
                click: this.doEdit
            }

        }, this);
    },
    /////////////////////////////////////////////////


    //ON DESTROY
    onDestroy: function(record){

        Ext.Msg.confirm('Attenzione!', 'Eliminare <b>'+record.get("nome")+"</b>?",function(btn){
            if (btn === 'yes')
                Ext.StoreManager.lookup("S_modello_hardware").remove(record);
        });

    },


    //ON EDIT
    onEdit: function(animateTargetEl,record){
        var win = Ext.widget("modello_hardware_edit",{
            animateTarget: animateTargetEl
        });

        var form = win.down("form").getForm();
        form.loadRecord(record);
    },

    //DO EDIT
    doEdit: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            record = form.getRecord(),
            values = form.getValues();

        Ext.Msg.confirm('Attenzione!', "Modificare il Modello di Hardware?",function(btn){
            if (btn === 'yes'){
                record.set(values);
                window.close();
                Ext.StoreManager.lookup("S_modello_hardware").reload();
            }
        });
    },


    //ON CREATE
    onCreate: function(btn){
        Ext.widget("modello_hardware_create",{
            animateTarget: btn.el
        });
    },


    //DO CREATE
    doCreate: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            values = form.getValues();

        if(form.isValid()){
            Ext.StoreManager.lookup("S_modello_hardware").add(values);
            window.close();
            setTimeout(function(){
                Ext.StoreManager.lookup("S_modello_hardware").reload();
            }, 250);
        }
    },


    //SHOW VIEW
    showView: function(){
        //Ext.ComponentQuery.query("window").forEach(function(win){win.destroy();});  //per eliminare le vecchie windows

        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('modello_hardware_list').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'modello_hardware_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('modello_hardware_list_id');

            Ext.StoreManager.lookup("S_modello_hardware").loadPage(1);
        }
        else
            this.redirectTo('login');
    },


    // per gli hyperlink
    onEditById: function(animateTargetEl,id){
        var my_controller = this;
        var record = Ext.StoreManager.lookup("S_modello_hardware").getById(id);

        my_controller.onEdit(animateTargetEl,record);
    }



});
