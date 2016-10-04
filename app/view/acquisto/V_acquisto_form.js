Ext.define('CL.view.acquisto.V_acquisto_form', {
    extend: 'Ext.window.Window',
    xtype: 'acquisto_form',
    itemId: 'acquisto_form_id',
    alias: 'widget.acquisto_form',

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
                        name: 'num_fattura',
                        fieldLabel: '# Fattura'
                    },
                    {
                        xtype: 'datefield',
                        name: 'data_fattura',
                        fieldLabel: 'Data Fattura',
                        submitFormat: 'c'               //ISO 8601 date
                    },
                    {
                        xtype: 'textfield',
                        name: 'num_ddt',
                        fieldLabel: '# DDT'
                    },
                    {
                        xtype: 'datefield',
                        name: 'data_ddt',
                        fieldLabel: 'Data DDT',
                        submitFormat: 'c'               //ISO 8601 date
                    },
                    {
                        xtype: 'textfield',
                        name: 'fornitore',
                        fieldLabel: 'Fornitore',
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
