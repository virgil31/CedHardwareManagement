Ext.define('CL.store.S_stato',{
    extend: 'Ext.data.Store',

    autoLoad: true,
    autoSync: false,

    model: 'CL.model.M_stato',

    proxy: {
        type: 'rest',
        url : 'data/stato/stati.php',
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
