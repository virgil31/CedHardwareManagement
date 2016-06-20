Ext.define('CL.model.M_cerca_per_utente', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'sede_name',             type: 'string'},
        {name: 'ufficio_name',          type: 'string'},
        {name: 'hardware_name',         type: 'string'},
        {name: 'seriale_id',            type: 'string'},
        {name: 'seriale',               type: 'string'}
    ]
});
