Ext.define('CL.model.M_fornitore', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',            type: 'int'},
        {name: 'nome',          type: 'string'},

        {name: 'tipo_id',               type: 'int'},
        {name: 'tipo_name',             type: 'string'},

        {name: 'indirizzo',             type: 'string'},
        {name: 'telefono',             type: 'string'},
        {name: 'fax',             type: 'string'},
        {name: 'email',             type: 'string'},
        {name: 'partita_iva',             type: 'string'},
        {name: 'codice_fiscale',             type: 'string'}
    ]
});
