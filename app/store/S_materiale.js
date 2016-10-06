Ext.define('CL.store.S_materiale',{
    extend: 'Ext.data.Store',

    autoLoad: false,
    autoSync: false,

    model: 'CL.model.M_materiale',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'tipo', direction : 'ASC' }
});
