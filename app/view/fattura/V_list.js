Ext.define('CL.view.fattura.V_list', {
    extend: 'Ext.panel.Panel',
    xtype: 'fattura_list',
    itemId: 'fattura_list_id',
    alias: 'widget.fattura_list',

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
                store: 'S_fattura',
                height: '98%',
                flex: 60,
                autoscroll: true,
                overflowX: 'hidden',
                overflowY: 'auto',

                disableSelection: true,

                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: 'S_fattura', // same store GridPanel is using
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
                            text: 'Fatture',
                            style: 'color: #157fcc;font-size: 15px;font-weight: 300;font-family: helvetica, arial, verdana, sans-serif;line-height: 16px'
                        },
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
                        CL.app.getController("C_fattura").onEdit(item,record);
                    }
                },

                columns: [
                    {
                        text: 'ID',
                        dataIndex: 'id',
                        flex: 1
                    },
                    {
                        text: 'Fornitore',
                        dataIndex: 'fornitore_name',
                        flex: 2,
                        renderer: function (value, metaData, record) {
                            return '<a href="#" onclick="CL.app.getController(\'C_fornitore\').onEditById(this,'+record.get('fornitore_id')+');return false;">'+value+'</a>';
                        }
                    },
                    {
                        text: 'Codice',
                        dataIndex: 'codice',
                        flex: 2
                    },
                    {
                        xtype: 'datecolumn',
                        format:'d-m-Y',
                        text: 'Data',
                        dataIndex: 'data',
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
                                    CL.app.getController("C_fattura").onEdit(this.el,rec);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                tooltip: 'Delete',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_fattura").onDestroy(rec);
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
