Ext.define('CL.model.M_utente', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id_utente',             type: 'string'},
        {name: 'nome',                  type: 'string'},
        {name: 'cognome',               type: 'string'},
        {name: 'funzionario',           type: 'boolean'},
        {name: 'esterno',               type: 'boolean'},
        {name: 'inattivo',              type: 'boolean'},
        {name: 'email',                 type: 'string'},
        {name: 'amministrazione',       type: 'string'},
        {name: 'note',                  type: 'string'}
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
