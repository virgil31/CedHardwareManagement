Ext.define('CL.model.M_acquisto', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id_acquisto',           type: 'string'},

        {name: 'num_fattura',           type: 'string'},
        {name: 'data_fattura',          type: 'string'},
        {name: 'num_ddt',               type: 'string'},
        {name: 'data_ddt',              type: 'string'},
        {name: 'fornitore',             type: 'string'},
        {name: 'note',                  type: 'string'}
    ],

    proxy: {
        type: 'rest',
        url : 'data/acquisto/acquisti.php',
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
