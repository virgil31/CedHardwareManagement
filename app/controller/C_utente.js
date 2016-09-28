Ext.define('CL.controller.C_utente', {
    extend: 'Ext.app.Controller',

    routes: {
        'utenti' : 'showView'
    },

    stores: [
        'S_utente'
    ],
    models: [
        'M_utente'
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
