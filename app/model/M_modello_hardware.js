Ext.define('CL.model.M_modello_hardware', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',            type: 'int'},
        {name: 'nome',          type: 'string'},

        {name: 'tipo_id',               type: 'int'},
        {name: 'tipo_name',             type: 'string'},

        {name: 'marca_id',               type: 'int'},
        {name: 'marca_name',             type: 'string'}
    ]
});
