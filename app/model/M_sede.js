Ext.define('CL.model.M_sede', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'cod_sede',                          type: 'string'},
        {name: 'descrizione',                       type: 'string'},
        {name: 'note',                              type: 'string'}
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
