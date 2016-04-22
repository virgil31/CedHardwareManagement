Ext.define('CL.controller.C_assegnazione', {
    extend: 'Ext.app.Controller',

    routes: {
        //'fatture' : 'showView'
    },

    stores: [
        'S_assegnazione'
    ],

    models: [
        'M_assegnazione'
    ],

    views: [
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({



        }, this);
    }
    /////////////////////////////////////////////////



});
