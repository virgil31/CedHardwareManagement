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
                    itemclick: function( treepanel, record, item, index, e, eOpts ){
                        if(record.get("leaf")){
                            console.log("Foglia! ID: "+record.get("id"));
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
                            text: 'Albero Delle Risorse SSCOL',
                            //style: 'color: #157fcc;font-size: 15px;font-weight: 300;font-family: helvetica, arial, verdana, sans-serif;line-height: 16px'
                            style: {
                                color: '#157fcc',
                                fontSize: '15px',
                                fontWeight: 'bold'
                            }
                        }
                    ]
                }
            }
        ];

        this.callParent(arguments);

    }



});
