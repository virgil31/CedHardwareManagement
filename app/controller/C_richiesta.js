Ext.define('CL.controller.C_richiesta', {
    extend: 'Ext.app.Controller',

    routes: {
        'richiesta' : 'showView'
    },

    stores: [
        //
    ],
    models: [
        //
    ],
    views: [
        'richiesta.V_form_richiesta'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({
            'form_richiesta button[action=doRichiesta]':{
                click: this.doRichiesta
            }
        }, this);
    },
    /////////////////////////////////////////////////

    //ROUTES

    showView: function(){

        if(Ext.util.Cookies.get("richiesta_logged") !== null){
            if(Ext.ComponentQuery.query('form_richiesta').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'form_richiesta'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('form_richiesta_id');
        }
        else
            this.redirectTo('login');
    },

    /////////////////////////////////////////////////

    doRichiesta: function(btn){
        var form = btn.up("form"),
            values = form.getValues();

        if(form.isValid()){
            var tipi_hardware = [];
            Ext.ComponentQuery.query("form_richiesta grid")[0].getStore().each(function(tipo_hardware_richiesto){
                tipi_hardware.push({
                    tipo_hardware_id: tipo_hardware_richiesto.get("tipo_hardware_id"),
                    note: tipo_hardware_richiesto.get("note")
                });
            });

            values.tipi_hardware = tipi_hardware;
            alert("Values del form in CONSOLE!!!");
            console.log(values);

        }
    }




});
