Ext.define('CL.store.S_tipo_hardware',{
    extend: 'Ext.data.Store',

    autoLoad: true,
    autoSync: true,

    model: 'CL.model.M_generic',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'nome', direction : 'ASC' }, //lo ordiniamo per id


    proxy:{
        type:'ajax',
        api: {
            read: 'data/tipo_hardware/list.php',
            create: 'data/tipo_hardware/create.php',
            destroy: 'data/tipo_hardware/destroy.php',
            update: 'data/tipo_hardware/edit.php'
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
