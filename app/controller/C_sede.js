Ext.define('CL.controller.C_sede', {
    extend: 'Ext.app.Controller',

    routes: {
        'sedi' : 'showView'
    },

    stores: [
        'S_sede'
    ],
    models: [
        'M_sede'
    ],
    views: [
        //
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

        }, this);
    }
    /////////////////////////////////////////////////


});
