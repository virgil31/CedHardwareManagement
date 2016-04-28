Ext.define('CL.view.richiesta.V_quick_create', {
    extend: 'Ext.window.Window',
    xtype: 'richiesta_quick_create',
    itemId: 'richiesta_quick_create_id',
    alias: 'widget.richiesta_quick_create',

    autoShow: true,
    constrain: true,
    modal: true,
    title: '<b>Richiesta Materiale Informatico - CED</b>',
    width: 600,

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
            items: [

                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items:[
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
                            forceSelection: true,
                            width: '95%'
                        },
                        {
                            xtype: 'button',
                            text: '+',
                            tooltip: 'Crea e assegna',
                            listeners:{
                                click: function(btn){
                                    Ext.widget("utente_create",{
                                        animateTarget: btn.el,
                                        callbackOnCreated: function(){
                                            var records = Ext.StoreManager.lookup("S_utente").getRange(),
                                                record_created = records[records.length-1];

                                            Ext.ComponentQuery.query("richiesta_quick_create combobox[name=richiedente_id]")[0].getStore().reload();
                                            Ext.ComponentQuery.query("richiesta_quick_create combobox[name=richiedente_id]")[0].setValue(record_created.get("id"));
                                        }
                                    });
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items:[
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
                            width: '95%',
                            listeners:{
                                select: function(){
                                    var sede_id = this.getValue();
                                    Ext.StoreManager.lookup("S_ufficio").load({params:{sede_id: sede_id}});
                                    this.up('form').down("combobox[name=ufficio_id]").enable();
                                    this.up('form').down("button[action=ufficio_crea_assegna]").enable();

                                }
                            }
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
                                            var records = Ext.StoreManager.lookup("S_sede").getRange(),
                                                record_created = records[records.length-1];

                                            Ext.ComponentQuery.query("richiesta_quick_create combobox[name=richiedente_id]")[0].getStore().reload();
                                            Ext.ComponentQuery.query("richiesta_quick_create combobox[name=richiedente_id]")[0].setValue(record_created.get("id"));
                                        }
                                    });
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items:[
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
                            disabled: true,
                            width: '95%'
                        },
                        {
                            xtype: 'button',
                            text: '+',
                            tooltip: 'Crea e assegna',
                            action: 'ufficio_crea_assegna',
                            disabled: true,
                            listeners:{
                                click: function(btn){
                                    Ext.widget("ufficio_create",{
                                        animateTarget: btn.el,
                                        callbackOnCreated: function(){
                                            var records = Ext.StoreManager.lookup("S_ufficio").getRange(),
                                                record_created = records[records.length-1];

                                            Ext.ComponentQuery.query("richiesta_quick_create combobox[name=ufficio_id]")[0].getStore().reload();
                                            Ext.ComponentQuery.query("richiesta_quick_create combobox[name=ufficio_id]")[0].setValue(record_created.get("id"));
                                        }
                                    });
                                    var sede_id = Ext.ComponentQuery.query("richiesta_quick_create combobox[name=sede_id]")[0].getValue();
                                    Ext.ComponentQuery.query("ufficio_create combobox[name=sede_id]")[0].setValue(sede_id);
                                    Ext.ComponentQuery.query("ufficio_create combobox[name=sede_id]")[0].readOnly = true;
                                }
                            }
                        }
                    ]
                },
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
                                    text: '+ Aggiungi Hardware +',
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
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            margin: '0 0 5 0',
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
                                                                    forceSelection: true,
                                                                    listeners: {
                                                                        select: function(combo, record){
                                                                            var tipo_hardware_id = record.get("id");

                                                                            Ext.StoreManager.lookup("S_modello_hardware").load({
                                                                                params:{
                                                                                    tipo_hardware_id: tipo_hardware_id
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    text: '+',
                                                                    tooltip: 'Crea e assegna',
                                                                    listeners:{
                                                                        click: function(btn){
                                                                            Ext.widget("tipo_hardware_create",{
                                                                                animateTarget: btn.el,
                                                                                callbackOnCreated: function(){
                                                                                    var records = Ext.StoreManager.lookup("S_tipo_hardware").getRange(),
                                                                                        record_created = records[records.length-1];

                                                                                    Ext.ComponentQuery.query("window[name=add_tipo_hardware] combobox[name=tipo_hardware_id]")[0].getStore().reload();
                                                                                    Ext.ComponentQuery.query("window[name=add_tipo_hardware] combobox[name=tipo_hardware_id]")[0].setValue(record_created.get("id"));
                                                                                    Ext.StoreManager.lookup("S_modello_hardware").load({
                                                                                        params:{
                                                                                            tipo_hardware_id: record_created.get("id")
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            margin: '0 0 5 0',
                                                            items:[
                                                                {
                                                                    xtype: 'combobox',
                                                                    fieldLabel: 'Modello',
                                                                    name: 'modello_id',
                                                                    allowBlank: false,
                                                                    forceSelection: true,
                                                                    store: 'S_modello_hardware',
                                                                    queryMode: 'local',
                                                                    anyMatch: true,
                                                                    displayField: 'nome',
                                                                    valueField: 'id',
                                                                    //editable: false,
                                                                    listeners: {
                                                                        select: function(combo, record){
                                                                            var modello_id = record.get("id");

                                                                            Ext.StoreManager.lookup("S_seriale_modello").load({
                                                                                params:{
                                                                                    solo_disponibili: true,
                                                                                    modello_id: modello_id
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    text: '+',
                                                                    tooltip: 'Crea e assegna',
                                                                    listeners:{
                                                                        click: function(btn){
                                                                            Ext.widget("modello_hardware_create",{
                                                                                animateTarget: btn.el,
                                                                                callbackOnCreated: function(){
                                                                                    var records = Ext.StoreManager.lookup("S_modello_hardware").getRange(),
                                                                                        record_created = records[records.length-1];

                                                                                    Ext.ComponentQuery.query("window[name=add_tipo_hardware] combobox[name=modello_id]")[0].getStore().reload();
                                                                                    Ext.ComponentQuery.query("window[name=add_tipo_hardware] combobox[name=modello_id]")[0].setValue(record_created.get("id"));

                                                                                    Ext.Msg.alert("Attenzione!","Il modello è stato creato, ma per poterlo selezionare bisogna prima associargli <b>ALMENO UN SERIALE</b>.")
                                                                                }
                                                                            });
                                                                            var tipo_id = Ext.ComponentQuery.query("window[name=add_tipo_hardware] combobox[name=tipo_hardware_id]")[0].getValue();
                                                                            Ext.ComponentQuery.query("modello_hardware_create combobox[name=tipo_id]")[0].setValue(tipo_id);
                                                                            //Ext.ComponentQuery.query("modello_hardware_create combobox[name=tipo_id]")[0].readOnly = true;
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            margin: '0 0 5 0',
                                                            items:[
                                                                {
                                                                    xtype: 'combobox',
                                                                    fieldLabel: 'Seriale',
                                                                    name: 'seriale_id',
                                                                    allowBlank: false,
                                                                    forceSelection: true,
                                                                    store: 'S_seriale_modello',
                                                                    queryMode: 'local',
                                                                    anyMatch: true,
                                                                    displayField: 'seriale',
                                                                    valueField: 'id',
                                                                    editable: false
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    text: '+',
                                                                    tooltip: 'Crea e assegna',
                                                                    listeners:{
                                                                        click: function(btn){
                                                                            Ext.widget("seriale_modello_create",{
                                                                                animateTarget: btn.el,
                                                                                callbackOnCreated: function(){
                                                                                    var records = Ext.StoreManager.lookup("S_seriale_modello").getRange(),
                                                                                        record_created = records[records.length-1];

                                                                                    Ext.ComponentQuery.query("window[name=add_tipo_hardware] combobox[name=seriale_id]")[0].getStore().reload();
                                                                                    Ext.ComponentQuery.query("window[name=add_tipo_hardware] combobox[name=seriale_id]")[0].setValue(record_created.get("id"));

                                                                                    Ext.ComponentQuery.query("window[name=add_tipo_hardware] combobox[name=modello_id]")[0].getStore().reload();
                                                                                }
                                                                            });
                                                                            Ext.ComponentQuery.query("seriale_modello_create combobox[name=modello_id]")[0].getStore().load({
                                                                                params:{
                                                                                    flag_full: true,
                                                                                    tipo_hardware_id: Ext.ComponentQuery.query("window[name=add_tipo_hardware] combobox[name=tipo_hardware_id]")[0].getValue()
                                                                                }
                                                                            });
                                                                            var modello_id = Ext.ComponentQuery.query("window[name=add_tipo_hardware] combobox[name=modello_id]")[0].getValue();
                                                                            Ext.ComponentQuery.query("seriale_modello_create combobox[name=modello_id]")[0].setValue(modello_id);
                                                                            //Ext.ComponentQuery.query("modello_hardware_create combobox[name=tipo_id]")[0].readOnly = true;
                                                                        }
                                                                    }
                                                                }
                                                            ]
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

                                                                values.tipo_nome = Ext.ComponentQuery.query("window[name=add_tipo_hardware] combobox[name=tipo_hardware_id]")[0].getRawValue();
                                                                values.modello_nome = Ext.ComponentQuery.query("window[name=add_tipo_hardware] combobox[name=modello_id]")[0].getRawValue();
                                                                values.seriale_nome = Ext.ComponentQuery.query("window[name=add_tipo_hardware] combobox[name=seriale_id]")[0].getRawValue();

                                                                if(form.isValid()){
                                                                    Ext.ComponentQuery.query("richiesta_quick_create grid")[0].getStore().add({
                                                                        tipo_id: values.tipo_hardware_id,
                                                                        tipo_nome: values.tipo_nome,
                                                                        modello_nome: values.modello_nome,
                                                                        seriale_id: values.seriale_id,
                                                                        seriale: values.seriale_nome
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
                        { text: 'Tipo Materiale',       dataIndex: 'tipo_nome', flex: 1 },
                        { text: 'Modello',              dataIndex: 'modello_nome', flex: 1 },
                        { text: 'Seriale',              dataIndex: 'seriale', flex: 1},
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
