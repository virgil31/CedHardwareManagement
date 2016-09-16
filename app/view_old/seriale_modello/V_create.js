Ext.define('CL.view.seriale_modello.V_create', {
    extend: 'Ext.window.Window',
    xtype: 'seriale_modello_create',
    itemId: 'seriale_modello_create_id',
    alias: 'widget.seriale_modello_create',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Nuovo Seriale',

    padding: 10,

    initComponent: function() {
        var this_view = this;

        var store = Ext.StoreManager.lookup('S_seriale_modello'),
            modello_id = store.getProxy().extraParams.modello_id;


        Ext.StoreManager.lookup("S_fattura").load({
            params: {
                flag_full: true
            }
        });

        this_view.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        margin: '0 0 5 0',
                        items:[
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Modello',
                                name: 'modello_id',
                                allowBlank: false,
                                forceSelection: true,
                                store: Ext.create('CL.store.S_modello_hardware'),
                                queryMode: 'local',
                                anyMatch: true,
                                displayField: 'nome',
                                valueField: 'id',
                                forceSelection: true,
                                value: modello_id
                            }/*,
                            {
                                xtype: 'button',
                                text: '+',
                                tooltip: 'Crea e assegna',
                                disabled: true,
                                listeners:{
                                    click: function(btn){
                                        Ext.widget("modello_create",{
                                            animateTarget: btn.el,
                                            callbackOnCreated: function(){
                                                var records = Ext.StoreManager.lookup("S_modello").getRange(),
                                                    created_record = records[records.length-1];

                                                Ext.ComponentQuery.query("seriale_modello_create combobox[name=modello_id]")[0].setValue(created_record.get("id"));
                                            }
                                        });
                                    }
                                }
                            }*/
                        ]
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Seriale',
                        name: 'seriale',
                        allowBlank: false,
                        validator: function(value){
                            var to_return;
                            try{
                                Ext.Ajax.request({
                                    async: false,
                                    url: 'data/seriale_modello/checkDuplicato.php',
                                    params:{
                                        seriale: value,
                                        modello_id: modello_id
                                    },
                                    success: function(response) {
                                        var risposta = Ext.JSON.decode(response.responseText);

                                        to_return = (risposta["result"]) ?  "E' già presente un seriale legato a questo modello." : true ;
                                    }
                                });
                            }catch(e){}

                            return to_return;
                    	}
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        margin: '0 0 5 0',
                        items:[
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Fattura',
                                name: 'fattura_id',
                                forceSelection: true,
                                store: 'S_fattura',
                                queryMode: 'local',
                                anyMatch: true,
                                displayField: 'codice',
                                valueField: 'id',
                                forceSelection: true
                            },
                            {
                                xtype: 'button',
                                text: '+',
                                tooltip: 'Crea e assegna',
                                listeners:{
                                    click: function(btn){
                                        Ext.StoreManager.lookup("S_fornitore").load();

                                        Ext.widget("fattura_create",{
                                            animateTarget: btn.el,
                                            callbackOnCreated: function(){
                                                var records = Ext.StoreManager.lookup("S_fattura").getRange(),
                                                    created_record = records[records.length-1];

                                                Ext.ComponentQuery.query("seriale_modello_create combobox[name=fattura_id]")[0].setValue(created_record.get("id"));
                                            }
                                        });
                                    }
                                }
                            }
                        ]
                    }
                ],
                buttons: [
                    {
                        text: 'Crea',
                        action: 'do_create'
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
