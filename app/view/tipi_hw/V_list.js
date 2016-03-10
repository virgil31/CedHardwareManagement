Ext.define('CL.view.tipi_hw.V_list', {
    extend: 'Ext.panel.Panel',
    xtype: 'tipi_hw_list',
    itemId: 'tipi_hw_list_id',
    alias: 'widget.tipi_hw_list',

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
                store: 'S_user',
                height: '98%',
                flex: 60,
                autoscroll: true,
                overflowX: 'hidden',
                overflowY: 'auto',

                disableSelection: true,

                plugins: {
                    ptype: 'rowediting',
                    clicksToEdit: 2
                },

                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: 'S_user', // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                }],

                tbar: {
                    xtype: 'toolbar',
                    height: 35,
                    style: 'backgroundColor: #F5F5F5',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Indietro',
                            icon: 'resources/images/icon_back.png',
                            handler: function(){
                                CL.app.getController('C_tipi_hw').redirectTo('home');
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'Tipi Hardware',
                            style: 'color: #157fcc;font-size: 15px;font-weight: 300;font-family: helvetica, arial, verdana, sans-serif;line-height: 16px'
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Nuova richiesta Hardware',
                            icon: 'resources/images/icon_plus.gif'
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

                columns: [
                    {
                        text: 'ID',
                        dataIndex: 'id',
                        flex: 1
                    },
                    {
                        text: 'Email',
                        dataIndex: 'email_address',
                        flex: 2,
                        editor: {
                            xtype: 'textfield'
                        }
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
                                    alert("Edit " + rec.get('last_name'));
                                }
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                tooltip: 'Delete',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    alert("Delete " + rec.get('last_name'));
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
