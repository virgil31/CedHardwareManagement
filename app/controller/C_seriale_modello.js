Ext.define('CL.controller.C_seriale_modello', {
    extend: 'Ext.app.Controller',

    stores: [
        'S_seriale_modello'
    ],
    models: [
        'M_seriale_modello'
    ],
    views: [
        'seriale_modello.V_list_by_modello'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({


        }, this);
    }
    /////////////////////////////////////////////////


});
