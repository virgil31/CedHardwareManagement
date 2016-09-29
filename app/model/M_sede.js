Ext.define('CL.model.M_sede', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'sed_cod_sede',                          type: 'string'},
        {name: 'sed_descrizione',                       type: 'string'},
        {name: 'sed_note',                              type: 'string'}
    ],

    proxy: {
        type: 'rest',
        url : 'data/sede/sedi.php',
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
