Ext.define('CL.controller.C_assegnazione', {
    extend: 'Ext.app.Controller',

    routes: {
        //'fatture' : 'showView'
    },

    stores: [
        'S_assegnazione'
    ],

    models: [
        'M_assegnazione'
    ],

    views: [
        'assegnazione.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            'assegnazione_edit button[action=do_edit]':{
                click: this.doEdit
            }

        }, this);
    },
    /////////////////////////////////////////////////

    //DO EDIT
    doEdit: function(btn){
        var window = btn.up("window"),
            form = window.down("form"),
            record = form.getRecord(),
            values = form.getValues(),
            store = Ext.StoreManager.lookup("S_assegnazione");

        record.set(values);

        store.sync({
            callback: function(){
                store.reload();
            }
        });
        window.close();
    },

    //ON EDIT
    onEdit: function(animateTargetEl,record){
        var win = Ext.widget("assegnazione_edit",{
            animateTarget: animateTargetEl,
            title: 'Assegnazione Hardware - <b>'+record.get("tipo_hardware_name")+'</b>'
        });

        Ext.StoreManager.lookup("S_modello_hardware").load({
            params:{
                tipo_hardware_id: record.get("tipo_hardware_id")
            },
            callback: function(){
                Ext.StoreManager.lookup("S_seriale_modello").load({
                    params:{
                        solo_disponibili: true,
                        modello_id: record.get("modello_id")
                    },
                    callback: function(){
                        win.down("form").loadRecord(record);
                    }
                })
            }
        });
    }



});
