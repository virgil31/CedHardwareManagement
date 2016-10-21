Ext.define('CL.controller.C_materiale_richiesto', {
    extend: 'Ext.app.Controller',

    stores: [
        'S_materiale_richiesto'
    ],
    models: [
        'M_materiale_richiesto'
    ],

    /////////////////////////////////////////////////
    init: function() {
        this.control({

        }, this);
    }
    /////////////////////////////////////////////////

});
