Ext.define('CL.view.fornitore.V_create', {
    extend: 'Ext.window.Window',
    xtype: 'fornitore_create',
    itemId: 'fornitore_create_id',
    alias: 'widget.fornitore_create',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Nuovo Fornitore',

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
                        xtype: 'combobox',
                        fieldLabel: 'Tipo',
                        name: 'tipo_id',
                        allowBlank: false,
                        store: 'S_tipo_ditta',
                        queryMode: 'local',
                        anyMatch: true,
                        displayField: 'nome',
                        valueField: 'id',
                        editable: false
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Indirizzo',
                        name: 'indirizzo'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Telefono',
                        name: 'telefono'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Fax',
                        name: 'fax'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Email',
                        name: 'email'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Partita IVA',
                        name: 'partita_iva'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Codice Fiscale',
                        name: 'codice_fiscale'
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
