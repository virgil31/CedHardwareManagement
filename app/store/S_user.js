Ext.define('CL.store.S_user',{
    extend: 'Ext.data.Store',

    autoLoad: true,

    model: 'CL.model.M_user',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'last_name', direction : 'ASC' }, //lo ordiniamo per id


    proxy:{
        type:'ajax',
        api: {
            read: 'data/user/list.php'
            //update: 'data/us_document/edit.php',
            //destroy: 'data/us_document/destroy.php'
            //create: 'data/us/create.php',
        },

        reader:{
            type:'json',
            rootProperty:'result'
        }

        /*writer: {
            type: 'json',
            encode: true,
            root: 'data',
            writeAllFields: true
        }*/
    }

});
