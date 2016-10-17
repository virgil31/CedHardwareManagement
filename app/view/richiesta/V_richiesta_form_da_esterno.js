Ext.define('CL.view.richiesta.V_richiesta_form_da_esterno', {
    extend: 'Ext.panel.Panel',
    xtype: 'richiesta_form',
    itemId: 'richiesta_form_id',
    alias: 'widget.richiesta_form',

    bodyStyle: 'backgroundColor: transparent',

    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },

    initComponent: function() {
        var this_view = this;

        this_view.items = [{
            xtype: 'panel',
            bodyStyle: 'backgroundColor: transparent',

            layout: {
                type: 'hbox',
                pack: 'center'
            },

            tbar: {
                xtype: 'toolbar',
                style: {
                    background: "transparent !important"
                },
                items: [{
                        text: 'Disconnetti',
                        icon: 'resources/images/icon_logout.png',
                        scale: 'large',
                        handler: function() {
                            Ext.util.Cookies.clear("richiedente_id");
                            Ext.util.Cookies.clear("richiedente_nome");
                            Ext.util.Cookies.clear("richiedente_cognome");

                            CL.app.getController("C_richiesta").redirectTo("login");
                        }
                    },
                    '->', {
                        text: "Vai alla lista delle mie richieste",
                        icon: 'resources/images/icon_list.png',
                        scale: 'large',
                        handler: function() {
                            CL.app.getController("C_richiesta").redirectTo("controlla_richieste");
                        }
                    }
                ]
            },
            items: [

                {
                    xtype: 'form',
                    trackResetOnLoad: true,
                    title: '<b>Richiesta Materiale Informatico - CED</b>',
                    titleAlign: 'center',
                    width: 500,
                    margin: "5 5 0 0",
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    style: {
                        borderRadius: "5px"
                    },
                    defaults: {
                        width: '95%',
                        margin: '5 0 5 0'
                    },
                    items: [{
                            xtype: 'textfield', // HIDDEN
                            name: 'id_richiesta',
                            fieldLabel: 'ID (hidden)',
                            readOnly: true,
                            hidden: true
                        },

                        {
                            xtype: 'textfield', // HIDDEN
                            name: 'id_richiedente',
                            fieldLabel: 'Richiedente ID (hidden)',
                            readOnly: true,
                            hidden: true
                        }, {
                            xtype: 'textfield',
                            name: 'cognome_nome_richiedente',
                            fieldLabel: 'Richiedente',
                            readOnly: true
                        }, {
                            xtype: 'combobox',
                            name: 'stato',
                            fieldLabel: 'Stato',
                            store: "S_stato",
                            displayField: 'value',
                            valueField: 'key',
                            readOnly: true,
                            disabled: true,
                            hidden: true
                        }, {
                            xtype: 'menuseparator'
                        }, {
                            xtype: 'combobox',
                            name: 'id_responsabile',
                            allowBlank: false,
                            fieldLabel: 'Funzionario responsabile',
                            store: "S_utente",
                            queryMode: 'local',
                            anyMatch: true,
                            forceSelection: true,
                            displayField: 'utente_name',
                            valueField: 'id_utente'
                        }, {
                            xtype: 'textareafield',
                            name: 'oggetto',
                            fieldLabel: 'Oggetto della Richiesta',
                            allowBlank: false,
                            emptyText: "Stampante a Colori per l'utilizzo d'ufficio"
                        },

                        {
                            xtype: 'combobox',
                            name: 'cod_sede',
                            emptyText: 'Sede di destinazione delle componenti richieste',
                            allowBlank: false,
                            fieldLabel: 'Sede di destinazione',
                            store: "S_sede",
                            queryMode: 'local',
                            anyMatch: true,
                            forceSelection: true,
                            displayField: 'descrizione',
                            valueField: 'cod_sede'
                        }, {
                            xtype: 'textareafield',
                            name: 'destinazione',
                            fieldLabel: 'Destinazione',
                            allowBlank: false,
                            emptyText: 'Ufficio Tecnico del secondo piano'
                        }, {
                            xtype: 'textareafield',
                            name: 'motivazione',
                            fieldLabel: 'Eventuali motivazioni particolari',
                            //allowBlank: false,
                            emptyText: 'Necessità di stampare cartine e materiale a colori'
                        }
                    ],
                    buttonAlign: 'center',
                    buttons: [{
                        text: "Salva richiesta",
                        formBind: true,
                        scale: 'large',
                        action: 'doRichiesta',
                        allowBlank: false,
                        icon: 'resources/images/icon_floppy.png',
                        style: {
                            background: "#5CC25C"
                        }
                    }]
                },
                //pannello informazioni
                {
                    xtype: 'panel',
                    titleAlign: 'center',
                    title: '<i><b>Guida & Info</b></i>',
                    width: 325,
                    height: 600,
                    margin: "5 0 0 5",
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    style: {
                        borderRadius: "5px"
                    },
                    items: [{
                        xtype: 'image',
                        alt: ' ',
                        src: 'resources/images/information.png',
                        width: 65,
                        height: 60,
                        margin: '10 0 10 0'
                    }, {
                        xtype: 'label',
                        html: '<div style="text-align: center"><u><i><b>In primis, assicurarsi che nome ed email<br>del richiedente siano corretti e non generici.</b></i></u>' +
                            "<br><br>Una volta compilate le altre informazioni del<br>richiedente, passare alla richiesta del materiale<br>desiderato,  tramite apposito bottone di aggiunta.<br><u>E' possibile richiedere 1 o più elementi.</u>" +
                            "<br><br><b>NB!</b> Nel caso in cui non sia presente la <br>tipologia di hardware desiderata,<br>mettersi in contatto con il CED." +
                            "<br><br>Una volta esplicitata la motivazione e<br> la disponibilità riguardo il materiale usato,<br> confermare ed inviare la richiesta." +
                            "<br><br>Riceverà in seguito una mail di conferma/riepilogo<br> con le istruzioni per poter verificare in qualunque<br>momento lo stato della sua richiesta.</div>"
                    }, {
                        xtype: 'image',
                        alt: ' ',
                        src: 'resources/images/clippy.gif',
                        width: 90,
                        height: 80,
                        margin: '10 0 10 0'
                    }],
                    bbar: [
                        '->', {
                            xtype: 'label',
                            html: '<i>Tel. CED: Luca Cerini (51)262</i><br><i>Tel. CED: Leyle Quintero (51)312</i>'
                        },
                        '->'
                    ]
                }
            ]
        }];

        this.callParent(arguments);
    }


});
