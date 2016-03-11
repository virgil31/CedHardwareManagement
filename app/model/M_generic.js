Ext.define('CL.model.M_generic', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',            type: 'int'},
        {name: 'nome',          type: 'string'},

        {name: 'sede_id',               type: 'int'},
        {name: 'sede_nome',             type: 'string'}
    ]
});
