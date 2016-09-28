Ext.define('CL.store.S_sede',{
    extend: 'Ext.data.Store',

    autoLoad: false,
    autoSync: false,

    model: 'CL.model.M_sede',

    remoteSort: true,
    sorters: { property: 'sed_descrizione', direction : 'ASC' },

    proxy: {
        type: 'rest',
        url : 'data/sede/sedi.php',
        reader:{
            type:'json',
            rootProperty:'result'
        },
        writer: {
            type: 'json',
            encode: true,
            rootProperty: 'data',
            writeAllFields: true
        }
    }
});
