Ext.define('CL.view.modello_hardware.V_create', {
    extend: 'Ext.window.Window',
    xtype: 'modello_hardware_create',
    itemId: 'modello_hardware_create_id',
    alias: 'widget.modello_hardware_create',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Nuovo Modello di Hardware',

    padding: 10,

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Nome',
                        name: 'nome',
                        allowBlank: false
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        margin: '0 0 5 0',
                        items:[
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Marca',
                                name: 'marca_id',
                                allowBlank: false,
                                forceSelection: true,
                                store: 'S_marca_hardware',
                                queryMode: 'local',
                                anyMatch: true,
                                displayField: 'nome',
                                valueField: 'id'
                                //editable: false
                            },
                            {
                                xtype: 'button',
                                text: '+',
                                tooltip: 'Crea e assegna',
                                listeners:{
                                    click: function(btn){
                                        Ext.widget("marca_hardware_create",{
                                            animateTarget: btn.el,
                                            callbackOnCreated: function(){
                                                var records = Ext.StoreManager.lookup("S_marca_hardware").getRange(),
                                                    created_record = records[records.length-1];

                                                Ext.ComponentQuery.query("modello_hardware_create combobox[name=marca_id]")[0].setValue(created_record.get("id"));
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
                                fieldLabel: 'Tipo',
                                name: 'tipo_id',
                                allowBlank: false,
                                forceSelection: true,
                                store: 'S_tipo_hardware',
                                queryMode: 'local',
                                anyMatch: true,
                                displayField: 'nome',
                                valueField: 'id'
                                //editable: false
                            },
                            {
                                xtype: 'button',
                                text: '+',
                                tooltip: 'Crea e assegna',
                                listeners:{
                                    click: function(btn){
                                        Ext.widget("tipo_hardware_create",{
                                            animateTarget: btn.el,
                                            callbackOnCreated: function(){
                                                var records = Ext.StoreManager.lookup("S_tipo_hardware").getRange(),
                                                    created_record = records[records.length-1];

                                                Ext.ComponentQuery.query("modello_hardware_create combobox[name=tipo_id]")[0].setValue(created_record.get("id"));
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
                        formBind: true,
                        action: 'do_create'
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
