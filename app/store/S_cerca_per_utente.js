Ext.define('CL.store.S_cerca_per_utente',{
    extend: 'Ext.data.Store',

    //autoLoad: true,
    //autoSync: true,

    model: 'CL.model.M_cerca_per_utente',

    remoteSort: true,
    //sorters: { property: 'fornitore_name', direction : 'ASC' }, //lo ordiniamo per id


    proxy:{
        type:'ajax',
        api: {
            read: 'data/cerca_per_utente/list.php'
        },

        reader:{
            type:'json',
            rootProperty:'result'
        }
    }

});
