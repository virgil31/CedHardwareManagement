Ext.define('CL.view.tipo_materiale.V_tipo_materiale_form', {
    extend: 'Ext.window.Window',
    xtype: 'tipo_materiale_form',
    itemId: 'tipo_materiale_form_id',
    alias: 'widget.tipo_materiale_form',

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
                        xtype: 'textareafield',
                        name: 'caratteristiche',
                        fieldLabel: 'Caratteristiche'
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
