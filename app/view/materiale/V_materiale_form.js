Ext.define('CL.view.materiale.V_materiale_form', {
    extend: 'Ext.window.Window',
    xtype: 'materiale_form',
    itemId: 'materiale_form_id',
    alias: 'widget.materiale_form',

    autoShow: true,
    modal: true,
    constrain: true,
    resizable: false,
    bodyStyle: 'backgroundColor: transparent',
    padding: 10,
    width: 600,

    initComponent: function() {

        var this_view = this;
        Ext.StoreManager.lookup("S_tipo_materiale").load({params:{flag_full:true}});
        Ext.StoreManager.lookup("S_marca").load();
        Ext.StoreManager.lookup("S_modello").load({params:{flag_full:true}});
        Ext.StoreManager.lookup("S_acquisto").load({params:{flag_full:true}});

        this_view.items = [
            {
                xtype: 'form',
                layout:{
                    type: 'vbox',
                    align: 'center',
                },
                defaults:{
                    width: '100%'
                },
                items: [
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'vbox',
                            align: 'center'
                        },
                        bodyStyle: {
                            background: "#dbebf7"
                        },
                        defaults:{
                            width: '100%'
                        },
                        items:[
                            {
                                xtype: 'combobox',
                                name: 'id_tipo',
                                fieldLabel: 'Tipo',
                                allowBlank: false,
                                forceSelection: true,
                                queryMode: 'local',
                                anyMatch: true,
                                store: 'S_tipo_materiale',
                                displayField: 'tipo',
                                valueField: 'id_tipo',
                                listeners: {
                                    select: function(){
                                        Ext.ComponentQuery.query("materiale_form combobox[name=marca]")[0].reset();
                                        Ext.ComponentQuery.query("materiale_form combobox[name=marca]")[0].enable();

                                        Ext.ComponentQuery.query("materiale_form combobox[name=id_modello]")[0].reset();
                                        Ext.ComponentQuery.query("materiale_form combobox[name=id_modello]")[0].disable();

                                        Ext.StoreManager.lookup("S_marca").load({
                                            params:{
                                                id_tipo: this.getValue()
                                            }
                                        });
                                    }
                                }
                            },
                            {
                                xtype: 'combobox',
                                name: 'marca',
                                fieldLabel: 'Marca',
                                allowBlank: false,
                                forceSelection: true,
                                queryMode: 'local',
                                anyMatch: true,
                                store: 'S_marca',
                                displayField: 'marca',
                                valueField: 'marca',
                                disabled: true,
                                listeners: {
                                    select: function(){
                                        Ext.ComponentQuery.query("materiale_form combobox[name=id_modello]")[0].reset();
                                        Ext.ComponentQuery.query("materiale_form combobox[name=id_modello]")[0].enable();
                                        Ext.StoreManager.lookup("S_modello").load({
                                            params:{
                                                id_tipo: Ext.ComponentQuery.query("materiale_form combobox[name=id_tipo]")[0].getValue(),
                                                marca: this.getValue()
                                            }
                                        });
                                    }
                                }
                            },
                            {
                                xtype: 'combobox',
                                name: 'id_modello',
                                fieldLabel: 'Modello',
                                allowBlank: false,
                                forceSelection: true,
                                queryMode: 'local',
                                anyMatch: true,
                                store: 'S_modello',
                                displayField: 'modello',
                                valueField: 'id_modello',
                                disabled: true
                            },
                            {
                                xtype: 'button',
                                text: 'Inserisci un nuovo tipo/marca/modello',
                                width: 150,
                                margin: '0 0 5 0',
                                handler: function() {
                                    Ext.widget("modello_form", {
                                        animateTarget: this.el,
                                        azione: 'create',
                                        title: '<b>Crea nuovo modello</b>',
                                        recordSalvato: function(record) {
                                            Ext.StoreManager.lookup("S_tipo_materiale").load({params:{flag_full:true}});
                                            Ext.StoreManager.lookup("S_marca").load({
                                                params:{
                                                    id_tipo: record.get("id_tipo")
                                                }
                                            });
                                            Ext.StoreManager.lookup("S_modello").load({
                                                params:{
                                                    id_tipo: record.get("id_tipo"),
                                                    marca: record.get("marca")
                                                }
                                            });

                                            Ext.ComponentQuery.query("materiale_form combobox[name=marca]")[0].enable();
                                            Ext.ComponentQuery.query("materiale_form combobox[name=id_modello]")[0].enable();

                                            Ext.ComponentQuery.query("materiale_form combobox[name=id_tipo]")[0].setValue(record.get("id_tipo"));
                                            Ext.ComponentQuery.query("materiale_form combobox[name=marca]")[0].setValue(record.get("marca"));
                                            Ext.ComponentQuery.query("materiale_form combobox[name=id_modello]")[0].setValue(record.get("id_modello"));


                                        }
                                    });

                                    var id_tipo =  Ext.ComponentQuery.query("materiale_form combobox[name=id_tipo]")[0].getValue(),
                                        marca = Ext.ComponentQuery.query("materiale_form combobox[name=marca]")[0].getValue();

                                    if(id_tipo) {
                                        Ext.ComponentQuery.query("modello_form combobox[name=id_tipo]")[0].setValue(id_tipo);
                                    }
                                    if(marca) {
                                        Ext.ComponentQuery.query("modello_form textfield[name=marca]")[0].setValue(marca);
                                    }
                                }
                            }
                        ]
                    },
                    {xtype: 'menuseparator'},
                    {
                        xtype: 'textfield',
                        name: 'seriale',
                        fieldLabel: 'Seriale',
                        allowBlank: false
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        margin: '0 0 5 0',
                        items: [
                            {
                                xtype: 'combobox',
                                name: 'id_acquisto',
                                flex: 10,
                                fieldLabel: 'Acquisto',
                                store: 'S_acquisto',
                                queryMode: 'local',
                                anyMatch: true,
                                forceSelection: true,
                                valueField: 'id_acquisto',
                                displayField: 'testo_per_combobox',
                                tpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '<div class="x-boundlist-item"><b>{fornitore} - Fattura #{num_fattura}</b> del <i>{data_fattura:date("d-m-Y")}</i></div>',
                                    '</tpl>'
                                ),
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '{fornitore} - Fattura #{num_fattura} del {data_fattura:date("d-m-Y")}',
                                    '</tpl>'
                                )
                            },
                            {
                                xtype: 'button',
                                text: '+',
                                flex: 0.5,
                                handler: function() {
                                    Ext.widget("acquisto_form", {
                                        animateTarget: this.el,
                                        azione: 'create',
                                        title: '<b>Crea nuovo acquisto</b>',
                                        recordSalvato: function(record) {
                                            Ext.StoreManager.lookup("S_acquisto").load({
                                                params:{
                                                    flag_full:true
                                                },
                                                callback: function() {
                                                    Ext.ComponentQuery.query("materiale_form combobox[name=id_acquisto]")[0].setValue(record.get("id_acquisto"));
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'textareafield',
                        name: 'caratteristiche',
                        fieldLabel: 'Caratteristiche'
                    },
                    {
                        xtype: 'textfield',
                        name: 'collocazione',
                        fieldLabel: 'Collocazione'
                    },
                    {
                        xtype: 'textfield',
                        name: 'stato',
                        fieldLabel: 'Stato'
                    },
                    {
                        xtype: 'textareafield',
                        name: 'note',
                        fieldLabel: 'Note'
                    },
                    {
                        xtype: 'checkbox',
                        name: 'non_funzionante',
                        fieldLabel: 'Non funzionante',
                        inputValue: true,
                        uncheckedValue: false,
                        width: "25%"
                    },
                    {
                        xtype: 'checkbox',
                        name: 'dismesso',
                        fieldLabel: 'Dismesso',
                        inputValue: true,
                        uncheckedValue: false,
                        width: "25%"
                    },
                    {
                        xtype: 'checkbox',
                        name: 'smaltito',
                        fieldLabel: 'Smaltito',
                        inputValue: true,
                        uncheckedValue: false,
                        width: "25%"
                    },
                    {
                        xtype: 'checkbox',
                        name: 'non_trovato',
                        fieldLabel: 'Non Trovato',
                        inputValue: true,
                        uncheckedValue: false,
                        width: "25%"
                    },
                    {
                        xtype: 'checkbox',
                        name: 'smarrito_rubato',
                        fieldLabel: 'Smarrito/Rubato',
                        inputValue: true,
                        uncheckedValue: false,
                        width: "25%"
                    }
                ],
                buttonAlign: 'center',
                buttons: [
                    {
                        text: 'Salva',
                        formBind: true,
                        action: 'save'
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
