Ext.define('CL.model.M_materiale', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id_materiale',                  type: 'string'},
        {name: 'id_modello',                    type: 'string'},
        {name: 'id_acquisto',                   type: 'string'},

        {name: 'seriale',                       type: 'string'},
        {name: 'caratteristiche',               type: 'string'},
        {name: 'collocazione',                  type: 'string'},

        {name: 'stato',                         type: 'string'},
        {name: 'note',                          type: 'string'},

        {name: 'non_funzionante',               type: 'boolean'},
        {name: 'dismesso',                      type: 'boolean'},
        {name: 'smaltito',                      type: 'boolean'},
        {name: 'non_trovato',                   type: 'boolean'},
        {name: 'smarrito_rubato',               type: 'boolean'},

        // info da "modelli"
        {name: 'id_tipo',                       type: 'string'},
        {name: 'tipo',                          type: 'string'},
        {name: 'marca',                         type: 'string'},
        {name: 'modello',                       type: 'string'}
    ],

    proxy: {
        type: 'rest',
        url : 'data/materiale/materiali.php',
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
