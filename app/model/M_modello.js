Ext.define('CL.model.M_modello', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id_modello',            type: 'string'},

        {name: 'id_tipo',               type: 'string'},
        {name: 'tipo',                  type: 'string'},

        {name: 'marca',                 type: 'string'},
        {name: 'modello',               type: 'string'},
        {name: 'caratteristiche',       type: 'string'},
        {name: 'note',                  tpye: 'string'}
    ],

    proxy: {
        type: 'rest',
        url : 'data/modello/modelli.php',
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
