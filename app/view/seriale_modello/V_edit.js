Ext.define('CL.view.seriale_modello.V_edit', {
    extend: 'Ext.window.Window',
    xtype: 'seriale_modello_edit',
    itemId: 'seriale_modello_edit_id',
    alias: 'widget.seriale_modello_edit',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Modifica Seriale',

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
                        xtype: 'textfield',
                        fieldLabel: 'Seriale',
                        name: 'seriale',
                        allowBlank: false
                    },
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
                                store: 'S_modello_hardware',
                                queryMode: 'local',
                                anyMatch: true,
                                displayField: 'nome',
                                valueField: 'id',
                                forceSelection: true,
                                value: modello_id
                            },
                            {
                                xtype: 'button',
                                text: '+',
                                tooltip: 'Crea e assegna',
                                listeners:{
                                    click: function(btn){
                                        Ext.widget("fornitore_create",{
                                            animateTarget: btn.el,
                                            callbackOnCreated: function(){
                                                var records = Ext.StoreManager.lookup("S_fornitore").getRange(),
                                                    created_record = records[records.length-1];

                                                Ext.ComponentQuery.query("fattura_create combobox[name=fornitore_id]")[0].setValue(created_record.get("id"));
                                            }
                                        });
                                    }
                                }
                            }
                        ]
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
                                        Ext.widget("fornitore_create",{
                                            animateTarget: btn.el,
                                            callbackOnCreated: function(){
                                                var records = Ext.StoreManager.lookup("S_fornitore").getRange(),
                                                    created_record = records[records.length-1];

                                                Ext.ComponentQuery.query("fattura_create combobox[name=fornitore_id]")[0].setValue(created_record.get("id"));
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
                        text: 'Modifica',
                        action: 'do_edit'
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
