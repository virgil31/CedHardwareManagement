Ext.define('CL.view.accessorio.V_accessorio_form', {
    extend: 'Ext.window.Window',
    xtype: 'accessorio_form',
    itemId: 'accessorio_form_id',
    alias: 'widget.accessorio_form',

    autoShow: true,
    modal: true,
    constrain: true,
    resizable: false,
    bodyStyle: 'backgroundColor: transparent',
    padding: 10,
    width: 400,

    initComponent: function() {
        var this_view = this;
        Ext.StoreManager.lookup("S_marca").load();
        this_view.items = [
            {
                xtype: 'form',
                defaults:{
                    width: '100%'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'tipo',
                        fieldLabel: 'Tipo',
                        allowBlank: false
                    },
                    {
                        xtype: 'combobox',
                        name: 'marca',
                        fieldLabel: 'Marca',
                        allowBlank: false,
                        queryMode: 'local',
                        anyMatch: true,
                        store: 'S_marca',
                        displayField: 'marca',
                        valueField: 'marca',
                        hideTrigger: true
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
                        xtype: 'numberfield',
                        name: 'quantita',
                        fieldLabel: 'Quantita',
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
