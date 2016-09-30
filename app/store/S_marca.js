Ext.define('CL.store.S_marca',{
    extend: 'Ext.data.Store',

    autoLoad: false,
    autoSync: false,

    model: 'CL.model.M_marca',

    remoteSort: true,
    sorters: { property: 'marca', direction : 'ASC' }
});
