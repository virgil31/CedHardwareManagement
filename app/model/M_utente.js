Ext.define('CL.model.M_utente', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ute_id',                    type: 'string'},

        {name: 'ute_nome',                  type: 'string'},
        {name: 'ute_cognome',               type: 'string'},
        {name: 'ute_funzionario',           type: 'boolean'}
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
