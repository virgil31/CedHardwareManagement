Ext.define('CL.view.fattura.V_create', {
    extend: 'Ext.window.Window',
    xtype: 'fattura_create',
    itemId: 'fattura_create_id',
    alias: 'widget.fattura_create',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Nuovo Fattura',

    padding: 10,

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Codice',
                        name: 'codice',
                        allowBlank: false
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        margin: '0 0 5 0',
                        items:[
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Fornitore',
                                name: 'fornitore_id',
                                allowBlank: false,
                                forceSelection: true,
                                store: 'S_fornitore',
                                queryMode: 'local',
                                anyMatch: true,
                                displayField: 'nome',
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
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Data',
                        name: 'data',
                        format: 'd-m-Y',
                        allowBlank: false
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
