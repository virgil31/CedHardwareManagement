Ext.define('CL.store.S_marca_hardware',{
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
            read: 'data/marca_hardware/list.php',
            create: 'data/marca_hardware/create.php',
            destroy: 'data/marca_hardware/destroy.php',
            update: 'data/marca_hardware/edit.php'
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
