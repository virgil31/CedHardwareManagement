Ext.define('CL.controller.C_modello', {
    extend: 'Ext.app.Controller',

    routes: {
        'modelli' : 'showView'
    },

    stores: [
        'S_modello'
    ],
    models: [
        'M_modello'
    ],
    views: [
        'modello.V_modello_list',
        'modello.V_modello_form'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            // ON CREATE
            'modello_list button[action=on_create]':{
                click: this.onCreate
            },

            // SAVE FORM
            'modello_form button[action=save]':{
                click: this.saveForm
            }

        }, this);
    },
    /////////////////////////////////////////////////


    //ROUTES
    showView: function() {
        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('modello_list').length === 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'modello_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('modello_list_id');

            //

            setTimeout(function(){
                Ext.StoreManager.lookup("S_modello").loadPage(1);
            }, 250);
        }
        else
            this.redirectTo('login');
    },

    // ON CREATE
    onCreate: function(btn){
        Ext.widget("modello_form",{
            animateTarget: btn.el,
            azione: 'create',
            title: '<b>Crea nuovo modello</b>',
            recordSalvato: function(record){
                Ext.StoreManager.lookup("S_modello").reload();
            }
        });
    },

    // ON EDIT
    onEdit: function(targetEl, rec) {
        var win = Ext.widget("modello_form",{
            animateTarget: targetEl,
            azione: 'edit',
            title: '<b>Modifica modello</b>',
            recordSalvato: function(record){
                Ext.StoreManager.lookup("S_modello").reload();
            }
        });

        var store = Ext.create("CL.store.S_modello");
        win.mask("Caricamento dati...");
        store.load({
            params: {
                id_modello: rec.get("id_modello")
            },
            callback: function() {
                win.unmask();
                if (this.data.length === 0) {
                    win.close();
                    Ext.Msg.alert("<b>Attenzione</b>","Il record selezionato è stato eliminato");
                    Ext.StoreManager.lookup("S_modello").reload();
                }
                else {
                    win.down("form").loadRecord(this.getAt(0));
                }
            }
        });
    },

    // SAVE FORM
    saveForm: function(btn){
        var win = btn.up("window"),
            form = win.down("form"),
            record = form.getRecord(),
            values = form.getValues();

        if(form.isValid()){
            // CREAZIONE
            if(win.azione == "create"){
                record = Ext.create('CL.model.M_modello', values);
            }
            // MODIFICA
            else{
                record.set(values);
            }
            Ext.getBody().mask("Salvataggio in corso...");
            record.save({
                failure: function(){
                    Ext.getBody().unmask();
                    Ext.Msg.alert("Attenzione!","Errore interno. Si è pregati di riprovare più tardi.");
                },
                success: function(record) {
                    Ext.getBody().unmask();
                    Ext.Msg.alert("Successo!","Il salvataggio è stata correttamente effettuato!");
                    win.close();
                    win.recordSalvato(record);
                }
            });
        }
    },

    // ON DESTROY
    onDestroy: function(rec) {
        Ext.Msg.confirm("Attenzione","Sei sicuro di voler eliminare il modello <strong>"+rec.get("modello")+"</strong>",function(btnId){
            if(btnId == "yes") {
                rec.erase({
                    failure: function(record, operation) {
                        Ext.Msg.alert("Attenzione!","Errore interno. Si è pregati di riprovare più tardi.");
                    }
                });
            }
        });
    }

});
