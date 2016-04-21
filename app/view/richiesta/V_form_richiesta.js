Ext.define('CL.view.richiesta.V_form_richiesta', {
    extend: 'Ext.panel.Panel',
    xtype: 'form_richiesta',
    itemId: 'form_richiesta_id',
    alias: 'widget.form_richiesta',

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },

    initComponent: function() {
        var this_view = this;

        Ext.StoreManager.lookup("S_sede").load({params:{flag_full: true}});
        Ext.StoreManager.lookup("S_utente").load({params:{flag_solo_funzionari: true}});

        this_view.items = [
            {
                xtype: 'form',
                title: '<b>Richiesta Materiale Informatico - CED</b>',
                style: {
                    borderRadius: "20px"
                },
                padding: 10,
                width: 500,
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                defaults:{
                    width: '95%',
                    margin: '5 0 5 0'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'nome',
                        fieldLabel: 'Nome',
                        readOnly: true,
                        value: Ext.util.Cookies.get("nome"),
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        name: 'cognome',
                        fieldLabel: 'Cognome',
                        readOnly: true,
                        value: Ext.util.Cookies.get("cognome"),
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        name: 'email',
                        fieldLabel: 'Email',
                        allowBlank: false,
                        emptyText: 'nome.cognome@beniculturali.it',
                        vtype: 'email'
                    },
                    {xtype: 'menuseparator', width: '95%'},
                    {
                        xtype: 'combobox',
                        name: 'sede_id',
                        fieldLabel: 'Sede',
                        store: "S_sede",
                        queryMode: 'local',
                        displayField: 'nome',
                        valueField: 'id',
                        emptyText: 'Palazzo Massimo',
                        anyMatch: true,
                        allowBlank: false,
                        forceSelection: true,
                        listeners:{
                            select: function(){
                                var sede_id = this.getValue();
                                Ext.StoreManager.lookup("S_ufficio").load({params:{sede_id: sede_id}});
                                this.up('form').down("combobox[name=ufficio_id]").enable();
                            }
                        }
                    },
                    {
                        xtype: 'combobox',
                        name: 'ufficio_id',
                        fieldLabel: 'Ufficio',
                        store: "S_ufficio",
                        queryMode: 'local',
                        displayField: 'nome',
                        valueField: 'id',
                        emptyText: 'CED',
                        anyMatch: true,
                        allowBlank: false,
                        forceSelection: true,
                        disabled: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'servizio',
                        fieldLabel: 'Servizio',
                        emptyText: 'CED',
                        allowBlank: false
                    },
                    {
                        xtype: 'combobox',
                        name: 'funzionario_id',
                        fieldLabel: 'Funzionario',
                        store: "S_utente",
                        queryMode: 'local',
                        displayField: 'utente_name',
                        valueField: 'id',
                        emptyText: 'Pasquale Porreca',
                        anyMatch: true,
                        allowBlank: false,
                        forceSelection: true
                    },
                    {xtype: 'menuseparator', width: '95%'},
                    {
                        xtype: 'grid',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['id','nome','note']
                        }),
                        height: 150,
                        border: true,
                        style:{
                            border: "1px solid #3892D4 !important;"
                        },
                        scrollable: true,
                        tbar: [
                            '->',
                            {
                                xtype: 'panel',
                                items:[
                                    {
                                        xtype: 'button',
                                        text: '+ Aggiungi Hardware alla Richiesta +',
                                        style: {
                                            background: "#5CC25C"
                                        },
                                        handler: function(){
                                            var btn = this;
                                            Ext.create("Ext.window.Window",{
                                                animateTarget: btn.el,
                                                autoShow: true,
                                                modal: true,
                                                resizable: false,
                                                constrain: true,
                                                name: 'add_tipo_hardware',
                                                title: 'Aggiunta Hardware alla Richiesta',
                                                padding: 10,
                                                items: [
                                                    {
                                                        xtype: 'form',
                                                        items:[
                                                            {
                                                                xtype: 'combobox',
                                                                name: 'tipo_hardware_id',
                                                                fieldLabel: 'Hardware',
                                                                store: "S_tipo_hardware",
                                                                queryMode: 'local',
                                                                displayField: 'nome',
                                                                valueField: 'id',
                                                                emptyText: 'Monitor',
                                                                anyMatch: true,
                                                                allowBlank: false,
                                                                forceSelection: true
                                                            },
                                                            {
                                                                xtype: 'textfield',
                                                                name: 'note',
                                                                fieldLabel: 'Note'
                                                            }
                                                        ],
                                                        buttonAlign: 'center',
                                                        buttons:[
                                                            {
                                                                text: 'Aggiungi',
                                                                formBind: true,
                                                                handler: function(){
                                                                    var window = this.up("window"),
                                                                        form = window.down("form"),
                                                                        values = form.getValues();

                                                                    values.nome = Ext.ComponentQuery.query("window[name=add_tipo_hardware] combobox[name=tipo_hardware_id]")[0].getRawValue();

                                                                    if(form.isValid()){
                                                                        Ext.ComponentQuery.query("form_richiesta grid")[0].getStore().add({
                                                                            id: values.tipo_hardware_id,
                                                                            nome: values.nome,
                                                                            note: values.note
                                                                        });
                                                                        window.close();
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            });
                                        }
                                    }
                                ]
                            },
                            '->'
                        ],
                        columns: [
                            { text: 'Materiale',    dataIndex: 'nome', flex: 1 },
                            { text: 'Note',         dataIndex: 'note', flex: 1 },
                            {
                                xtype:'actioncolumn',
                                width:50,
                                items: [
                                    {
                                        iconCls: 'x-fa fa-remove',
                                        tooltip: 'Rimuovi Richiesta',
                                        handler: function(grid, rowIndex, colIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);
                                            grid.getStore().remove(rec);
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype     : 'textareafield',
                        name      : 'motivazione',
                        fieldLabel: 'Motivazione Richiesta',
                        allowBlank: false,
                        height: 75,
                        minLength: 50
                    },
                    {
                        xtype: 'checkbox',
                        inputValue: true,
                        uncheckedValue: false,
                        name: "disponibile_per_usato",
                        boxLabel  : 'Disponibilità ad utilizzare apparecchiature <b>non nuove</b> ma ritenute adeguate alle esigenze dell’ufficio.',
                        height: 50,
                        width: '80%'
                    }
                ],
                buttonAlign: 'center',
                buttons:[
                    {
                        text: "Invia Richiesta",
                        formBind: true,
                        scale: 'large',
                        action: 'doRichiesta',
                        allowBlank: false,
                        style: {
                            background: "#5CC25C"
                        }
                    }
                ]
            }

        ];

        this.callParent(arguments);
    }



});
