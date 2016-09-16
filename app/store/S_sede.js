Ext.define('CL.store.S_sede',{
    extend: 'Ext.data.Store',

    //autoLoad: true,
    autoSync: true,

    model: 'CL.model.M_generic',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'sed_descrizione', direction : 'ASC' }, //lo ordiniamo per id

    proxy:{
        type:'ajax',
        api: {
            read: 'data/sede/list.php',
            create: 'data/sede/create.php',
            destroy: 'data/sede/destroy.php',
            update: 'data/sede/edit.php'
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
