Ext.define('CL.model.M_marca', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'marca',         type: 'string'}
    ],

    proxy: {
        type: 'rest',
        url : 'data/marca/marche.php',
        reader:{
            type:'json',
            rootProperty:'result'
        }
    }
});
