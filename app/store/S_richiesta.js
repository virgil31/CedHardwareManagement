Ext.define('CL.store.S_richiesta',{
    extend: 'Ext.data.Store',

    autoLoad: true,
    autoSync: false,

    model: 'CL.model.M_richiesta',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'richiesta_il', direction : 'DESC' }, //lo ordiniamo per id


    proxy:{
        type:'ajax',
        api: {
            read: 'data/richiesta/list.php',
            create: 'data/richiesta/create.php',
            destroy: 'data/richiesta/destroy.php',
            update: 'data/richiesta/edit.php'
        },

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
