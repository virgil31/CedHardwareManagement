Ext.define('CL.view.utente.V_create', {
    extend: 'Ext.window.Window',
    xtype: 'utente_create',
    itemId: 'utente_create_id',
    alias: 'widget.utente_create',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Nuovo Utente',

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
                        xtype: 'textfield',
                        fieldLabel: 'Cognome',
                        name: 'cognome',
                        allowBlank: false
                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: 'Funzionario',
                        name: 'funzionario',
                        inputValue: true,
                        uncheckedValue: false,
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
