Ext.define('CL.view.home.V_home', {
    extend: 'Ext.panel.Panel',
    xtype: 'home',
    itemId: 'home_id',
    alias: 'widget.home',

    bodyStyle: 'backgroundColor: transparent',

    layout: {
        type: 'vbox',
        align: 'center'
    },

    initComponent: function() {
        var this_view = this;

        Ext.StoreManager.lookup("S_richiesta").load();

        this_view.items = [
            {
                xtype: 'toolbar',
                height: 38,
                width: '100%',
                items:[
                    {
                        text:'Vista ad albero',
                        icon: 'resources/images/icon_tree.png'
                    },
                    {
                        text: 'Cerca materiale per utente',
                        icon: "resources/images/icon_utente.png"
                    },
                    {
                        text: 'Cerca info seriale',
                        icon: "resources/images/icon_serial.png"
                    },
                    {
                        text: 'Tabelle',
                        icon: "resources/images/icon_list.png",
                        menu:[
                            {
                                text: 'Tipologie HW'
                            },
                            {
                                text: 'Marche HW'
                            },
                            {
                                text: 'Modelli HW'
                            },
                            {
                                text: 'Fatture'
                            },
                            {
                                text: 'Tipi di ditte'
                            },
                            {
                                text: 'Fornitori'
                            },
                            {
                                text: 'Sedi'
                            },
                            {
                                text: 'Uffici'
                            },
                            {
                                text: 'Utenti'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'grid',
                border: true,
                store: "S_richiesta",
                padding: "10 0 10 0",
                height: window.innerHeight-88-88-38,
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
                            forceSelection: true,
                            queryMode:'local',
                            anyMatch: true,
                            tpl: Ext.create('Ext.XTemplate',
                                '<ul class="x-list-plain"><tpl for=".">',
                                    '<li role="option" class="x-boundlist-item"><img src="resources/images/icon_{key}.png" alt=" " style="width:16px;height:16px;">&nbsp;&nbsp;{value}</li>',
                                '</tpl></ul>'
                            ),
                            listeners: {
                                select: function(combo,record){
                                    Ext.StoreManager.lookup("S_richiesta").proxy.extraParams.ric_stato = record.get("key");
                                    Ext.StoreManager.lookup("S_richiesta").loadPage(1);
                                },
                                change: function(){
                                    if(this.getValue() === null)
                                        this.reset();

                                        delete Ext.StoreManager.lookup("S_richiesta").proxy.extraParams.ric_stato;
                                        Ext.StoreManager.lookup("S_richiesta").loadPage(1)
                                }
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'textfield',
                            emptyText: '# richiesta',
                            name: 'ric_numero',
                            width: 100,
                            listeners: {
                                specialkey: function(field, e){
                                    if (e.getKey() == e.ENTER){
                                        if(field.getValue().length != 0){
                                            var btn = Ext.ComponentQuery.query("home button[action=do_query_ric_numero]")[0];
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
                            tooltip: 'Ricerca per ID',
                            action: 'do_query_ric_numero',
                            listeners:{
                                click: function(){
                                    Ext.StoreManager.lookup("S_richiesta").load({
                                        params:{
                                            ric_numero: Ext.ComponentQuery.query("home textfield[name=ric_numero]")[0].getValue()
                                        }
                                    });
                                }
                            }
                        }
                    ]
                },

                listeners:{
                    itemdblclick: function( grid, record, item, index, e, eOpts ){
                        alert("todo doppio click => apro scheda richiesta");
                        //CL.app.getController("C_richiesta").onEdit(item,record);
                    }
                },

                columns: [
                    {
                        dataIndex: "ric_numero",
                        text: '# Richiesta',
                        flex:1
                    },
                    {
                        dataIndex: "cognome_nome_richiedente",
                        text: 'Richiedente',
                        flex:1
                    },
                    {
                        dataIndex: "ric_sede_name",
                        text: 'Sede',
                        flex:1
                    },
                    {
                        dataIndex: "ric_stato",
                        text: 'Stato',
                        flex:1,
                        renderer: function(value){
                            return COSTANTI.stati[value].value;
                        }
                    },
                    {
                        xtype: 'datecolumn',
                        format:'d/m/Y',
                        text: 'Data presentazione richiesta',
                        dataIndex: 'ric_data_presentazione',
                        flex: 1
                    }
                    /*
                    {
                        xtype: 'actioncolumn',
                        width: 60,
                        items: [
                            {
                                iconCls: 'x-fa fa-search',
                                tooltip: 'Scheda Richiesta',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_richiesta").onEdit(this.el,rec);
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
