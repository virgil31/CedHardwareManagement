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
        'sede.V_list',
        'sede.V_form'
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

            Ext.StoreManager.lookup("S_sede").loadPage(1);
        }
        else
            this.redirectTo('login');
    },

    // ON CREATE
    onCreate: function(btn){
        Ext.widget("sede_form",{
            animateTarget: btn.el,
            title: '<b>Crea nuova sede</b>',
            action: 'create'
        });
    },

    // ON EDIT
    onEdit: function(targetEl,rec){
        var win = Ext.widget("sede_form",{
            animateTarget: targetEl,
            title: '<b>Modifica sede</b>',
            action: 'edit'
        });

        Ext.ComponentQuery.query("sede_form textfield[name=sed_cod_sede]")[0].setReadOnly(true);

        win.down("form").loadRecord(rec);
    },

    // SAVE FORM
    saveForm: function(btn){
        var win = btn.up("window"),
            form = win.down("form"),
            record = form.getRecord(),
            values = form.getValues();

        if(form.isValid()){
            // CREAZIONE
            if(win.action == "create"){
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
                success: function(richiesta) {
                    Ext.getBody().unmask();
                    Ext.Msg.alert("Successo!","Il salvataggio è stata correttamente effettuato!");
                    win.close();
                    Ext.StoreManager.lookup("S_sede").loadPage(1);
                }
            });
        }
    },

    // ON DESTROY
    onDestroy: function(rec){
        Ext.Msg.confirm("Attenzione","Sei sicuro di voler eliminare la sede <strong>"+rec.get("sed_descrizione")+"</strong>",function(btnId){
            if(btnId == "yes"){
                rec.erase();
            }
        });
    }

});
