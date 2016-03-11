Ext.define('CL.controller.C_tbar', {
    extend: 'Ext.app.Controller',

    stores: [
        //
    ],
    models: [
        //
    ],
    views: [
        'tbar.V_tbar'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({
            // DO LOGOUT
            'tbar button[action=do_logout]':{
                click: this.doLogout
            }

        }, this);
    },
    /////////////////////////////////////////////////



    //DO LOGOUT
    doLogout: function () {
        Ext.util.Cookies.clear("ced_logged");        
        location.reload();
    }

});
