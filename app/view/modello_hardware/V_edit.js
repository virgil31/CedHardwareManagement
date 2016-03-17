Ext.define('CL.view.modello_hardware.V_edit', {
    extend: 'Ext.window.Window',
    xtype: 'modello_hardware_edit',
    itemId: 'modello_hardware_edit_id',
    alias: 'widget.modello_hardware_edit',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Modifica modello_hardware',

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
                        forceSelection: true,
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
                        text: 'Modifica',
                        action: 'do_edit'
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
