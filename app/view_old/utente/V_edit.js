Ext.define('CL.view.utente.V_edit', {
    extend: 'Ext.window.Window',
    xtype: 'utente_edit',
    itemId: 'utente_edit_id',
    alias: 'widget.utente_edit',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Modifica utente',

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
                        text: 'Modifica',
                        action: 'do_edit'
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
