Ext.define('CL.model.M_assegnazione', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',                type: 'int'},

        {name: 'richiesta_id',      type: 'int'},
        {name: 'richiesta_name',    type: 'string'},

        {name: 'tipo_hardware_id',      type: 'int'},
        {name: 'tipo_hardware_name',    type: 'string'},

        {name: 'note',                  type: 'string'},


        {name: 'seriale_id',            type: 'int'},
        {name: 'seriale_name',          type: 'string'}
    ]
});
