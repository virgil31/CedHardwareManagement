Ext.define('CL.model.M_materiale_richiesto', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id_materiale_richiesto',        type: 'string'},
        {name: 'id_tipo',                       type: 'string'},
        {name: 'quantita',                      type: 'int'},
        {name: 'dettagli',                      type: 'string'},
        {name: 'disponibilita',                 type: 'string'},
        {name: 'note',                          type: 'string'}
    ],

    proxy: {
        type: 'rest',
        url : 'data/materiale_richiesto/materiali_richiesti.php',
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
