Ext.define('CL.view.tipo_ditta.V_list', {
    extend: 'Ext.panel.Panel',
    xtype: 'tipo_ditta_list',
    itemId: 'tipo_ditta_list_id',
    alias: 'widget.tipo_ditta_list',

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
                store: 'S_tipo_ditta',
                height: '98%',
                flex: 60,
                autoscroll: true,
                overflowX: 'hidden',
                overflowY: 'auto',

                disableSelection: true,


                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: 'S_tipo_ditta', // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                }],

                tbar: {
                    xtype: 'toolbar',
                    height: 38,
                    style: 'backgroundColor: #F5F5F5',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Indietro',
                            icon: 'resources/images/icon_back.png',
                            handler: function(){
                                CL.app.getController('C_tipo_hardware').redirectTo('home');
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'Tipi di Ditte',
                            style: 'color: #157fcc;font-size: 15px;font-weight: 300;font-family: helvetica, arial, verdana, sans-serif;line-height: 16px'
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Nuova richiesta Hardware',
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
                        CL.app.getController("C_tipo_ditta").onEdit(item,record);
                    }
                },

                columns: [
                    {
                        text: 'ID',
                        dataIndex: 'id',
                        flex: 1
                    },
                    {
                        text: 'Nome',
                        dataIndex: 'nome',
                        flex: 2
                    },
                    {
                        xtype:'actioncolumn',
                        width:50,
                        items: [
                            {
                                iconCls: 'x-fa fa-edit',
                                tooltip: 'Edit',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_tipo_ditta").onEdit(this.el,rec);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                tooltip: 'Delete',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_tipo_ditta").onDestroy(rec);
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
