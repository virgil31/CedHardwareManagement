Ext.define('CL.model.M_stato', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'key',                       type: 'string'},
        {name: 'value',                     type: 'string'}
    ],

    proxy: {
        type: 'rest',
        url : 'data/stato/stati.php',
        reader:{
            type:'json',
            rootProperty:'result'
        }
    }
});
