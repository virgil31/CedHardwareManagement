Ext.define('CL.controller.C_tipo_hardware', {
    extend: 'Ext.app.Controller',

    routes: {
        'tipi_hardware' : 'showView'
    },

    stores: [
        'S_tipo_hardware'
    ],
    models: [
        'M_generic'
    ],
    views: [
        'tipo_hardware.V_list',
        'tipo_hardware.V_create',
        'tipo_hardware.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({
            //ON CREATE
            'tipo_hardware_list button[action=on_create]': {
                click: this.onCreate
            },

            //DO CREATE
            'tipo_hardware_create button[action=do_create]':{
                click: this.doCreate
            },

            //DO EDIT
            'tipo_hardware_edit button[action=do_edit]':{
                click: this.doEdit
            }
        }, this);
    },
    /////////////////////////////////////////////////

    //ON DESTROY
    onDestroy: function(record){

        Ext.Msg.confirm('Attenzione!', 'Eliminare <b>'+record.get("nome")+"</b>?",function(btn){
            if (btn === 'yes')
                Ext.StoreManager.lookup("S_tipo_hardware").remove(record);
        });

    },

    //ON EDIT
    onEdit: function(animateTargetEl,record){
        var win = Ext.widget("tipo_hardware_edit",{
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

        Ext.Msg.confirm('Attenzione!', 'Modificare il tipo di hardware?',function(btn){
            if (btn === 'yes'){
                record.set(values);
                window.close();
            }
        });
    },

    //ON CREATE
    onCreate: function(btn){
        Ext.widget("tipo_hardware_create",{
            animateTarget: btn.el
        });
    },


    //DO CREATE
    doCreate: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            values = form.getValues();

        if(form.isValid()){
            Ext.StoreManager.lookup("S_tipo_hardware").add(values);

            if(window.callbackOnCreated != null)
                window.callbackOnCreated();

            window.close();
        }

    },

    //SHOW VIEW
    showView: function(){
        //Ext.ComponentQuery.query("window").forEach(function(win){win.destroy();});  //per eliminare le vecchie windows

        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('tipo_hardware_list').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'tipo_hardware_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('tipo_hardware_list_id');

            Ext.StoreManager.lookup("S_tipo_hardware").loadPage(1);
        }
        else
            this.redirectTo('login');
    }



});
