Ext.define('CL.store.S_fornitore',{
    extend: 'Ext.data.Store',

    //autoLoad: true,
    autoSync: true,

    model: 'CL.model.M_fornitore',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'nome', direction : 'ASC' }, //lo ordiniamo per id

    proxy:{
        type:'ajax',
        api: {
            read: 'data/fornitore/list.php',
            create: 'data/fornitore/create.php',
            destroy: 'data/fornitore/destroy.php',
            update: 'data/fornitore/edit.php'
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
