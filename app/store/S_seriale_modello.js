Ext.define('CL.store.S_seriale_modello',{
    extend: 'Ext.data.Store',

    //autoLoad: true,
    autoSync: true,

    model: 'CL.model.M_seriale_modello',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'seriale', direction : 'ASC' }, //lo ordiniamo per id

    proxy:{
        type:'ajax',
        api: {
            read: 'data/seriale_modello/list.php',
            create: 'data/seriale_modello/create.php',
            destroy: 'data/seriale_modello/destroy.php',
            update: 'data/seriale_modello/edit.php'
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
