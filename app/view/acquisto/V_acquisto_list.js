Ext.define('CL.view.acquisto.V_acquisto_list', {
    extend: 'Ext.panel.Panel',
    xtype: 'acquisto_list',
    itemId: 'acquisto_list_id',
    alias: 'widget.acquisto_list',

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
                store: 'S_acquisto',
                height: '98%',
                width: "100%",
                autoscroll: true,
                overflowX: 'hidden',
                overflowY: 'auto',

                disableSelection: true,

                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: 'S_acquisto', // same store GridPanel is using
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
                            html: '<b>Lista Acquisti</b>',
                            style: 'color: #157fcc;font-size: 15px;font-weight: 300;font-family: helvetica, arial, verdana, sans-serif;line-height: 16px'
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Crea nuovo acquisto',
                            icon: 'resources/images/icon_plus.gif',
                            action: 'on_create'
                        }
                    ]
                },

                listeners: {
                    itemdblclick: function( grid, record, item, index, e, eOpts ){
                        CL.app.getController("C_acquisto").onEdit(item,record);
                    }
                },

                columns: [
                    {
                        text: '# Fattura',
                        dataIndex: 'num_fattura',
                        flex: 1
                    },
                    {
                        xtype: 'datecolumn',
                        text: 'Data Fattura',
                        dataIndex: 'data_fattura',
                        flex: 1
                    },
                    {
                        text: '# DDT',
                        dataIndex: 'num_ddt',
                        flex: 1
                    },
                    {
                        xtype: 'datecolumn',
                        text: 'Data DDT',
                        dataIndex: 'data_ddt',
                        flex: 1
                    },
                    {
                        text: 'Fornitore',
                        dataIndex: 'fornitore',
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
                                    CL.app.getController("C_acquisto").onEdit(this.el,rec);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                tooltip: 'Elimina',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_acquisto").onDestroy(rec);
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
