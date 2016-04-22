Ext.define('CL.model.M_richiesta', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',                    type: 'int'},

        {name: 'nome',                  type: 'string'},
        {name: 'cognome',               type: 'string'},
        {name: 'full_nome',             type: 'string'},

        {name: 'funzionario_id',        type: 'int'},
        {name: 'funzionario_name',      type: 'string'},

        {name: 'email',                 type: 'string'},

        {name: 'sede_id',               type: 'int'},
        {name: 'sede_name',             type: 'string'},

        {name: 'ufficio_id',            type: 'int'},
        {name: 'ufficio_name',          type: 'string'},

        {name: 'servizio',              type: 'string'},
        {name: 'motivazione',           type: 'string'},

        {name: 'disponibile_per_usato', type: 'string'},
        {name: 'richiesta_il',          type: 'string'},
        {name: 'consegnata_il',         type: 'string'}
    ]
});
