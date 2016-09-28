Ext.define('CL.store.S_utente',{
    extend: 'Ext.data.Store',

    autoLoad: false,
    autoSync: false,

    model: 'CL.model.M_utente',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'utente_name', direction : 'ASC' }

});
