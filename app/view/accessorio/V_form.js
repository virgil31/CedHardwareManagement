Ext.define('CL.view.accessorio.V_form', {
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
                        xtype: 'textfield',
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
