Ext.define('CL.view.modello.V_modello_form', {
    extend: 'Ext.window.Window',
    xtype: 'modello_form',
    itemId: 'modello_form_id',
    alias: 'widget.modello_form',

    autoShow: true,
    modal: true,
    constrain: true,
    resizable: false,
    bodyStyle: 'backgroundColor: transparent',
    padding: 10,
    width: 400,

    initComponent: function() {
        var this_view = this;
        Ext.StoreManager.lookup("S_tipo_materiale").load({params:{flag_full:true}});
        this_view.items = [
            {
                xtype: 'form',
                defaults:{
                    width: '100%'
                },
                items: [
                    {
                        xtype: 'combobox',
                        name: 'id_tipo',
                        fieldLabel: 'Tipo',
                        allowBlank: false,
                        queryMode: 'local',
                        anyMatch: true,
                        store: 'S_tipo_materiale',
                        displayField: 'tipo',
                        valueField: 'id_tipo'
                    },
                    {
                        xtype: 'textfield',
                        name: 'marca',
                        fieldLabel: 'Marca',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        name: 'modello',
                        fieldLabel: 'Modello',
                        allowBlank: false
                    },
                    {
                        xtype: 'textareafield',
                        name: 'caratteristiche',
                        fieldLabel: 'Caratteristiche',
                        allowBlank: false
                    },
                    {
                        xtype: 'textareafield',
                        name: 'note',
                        fieldLabel: 'Note'
                    }
                ],
                buttonAlign: 'center',
                buttons: [
                    {
                        text: 'Salva',
                        formBind: true,
                        action: 'save'
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
