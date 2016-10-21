Ext.define('CL.controller.C_richiesta', {
    extend: 'Ext.app.Controller',

    routes: {
        'richiesta': 'showView'
    },

    stores: [
        'S_richiesta',
        'S_stato'
    ],
    models: [
        'CL.model.M_richiesta',
        'CL.model.M_stato'
    ],
    views: [
        'richiesta.V_richiesta_form',
        'richiesta.V_richiesta_form_da_esterno'
    ],

    /////////////////////////////////////////////////
    init: function() {
        this.control({

            // DO RICHIESTA
            'richiesta_form_da_esterno button[action=doRichiesta]': {
                click: this.doRichiesta
            }

        }, this);
    },
    /////////////////////////////////////////////////

    //ROUTES
    showView: function() {
        if (Ext.util.Cookies.get("richiedente_id") !== null && Ext.util.Cookies.get("richiedente_nome") !== null && Ext.util.Cookies.get("richiedente_cognome") !== null) {
            /*if(Ext.ComponentQuery.query('richiesta_form_da_esterno').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'richiesta_form_da_esterno'});*/

            if (Ext.ComponentQuery.query('richiesta_form_da_esterno').length !== 0){
                Ext.ComponentQuery.query('richiesta_form_da_esterno')[0].destroy();
            }
            Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({
                xtype: 'richiesta_form_da_esterno'
            });

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('richiesta_form_da_esterno_id');

            //

            //mi assicuro che il form sia pulito, e dato che ha il "trackResetOnLoad" devo farlo manualmente
            /*Ext.ComponentQuery.query("richiesta_form_da_esterno form")[0].getForm().getFields().each(function(f){
                f.originalValue=undefined;
            });*/

            Ext.ComponentQuery.query("richiesta_form_da_esterno textfield[name=id_richiedente]")[0].setValue(Ext.util.Cookies.get("richiedente_id"));
            Ext.ComponentQuery.query("richiesta_form_da_esterno textfield[name=richiedente]")[0].setValue(Ext.util.Cookies.get("richiedente_cognome") + " " + Ext.util.Cookies.get("richiedente_nome"));
        } else {
            this.redirectTo('login');
        }
    },

    /////////////////////////////////////////////////

    // DO RICHIESTA
    doRichiesta: function(btn) {
        var form = btn.up("form"),
            record_richiesta = form.getRecord(),
            values = form.getValues(),
            to_save = false;

        if (form.isValid()) {
            //controllo se è una CREAZIONE (basandomi sulla presenza del "record_richiesta")
            if (record_richiesta === undefined) {
                Ext.getBody().mask("Salvataggio richiesta in corso...");
                record_richiesta = Ext.create('CL.model.M_richiesta', values);
                to_save = true;
            }
            //altrimenti vuol dire che sono in fase di MODIFICA
            else {
                //controllo se ci sono stati reali cambiamenti
                if (form.isDirty()) {
                    var stato = record_richiesta.get("stato");
                    //controllo che sia attualmente modificabile (check dello stato)
                    if (COSTANTI.stati[stato].puo_modificare) {
                        Ext.getBody().mask("Salvataggio richiesta in corso...");
                        record_richiesta.set(values);
                        to_save = true;
                    } else {
                        Ext.Msg.alert("Attenzione", "Non è più possibile modificare tale richiesta.");
                    }
                }
            }
            if (to_save) {
                record_richiesta.save({
                    failure: function() {
                        Ext.getBody().unmask();
                        //store.rejectChanges();
                        Ext.Msg.alert("Attenzione!", "Errore interno. Si è pregati di riprovare più tardi.");
                    },
                    success: function(record) {
                        Ext.getBody().unmask();
                        // ricarico il form con il loadRecord per resettare il "dirty" del form (grazie al "trackResetOnLoad")
                        form.loadRecord(record);
                        Ext.Msg.alert("Successo!", "Il salvataggio della richiesta è stata correttamente effettuato!");
                    }
                });
            }
        }
    }

});
