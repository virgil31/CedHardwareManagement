Ext.define('CL.view.richiesta.V_quick_create', {
    extend: 'Ext.window.Window',
    xtype: 'richiesta_quick_create',
    itemId: 'richiesta_quick_create_id',
    alias: 'widget.richiesta_quick_create',

    autoShow: true,
    constrain: true,
    modal: true,
    title: '<b>Richiesta Materiale Informatico - CED</b>',
    width: 400,

    items:[
        {
            xtype: 'form',
            width: '100%',
            style: {
                borderRadius: "20px"
            },
            padding: 10,
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            defaults:{
                width: '95%',
                margin: '5 0 5 0'
            },
            defaults: {
                width: '95%'
            },
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Richiedente',
                    name: 'richiedente_id',
                    allowBlank: false,
                    forceSelection: true,
                    store: 'S_utente',
                    queryMode: 'local',
                    anyMatch: true,
                    displayField: 'utente_name',
                    valueField: 'id',
                    forceSelection: true
                },
                {xtype: 'menuseparator', width: '95%'},
                {
                    xtype: 'combobox',
                    name: 'sede_id',
                    fieldLabel: 'Sede',
                    store: "S_sede",
                    queryMode: 'local',
                    displayField: 'nome',
                    valueField: 'id',
                    emptyText: 'Palazzo Massimo',
                    anyMatch: true,
                    allowBlank: false,
                    forceSelection: true,
                    listeners:{
                        select: function(){
                            var sede_id = this.getValue();
                            Ext.StoreManager.lookup("S_ufficio").load({params:{sede_id: sede_id}});
                            this.up('form').down("combobox[name=ufficio_id]").enable();
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    name: 'ufficio_id',
                    fieldLabel: 'Ufficio',
                    store: "S_ufficio",
                    queryMode: 'local',
                    displayField: 'nome',
                    valueField: 'id',
                    emptyText: 'CED',
                    anyMatch: true,
                    allowBlank: false,
                    forceSelection: true,
                    disabled: true
                },
                {xtype: 'menuseparator', width: '95%'},
                {
                    xtype: 'grid',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['id','nome','note']
                    }),
                    height: 200,
                    border: true,
                    style:{
                        border: "1px solid #3892D4 !important;"
                    },
                    scrollable: true,
                    tbar: [
                        '->',
                        {
                            xtype: 'panel',
                            items:[
                                {
                                    xtype: 'button',
                                    text: '+ Aggiungi Hardware Richiesto +',
                                    style: {
                                        background: "#5CC25C"
                                    },
                                    handler: function(){
                                        var btn = this;
                                        Ext.create("Ext.window.Window",{
                                            animateTarget: btn.el,
                                            autoShow: true,
                                            modal: true,
                                            resizable: false,
                                            constrain: true,
                                            name: 'add_tipo_hardware',
                                            title: 'Aggiungi Hardware Richiesto',
                                            padding: 10,
                                            items: [
                                                {
                                                    xtype: 'form',
                                                    items:[
                                                        {
                                                            xtype: 'combobox',
                                                            name: 'tipo_hardware_id',
                                                            fieldLabel: 'Hardware',
                                                            store: "S_tipo_hardware",
                                                            queryMode: 'local',
                                                            displayField: 'nome',
                                                            valueField: 'id',
                                                            emptyText: 'Monitor',
                                                            anyMatch: true,
                                                            allowBlank: false,
                                                            forceSelection: true
                                                        }
                                                    ],
                                                    buttonAlign: 'center',
                                                    buttons:[
                                                        {
                                                            text: 'Aggiungi',
                                                            formBind: true,
                                                            handler: function(){
                                                                var window = this.up("window"),
                                                                    form = window.down("form"),
                                                                    values = form.getValues();

                                                                values.nome = Ext.ComponentQuery.query("window[name=add_tipo_hardware] combobox[name=tipo_hardware_id]")[0].getRawValue();

                                                                if(form.isValid()){
                                                                    Ext.ComponentQuery.query("richiesta_quick_create grid")[0].getStore().add({
                                                                        id: values.tipo_hardware_id,
                                                                        nome: values.nome
                                                                    });
                                                                    window.close();
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        });
                                    }
                                }
                            ]
                        },
                        '->'
                    ],
                    columns: [
                        { text: 'Tipo Materiale',       dataIndex: 'nome', flex: 1 },
                        {
                            xtype:'actioncolumn',
                            width:50,
                            items: [
                                {
                                    iconCls: 'x-fa fa-remove',
                                    tooltip: 'Rimuovi Richiesta',
                                    handler: function(grid, rowIndex, colIndex) {
                                        var rec = grid.getStore().getAt(rowIndex);
                                        grid.getStore().remove(rec);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons:[
                {
                    text: "Crea Richiesta",
                    formBind: true,
                    scale: 'large',
                    action: 'do_create',
                    allowBlank: false,
                    style: {
                        background: "#5CC25C"
                    }
                }
            ]
        }
    ]
});
