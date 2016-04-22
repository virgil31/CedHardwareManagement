Ext.define('CL.store.S_assegnazione',{
    extend: 'Ext.data.Store',

    //autoLoad: true,
    autoSync: false,

    model: 'CL.model.M_assegnazione',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'tipo_hardware_name', direction : 'ASC' }, //lo ordiniamo per id


    proxy:{
        type:'ajax',
        api: {
            read: 'data/assegnazione/list.php',
            create: 'data/assegnazione/create.php',
            destroy: 'data/assegnazione/destroy.php',
            update: 'data/assegnazione/edit.php'
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
