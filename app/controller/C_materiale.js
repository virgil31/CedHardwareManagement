Ext.define('CL.controller.C_materiale', {
    extend: 'Ext.app.Controller',

    routes: {
        'materiali' : 'showView'
    },

    stores: [
        'S_materiale'
    ],
    models: [
        'M_materiale'
    ],
    views: [
        'materiale.V_materiale_list',
        'materiale.V_materiale_form'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            // ON CREATE
            'materiale_list button[action=on_create]':{
                click: this.onCreate
            },

            // SAVE FORM
            'materiale_form button[action=save]':{
                click: this.saveForm
            }

        }, this);
    },
    /////////////////////////////////////////////////


    //ROUTES
    showView: function() {
        if(Ext.util.Cookies.get("ced_logged") !== null) {
            if(Ext.ComponentQuery.query('materiale_list').length === 0) {
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'materiale_list'});
            }
            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('materiale_list_id');

            setTimeout(function() {
                Ext.StoreManager.lookup("S_materiale").loadPage(1);
            }, 250);
        }
        else {
            this.redirectTo('login');
        }
    },

    // ON CREATE
    onCreate: function(btn) {
        Ext.widget("materiale_form", {
            animateTarget: btn.el,
            title: '<b>Crea nuovo materiale</b>',
            azione: 'create',
            recordSalvato: function(record){
                Ext.StoreManager.lookup("S_materiale").reload();
            }
        });
    },

    // ON EDIT
    onEdit: function(targetEl, rec) {
        var win = Ext.widget("materiale_form", {
            animateTarget: targetEl,
            title: '<b>Modifica materiale</b>',
            azione: 'edit',
            recordSalvato: function(record){
                Ext.StoreManager.lookup("S_acquisto").reload();
            }
        });

        Ext.ComponentQuery.query("materiale_form combobox[name=marca]")[0].enable();
        Ext.ComponentQuery.query("materiale_form combobox[name=id_modello]")[0].enable();

        var store = Ext.create("CL.store.S_materiale");
        win.mask("Caricamento dati...");
        store.load({
            params: {
                id_materiale: rec.get("id_materiale")
            },
            callback: function() {
                win.unmask();
                if (this.data.length === 0) {
                    win.close();
                    Ext.Msg.alert("<b>Attenzione</b>","Il record selezionato è stato eliminato");
                    Ext.StoreManager.lookup("S_materiale").reload();
                }
                else {
                    win.down("form").loadRecord(this.getAt(0));
                }
            }
        });
    },

    // SAVE FORM
    saveForm: function(btn) {
        var win = btn.up("window"),
            form = win.down("form"),
            record = form.getRecord(),
            values = form.getValues();

        if(form.isValid()) {
            // CREAZIONE
            if(win.azione == "create") {
                record = Ext.create('CL.model.M_materiale', values);
            }
            // MODIFICA
            else {
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
    onDestroy: function(rec){
        Ext.Msg.confirm("Attenzione","Sei sicuro di voler eliminare il materiale?",function(btnId){
            if(btnId == "yes"){
                rec.erase({
                    failure: function(record, operation) {
                        Ext.Msg.alert("Attenzione!","Errore interno. Si è pregati di riprovare più tardi.");
                    }
                });
            }
        });
    }

});
