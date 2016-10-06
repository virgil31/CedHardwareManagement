Ext.define('CL.controller.C_tipo_materiale', {
    extend: 'Ext.app.Controller',

    routes: {
        'tipi_materiale' : 'showView'
    },

    stores: [
        'S_tipo_materiale'
    ],
    models: [
        'M_tipo_materiale'
    ],
    views: [
        'tipo_materiale.V_tipo_materiale_list',
        'tipo_materiale.V_tipo_materiale_form'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            // ON CREATE
            'tipo_materiale_list button[action=on_create]':{
                click: this.onCreate
            },

            // SAVE FORM
            'tipo_materiale_form button[action=save]':{
                click: this.saveForm
            }

        }, this);
    },
    /////////////////////////////////////////////////


    //ROUTES
    showView: function() {
        if(Ext.util.Cookies.get("ced_logged") !== null) {
            if(Ext.ComponentQuery.query('tipo_materiale_list').length == 0) {
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'tipo_materiale_list'});
            }
            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('tipo_materiale_list_id');

            setTimeout(function() {
                Ext.StoreManager.lookup("S_tipo_materiale").loadPage(1);
            }, 250);
        }
        else {
            this.redirectTo('login');
        }
    },

    // ON CREATE
    onCreate: function(btn) {
        Ext.widget("tipo_materiale_form", {
            animateTarget: btn.el,
            title: '<b>Crea nuova tipo_materiale</b>',
            azione: 'create'
        });
    },

    // ON EDIT
    onEdit: function(targetEl, rec) {
        var win = Ext.widget("tipo_materiale_form", {
            animateTarget: targetEl,
            title: '<b>Modifica tipo_materiale</b>',
            azione: 'edit'
        });

        win.down("form").loadRecord(rec);
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
                record = Ext.create('CL.model.M_tipo_materiale', values);
            }
            // MODIFICA
            else {
                record.set(values);
            }
            Ext.getBody().mask("Salvataggio in corso...");
            record.save({
                failure: function(){
                    Ext.getBody().unmask();
                    Ext.Msg.alert("Attenzione!","Errore interno. Si è pregati di riprovare più tardi.")
                },
                success: function(richiesta) {
                    Ext.getBody().unmask();
                    Ext.Msg.alert("Successo!","Il salvataggio è stata correttamente effettuato!");
                    win.close();
                    Ext.StoreManager.lookup("S_tipo_materiale").reload();
                }
            });
        }
    },

    // ON DESTROY
    onDestroy: function(rec){
        Ext.Msg.confirm("Attenzione","Sei sicuro di voler eliminare l'tipo_materiale?",function(btnId){
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
