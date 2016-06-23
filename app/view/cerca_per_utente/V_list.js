Ext.define('CL.view.cerca_per_utente.V_list', {
    extend: 'Ext.panel.Panel',
    xtype: 'cerca_per_utente_list',
    itemId: 'cerca_per_utente_list_id',
    alias: 'widget.cerca_per_utente_list',

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
                store: 'S_cerca_per_utente',
                height: '98%',
                flex: 60,
                autoscroll: true,
                overflowX: 'hidden',
                overflowY: 'auto',

                bodyStyle: {
                    background: 'url(resources/images/background_arrow_up.png)',
                    backgroundSize: '100% 100%'
                },

                viewConfig: {
                    enableTextSelection: true
                },

                disableSelection: true,

                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: 'S_cerca_per_utente', // same store GridPanel is using
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
                            text: 'Cerca seriali assegnati ad un Utente',
                            style: 'color: #157fcc;font-size: 15px;font-weight: bold;font-family: helvetica, arial, verdana, sans-serif;line-height: 16px'
                        },

                        '->',
                        {
                            xtype: 'combobox',
                            name: 'richiedente',
                            fieldLabel: 'Utente',
                            labelAlign: 'right',
                            store: "S_utente",
                            queryMode: 'local',
                            displayField: 'utente_name',
                            valueField: 'utente_name',
                            anyMatch: true,
                            listeners:{
                                select: function(){
                                    var utente_selezionato = this.getValue();
                                    Ext.StoreManager.lookup("S_cerca_per_utente").load({
                                        params:{
                                            utente: utente_selezionato
                                        }
                                    });

                                    //tolgo l'immagine della freccia dalla griglia
                                    Ext.ComponentQuery.query("cerca_per_utente_list grid")[0].setBodyStyle({
                                        background: "white"
                                    });
                                }
                            }
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
                        CL.app.getController("C_cerca_per_utente").onEdit(item,record);
                    }
                },

                columns: [
                    {
                        text: '# Richiesta',
                        dataIndex: 'richiesta_id',
                        flex: 0.5,
                        sortable: false
                    },
                    {
                        text: 'Sede',
                        dataIndex: 'sede_name',
                        flex: 1,
                        sortable: false
                    },
                    {
                        text: 'Ufficio',
                        dataIndex: 'ufficio_name',
                        flex: 0.7,
                        sortable: false
                    },
                    {
                        text: 'Hardware',
                        dataIndex: 'hardware_name',
                        flex: 1.5,
                        sortable: false
                    },
                    {
                        text: 'Seriale',
                        dataIndex: 'seriale',
                        flex: 1,
                        sortable: false
                    }

                    /*{
                        xtype:'actioncolumn',
                        width:50,
                        items: [
                            {
                                iconCls: 'x-fa fa-edit',
                                tooltip: 'Modifica',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_cerca_per_utente").onEdit(this.el,rec);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                tooltip: 'Rimuovi',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_cerca_per_utente").onDestroy(rec);
                                }
                            }
                        ]
                    }*/
                ]
            }
        ];

        this.callParent(arguments);

    }



});
