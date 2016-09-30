Ext.define('CL.store.S_accessorio',{
    extend: 'Ext.data.Store',

    autoLoad: false,
    autoSync: false,

    model: 'CL.model.M_accessorio',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'acc_tipo', direction : 'ASC' }
});
