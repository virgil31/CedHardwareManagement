Ext.define('CL.view.utente.V_utente_list', {
    extend: 'Ext.panel.Panel',
    xtype: 'utente_list',
    itemId: 'utente_list_id',
    alias: 'widget.utente_list',

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },

    initComponent: function() {
        var this_view = this;
        this_view.items = [
            {
                xtype: 'grid',
                border: true,
                store: 'S_utente',
                height: '98%',
                width: "100%",
                autoscroll: true,
                overflowX: 'hidden',
                overflowY: 'auto',

                disableSelection: true,

                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: 'S_utente', // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                }],

                tbar: {
                    xtype: 'toolbar',
                    height: 38,
                    style: 'backgroundColor: #F5F5F5',
                    items: [
                        {
                            xtype: 'label',
                            html: '<b>Lista Utenti</b>',
                            style: 'color: #157fcc;font-size: 15px;font-weight: 300;font-family: helvetica, arial, verdana, sans-serif;line-height: 16px'
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Crea nuovo utente',
                            icon: 'resources/images/icon_plus.gif',
                            action: 'on_create'
                        }
                    ]
                },

                listeners: {
                    itemdblclick: function( grid, record, item, index, e, eOpts ){
                        CL.app.getController("C_utente").onEdit(item,record);
                    }
                },

                columns: [
                    {
                        text: 'Cognome',
                        dataIndex: 'cognome',
                        flex: 0.7
                    },
                    {
                        text: 'Nome',
                        dataIndex: 'nome',
                        flex: 0.7
                    },
                    {
                        text: 'Email',
                        dataIndex: 'email',
                        flex: 1
                    },
                    {
                        text: 'Amministrazione',
                        dataIndex: 'amministrazione',
                        flex: 1
                    },
                    {
                        xtype: 'checkcolumn',
                        text: 'Funzionario',
                        dataIndex: 'funzionario',
                        disabled: true,
                        disabledCls : '',
                        flex: 0.5
                    },
                    {
                        xtype: 'checkcolumn',
                        text: 'Esterno',
                        dataIndex: 'esterno',
                        disabled: true,
                        disabledCls : '',
                        flex: 0.5
                    },
                    {
                        xtype: 'checkcolumn',
                        text: 'Inattivo',
                        dataIndex: 'inattivo',
                        disabled: true,
                        disabledCls : '',
                        flex: 0.5
                    },
                    {
                        dataIndex: 'note',
                        width: 38,
                        renderer: function(value,metaData,record){
                            if(record.get("note") === null || record.get("note").length == 0) {
                                return "";
                            }
                            else{
                                return '<img title="Sono presenti delle note!" src="resources/images/icon_note.png" alt=" " height="16" width="16" >';
                            }
                        }
                    },
                    {
                        xtype:'actioncolumn',
                        width:50,
                        items: [
                            {
                                iconCls: 'x-fa fa-edit',
                                tooltip: 'Modifica',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_utente").onEdit(this.el,rec);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                tooltip: 'Elimina',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_utente").onDestroy(rec);
                                }
                            }
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
