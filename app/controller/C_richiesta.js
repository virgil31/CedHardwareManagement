Ext.define('CL.controller.C_richiesta', {
    extend: 'Ext.app.Controller',

    routes: {
        'richiesta' : 'showView'
    },

    stores: [
        'S_richiesta'
    ],
    models: [
        'M_richiesta'
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
                    id: tipo_hardware_richiesto.get("id"),
                    note: tipo_hardware_richiesto.get("note")
                });
            });
            if(tipi_hardware.length == 0){
                Ext.alert("Attenzione!","Indicare il materiale richiesto facendo click su '+Aggiungi Hardware alla Richiesta+'")
            }
            else{
                values.tipi_hardware = tipi_hardware;

                console.log(values);

                var store = Ext.StoreManager.lookup("S_richiesta");


                store.add(values);
                Ext.getBody().mask("Invio richiesta in corso...");
                store.sync({
                    failure: function(){
                        Ext.getBody().unmask();
                        store.rejectChanges();
                        Ext.Msg.alert("Attenzione!","Errore interno. Si è pregati di riprovare in seguito.")
                    },
                    success: function(){
                        Ext.getBody().unmask();
                        Ext.Msg.alert("Successo!","La registrazione è stata correttamente effettuata!<br>A breve riceverà una mail di conferma su <b>"+(values.email)+"</b> con codice di 'tracciabilità'.",function(){
                            //CL.app.getController("C_richiesta").redirectTo("login");
                        });
                    }
                });
            }
        }
    }




});
