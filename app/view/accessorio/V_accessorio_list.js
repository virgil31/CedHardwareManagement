Ext.define('CL.view.accessorio.V_accessorio_list', {
    extend: 'Ext.panel.Panel',
    xtype: 'accessorio_list',
    itemId: 'accessorio_list_id',
    alias: 'widget.accessorio_list',

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
                store: 'S_accessorio',
                height: '98%',
                width: "100%",
                autoscroll: true,
                overflowX: 'hidden',
                overflowY: 'auto',

                disableSelection: true,

                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: 'S_accessorio', // same store GridPanel is using
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
                            html: '<b>Lista Accessori</b>',
                            style: 'color: #157fcc;font-size: 15px;font-weight: 300;font-family: helvetica, arial, verdana, sans-serif;line-height: 16px'
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Crea nuovo accessorio',
                            icon: 'resources/images/icon_plus.gif',
                            action: 'on_create'
                        }
                    ]
                },

                listeners: {
                    itemdblclick: function( grid, record, item, index, e, eOpts ){
                        CL.app.getController("C_accessorio").onEdit(item,record);
                    }
                },

                columns: [
                    {
                        text: 'Tipo',
                        dataIndex: 'tipo',
                        flex: 1
                    },
                    {
                        text: 'Marca',
                        dataIndex: 'marca',
                        flex: 1
                    },
                    {
                        text: 'Modello',
                        dataIndex: 'modello',
                        flex: 1
                    },
                    {
                        text: 'Caratteristiche',
                        dataIndex: 'caratteristiche',
                        flex: 1
                    },
                    {
                        text: 'Quantita',
                        dataIndex: 'quantita',
                        flex: 1
                    },
                    {
                        dataIndex: 'note',
                        width: 38,
                        renderer: function(value,metaData,record){
                            if(record.get("note") === null || record.get("note").length == 0) {
                                return "";
                            }
                            else{
                                return '<img title="Sono presenti delle note!" src="http://gestionaleamica.com/Sviluppatori/docs/amicanet/icons/AlertNote.png" alt=" " height="16" width="16" >';
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
                                    CL.app.getController("C_accessorio").onEdit(this.el,rec);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                tooltip: 'Elimina',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_accessorio").onDestroy(rec);
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
