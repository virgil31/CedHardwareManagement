Ext.define('CL.store.S_materiale_richiesto',{
    extend: 'Ext.data.Store',

    autoLoad: false,
    autoSync: false,

    model: 'CL.model.M_materiale_richiesto',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'tipo', direction : 'ASC' }
});
