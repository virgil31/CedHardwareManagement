Ext.define('CL.model.M_fattura', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',                type: 'int'},

        {name: 'codice',            type: 'string'},

        {name: 'fornitore_id',      type: 'int'},
        {name: 'fornitore_name',    type: 'string'},

        {name: 'data',              type: 'string'}
    ]
});
