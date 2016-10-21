Ext.define('CL.model.M_universale', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id_richiesta',          type: 'string'},
        {name: 'cod_sede',              type: 'string'},
        {name: 'destinazione',          type: 'string'},
        {name: 'id_responsabile',       type: 'string'},
        {name: 'id_richiedente',        type: 'string'},
        {name: 'motivazione',           type: 'string'},
        {name: 'oggetto',               type: 'string'},
        {name: 'data_presentazione',    type: 'date',   serialize: null}
    ],

    proxy: {
        type: 'rest',
        url : 'data/universale/universali.php',
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
