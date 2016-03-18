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
                store: 'S_user',
                height: '98%',
                //width: '60%',
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
                    height: 38,
                    style: 'backgroundColor: #F5F5F5',
                    items: [
                        {
                            xtype: 'button',
                            tooltip: 'Aggiorna lista richieste',
                            action: 'load_user',
                            icon: 'resources/images/icon_refresh.gif'
                        },
                        {
                            xtype: 'label',
                            text: 'Richieste Hardware',
                            style: 'color: #157fcc;font-size: 15px;font-weight: 300;font-family: helvetica, arial, verdana, sans-serif;line-height: 16px'
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Nuova richiesta Hardware',
                            icon: 'resources/images/icon_plus.gif'
                        },

                        '->',
                        {
                            xtype: 'combobox',
                            displayField: 'name',
                            editable: false,
                            fieldStyle: 'background: #FFCBCB', //B3D3EA
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name'],
                                data : [
                                    {"name":"Non Consegnate"},
                                    {"name":"Consegnate"}
                                ]
                            }),
                            value: "Non Consegnata",
                            listeners: {
                                change: function(me){
                                    if(me.getValue() === "Non Consegnate")
                                        me.setFieldStyle({background: "#FFCBCB"});
                                    else
                                        me.setFieldStyle({background: "#B3D3EA"});
                                }
                            }
                        }
                    ]
                },

                columns: [
                    {
                        text: 'Nome',
                        dataIndex: 'first_name',
                        flex: 1,
                        editor: {
                            xtype: 'textfield'
                        }
                    },
                    {
                        text: 'Cognome',
                        dataIndex: 'last_name',
                        flex: 1,
                        editor: {
                            xtype: 'textfield'
                        }
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
                        width:60,
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
                        text: 'Cerca Richieste HW',
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
                        width: '100%',
                        style: 'backgroundColor: #CC8D00',
                        handler: function(){
                            CL.app.getController('C_home').redirectTo("modelli_hardware");
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
