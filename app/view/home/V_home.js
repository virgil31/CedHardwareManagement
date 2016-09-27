Ext.define('CL.view.home.V_home', {
    extend: 'Ext.panel.Panel',
    xtype: 'home',
    itemId: 'home_id',
    alias: 'widget.home',

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

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
                //autoscroll: true,
                //overflowX: 'hidden',
                //overflowY: 'auto',

                disableSelection: true,

                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: 'S_richiesta',//'S_user', // same store GridPanel is using
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
                            tooltip: 'Assegnazione Rapida',
                            handler: function(){
                                CL.app.getController("C_richiesta").onQuickCreate(this.el);
                            }
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
                            valueField: 'value',
                            displayField: 'name',
                            width: 120,
                            editable: false,
                            tpl: Ext.create('Ext.XTemplate',
                                '<ul class="x-list-plain"><tpl for=".">',
                                    '<li role="option" class="x-boundlist-item"><img src="resources/images/{value}.png" alt=" " style="width:16px;height:16px;">&nbsp;&nbsp;{name}</li>',
                                '</tpl></ul>'
                            ),
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name'],
                                data : [
                                    {"name":"Tutte",        "value":"Tutte"},
                                    {"name":"Da Valutare",  "value":"Da Valutare"},
                                    {"name":"Rifiutate",    "value":"Rifiutata"},
                                    {"name":"Accettate",    "value":"Accettata"},
                                    {"name":"Completate",   "value":"Completata"},
                                    {"name":"Pregresso",   "value":"Pregresso"}
                                ]
                            }),
                            value: "Tutte",
                            listeners: {
                                select: function(combo,record){
                                    Ext.StoreManager.lookup("S_richiesta").proxy.extraParams.stato = record.get("value");
                                    Ext.StoreManager.lookup("S_richiesta").loadPage(1);
                                }
                            }
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'textfield',
                            emptyText: 'ID richiesta',
                            name: 'query_id',
                            width: 100,
                            listeners: {
                                specialkey: function(field, e){
                                    if (e.getKey() == e.ENTER){
                                        if(field.getValue().length != 0){
                                            var btn = Ext.ComponentQuery.query("home button[action=do_query_id]")[0];
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
                            action: 'do_query_id',
                            listeners:{
                                click: function(){
                                    if(Ext.ComponentQuery.query("home textfield[name=query_id]")[0].getValue().length != 0){
                                        Ext.StoreManager.lookup("S_richiesta").load({
                                            params:{
                                                query_id: Ext.ComponentQuery.query("home textfield[name=query_id]")[0].getValue()
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    ]
                },

                listeners:{
                    itemdblclick: function( grid, record, item, index, e, eOpts ){
                        CL.app.getController("C_richiesta").onEdit(item,record);
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
