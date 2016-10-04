Ext.define('CL.store.S_utente_dominio',{
    extend: 'Ext.data.Store',

    autoLoad: false,
    autoSync: false,

    model: 'CL.model.M_utente_dominio',

    remoteSort: true
});
