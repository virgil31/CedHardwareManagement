Ext.define('CL.view.universale.V_universale_form', {
    extend: 'Ext.window.Window',
    xtype: 'universale_form',
    itemId: 'universale_form_id',
    alias: 'widget.universale_form',

    autoShow: true,
    modal: true,
    constrain: true,
    resizable: false,
    bodyStyle: 'backgroundColor: transparent',
    padding: 10,

    initComponent: function() {

        var this_view = this;
        this_view.items = [
            {
                xtype: 'richiesta_form',
                listeners:{
                    afterrender: function(){
                        this.add({
                            xtype: 'grid',
                            width: "95%",
                            height: 200,
                            store: 'S_materiale_richiesto',
                            columns: [
                                {
                                    text: 'Tipo',
                                    dataIndex: 'tipo',
                                    flex: 1
                                },
                                {
                                    text: 'Quantità',
                                    dataIndex: 'quantita',
                                    flex: 1
                                },
                                {
                                    xtype:'actioncolumn',
                                    width:50,
                                    items: [
                                        {
                                            iconCls: 'x-fa fa-edit',
                                            tooltip: 'Modifica',
                                            handler: function(grid, rowIndex, colIndex) {
                                                //var rec = grid.getStore().getAt(rowIndex);
                                                //CL.app.getController("C_acquisto").onEdit(this.el,rec);
                                                alert("todo");
                                            }
                                        },
                                        {
                                            iconCls: 'x-fa fa-remove',
                                            tooltip: 'Elimina',
                                            handler: function(grid, rowIndex, colIndex) {
                                                var rec = grid.getStore().getAt(rowIndex);
                                                Ext.StoreManager.lookup("S_materiale_richiesto").remove(rec);
                                            }
                                        }
                                    ]
                                }
                            ],
                            tbar:[
                                '->',
                                {
                                    xtype: 'button',
                                    text: '+ Aggiungi materiale richiesto',
                                    handler: function(){
                                        alert("todo");
                                    }
                                },
                                '->'
                            ]
                        });

                        //abilito e mostro la combo dello stato
                        var combo_stato = this.down("combobox[name=stato]");
                        combo_stato.show();
                        combo_stato.enable();
                        combo_stato.setReadOnly(false);

                        //rimuovo la toolbar dei bottoni del form
                        Ext.ComponentQuery.query("richiesta_form toolbar")[1].destroy();

                        //aggiungo il mio bottone
                        this.add({
                            xtype: 'button',
                            text: 'Salva',
                            formBind: true
                        });
                    }
                }
            },

        ];

        this.callParent(arguments);
    }

});
