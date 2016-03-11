Ext.define('CL.view.ufficio.V_create', {
    extend: 'Ext.window.Window',
    xtype: 'ufficio_create',
    itemId: 'ufficio_create_id',
    alias: 'widget.ufficio_create',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Nuovo Ufficio',

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
                        fieldLabel: 'Sede',
                        name: 'sede_id',
                        allowBlank: false,
                        store: 'S_sede',
                        queryMode: 'local',
                        anyMatch: true,
                        displayField: 'nome',
                        valueField: 'id'
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
