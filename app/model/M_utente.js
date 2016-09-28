Ext.define('CL.model.M_utente', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',            type: 'int'},
        {name: 'nome',          type: 'string'},
        {name: 'cognome',          type: 'string'},
        {name: 'funzionario',               type: 'boolean'}
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
