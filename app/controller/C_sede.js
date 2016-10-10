Ext.define('CL.controller.C_sede', {
    extend: 'Ext.app.Controller',

    routes: {
        'sedi' : 'showView'
    },

    stores: [
        'S_sede'
    ],
    models: [
        'M_sede'
    ],
    views: [
        'sede.V_sede_list',
        'sede.V_sede_form'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            // ON CREATE
            'sede_list button[action=on_create]':{
                click: this.onCreate
            },

            // SAVE FORM
            'sede_form button[action=save]':{
                click: this.saveForm
            }

        }, this);
    },
    /////////////////////////////////////////////////


    //ROUTES
    showView: function() {
        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('sede_list').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'sede_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('sede_list_id');

            //

            setTimeout(function(){
                Ext.StoreManager.lookup("S_sede").loadPage(1);
            }, 250);

        }
        else
            this.redirectTo('login');
    },

    // ON CREATE
    onCreate: function(btn){
        Ext.widget("sede_form",{
            animateTarget: btn.el,
            azione: 'create',
            title: '<b>Crea nuova sede</b>',
            recordSalvato: function(record){
                Ext.StoreManager.lookup("S_sede").reload();
            }
        });
    },

    // ON EDIT
    onEdit: function(targetEl,rec){
        var win = Ext.widget("sede_form",{
            animateTarget: targetEl,
            title: '<b>Modifica sede</b>',
            azione: 'edit',
            recordSalvato: function(record){
                Ext.StoreManager.lookup("S_sede").reload();
            }
        });

        Ext.ComponentQuery.query("sede_form textfield[name=cod_sede]")[0].setReadOnly(true);

        var store = Ext.create("CL.store.S_sede");
        win.mask("Caricamento dati...");
        store.load({
            params: {
                cod_sede: rec.get("cod_sede")
            },
            callback: function() {
                win.unmask();
                if (this.data.length == 0) {
                    win.close();
                    Ext.Msg.alert("<b>Attenzione</b>","Il record selezionato è stato eliminato");
                    Ext.StoreManager.lookup("S_sede").reload();
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
                record = Ext.create('CL.model.M_sede', values);
            }
            // MODIFICA
            else{
                record.set(values);
            }
            Ext.getBody().mask("Salvataggio in corso...");
            record.save({
                failure: function(){
                    Ext.getBody().unmask();
                    Ext.Msg.alert("Attenzione!","Errore interno. Si è pregati di riprovare più tardi.")
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
        Ext.Msg.confirm("Attenzione","Sei sicuro di voler eliminare la sede <strong>"+rec.get("descrizione")+"</strong>",function(btnId){
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
