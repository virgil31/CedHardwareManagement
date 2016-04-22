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
        'richiesta.V_form_richiesta',
        'richiesta.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({
            // DO RICHIESTA
            'form_richiesta button[action=doRichiesta]':{
                click: this.doRichiesta
            },

            // DO EDIT
            'richiesta_edit button[action=do_edit]':{
                click: this.doEdit
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

    // DO EDIT
    doEdit: function(btn){
        var window = btn.up("window"),
            form = window.down("form"),
            values = form.getValues(),
            record = form.getRecord(),
            store = Ext.StoreManager.lookup("S_richiesta");

        Ext.Msg.confirm('Attenzione!', 'Modificare la richiesta?',function(btn){
            if (btn === 'yes'){
                console.log(values);
                record.set(values);
                store.sync();

                window.close();
            }
        });

    },


    // DO RICHIESTA
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
                            CL.app.getController("C_richiesta").redirectTo("login");
                        });
                    }
                });
            }
        }
    },


    //ON EDIT
    onEdit: function(animateTargetEl,record){
        var win = Ext.widget("richiesta_edit",{
            animateTarget: animateTargetEl,
            title: 'Richiesta Hardware <b>#'+record.get("id")+'</b>'
        });

        win.down("form").loadRecord(record);
        Ext.StoreManager.lookup("S_assegnazione").load({
            params:{
                richiesta_id: record.get("id")
            }
        });
    }




});
