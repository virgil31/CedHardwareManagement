Ext.define('CL.view.richiesta.V_edit', {
    extend: 'Ext.window.Window',
    xtype: 'richiesta_edit',
    itemId: 'richiesta_edit_id',
    alias: 'widget.richiesta_edit',

    autoShow: true,
    modal: true,
    constrain: true,
    //resizable: false,

    padding: 10,

    width: 880, //750

    layout: 'fit',

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'form',
                layout: {
                    type: 'vbox',
                    align: 'center'
                },
                defaults: {
                    width: '95%'
                },
                items: [
                    {
                        xtype: 'panel',
                        margin: '0 0 10 0',
                        bodyStyle: {
                            background: '#C4DFF2'
                        },
                        layout:{
                            type: 'vbox',
                            align: 'center',
                            pack: 'center'
                        },
                        items: [
                            {
                                xtype: 'combobox',
                                margin: '10 0 10 0',
                                fieldLabel: 'Stato',
                                name: 'stato',
                                displayField: 'stato',
                                valueField: 'stato',
                                editable: false,
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['stato'],
                                    data : [
                                        {"stato":"Da Valutare"},
                                        {"stato":"Rifiutata"},
                                        {"stato":"Accettata"},
                                        {"stato":"Completata"}
                                    ]
                                }),
                                listeners:{
                                    change: function(){
                                        if(this.getValue() == "Pregresso")
                                            this.readOnly = true;
                                    }
                                }
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Assegnata il',
                                name: 'assegnata_il',
                                format:'d/m/Y',
                                submitFormat:'m/d/Y',
                                editable: false
                            }
                        ]
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Richiedente',
                        name: 'full_nome',
                        readOnly: true
                    },
                    {
                        xtype: 'combobox',
                        /*style: {
                            background: "#C4F2E5"
                        },*/
			readOnly: true,
                        fieldLabel: 'Funzionario',
                        name: 'funzionario_id',
                        store: "S_utente",
                        queryMode: 'local',
                        anyMatch: true,
                        displayField: 'utente_name',
                        valueField: 'id'
                    },
                    {
                        xtype: 'combobox',
                        style: {
                            background: "#C4F2E5"
                        },
                        fieldLabel: 'Sede',
                        name: 'sede_id',
                        store: "S_sede",
                        queryMode: 'local',
                        anyMatch: true,
                        displayField: 'nome',
                        valueField: 'id',
                        listeners:{
                            select: function(){
                                //pulisco selezione dell'ufficio e ricarico la combobox di quest'ultimi
                                Ext.StoreManager.lookup("S_ufficio").load({
                                    params:{
                                        sede_id: this.getValue()
                                    }
                                });

                                Ext.ComponentQuery.query("richiesta_edit combobox[name=ufficio_id]")[0].clearValue();
                            }
                        }
                    },
                    {
                        xtype: 'combobox',
                        style: {
                            background: "#C4F2E5"
                        },
                        fieldLabel: 'Ufficio',
                        name: 'ufficio_id',
                        store: "S_ufficio",
                        queryMode: 'local',
                        anyMatch: true,
                        displayField: 'nome',
                        valueField: 'id'
                    },

                    /*
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Sede',
                        name: 'sede_name',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Ufficio',
                        name: 'ufficio_name',
                        readOnly: true
                    },
                    */
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Servizio',
                        name: 'servizio',
                        readOnly: true
                    },
                    {
                        xtype: 'textareafield',
                        fieldLabel: 'Motivazione',
                        name: 'motivazione',
                        readOnly: true
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Richiesta il',
                        name: 'richiesta_il',
                        format:'d/m/Y',
                        submitFormat:'d/m/Y',
                        readOnly: true
                    },
                    {
                        xtype: 'checkbox',
                        inputValue: true,
                        uncheckedValue: false,
                        name: "disponibile_per_usato",
                        boxLabel  : 'Disponibilità ad utilizzare apparecchiature <b>non nuove</b>.',
                        width: '60%',
                        readOnly: true
                    },
                    {
                        xtype: 'grid',
                        title: "<b>Materiale Richiesto</b>",
                        height: 150,
                        margin: '0 0 10 0',
                        style:{
                            border: "1px solid #3892D4 !important;"
                        },
                        viewConfig: {
                            enableTextSelection: true
                        },
                        store: 'S_assegnazione',
                        listeners: {
                            itemmouseenter: function(view, record, item) {
                                if(record.get('assegnato_a') !== '<b> </b> -  ()')
                                    Ext.fly(item).set({
                                        'data-qtip': record.get("tipo_hardware_name")+": <b>"+record.get("seriali_disponibili")+"</b> disponibili"
                                    });
                            }
                        },
                        columns: [
                            { text: 'Materiale',            dataIndex: 'tipo_hardware_name', flex: 0.4 },
                            { text: 'Note',                 dataIndex: 'note', flex: 0.5 },
                            { text: 'Modello Assegnato',    dataIndex: 'seriale_name', flex: 1 },
                            {
                                xtype:'actioncolumn',
                                width:50,
                                items: [
                                    {
                                        //iconCls: 'x-fa fa-remove',
                                        icon: 'resources/images/icon_give.png',
                                        tooltip: 'Cambia/Assegna Hardware',
                                        handler: function(grid, rowIndex, colIndex) {
                                            var stato_richiesta = Ext.ComponentQuery.query("richiesta_edit combobox[name=stato]")[0].getValue();

                                            /*if(stato_richiesta == "Pregresso"){
                                                Ext.Msg.alert("Attenzione!","Impossibile modificare un'assegnazione del pregresso.")
                                            }
                                            else{
                                                var rec = grid.getStore().getAt(rowIndex);
                                                CL.app.getController("C_assegnazione").onEdit(this.el,rec);
                                            }*/


                                            var rec = grid.getStore().getAt(rowIndex);
                                            CL.app.getController("C_assegnazione").onEdit(this.el,rec);
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
                buttonAlign: 'center',
                buttons: [
                    {
                        text: "Salva Modifiche",
                        scale: 'large',
                        action: 'do_edit',
                        style: {
                            background: "#3CAFFF"
                        }
                    },
                    {
                        text: "Foglio Consegna",
                        scale: 'large',
                        action: 'mostra_foglio_consegna',
                        style: {
                            background: "#29A14E"
                        }
                    },
                    {
                        text: "Annulla Richiesta",
                        scale: 'large',
                        action: 'annulla_richiesta',
                        style: {
                            background: "#ff6363"
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});