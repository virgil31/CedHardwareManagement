Ext.define('CL.store.S_ufficio',{
    extend: 'Ext.data.Store',

    //autoLoad: true,
    autoSync: true,

    model: 'CL.model.M_generic',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'nome', direction : 'ASC' }, //lo ordiniamo per id


    proxy:{
        type:'ajax',
        api: {
            read: 'data/ufficio/list.php',
            create: 'data/ufficio/create.php',
            destroy: 'data/ufficio/destroy.php',
            update: 'data/ufficio/edit.php'
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
