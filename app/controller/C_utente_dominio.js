Ext.define('CL.controller.C_utente_dominio', {
    extend: 'Ext.app.Controller',

    stores: [
        'S_utente_dominio'
    ],
    models: [
        'M_utente_dominio'
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
