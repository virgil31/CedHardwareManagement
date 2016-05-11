Ext.define('CL.store.S_albero_risorse',{
    extend: 'Ext.data.TreeStore',

    proxy: {
        type: 'ajax',
        url: 'data/albero_risorse/get-nodes.php'
    },
    root: {
        text: 'SSCOL',
        id: 'root',
        expanded: true
    },
    folderSort: true

    /*,
    sorters: [{
        property: 'nome',
        direction: 'ASC'
    }]*/

});
