Ext.define('CL.model.M_accessorio', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'acc_id',                    type: 'string'},

        {name: 'acc_tipo',                  type: 'string'},
        {name: 'acc_marca',                 type: 'string'},
        {name: 'acc_modello',               type: 'string'},
        {name: 'acc_caratteristiche',       type: 'string'},
        {name: 'acc_quantita',              tpye: 'int'}
    ],

    proxy: {
        type: 'rest',
        url : 'data/utente/utenti.php',
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
