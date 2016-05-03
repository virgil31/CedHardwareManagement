Ext.define('CL.view.assegnazione.V_edit', {
    extend: 'Ext.window.Window',
    xtype: 'assegnazione_edit',
    itemId: 'assegnazione_edit_id',
    alias: 'widget.assegnazione_edit',

    autoShow: true,
    modal: true,
    constrain: true,
    resizable: false,

    padding: 10,

    width: 400,

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'form',
                layout: {
                    type: 'vbox',
                    align: 'center'
                },
                defaults: {
                    width: '95%'
                },
                items: [
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Modello',
                        name: 'modello_id',
                        allowBlank: false,
                        forceSelection: true,
                        store: 'S_modello_hardware',
                        queryMode: 'local',
                        anyMatch: true,
                        displayField: 'nome',
                        valueField: 'id',
                        editable: false,
                        listeners: {
                            select: function(combo, record){
                                var modello_id = record.get("id");

                                Ext.StoreManager.lookup("S_seriale_modello").load({
                                    params:{
                                        solo_disponibili: true,
                                        modello_id: modello_id
                                    }
                                });
                            }
                        }
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Seriale',
                        name: 'seriale_id',
                        allowBlank: false,
                        forceSelection: true,
                        store: 'S_seriale_modello',
                        queryMode: 'local',
                        anyMatch: true,
                        displayField: 'seriale',
                        valueField: 'id'
                        //editable: false
                    }
                ],
                buttonAlign: 'center',
                buttons: [
                    {
                        text: "Modifica Assegnazione",
                        scale: 'large',
                        action: 'do_edit',
                        allowBlank: false,
                        style: {
                            background: "#3CAFFF"
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
