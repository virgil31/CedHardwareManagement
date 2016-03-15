Ext.define('CL.model.M_utente', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',            type: 'int'},
        {name: 'nome',          type: 'string'},
        {name: 'cognome',          type: 'string'},
        {name: 'funzionario',               type: 'boolean'}
    ]
});
