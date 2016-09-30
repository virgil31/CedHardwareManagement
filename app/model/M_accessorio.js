Ext.define('CL.model.M_accessorio', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id_accessorio',         type: 'string'},

        {name: 'tipo',                  type: 'string'},
        {name: 'marca',                 type: 'string'},
        {name: 'modello',               type: 'string'},
        {name: 'caratteristiche',       type: 'string'},
        {name: 'note',                  tpye: 'string'},
        {name: 'quantita',              tpye: 'int'}
    ],

    proxy: {
        type: 'rest',
        url : 'data/accessorio/accessori.php',
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
