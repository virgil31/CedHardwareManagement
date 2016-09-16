Ext.define('CL.view.ufficio.V_create', {
    extend: 'Ext.window.Window',
    xtype: 'ufficio_create',
    itemId: 'ufficio_create_id',
    alias: 'widget.ufficio_create',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Nuovo Ufficio',

    padding: 10,

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Nome',
                        name: 'nome',
                        allowBlank: false
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        margin: '0 0 5 0',
                        items:[
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Sede',
                                name: 'sede_id',
                                allowBlank: false,
                                forceSelection: true,
                                store: 'S_sede',
                                queryMode: 'local',
                                anyMatch: true,
                                displayField: 'nome',
                                valueField: 'id'
                            },
                            {
                                xtype: 'button',
                                text: '+',
                                tooltip: 'Crea e assegna',
                                listeners:{
                                    click: function(btn){
                                        Ext.widget("sede_create",{
                                            animateTarget: btn.el,
                                            callbackOnCreated: function(){
                                                var sedi = Ext.StoreManager.lookup("S_sede").getRange(),
                                                    sede_creata = sedi[sedi.length-1];

                                                Ext.ComponentQuery.query("ufficio_create combobox[name=sede_id]")[0].setValue(sede_creata.get("id"));
                                            }
                                        });
                                    }
                                }
                            }
                        ]
                    }

                ],
                buttons: [
                    {
                        text: 'Crea',
                        action: 'do_create'
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
