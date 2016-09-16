Ext.define('CL.view.controlla_richiesta.V_controlla_richiesta', {
    extend: 'Ext.panel.Panel',
    xtype: 'controlla_richiesta',
    itemId: 'controlla_richiesta_id',
    alias: 'widget.controlla_richiesta',

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
                //title: '<b>Verifica Stato Richiesta</b>',
                tbar: {
                    xtype: 'toolbar',
                    style: {
                        background: '#5CC25C'
                    },
                    height: 50,
                    items:[
                        '->',
                        {
                            xtype: 'label',
                            text: 'Verifica Stato Richiesta',
                            style: {
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: "25px"
                            }
                        },
                        '->'
                    ]
                },
                style: {
                    borderRadius: '10px'
                },
                width: 500,
                layout:{
                    type: 'vbox',
                    align: 'center'
                },
                defaults:{
                    margin: '7 0 7 0'
                },
                items:[
                    {
                        xtype: 'numberfield',
                        name: 'richiesta_id',
                        emptyText: 'ID della richiesta',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER){
                                    var btn = Ext.ComponentQuery.query("controlla_richiesta button[action=do_verifica]")[0];
                                    btn.fireEvent("click",btn);
                                }
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        action: 'do_verifica',
                        text: 'Verifica',
                        scale: 'medium',
                        /*style:{
                            background: '#5CC25C'
                        },*/
                        listeners:{
                            click: function(){
                                var richiesta_id = Ext.ComponentQuery.query("controlla_richiesta numberfield[name=richiesta_id]")[0].getValue();
                                if(richiesta_id == 0 || richiesta_id == null)
                                    Ext.Msg.alert("Attenzione!","Inserire un ID per procedere con la sua verifica.");

                                else{
                                    Ext.ComponentQuery.query("controlla_richiesta panel")[0].mask("Verifica in corso...");
                                    Ext.Ajax.request({
                                        url: 'data/richiesta/controlla.php',
                                        params: {
                                            richiesta_id: richiesta_id
                                        },
                                        success: function(response, opts) {
                                            Ext.ComponentQuery.query("controlla_richiesta panel")[0].unmask();

                                            var risposta = Ext.decode(response.responseText),
                                                stato = risposta.stato;

                                            Ext.ComponentQuery.query("controlla_richiesta label[name=stato]")[0].setText("#"+richiesta_id+" => "+stato);

                                            if(stato=="RIFIUTATA" || stato=="INESISTENTE"){
                                                Ext.ComponentQuery.query("controlla_richiesta label[name=stato]")[0].setStyle({
                                                    color: "red"
                                                })
                                            }
                                            else if(stato == "COMPLETATA"){
                                                Ext.ComponentQuery.query("controlla_richiesta label[name=stato]")[0].setStyle({
                                                    color: "green"
                                                })
                                            }
                                            else{
                                                Ext.ComponentQuery.query("controlla_richiesta label[name=stato]")[0].setStyle({
                                                    color: "#3892D4"
                                                })
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    },
                    {xtype: 'menuseparator',width: '95%'},
                    {
                        xtype: 'label',
                        name: 'stato',
                        text: '-',
                        style:{
                            fontWeight: "bold",
                            fontSize: "30px"
                        }
                    },
                    {xtype: 'menuseparator',width: '95%'},
                    {
                        html:   '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Interpretazione degli stati:<ul>'+
                                    '<li><b>Da Valutare</b> - In fase di valutazione da parte dei responsabili del CED.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stato neutro.</li>'+
                                    '<li><b>Rifiutata&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b> - La richiesta <i>non</i> è stata accolta e di conseguenza <i>non<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sarà elaborata</i>.</li>'+
                                    '<li><b>Accettata&nbsp;&nbsp;&nbsp;&nbsp;</b> - La richiesta è stata accolta ed è attualmente in fase <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;di elaborazione.</li>'+
                                    '<li><b>Completata</b> - Tutto il materiale richiesto è stato spedito ed arriverà a breve.</li>'+
                                '</ul>'
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
