Ext.define('CL.view.richiesta.V_edit', {
    extend: 'Ext.window.Window',
    xtype: 'richiesta_edit',
    itemId: 'richiesta_edit_id',
    alias: 'widget.richiesta_edit',

    autoShow: true,
    modal: true,
    constrain: true,
    resizable: false,

    padding: 10,

    width: 800,

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
                        xtype: 'panel',
                        margin: '0 0 10 0',
                        bodyStyle: {
                            background: '#C4DFF2'
                        },
                        layout:{
                            type: 'vbox',
                            align: 'center',
                            pack: 'center'
                        },
                        items: [
                            {
                                xtype: 'combobox',
                                margin: '10 0 10 0',
                                fieldLabel: 'Stato',
                                name: 'stato',
                                displayField: 'stato',
                                valueField: 'stato',
                                editable: false,
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['stato'],
                                    data : [
                                        {"stato":"Da Valutare"},
                                        {"stato":"Rifiutata"},
                                        {"stato":"Accettata"},
                                        {"stato":"Completata"}
                                    ]
                                })
                            }
                        ]
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Richiedente',
                        name: 'full_nome',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Sede',
                        name: 'sede_name',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Ufficio',
                        name: 'ufficio_name',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Servizio',
                        name: 'servizio',
                        readOnly: true
                    },
                    {
                        xtype: 'textareafield',
                        fieldLabel: 'Motivazione',
                        name: 'motivazione',
                        readOnly: true
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Richiesta il',
                        name: 'richiesta_il',
                        format:'d/m/Y',
                        submitFormat:'m/d/Y',
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        inputValue: true,
                        uncheckedValue: false,
                        name: "disponibile_per_usato",
                        boxLabel  : 'Disponibilità ad utilizzare apparecchiature <b>non nuove</b>.',
                        width: '60%',
                        readOnly: true
                    },
                    {
                        xtype: 'grid',
                        title: "<b>Materiale Richiesto</b>",
                        height: 150,
                        margin: '0 0 10 0',
                        style:{
                            border: "1px solid #3892D4 !important;"
                        },
                        viewConfig: {
                            enableTextSelection: true
                        },
                        store: 'S_assegnazione',
                        columns: [
                            { text: 'Materiale',            dataIndex: 'tipo_hardware_name', flex: 0.4 },
                            { text: 'Note',                 dataIndex: 'note', flex: 0.5 },
                            { text: 'Modello Assegnato',    dataIndex: 'seriale_name', flex: 1 },
                            {
                                xtype:'actioncolumn',
                                width:50,
                                items: [
                                    {
                                        //iconCls: 'x-fa fa-remove',
                                        icon: 'resources/images/icon_give.png',
                                        tooltip: 'Assegna Hardware',
                                        handler: function(grid, rowIndex, colIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);
                                            CL.app.getController("C_assegnazione").onEdit(this.el,rec);
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
                buttonAlign: 'center',
                buttons: [
                    {
                        text: "Modifica Richiesta",
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
