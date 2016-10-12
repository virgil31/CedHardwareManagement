Ext.define('CL.store.S_modello',{
    extend: 'Ext.data.Store',

    autoLoad: false,
    autoSync: false,

    model: 'CL.model.M_modello',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'tipo', direction : 'ASC' }
});
