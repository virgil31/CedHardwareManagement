Ext.define('CL.controller.C_seriale_modello', {
    extend: 'Ext.app.Controller',

    stores: [
        'S_seriale_modello'
    ],

    models: [
        'M_seriale_modello'
    ],

    views: [
        'seriale_modello.V_list_by_modello',
        'seriale_modello.V_create',
        'seriale_modello.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            //ON CREATE
            'seriale_modello_list_by_modello button[action=on_create]': {
                click: this.onCreate
            },

            //DO CREATE
            'seriale_modello_create button[action=do_create]':{
                click: this.doCreate
            },

            //DO EDIT
            'seriale_modello_edit button[action=do_edit]':{
                click: this.doEdit
            }

        }, this);
    },
    /////////////////////////////////////////////////


    //ON DESTROY
    onDestroy: function(record){

        Ext.Msg.confirm('Attenzione!', 'Eliminare <b>'+record.get("seriale")+"</b>?",function(btn){
            if (btn === 'yes'){
                Ext.StoreManager.lookup("S_seriale_modello").remove(record);
                var nome_modello = record.get("modello_name");
                Ext.ComponentQuery.query("seriale_modello_list_by_modello")[0].setTitle('Lista Seriali ('+(Ext.StoreManager.lookup("S_seriale_modello").getTotalCount()-1)+') - <b>'+nome_modello+'</b>');
            }
        });

    },


    //ON EDIT
    onEdit: function(animateTargetEl,record){
        var win = Ext.widget("seriale_modello_edit",{
            animateTarget: animateTargetEl
        });

        win.down("form").loadRecord(record);

        win.down("combobox[name=modello_id]").setReadOnly(true);
    },

    //DO EDIT
    doEdit: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            record = form.getRecord(),
            values = form.getValues();

        if(form.isValid()){
            Ext.Msg.confirm('Attenzione!', "Modificare il Seriale?",function(btn){
                if (btn === 'yes'){
                    record.set(values);
                    window.close();

                    setTimeout(function(){
                        Ext.StoreManager.lookup("S_seriale_modello").reload();
                    }, 250);
                }
            });
        }
    },

    //ON CREATE
    onCreate: function(btn,record_modello){
        var win = Ext.widget("seriale_modello_create",{
            animateTarget: btn.el
        });

        win.down("combobox[name=modello_id]").setValue(record_modello.get("id"));
        win.down("combobox[name=modello_id]").setRawValue(record_modello.get("nome"));
        win.down("combobox[name=modello_id]").setReadOnly(true);
    },

    //DO CREATE
    doCreate: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            values = form.getValues();

    
        if(form.isValid()){
            Ext.StoreManager.lookup("S_seriale_modello").add(values);

            setTimeout(function(){


                if(window.callbackOnCreated != null)
                    window.callbackOnCreated();
                else{
                    Ext.StoreManager.lookup("S_seriale_modello").reload({
                        callback: function(){
                            var nome_modello = Ext.ComponentQuery.query("seriale_modello_create combobox[name=modello_id]")[0].getRawValue();
                            //window.close();
                            Ext.ComponentQuery.query("seriale_modello_list_by_modello")[0].setTitle('Lista Seriali ('+this.getTotalCount()+') - <b>'+nome_modello+'</b>');
                        }
                    });
                }

                window.close();
            }, 250);
        }
    }


});
