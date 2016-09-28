Ext.define('CL.store.S_sede',{
    extend: 'Ext.data.Store',

    autoLoad: false,
    autoSync: false,

    model: 'CL.model.M_sede',

    remoteSort: true,
    sorters: { property: 'sed_descrizione', direction : 'ASC' }
});
