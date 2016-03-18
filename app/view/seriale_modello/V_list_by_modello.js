Ext.define('CL.view.seriale_modello.V_list_by_modello', {
    extend: 'Ext.window.Window',
    xtype: 'seriale_modello_list_by_modello',
    itemId: 'seriale_modello_list_by_modello_id',
    alias: 'widget.seriale_modello_list_by_modello',

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    /*layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },*/

    autoShow: true,
    constrain: true,
    modal: true,

    height: 500,
    width: 600,
    title: 'Lista Seriali',

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'grid',
                viewConfig: {
                    enableTextSelection: true
                },
                border: true,
                store: 'S_seriale_modello',
                height: '98%',
                flex: 60,
                autoscroll: true,
                overflowX: 'hidden',
                overflowY: 'auto',

                disableSelection: true,

                tbar: {
                    xtype: 'toolbar',
                    height: 38,
                    style: 'backgroundColor: #F5F5F5',
                    items: [
                        {
                            xtype: 'button',
                            icon: 'resources/images/icon_plus.gif',
                            action: 'on_create'
                        },
                        '->',
                        {
                            xtype: 'button',
                            text: 'Cerca',
                            icon: 'resources/images/icon_search.png'
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Pulisci filtri',
                            icon: 'resources/images/icon_clear.png'
                        }
                    ]
                },

                listeners: {
                    itemdblclick: function( grid, record, item, index, e, eOpts ){
                        CL.app.getController("C_seriale_modello").onEdit(item,record);
                    }
                },

                columns: [
                    {
                        text: 'Seriale',
                        dataIndex: 'seriale',
                        flex: 1
                    },
                    {
                        text: 'Modello',
                        dataIndex: 'modello_name',
                        flex: 1,
                        renderer: function (value, metaData, record) {
                            return '<a href="#" onclick="CL.app.getController(\'C_modello_hardware\').onEditById(this,'+record.get('modello_id')+');return false;">'+value+'</a>';
                        }
                    },
                    {
                        text: 'Fattura',
                        dataIndex: 'fattura_name',
                        flex: 1,
                        renderer: function (value, metaData, record) {
                            return '<a href="#" onclick="CL.app.getController(\'C_fattura\').onEditById(this,'+record.get('fattura_id')+');return false;">'+value+'</a>';
                        }
                    },
                    {
                        xtype:'actioncolumn',
                        width: 50,
                        items: [
                            {
                                iconCls: 'x-fa fa-edit',
                                tooltip: 'Edit',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_seriale_modello").onEdit(this.el,rec);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                tooltip: 'Delete',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_seriale_modello").onDestroy(rec);
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
