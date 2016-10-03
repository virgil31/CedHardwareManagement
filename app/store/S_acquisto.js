Ext.define('CL.store.S_acquisto',{
    extend: 'Ext.data.Store',

    autoLoad: false,
    autoSync: false,

    model: 'CL.model.M_acquisto',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'num_fattura', direction : 'ASC' }
});
