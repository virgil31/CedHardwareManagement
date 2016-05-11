Ext.define('CL.view.home.V_home', {
    extend: 'Ext.panel.Panel',
    xtype: 'home',
    itemId: 'home_id',
    alias: 'widget.home',

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
                //title: 'Richieste Nuovo Hardware',
                store: 'S_richiesta',
                height: '98%',
                //width: '60%',
                flex: 60,
                autoscroll: true,
                overflowX: 'hidden',
                overflowY: 'auto',

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
                            handler: function(){
                                Ext.ComponentQuery.query("home grid")[0].getStore().loadPage(1);
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'Richieste Hardware',
                            style: 'color: #157fcc;font-size: 15px;font-weight: 300;font-family: helvetica, arial, verdana, sans-serif;line-height: 16px'
                        },
                        {
                            xtype: 'button',
                            icon: 'resources/images/icon_plus.gif',
                            text: 'Assegnazione Rapida Pregresso',
                            tooltip: 'Assegnazione Rapida',
                            handler: function(){
                                CL.app.getController("C_richiesta").onQuickCreate(this.el);
                            }
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
                        dataIndex: 'stato',
                        flex: 0.1,
                        sortable: false,
                        renderer: function(value){
                            return '<img src="resources/images/'+value+'.png" alt=" " height="16" width="16" title="'+value+'">';
                        }
                    },
                    {
                        text: 'ID',
                        dataIndex: 'id',
                        flex: 0.3,
                        sortable: false
                    },
                    {
                        text: 'Richiesta da',
                        dataIndex: 'full_nome',
                        sortable: false,
                        flex: 0.8
                    },
                    {
                        text: 'Sede',
                        dataIndex: 'sede_name',
                        flex: 1,
                        sortable: false
                    },
                    {
                        xtype: 'datecolumn',
                        text: 'Richiesta il',
                        dataIndex: 'richiesta_il',
                        format:'d/m/Y',
                        flex: 0.5
                    },
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
                    }
                ]
            },
            {
                flex: 1
            },
            {
                xtype: 'panel',
                height: '98%',
                flex: 20,
                bodyStyle: 'backgroundColor: transparent',
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'button',
                        text: 'Ricerche Varie',
                        flex: 5,
                        width: '100%',
                        style: 'backgroundColor: green',
                        disabled: true
                    },

                    {
                        flex: 0.1
                    },
                    {
                        xtype: 'button',
                        text: 'Albero Risorse',
                        icon: "resources/images/icon_tree.png",
                        flex: 1,
                        width: '100%',
                        style: 'backgroundColor: #3892D4',
                        handler: function(){
                            CL.app.getController('C_home').redirectTo("albero_risorse");
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Tipi HW',
                        flex: 1,
                        width: '100%',
                        style: 'backgroundColor: #CC8D00',
                        handler: function(){
                            CL.app.getController('C_home').redirectTo("tipi_hardware");
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Marche HW',
                        flex: 1,
                        width: '100%',
                        style: 'backgroundColor: #CC8D00',
                        handler: function(){
                            CL.app.getController('C_home').redirectTo("marche_hardware");
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Modelli HW',
                        flex: 1,
                        icon: "resources/images/icon_laptop.png",
                        width: '100%',
                        style: 'backgroundColor: #CC8D00',
                        handler: function(){
                            CL.app.getController('C_home').redirectTo("modelli_hardware");
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Cerca Seriali',
                        flex: 1,
                        icon: "resources/images/icon_serial.png",
                        width: '100%',
                        style: 'backgroundColor: #CC8D00',
                        handler: function(){
                            CL.app.getController('C_home').redirectTo("cerca_seriali");
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Fatture',
                        flex: 1,
                        width: '100%',
                        style: 'backgroundColor: #CC8D00',
                        handler: function(){
                            CL.app.getController('C_home').redirectTo("fatture");
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Tipi Ditte',
                        flex: 1,
                        width: '100%',
                        style: 'backgroundColor: #333333',
                        handler: function(){
                            CL.app.getController('C_home').redirectTo("tipi_ditte");
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Fornitori',
                        flex: 1,
                        width: '100%',
                        style: 'backgroundColor: #333333',
                        handler: function(){
                            CL.app.getController('C_home').redirectTo("fornitori");
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Sedi',
                        flex: 1,
                        width: '100%',
                        style: 'backgroundColor: #AD3636',
                        handler: function(){
                            CL.app.getController('C_home').redirectTo("sedi");
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Uffici',
                        flex: 1,
                        width: '100%',
                        style: 'backgroundColor: #AD3636',
                        handler: function(){
                            CL.app.getController('C_home').redirectTo("uffici");
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Utenti',
                        flex: 1,
                        width: '100%',
                        style: 'backgroundColor: #AD3636',
                        handler: function(){
                            CL.app.getController('C_home').redirectTo("utenti");
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
