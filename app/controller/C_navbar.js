Ext.define('CL.controller.C_navbar', {
    extend: 'Ext.app.Controller',

    stores: [
        //
    ],
    models: [
        //
    ],
    views: [
        'navbar.V_navbar'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            // VOCI MENU A TENDINA
            'navbar menuitem' : {
                click: function(menuitem){
                    this.redirectTo(menuitem.route);
                }
            }

        }, this);
    }
    /////////////////////////////////////////////////


});
