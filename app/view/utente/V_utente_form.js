Ext.define('CL.view.utente.V_utente_form', {
    extend: 'Ext.window.Window',
    xtype: 'utente_form',
    itemId: 'utente_form_id',
    alias: 'widget.utente_form',

    autoShow: true,
    modal: true,
    constrain: true,
    resizable: false,
    bodyStyle: 'backgroundColor: transparent',
    padding: 10,
    width: 400,

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
                        submitValue: false,
                        fieldLabel: 'Utente',
                        emptyText: 'Nome Cognome',
                        forceSelection: true,
                        allowBlank: false,
                        queryMode: 'local',
                        anyMatch: true,
                        store: 'S_utente_dominio',
                        displayField: 'cognome_nome',
                        hideTrigger: true,
                        minChars: 3,
                        listeners: {
                            select: function(combo, record){
                                this.up("form").down("textfield[name=cognome]").setValue(record.get("cognome"));
                                this.up("form").down("textfield[name=nome]").setValue(record.get("nome"));
                            }
                        }
                    },
                    {
                        xtype: 'textfield',                                     // HIDDEN
                        name: 'id_utente',
                        fieldLabel: 'id_utente',
                        readOnly: true,
                        hidden: true
                    },
                    {
                        xtype: 'textfield',                                     // HIDDEN
                        name: 'nome',
                        fieldLabel: 'Nome',
                        hidden: true
                    },
                    {
                        xtype: 'textfield',                                     // HIDDEN
                        name: 'cognome',
                        fieldLabel: 'Cognome',
                        hidden: true
                    },
                    {
                        xtype: 'checkbox',
                        name: 'funzionario',
                        fieldLabel: 'Funzionario',
                        inputValue: true,
                        uncheckedValue: false
                    },

                    {
                        xtype: 'checkbox',
                        name: 'esterno',
                        fieldLabel: 'Esterno',
                        inputValue: true,
                        uncheckedValue: false
                    },
                    {
                        xtype: 'checkbox',
                        name: 'inattivo',
                        fieldLabel: 'Inattivo',
                        inputValue: true,
                        uncheckedValue: false
                    },

                    {
                        xtype: 'textfield',
                        name: 'email',
                        fieldLabel: 'Email',
                        vtype: 'email',
                        inputValue: true,
                        uncheckedValue: false
                    },
                    {
                        xtype: 'textfield',
                        name: 'amministrazione',
                        fieldLabel: 'Amministrazione'
                    },
                    {
                        xtype: 'textareafield',
                        name: 'note',
                        fieldLabel: 'Note'
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
