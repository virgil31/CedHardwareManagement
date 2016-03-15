Ext.define('CL.controller.C_marca_hardware', {
    extend: 'Ext.app.Controller',

    routes: {
        'marche_hardware' : 'showView'
    },

    stores: [
        'S_marca_hardware'
    ],
    models: [
        'M_generic'
    ],
    views: [
        'marca_hardware.V_list',
        'marca_hardware.V_create',
        'marca_hardware.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({
            //ON CREATE
            'marca_hardware_list button[action=on_create]': {
                click: this.onCreate
            },

            //DO CREATE
            'marca_hardware_create button[action=do_create]':{
                click: this.doCreate
            },

            //DO EDIT
            'marca_hardware_edit button[action=do_edit]':{
                click: this.doEdit
            }
        }, this);
    },
    /////////////////////////////////////////////////

    //ON DESTROY
    onDestroy: function(record){

        Ext.Msg.confirm('Attenzione!', 'Eliminare <b>'+record.get("nome")+"</b>?",function(btn){
            if (btn === 'yes')
                Ext.StoreManager.lookup("S_marca_hardware").remove(record);
        });

    },

    //ON EDIT
    onEdit: function(animateTargetEl,record){
        var win = Ext.widget("marca_hardware_edit",{
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
        Ext.widget("marca_hardware_create",{
            animateTarget: btn.el
        });
    },


    //DO CREATE
    doCreate: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            values = form.getValues();

        if(form.isValid()){
            Ext.StoreManager.lookup("S_marca_hardware").add(values);

            if(window.callbackOnCreated != null)
                window.callbackOnCreated();

            window.close();
        }

    },

    //SHOW VIEW
    showView: function(){
        //Ext.ComponentQuery.query("window").forEach(function(win){win.destroy();});  //per eliminare le vecchie windows

        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('marca_hardware_list').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'marca_hardware_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('marca_hardware_list_id');

            Ext.StoreManager.lookup("S_marca_hardware").loadPage(1);
        }
        else
            this.redirectTo('login');
    }



});
