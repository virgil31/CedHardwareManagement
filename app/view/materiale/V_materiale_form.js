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
                defaults:{
                    width: '100%'
                },
                items: [
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
                    {xtype: 'menuseparator'},
                    {
                        xtype: 'textfield',
                        name: 'seriale',
                        fieldLabel: 'Seriale',
                        allowBlank: false
                    },
                    {
                        xtype: 'combobox',
                        name: 'id_acquisto',
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
                        uncheckedValue: false
                    },
                    {
                        xtype: 'checkbox',
                        name: 'dismesso',
                        fieldLabel: 'Dismesso',
                        inputValue: true,
                        uncheckedValue: false
                    },
                    {
                        xtype: 'checkbox',
                        name: 'smaltito',
                        fieldLabel: 'Smaltito',
                        inputValue: true,
                        uncheckedValue: false
                    },
                    {
                        xtype: 'checkbox',
                        name: 'non_trovato',
                        fieldLabel: 'Non Trovato',
                        inputValue: true,
                        uncheckedValue: false
                    },
                    {
                        xtype: 'checkbox',
                        name: 'smarrito_rubato',
                        fieldLabel: 'Smarrito/Rubato',
                        inputValue: true,
                        uncheckedValue: false
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
