Ext.define('CL.controller.C_accessorio', {
    extend: 'Ext.app.Controller',

    routes: {
        'accessori' : 'showView'
    },

    stores: [
        'S_accessorio',
        'S_marca'
    ],
    models: [
        'M_accessorio',
        'M_marca'
    ],
    views: [
        'accessorio.V_list',
        'accessorio.V_form'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            // ON CREATE
            'accessorio_list button[action=on_create]':{
                click: this.onCreate
            },

            // SAVE FORM
            'accessorio_form button[action=save]':{
                click: this.saveForm
            }

        }, this);
    },
    /////////////////////////////////////////////////


    //ROUTES
    showView: function() {
        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('accessorio_list').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'accessorio_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('accessorio_list_id');

            //

            setTimeout(function(){
                Ext.StoreManager.lookup("S_accessorio").loadPage(1);
            }, 250);
        }
        else
            this.redirectTo('login');
    },

    // ON CREATE
    onCreate: function(btn){
        Ext.widget("accessorio_form",{
            animateTarget: btn.el,
            title: '<b>Crea nuova accessorio</b>',
            action: 'create'
        });
    },

    // ON EDIT
    onEdit: function(targetEl,rec){
        var win = Ext.widget("accessorio_form",{
            animateTarget: targetEl,
            title: '<b>Modifica accessorio</b>',
            action: 'edit'
        });

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
                record = Ext.create('CL.model.M_accessorio', values);
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
                    Ext.StoreManager.lookup("S_accessorio").loadPage(1);
                }
            });
        }
    },

    // ON DESTROY
    onDestroy: function(rec){
        Ext.Msg.confirm("Attenzione","Sei sicuro di voler eliminare la accessorio <strong>"+rec.get("modello")+"</strong>",function(btnId){
            if(btnId == "yes"){
                rec.erase();
            }
        });
    }

});
