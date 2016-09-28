Ext.define('CL.store.S_richiesta',{
    extend: 'Ext.data.Store',

    autoLoad: false,
    autoSync: false,

    model: 'CL.model.M_richiesta',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'ric_numero', direction : 'DESC' }

});
