Ext.define('CL.controller.C_seriale_modello', {
    extend: 'Ext.app.Controller',

    routes: {
        'cerca_seriali' : 'showView'
    },

    stores: [
        'S_seriale_modello',
        'S_seriale_modello_search'
    ],

    models: [
        'M_seriale_modello'
    ],

    views: [
        'seriale_modello.V_list_by_modello',
        'seriale_modello.V_list_by_richiedente_ufficio',
        'seriale_modello.V_create',
        'seriale_modello.V_edit',

        //
        'seriale_modello.V_search'
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

    //SHOW VIEW
    showView: function(){
        //Ext.ComponentQuery.query("window").forEach(function(win){win.destroy();});  //per eliminare le vecchie windows

        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('seriale_modello_search').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'seriale_modello_search'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('seriale_modello_search_id');

            Ext.StoreManager.lookup("S_seriale_modello_search").loadPage(1);

            Ext.StoreManager.lookup("S_modello_hardware").load({params:{flag_full: true}});
            Ext.StoreManager.lookup("S_fattura").load({params:{flag_full: true}});
        }
        else
            this.redirectTo('login');
    },

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
    onCreate: function(btn){
        var modello_id = Ext.StoreManager.lookup('S_seriale_modello').getProxy().extraParams.modello_id;

        var win = Ext.widget("seriale_modello_create",{
            animateTarget: btn.el
        });

        win.down("combobox[name=modello_id]").getStore().load({params:{flag_full: true}});
        win.down("combobox[name=modello_id]").setReadOnly(true);
    },

    //DO CREATE
    doCreate: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            values = form.getValues();

        if(form.isValid()){

            //Ext.StoreManager.lookup("S_seriale_modello").add(values);

            Ext.StoreManager.lookup("S_seriale_modello").autoSync = false;
            Ext.StoreManager.lookup("S_seriale_modello").add(values);
            Ext.StoreManager.lookup("S_seriale_modello").sync({
                success: function(){
                    setTimeout(function(){
                        Ext.StoreManager.lookup("S_seriale_modello").autoSync = true;

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
                },
                failure: function(){
                    Ext.StoreManager.lookup("S_seriale_modello").autoSync = true;

                    Ext.Msg.alert("Errore!","Errore durante la creazione del seriale lato server!");
                    Ext.StoreManager.lookup("S_seriale_modello").rejectChanges();
                    return;
                }
            });


        }
    }


});
