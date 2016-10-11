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
        'utente.V_utente_form',
        'utente.V_utente_list'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            // ON CREATE
            'utente_list button[action=on_create]':{
                click: this.onCreate
            },

            // SAVE FORM
            'utente_form button[action=save]':{
                click: this.saveForm
            }

        }, this);
    },
    /////////////////////////////////////////////////

    //ROUTES
    showView: function() {
        if(Ext.util.Cookies.get("ced_logged") !== null) {
            if(Ext.ComponentQuery.query('utente_list').length === 0) {
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'utente_list'});
            }
            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('utente_list_id');

            setTimeout(function() {
                Ext.StoreManager.lookup("S_utente").loadPage(1);
            }, 250);
        }
        else {
            this.redirectTo('login');
        }
    },

    // ON CREATE
    onCreate: function(btn) {
        Ext.widget("utente_form",{
            animateTarget: btn.el,
            azione: 'create',
            title: '<b>Cerca utente su Active Directory</b>',
            recordSalvato: function(record){
                Ext.StoreManager.lookup("S_utente").reload();
            }
        });
    },

    // ON EDIT
    onEdit: function(targetEl, rec) {
        var win = Ext.widget("utente_form", {
            animateTarget: targetEl,
            azione: 'edit',
            title: '<b>Modifica utente</b>',
            recordSalvato: function(record){
                Ext.StoreManager.lookup("S_utente").reload();
            }
        });

        Ext.ComponentQuery.query("utente_form combobox")[0].disable();
        Ext.ComponentQuery.query("utente_form combobox")[0].hide();

        Ext.ComponentQuery.query("utente_form textfield[name=nome]")[0].show();
        Ext.ComponentQuery.query("utente_form textfield[name=cognome]")[0].show();

        var store = Ext.create("CL.store.S_utente");
        win.mask("Caricamento dati...");
        store.load({
            params: {
                id_utente: rec.get("id_utente")
            },
            callback: function() {
                win.unmask();
                if (this.data.length === 0) {
                    win.close();
                    Ext.Msg.alert("<b>Attenzione</b>","Il record selezionato è stato eliminato");
                    Ext.StoreManager.lookup("S_utente").reload();
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
                record = Ext.create('CL.model.M_utente', values);
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
        Ext.Msg.confirm("Attenzione","Sei sicuro di voler eliminare l'utente?",function(btnId){
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
