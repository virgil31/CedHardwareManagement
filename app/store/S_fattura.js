Ext.define('CL.store.S_fattura',{
    extend: 'Ext.data.Store',

    //autoLoad: true,
    autoSync: true,

    model: 'CL.model.M_fattura',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'fornitore_name', direction : 'ASC' }, //lo ordiniamo per id


    proxy:{
        type:'ajax',
        api: {
            read: 'data/fattura/list.php',
            create: 'data/fattura/create.php',
            destroy: 'data/fattura/destroy.php',
            update: 'data/fattura/edit.php'
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
