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
                        store: 'S_tipo_materiale',
                        queryMode: 'local',
                        anyMatch: true,
                        forceSelection: true,
                        valueField: 'id_tipo',
                        displayField: 'testo_per_combobox',
                        tpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '<div class="x-boundlist-item">{tipo} - <b>{marca}</b> - {modello}</div>',
                            '</tpl>'
                        ),
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '{tipo} - {marca} - {modello}',
                            '</tpl>'
                        )
                    },
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

                    /*
                    {
                        xtype: 'textfield',
                        name: 'num_fattura',
                        fieldLabel: '# Fattura'
                    },
                    {
                        xtype: 'datefield',
                        name: 'data_fattura',
                        fieldLabel: 'Data Fattura',
                        submitFormat: 'c'               //ISO 8601 date
                    },
                    {
                        xtype: 'textfield',
                        name: 'num_ddt',
                        fieldLabel: '# DDT'
                    },
                    {
                        xtype: 'datefield',
                        name: 'data_ddt',
                        fieldLabel: 'Data DDT',
                        submitFormat: 'c'               //ISO 8601 date
                    },
                    {
                        xtype: 'textfield',
                        name: 'fornitore',
                        fieldLabel: 'Fornitore',
                        allowBlank: false
                    },
                    {
                        xtype: 'textareafield',
                        name: 'note',
                        fieldLabel: 'Note'
                    }
                    */
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
