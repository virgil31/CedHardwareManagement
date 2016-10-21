Ext.define('CL.controller.C_universale', {
    extend: 'Ext.app.Controller',

    stores: [
        'S_universale'
    ],
    models: [
        'M_universale'
    ],
    views: [
        //'universale.V_universale_list',
        'universale.V_universale_form'
    ],

    /////////////////////////////////////////////////
    init: function() {
        this.control({

            // SAVE FORM
            'universale_form button[action=save]': {
                click: this.saveForm
            }

        }, this);
    },
    /////////////////////////////////////////////////

    // ON EDIT
    onEdit: function(targetEl, rec) {
        var win = Ext.widget("universale_form",{
            title: '<b>Form universale</b>',
            animateTarget: targetEl
        });

        var store = Ext.create("CL.store.S_richiesta");
        win.mask("Caricamento dati...");
        store.load({
            params: {
                id_richiesta: rec.get("id_richiesta")
            },
            callback: function() {
                win.unmask();
                if (this.data.length === 0) {
                    win.close();
                    Ext.Msg.alert("<b>Attenzione</b>", "Il record selezionato è stato eliminato");
                    Ext.StoreManager.lookup("S_richiesta").reload();
                } else {
                    win.down("form").loadRecord(this.getAt(0));

                    Ext.StoreManager.lookup("S_materiale_richiesto").load({
                        params: {
                            id_richiesta: this.getAt(0).get("id_richiesta")
                        }
                    });
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
                record = Ext.create('CL.model.M_universale', values);
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
    }

});
