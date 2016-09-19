Ext.define('CL.view.marca_hardware.V_edit', {
    extend: 'Ext.window.Window',
    xtype: 'marca_hardware_edit',
    itemId: 'marca_hardware_edit_id',
    alias: 'widget.marca_hardware_edit',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Modifica Tipo di Hardware',

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
