Ext.define('CL.view.fornitore.V_create', {
    extend: 'Ext.window.Window',
    xtype: 'fornitore_create',
    itemId: 'fornitore_create_id',
    alias: 'widget.fornitore_create',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Nuovo Fornitore',

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
                                fieldLabel: 'Tipo',
                                name: 'tipo_id',
                                allowBlank: false,
                                forceSelection: true,
                                store: 'S_tipo_ditta',
                                queryMode: 'local',
                                anyMatch: true,
                                displayField: 'nome',
                                valueField: 'id',
                                editable: false
                            },
                            {
                                xtype: 'button',
                                text: '+',
                                tooltip: 'Crea e assegna',
                                listeners:{
                                    click: function(btn){
                                        Ext.widget("tipo_ditta_create",{
                                            animateTarget: btn.el,
                                            callbackOnCreated: function(){
                                                var tipi_ditta = Ext.StoreManager.lookup("S_tipo_ditta").getRange(),
                                                    tipo_ditta_creato = tipi_ditta[tipi_ditta.length-1];

                                                Ext.ComponentQuery.query("fornitore_create combobox[name=tipo_id]")[0].setValue(tipo_ditta_creato.get("id"));
                                            }
                                        });
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Indirizzo',
                        name: 'indirizzo'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Telefono',
                        name: 'telefono'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Fax',
                        name: 'fax'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Email',
                        name: 'email'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Partita IVA',
                        name: 'partita_iva'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Codice Fiscale',
                        name: 'codice_fiscale'
                    }
                ],
                buttons: [
                    {
                        text: 'Crea',
                        formBind: true,
                        action: 'do_create'
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
