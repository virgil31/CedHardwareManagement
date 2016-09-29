Ext.define('CL.view.sede.V_form', {
    extend: 'Ext.window.Window',
    xtype: 'sede_form',
    itemId: 'sede_form_id',
    alias: 'widget.sede_form',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',

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
                        name: 'sed_cod_sede',
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
                        name: 'sed_descrizione',
                        fieldLabel: 'Descrizione',
                        allowBlank: false
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
