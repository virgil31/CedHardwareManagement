Ext.define('CL.view.seriale_modello.V_search', {
    extend: 'Ext.panel.Panel',
    xtype: 'seriale_modello_search',
    itemId: 'seriale_modello_search_id',
    alias: 'widget.seriale_modello_search',

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
                store: 'S_seriale_modello_search',
                height: '98%',
                flex: 60,
                autoscroll: true,
                overflowX: 'hidden',
                overflowY: 'auto',

                disableSelection: true,


                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: 'S_seriale_modello_search', // same store GridPanel is using
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
                            html: '<b>Ricerca Seriale</b>',
                            style: 'color: #157fcc;font-size: 15px;font-weight: 300;font-family: helvetica, arial, verdana, sans-serif;line-height: 16px'
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            name: 'query_seriale',
                            emptyText: 'SN ad es: XXX-YYY-ZZZ',
                            minLength: 3,
                            listeners: {
                                specialkey: function(field, e){
                                    if (e.getKey() == e.ENTER){
                                        var btn = Ext.ComponentQuery.query("seriale_modello_search button[action=do_ricerca]")[0];
                                        btn.fireEvent("click",btn);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Cerca',
                            action: 'do_ricerca',
                            icon: 'resources/images/icon_search.png',
                            listeners: {
                                click: function(btn){
                                    var store = Ext.StoreManager.lookup("S_seriale_modello_search"),
                                        query = Ext.ComponentQuery.query("seriale_modello_search textfield[name=query_seriale]")[0].getValue();

                                    store.getProxy().extraParams.query = query;
                                    store.loadPage(1);
                                }
                            }
                        }
                    ]
                },

                listeners: {
                    itemdblclick: function( grid, record, item, index, e, eOpts ){
                        CL.app.getController("C_seriale_modello").onEdit(item,record);
                    },

                    itemmouseenter: function(view, record, item) {
                        if(!record.get('disponibile') && record.get('nome_richiedente') != null){
                            var richiedente = record.get("nome_richiedente")+" "+record.get("cognome_richiedente"),
                                sede = record.get("sede_name"),
                                ufficio = record.get("ufficio_name"),
                                assegnata_il = record.get("assegnata_il");

                            Ext.fly(item).set({'data-qtip': "Assegnato a <b>"+richiedente+"</b> - "+sede+" ("+ufficio+") il giorno <i>"+assegnata_il+"</i>"});
                        }
                    }
                },

                columns: [
                    {
                        text: 'Seriale',
                        dataIndex: 'seriale',
                        flex: 1.5
                    },
                    {
                        text: 'Marca',
                        dataIndex: 'marca_name',
                        flex: 1
                    },
                    {
                        text: 'Tipo',
                        dataIndex: 'tipo_name',
                        flex: 1
                    },
                    {
                        text: 'Modello',
                        dataIndex: 'modello_name',
                        flex: 1
                    },

                    {
                        text: 'Disponibile',
                        dataIndex: 'disponibile',
                        flex: 0.5,
                        renderer: function (value, metaData, record) {
                            metaData.tdStyle = 'background: '+((value == "true" || value == true)?"#B8FFB8":"#FFC5C5")+';';
                            return (value == true) ? 'Sì' : 'No'
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
                                    CL.app.getController("C_seriale_modello").onEdit(this.el,rec);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                tooltip: 'Delete',
                                handler: function(grid, rowIndex, colIndex) {
                                    var record = grid.getStore().getAt(rowIndex);

                                    Ext.Msg.confirm('Attenzione!', 'Eliminare <b>'+record.get("seriale")+"</b>?",function(btn){
                                        if (btn === 'yes')
                                            Ext.StoreManager.lookup("S_seriale_modello_search").remove(record);
                                    });
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
