Ext.define('CL.view.seriale_modello.V_list_by_richiedente_ufficio', {
    extend: 'Ext.window.Window',
    xtype: 'seriale_modello_list_by_richiedente_ufficio',
    itemId: 'seriale_modello_list_by_richiedente_ufficio_id',
    alias: 'widget.seriale_modello_list_by_richiedente_ufficio',

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    /*layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },*/

    layout: 'fit',

    autoShow: true,
    constrain: true,
    modal: true,

    height: 500,
    width: 750,
    title: 'Lista Materiale Assegnato a',

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'grid',
                viewConfig: {
                    enableTextSelection: true
                },
                border: true,
                store: 'S_seriale_modello',

                //height: 470,
                overflowX: 'hidden',
                overflowY: 'auto',

                disableSelection: true,

                columns: [
                    {
                        text: 'Tipo',
                        dataIndex: 'tipo_name',
                        flex: 1,
                        sortable: false
                    },
                    {
                        text: 'Marca',
                        dataIndex: 'marca_name',
                        flex: 1,
                        sortable: false
                    },
                    {
                        text: 'Modello',
                        dataIndex: 'modello_name',
                        flex: 1,
                        sortable: false
                    },
                    {
                        text: 'Seriale',
                        dataIndex: 'seriale',
                        flex: 1.8,
                        sortable: false
                    },

                    {
                        text: 'Fattura',
                        dataIndex: 'fattura_name',
                        flex: 1,
                        sortable: false/*,
                        renderer: function (value, metaData, record) {
                            return '<a href="#" onclick="CL.app.getController(\'C_fattura\').onEditById(this,'+record.get('fattura_id')+');return false;">'+value+'</a>';
                        }*/
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
