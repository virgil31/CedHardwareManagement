Ext.define('CL.model.M_materiale', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id_materiale',                  type: 'string'},
        {name: 'id_tipo',                       type: 'string'},
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

        // info da "tipi_materiale"
        {name: 'tipo',                          type: 'string'},
        {name: 'marca',                         type: 'string'},
        {name: 'modello',                       type: 'string'},
        {name: 'caratteristiche_tipo',          type: 'string'},
        {name: 'note_tipo',                     type: 'string'},

        //info da "acquisti"
        {name: 'num_fattura',                   type: 'string'},
        {name: 'data_fattura',                  type: 'date',   serialize: null},
        {name: 'num_ddt',                       type: 'string'},
        {name: 'data_ddt',                      type: 'date',   serialize: null},
        {name: 'fornitore',                     type: 'string'},
        {name: 'note_acquisto',                 type: 'string'}
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
