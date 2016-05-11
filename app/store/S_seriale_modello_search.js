Ext.define('CL.store.S_seriale_modello_search',{
    extend: 'Ext.data.Store',

    //autoLoad: true,
    autoSync: true,

    //model: 'CL.model.M_seriale_modello',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'seriale', direction : 'ASC' }, //lo ordiniamo per id

    proxy:{
        type:'ajax',
        api: {
            read: 'data/seriale_modello_search/list.php',
            destroy: 'data/seriale_modello_search/destroy.php',
            update: 'data/seriale_modello_search/edit.php'
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
