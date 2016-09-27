Ext.define('CL.view.controlla_richieste.V_controlla_richieste', {
    extend: 'Ext.panel.Panel',
    xtype: 'controlla_richieste',
    itemId: 'controlla_richieste_id',
    alias: 'widget.controlla_richieste',

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
                xtype: 'panel',
                titleAlign: 'center',
                style: {
                    borderRadius: '10px'
                },
                width: 700,
                layout:{
                    type: 'vbox',
                    align: 'center'
                },

                tbar: {
                    xtype: 'toolbar',
                    style: {
                        background: '#5CC25C'
                    },
                    height: 50,
                    items:[
                        {
                            xtype: 'button',
                            text: 'Disconnetti',
                            icon: 'resources/images/icon_logout.png',
                            handler: function(){
                                Ext.util.Cookies.clear("richiedente_id");
                                Ext.util.Cookies.clear("richiedente_nome");
                                Ext.util.Cookies.clear("richiedente_cognome");

                                CL.app.getController("C_richiesta").redirectTo("login");
                            }
                        },
                        '->',
                        {
                            xtype: 'label',
                            text: 'Gestisci le tue richieste - '+Ext.util.Cookies.get("richiedente_cognome")+" "+Ext.util.Cookies.get("richiedente_nome"),
                            style: {
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: "16px"
                            }
                        },
                        '->',
                        {
                            xtype: 'button',
                            text: 'Nuova richiesta',
                            icon: 'resources/images/icon_plus.gif',
                            handler: function(){
                                CL.app.getController("C_controlla_richieste").redirectTo("richiesta");
                            }
                        }
                    ]
                },
                defaults: {
                    margin: '7 0 7 0'
                },
                items:[
                    {
                        xtype: 'grid',
                        store: "S_richiesta",
                        height: 500,
                        width: '95%',
                        listeners:{
                            itemdblclick: function( grid, rec, item, index, e, eOpts ){
                                CL.app.getController("C_controlla_richieste").redirectTo("richiesta");

                                setTimeout(function(){
                                    var form = Ext.ComponentQuery.query("form_richiesta form")[0];
                                    form.reset(true);
                                    //form.trackResetOnLoad = true,
                                    form.loadRecord(rec);
                                }, 250);
                            }
                        },
                        columns:[
                            {
                                dataIndex: "ric_numero",
                                text: '# Richiesta',
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
                            },
                            {
                                xtype: 'actioncolumn',
                                width: 60,
                                items: [
                                    {
                                        iconCls: 'x-fa fa-search',
                                        tooltip: 'Vedi/Modifica richiesta',
                                        handler: function(grid, rowIndex, colIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);

                                            CL.app.getController("C_controlla_richieste").redirectTo("richiesta");

                                            setTimeout(function(){
                                                var form = Ext.ComponentQuery.query("form_richiesta form")[0];
                                                form.reset(true);
                                                //form.trackResetOnLoad = true,

                                                Ext.ComponentQuery.query("form_richiesta form combobox[name=ric_stato]")[0].enable();
                                                Ext.ComponentQuery.query("form_richiesta form combobox[name=ric_stato]")[0].show();

                                                form.loadRecord(rec);
                                            }, 250);

                                        }
                                    },
                                    {
                                        iconCls: 'x-fa fa-trash',
                                        tooltip: 'Annulla richiesta',
                                        handler: function(grid, rowIndex, colIndex) {
                                            var rec = grid.getStore().getAt(rowIndex),
                                                stato = rec.get("ric_stato");

                                            // controllo se con l'attuale stato puo eliminare
                                            if(COSTANTI.stati[stato].puo_eliminare){
                                                Ext.Msg.confirm("Attenzione","Sei sicuro di voler annullare la richiesta <strong>#"+rec.get("ric_numero")+"</strong>",function(btnId){
                                                    if(btnId == "yes"){
                                                        rec.erase();
                                                    }
                                                });
                                            }
                                            else{
                                                Ext.Msg.alert("Attenzione","Non è più possibile annullare tale richiesta.");
                                            }
                                        }
                                    }
                                ]
                            }
                        ],
                        dockedItems: [{
                            xtype: 'pagingtoolbar',
                            store: 'S_richiesta', // same store GridPanel is using
                            dock: 'bottom',
                            displayInfo: true
                        }]
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
