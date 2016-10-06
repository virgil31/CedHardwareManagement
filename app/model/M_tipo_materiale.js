Ext.define('CL.model.M_tipo_materiale', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id_tipo',                       type: 'string'},
        {name: 'tipo',                          type: 'string'},
        {name: 'marca',                         type: 'string'},
        {name: 'modello',                       type: 'string'},
        {name: 'caratteristiche',               type: 'string'},
        {name: 'note',                          type: 'string'}
    ],

    proxy: {
        type: 'rest',
        url : 'data/tipo_materiale/tipi_materiale.php',
        reader:{
            type:'json',
            rootProperty:'result'
        },
        writer: {
            type: 'json',
            encode: true,
            rootProperty: 'data',
            writeAllFields: true
        }
    }
});
