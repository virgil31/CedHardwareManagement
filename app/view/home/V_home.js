Ext.define('CL.view.home.V_home', {
    extend: 'Ext.panel.Panel',
    xtype: 'home',
    itemId: 'home_id',
    alias: 'widget.home',

    bodyStyle: 'backgroundColor: transparent',

    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },

    initComponent: function() {
        var this_view = this;

        setTimeout(function(){
            Ext.StoreManager.lookup("S_richiesta").loadPage(1);
        }, 250);

        this_view.items = [
            {
                xtype: 'grid',
                border: true,
                store: "S_richiesta",
                height: '98%',
                width: '100%',
                disableSelection: true,

                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: 'S_richiesta',
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
                            tooltip: 'Aggiorna lista richieste',
                            icon: 'resources/images/icon_refresh.gif',
                            action: 'refresh_richieste',
                            handler: function(){
                                Ext.ComponentQuery.query("home grid")[0].getStore().loadPage(1);
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'Richieste Hardware',
                            style: 'color: #157fcc;font-size: 15px;font-weight: bold;font-family: helvetica, arial, verdana, sans-serif;line-height: 16px'
                        },
                        {
                            xtype: 'button',
                            icon: 'resources/images/icon_plus.gif',
                            text: 'Assegnazione Rapida',
                            tooltip: 'Assegnazione Rapida'
                        },
                        {
                            xtype: 'button',
                            icon: 'resources/images/icon_excel.png',
                            tooltip: 'Scarica CSV',
                            action: 'export_csv'
                        },
                        '->',
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Filtra per stato',
                            store: 'S_stato',
                            valueField: 'key',
                            displayField: 'value',
                            queryMode:'local',
                            anyMatch: true,
                            tpl: Ext.create('Ext.XTemplate',
                                '<ul class="x-list-plain"><tpl for=".">',
                                    '<li role="option" class="x-boundlist-item"><img src="resources/images/icon_{key}.png" alt=" " style="width:16px;height:16px;">&nbsp;&nbsp;{value}</li>',
                                '</tpl></ul>'
                            ),
                            listeners: {
                                select: function(combo,record){
                                    Ext.StoreManager.lookup("S_richiesta").proxy.extraParams.stato = record.get("key");
                                    Ext.StoreManager.lookup("S_richiesta").loadPage(1);
                                },
                                blur: function(){
                                    if(this.getValue() === null){
                                        this.reset();
                                        delete Ext.StoreManager.lookup("S_richiesta").proxy.extraParams.stato;
                                        Ext.StoreManager.lookup("S_richiesta").loadPage(1);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'textfield',
                            emptyText: '# richiesta',
                            name: 'numero',
                            width: 100,
                            listeners: {
                                specialkey: function(field, e){
                                    if (e.getKey() == e.ENTER){
                                        if(field.getValue().length != 0){
                                            var btn = Ext.ComponentQuery.query("home button[action=do_query_numero]")[0];
                                            btn.fireEvent("click",btn);
                                        }
                                        else{
                                            Ext.ComponentQuery.query("home button[action=refresh_richieste]")[0].handler();
                                        }
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            tooltip: 'Ricerca',
                            action: 'do_query_numero',
                            listeners:{
                                click: function(){
                                    if(Ext.ComponentQuery.query("home textfield[name=numero]")[0].getValue() != ""){
                                        Ext.StoreManager.lookup("S_richiesta").load({
                                            params:{
                                                numero: Ext.ComponentQuery.query("home textfield[name=numero]")[0].getValue()
                                            }
                                        });
                                    }
                                    else {
                                        Ext.StoreManager.lookup("S_richiesta").loadPage(1)
                                    }
                                }
                            }
                        }
                    ]
                },

                listeners:{
                    itemdblclick: function( grid, record, item, index, e, eOpts ){
                        CL.app.getController("C_universale").onEdit(item,record);
                    }
                },

                columns: [
                    {
                        dataIndex: "numero",
                        text: '# Richiesta',
                        flex:1
                    },
                    {
                        dataIndex: "richiedente",
                        text: 'Richiedente',
                        flex:1
                    },
                    {
                        dataIndex: "sede",
                        text: 'Sede',
                        flex:1
                    },
                    {
                        dataIndex: "stato",
                        text: 'Stato',
                        flex:1,
                        renderer: function(value){
                            return COSTANTI.stati[value].value;
                        }
                    },
                    {
                        xtype: 'datecolumn',
                        text: 'Data presentazione richiesta',
                        dataIndex: 'data_presentazione',
                        flex: 1
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
                                    CL.app.getController("C_universale").onEdit(this.el,rec);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                tooltip: 'Elimina',
                                handler: function(grid, rowIndex, colIndex) {
                                    alert("todo");
                                    //var rec = grid.getStore().getAt(rowIndex);
                                    //CL.app.getController("C_materiale").onDestroy(rec);
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
