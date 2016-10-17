Ext.define('CL.view.richiesta.V_richiesta_form', {
    extend: 'Ext.form.Panel',
    xtype: 'richiesta_form',
    itemId: 'richiesta_form_id',
    alias: 'widget.richiesta_form',

    buttonAlign: 'center',
    trackResetOnLoad: true,
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

    initComponent: function() {

        //carico gli store usati nel form adeguatamente
        Ext.StoreManager.lookup("S_sede").load({params: {flag_full: true} });
        Ext.StoreManager.lookup("S_utente").load({params: {flag_full: true} });

        var this_view = this;

        this_view.items = [
            {
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
            },
            {
                xtype: 'textfield',
                name: 'cognome_nome_richiedente',
                fieldLabel: 'Richiedente',
                readOnly: true
            },
            {
                xtype: 'combobox',
                name: 'stato',
                fieldLabel: 'Stato',
                store: "S_stato",
                displayField: 'value',
                valueField: 'key',
                readOnly: true,
                disabled: true,
                hidden: true
            },
            {
                xtype: 'menuseparator'
            },
            {
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
            },
            {
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
                displayField: 'sede',
                valueField: 'cod_sede'
            },
            {
                xtype: 'textareafield',
                name: 'destinazione',
                fieldLabel: 'Destinazione',
                allowBlank: false,
                emptyText: 'Ufficio Tecnico del secondo piano'
            },
            {
                xtype: 'textareafield',
                name: 'motivazione',
                fieldLabel: 'Eventuali motivazioni particolari',
                //allowBlank: false,
                emptyText: 'Necessità di stampare cartine e materiale a colori'
            }
        ];

        this_view.buttons = [
            {
                text: "Salva richiesta",
                formBind: true,
                scale: 'large',
                action: 'doRichiesta',
                allowBlank: false,
                icon: 'resources/images/icon_floppy.png',
                style: {
                    background: "#5CC25C"
                }
            }
        ];

        this.callParent(arguments);
    }

});
