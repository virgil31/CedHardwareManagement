Ext.define('CL.store.S_sede', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    autoSync: false,

    model: 'CL.model.M_sede',

    pageSize: 50,

    remoteSort: true,
    sorters: {
        property: 'sede',
        direction: 'ASC'
    }
});
