Ext.define('CL.view.richiesta.V_richiesta_form_da_esterno', {
    extend: 'Ext.panel.Panel',
    xtype: 'richiesta_form_da_esterno',
    itemId: 'richiesta_form_da_esterno_id',
    alias: 'widget.richiesta_form_da_esterno',

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
                    xtype: 'richiesta_form',
                    title: '<b>Richiesta Materiale Informatico - CED</b>'
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
