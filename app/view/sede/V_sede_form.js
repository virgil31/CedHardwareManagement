Ext.define('CL.view.sede.V_sede_form', {
    extend: 'Ext.window.Window',
    xtype: 'sede_form',
    itemId: 'sede_form_id',
    alias: 'widget.sede_form',

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
                        fieldLabel: 'Codice',
                        name: 'cod_sede',
                        allowBlank: false,
                        minLength: 3,
                        maxLength: 3,
                        listeners: {
                            change: function(){
                                this.setValue(this.getValue().toUpperCase());
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        name: 'descrizione',
                        fieldLabel: 'Descrizione',
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
