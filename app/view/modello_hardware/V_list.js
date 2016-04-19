Ext.define('CL.view.modello_hardware.V_list', {
    extend: 'Ext.panel.Panel',
    xtype: 'modello_hardware_list',
    itemId: 'modello_hardware_list_id',
    alias: 'widget.modello_hardware_list',

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
                viewConfig: {
                    enableTextSelection: true
                },
                border: true,
                store: 'S_modello_hardware',
                height: '98%',
                flex: 60,
                autoscroll: true,
                overflowX: 'hidden',
                overflowY: 'auto',

                disableSelection: true,

                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: 'S_modello_hardware', // same store GridPanel is using
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
                            text: 'Modelli Hardware',
                            style: 'color: #157fcc;font-size: 15px;font-weight: 300;font-family: helvetica, arial, verdana, sans-serif;line-height: 16px'
                        },
                        {
                            xtype: 'button',
                            icon: 'resources/images/icon_plus.gif',
                            action: 'on_create'
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            name: 'query',
                            emptyText: "Epson, Galaxy Tab, HP ...",
                            listeners:{
                                specialkey: function(field, e){
                                    if (e.getKey() == e.ENTER){
                                        var btn = Ext.ComponentQuery.query("modello_hardware_list button[action=cerca]")[0];
                                        btn.fireEvent("click");
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Cerca',
                            action: 'cerca',
                            icon: 'resources/images/icon_search.png',
                            listeners:{
                                click: function(){
                                    var query = Ext.ComponentQuery.query("modello_hardware_list textfield[name=query]")[0].getValue();
                                    var store = Ext.StoreManager.lookup("S_modello_hardware");
                                    store.proxy.extraParams.query = query;
                                    store.loadPage(1);
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Pulisci filtri',
                            icon: 'resources/images/icon_clear.png',
                            handler: function(){
                                Ext.ComponentQuery.query("modello_hardware_list textfield[name=query]")[0].reset();
                                var store = Ext.StoreManager.lookup("S_modello_hardware");
                                delete store.proxy.extraParams.query;
                                store.loadPage(1);
                            }
                        }
                    ]
                },

                listeners: {
                    itemdblclick: function( grid, record, item, index, e, eOpts ){
                        CL.app.getController("C_modello_hardware").onEdit(item,record);
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
                        text: 'Marca',
                        dataIndex: 'marca_name',
                        flex: 2
                    },
                    {
                        text: 'Tipo',
                        dataIndex: 'tipo_name',
                        flex: 2
                    },
                    {
                        xtype:'actioncolumn',
                        width: 76,
                        items: [
                            {
                                iconCls: 'x-fa fa-edit',
                                tooltip: 'Edit',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_modello_hardware").onEdit(this.el,rec);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-list',
                                tooltip: 'Lista seriali',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex),
                                        btn = this;

                                    var store = Ext.StoreManager.lookup("S_seriale_modello");

                                    store.getProxy().extraParams.modello_id = rec.get("id");

                                    store.load({
                                        callback: function(){
                                            Ext.widget("seriale_modello_list_by_modello",{
                                                title: 'Lista Seriali ('+this.getTotalCount()+') - <b>'+rec.get("nome")+'</b>',
                                                animateTarget: btn.el
                                            });
                                        }
                                    });
                                }
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                tooltip: 'Delete',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_modello_hardware").onDestroy(rec);
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
