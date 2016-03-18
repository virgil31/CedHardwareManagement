Ext.define('CL.model.M_seriale_modello', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',            type: 'int'},
        {name: 'seriale',          type: 'string'},

        {name: 'modello_id',               type: 'int'},
        {name: 'modello_name',             type: 'string'},

        {name: 'fattura_id',               type: 'int'},
        {name: 'fattura_name',             type: 'string'}
    ]
});
