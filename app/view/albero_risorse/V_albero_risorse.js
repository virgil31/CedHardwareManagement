Ext.define('CL.view.albero_risorse.V_albero_risorse', {
    extend: 'Ext.panel.Panel',
    xtype: 'albero_risorse',
    itemId: 'albero_risorse_id',
    alias: 'widget.albero_risorse',

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
                xtype: 'treepanel',
                store: 'S_albero_risorse',
                rootVisible: false,
                border: true,
                height: '98%',
                flex: 60,

                listeners: {
                    itemdblclick: function( treepanel, record, item, index, e, eOpts ){
                        if(record.get("leaf")){

                            var array_path = record.get("id").split("/"),
                                sede_id = array_path[1],
                                ufficio_id = array_path[2],
                                richiedente = array_path[3],
                                array_richiedente = richiedente.split(" "),
                                nome = array_richiedente[0],
                                cognome = array_richiedente[1];


                            /*
                            mostro la lista dei seriali assegnati a tale utente E in tale ufficio
                            */
                            Ext.StoreManager.lookup("S_seriale_modello").load({
                                params:{
                                    ufficio_id: ufficio_id,
                                    richiedente: richiedente
                                }
                            });

                            Ext.widget("seriale_modello_list_by_richiedente_ufficio",{
                                title: 'Lista Materiale Assegnato a <b>'+richiedente+"</b> nell'ufficio selezionato",
                                animateTarget: this.el
                            });
                        }
                    }
                },

                tbar: {
                    xtype: 'toolbar',
                    height: 38,
                    style: 'backgroundColor: #F5F5F5',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Indietro',
                            icon: 'resources/images/icon_back.png',
                            handler: function(){
                                CL.app.getController('C_tipo_hardware').redirectTo('home');
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'Albero Delle Risorse SSCOL Assegnate',
                            //style: 'color: #157fcc;font-size: 15px;font-weight: 300;font-family: helvetica, arial, verdana, sans-serif;line-height: 16px'
                            style: {
                                color: '#157fcc',
                                fontSize: '15px',
                                fontWeight: 'bold'
                            }
                        },
                        '->',
                        {
                            text: 'Chiudi Tutto',
                            handler: function(){
                                Ext.ComponentQuery.query("albero_risorse treepanel")[0].collapseAll();
                            }
                        }
                    ]
                },

                bbar:{
                    xtype: 'toolbar',
                    height: 60,
                    style: 'backgroundColor: #F5F5F5',
                    items: [
                        '->',
                        {
                            xtype: 'image',
                            src: 'resources/images/information.png',
                            width: 40,
                            height: 40
                        },
                        {
                            xtype: 'label',
                            html: 'Doppio click su di un utente per vedere la lista del materiale ad esso assegnato!'
                        },
                        '->'
                    ]
                }
            }
        ];

        this.callParent(arguments);

    }



});
