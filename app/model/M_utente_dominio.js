Ext.define('CL.model.M_utente_dominio', {
    extend: 'Ext.data.Model',

    idProperty: 'username',

    fields: [
        {name: 'nome',                  type: 'string'},
        {name: 'cognome',               type: 'string'},
        {name: 'username',              type: 'string'}
    ],

    proxy: {
        type: 'rest',
        url : 'data/utente_dominio/utenti_dominio.php',
        reader:{
            type:'json',
            rootProperty:'result'
        }
    }
});
