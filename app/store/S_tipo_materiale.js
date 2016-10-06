Ext.define('CL.store.S_tipo_materiale',{
    extend: 'Ext.data.Store',

    autoLoad: false,
    autoSync: false,

    model: 'CL.model.M_tipo_materiale',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'tipo', direction : 'ASC' }
});
