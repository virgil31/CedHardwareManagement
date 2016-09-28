Ext.define('CL.model.M_richiesta', {
    extend: 'Ext.data.Model',

    //idProperty: "ric_id",

    fields: [
        {name: 'ric_id',                    type: 'string'},

        {name: 'ric_cod_sede',              type: 'string'},
        {name: 'ric_destinazione',          type: 'string'},
        {name: 'ric_id_responsabile',       type: 'string'},
        {name: 'ric_id_richiedente',        type: 'string'},
        {name: 'ric_motivazione',           type: 'string'},
        {name: 'ric_oggetto',               type: 'string'},
        {name: 'ric_data_presentazione',    type: 'date', dateReadFormat: 'Y-m-d',  dateWriteFormat: 'd-m-Y'},
    ]
});
