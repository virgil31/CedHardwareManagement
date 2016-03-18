Ext.define('CL.controller.C_fattura', {
    extend: 'Ext.app.Controller',

    routes: {
        'fatture' : 'showView'
    },

    stores: [
        'S_fattura'
    ],

    models: [
        'M_fattura'
    ],

    views: [
        'fattura.V_list',
        'fattura.V_create',
        'fattura.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            //ON CREATE
            'fattura_list button[action=on_create]': {
                click: this.onCreate
            },

            //DO CREATE
            'fattura_create button[action=do_create]':{
                click: this.doCreate
            },

            //DO EDIT
            'fattura_edit button[action=do_edit]':{
                click: this.doEdit
            }

        }, this);
    },
    /////////////////////////////////////////////////


    //ON DESTROY
    onDestroy: function(record){

        Ext.Msg.confirm('Attenzione!', 'Eliminare <b>'+record.get("codice")+"</b>?",function(btn){
            if (btn === 'yes')
                Ext.StoreManager.lookup("S_fattura").remove(record);
        });

    },


    //ON EDIT
    onEdit: function(animateTargetEl,record){
        var win = Ext.widget("fattura_edit",{
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

        Ext.Msg.confirm('Attenzione!', "Modificare la Fattura?",function(btn){
            if (btn === 'yes'){
                record.set(values);
                window.close();
                Ext.StoreManager.lookup("S_fattura").reload();
            }
        });
    },

    //ON CREATE
    onCreate: function(btn){
        Ext.widget("fattura_create",{
            animateTarget: btn.el
        });


    },


    //DO CREATE
    doCreate: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            values = form.getValues();

        if(form.isValid()){
            Ext.StoreManager.lookup("S_fattura").add(values);

            if(window.callbackOnCreated != null)
                window.callbackOnCreated();

            window.close();
            setTimeout(function(){
                Ext.StoreManager.lookup("S_fattura").reload();
            }, 250);
        }
    },


    //SHOW VIEW
    showView: function(){
        //Ext.ComponentQuery.query("window").forEach(function(win){win.destroy();});  //per eliminare le vecchie windows

        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('fattura_list').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'fattura_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('fattura_list_id');

            Ext.StoreManager.lookup("S_fattura").loadPage(1);
            Ext.StoreManager.lookup("S_fornitore").load({
                params: {
                    flag_full: true
                }
            });
        }
        else
            this.redirectTo('login');
    },


    // per gli hyperlink
    onEditById: function(animateTargetEl,id){
        var my_controller = this;
        var record = Ext.StoreManager.lookup("S_fattura").getById(id);

        my_controller.onEdit(animateTargetEl,record);
    }



});
