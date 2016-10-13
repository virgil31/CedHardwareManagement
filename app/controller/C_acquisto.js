Ext.define('CL.controller.C_acquisto', {
    extend: 'Ext.app.Controller',

    routes: {
        'acquisti': 'showView'
    },

    stores: [
        'S_acquisto'
    ],
    models: [
        'M_acquisto'
    ],
    views: [
        'acquisto.V_acquisto_list',
        'acquisto.V_acquisto_form'
    ],

    /////////////////////////////////////////////////
    init: function() {
        this.control({

            // ON CREATE
            'acquisto_list button[action=on_create]': {
                click: this.onCreate
            },

            // SAVE FORM
            'acquisto_form button[action=save]': {
                click: this.saveForm
            }

        }, this);
    },
    /////////////////////////////////////////////////

    //ROUTES
    showView: function() {
        if (Ext.util.Cookies.get("ced_logged") !== null) {
            if (Ext.ComponentQuery.query('acquisto_list').length === 0) {
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({
                    xtype: 'acquisto_list'
                });
            }
            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('acquisto_list_id');

            setTimeout(function() {
                Ext.StoreManager.lookup("S_acquisto").loadPage(1);
            }, 250);
        } else {
            this.redirectTo('login');
        }
    },

    // ON CREATE
    onCreate: function(btn) {
        Ext.widget("acquisto_form", {
            animateTarget: btn.el,
            azione: 'create',
            title: '<b>Crea nuovo acquisto</b>',
            recordSalvato: function(record) {
                Ext.StoreManager.lookup("S_acquisto").reload();
            }
        });
    },

    // ON EDIT
    onEdit: function(targetEl, rec) {
        var win = Ext.widget("acquisto_form", {
            animateTarget: targetEl,
            azione: 'edit',
            title: '<b>Modifica acquisto</b>',
            recordSalvato: function(record) {
                Ext.StoreManager.lookup("S_acquisto").reload();
            }
        });

        var store = Ext.create("CL.store.S_acquisto");
        win.mask("Caricamento dati...");
        store.load({
            params: {
                id_acquisto: rec.get("id_acquisto")
            },
            callback: function() {
                win.unmask();
                if (this.data.length === 0) {
                    win.close();
                    Ext.Msg.alert("<b>Attenzione</b>", "Il record selezionato è stato eliminato");
                    Ext.StoreManager.lookup("S_acquisto").reload();
                } else {
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

        if (form.isValid()) {
            // CREAZIONE
            if (win.azione == "create") {
                record = Ext.create('CL.model.M_acquisto', values);
            }
            // MODIFICA
            else {
                record.set(values);
            }
            Ext.getBody().mask("Salvataggio in corso...");
            record.save({
                failure: function() {
                    Ext.getBody().unmask();
                    Ext.Msg.alert("Attenzione!", "Errore interno. Si è pregati di riprovare più tardi.");
                },
                success: function(record) {
                    Ext.getBody().unmask();
                    Ext.Msg.alert("Successo!", "Il salvataggio è stata correttamente effettuato!");
                    win.close();
                    win.recordSalvato(record);
                }
            });
        }
    },

    // ON DESTROY
    onDestroy: function(rec) {
        Ext.Msg.confirm("Attenzione", "Sei sicuro di voler eliminare l'acquisto?", function(btnId) {
            if (btnId == "yes") {
                rec.erase({
                    failure: function(record, operation) {
                        Ext.Msg.alert("Attenzione!", "Errore interno. Si è pregati di riprovare più tardi.");
                    }
                });
            }
        });
    }

});
