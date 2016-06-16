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
        'richiesta.V_edit',
        'richiesta.V_quick_create'
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
            },

            // MOSTRA FOGLIO CONSEGNA
            'richiesta_edit button[action=mostra_foglio_consegna]':{
                click: this.mostraFoglioConsegna
            },

            // DO (quick) CREATE
            'richiesta_quick_create button[action=do_create]':{
                click: this.doQuickCreate
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

    // DO QUICK CREATE
    doQuickCreate: function(btn) {
        var win = btn.up("window"),
            form = win.down("form"),
            values = form.getValues();

        var tipi_hardware = [];
        Ext.ComponentQuery.query("richiesta_quick_create grid")[0].getStore().each(function(tipo_hardware){
            tipi_hardware.push(tipo_hardware.data);
        });

        values.tipi_hardware = tipi_hardware;

        if(!form.isValid() || tipi_hardware.length == 0){
            Ext.Msg.show({
                title:"<b>Attenzione!</b>",
                message: "Compilare i campi <i>anagrafici</i> dell'assegnazione<br>e selezionare almeno un modello/seriale.",
                icon: Ext.Msg.ERROR
            });
        }
        else{
            win.mask("Creazione in corso...");
            Ext.Ajax.request({
                url: 'data/richiesta/quick_create.php',
                params:{
                    data: Ext.encode(values)
                },
                success: function(response, opts) {
                    win.unmask();
                    win.close();
                    Ext.ComponentQuery.query("richiesta_quick_create grid")[0].getStore().removeAll();
                    Ext.ComponentQuery.query("home grid")[0].getStore().loadPage(1);
                },
                failure: function(response, opts) {
                    win.unmask();
                    Ext.Msg.alert("Attenzione!","Errore interno. Si è pregati di riprovare più tardi.")
                }
            });
        }

    },

    // ON QUICK CREATE
    onQuickCreate: function(targetEl) {
        Ext.StoreManager.lookup("S_sede").load({params:{flag_full:true}});
        Ext.StoreManager.lookup("S_utente").load({params:{flag_full:true}});
        Ext.widget("richiesta_quick_create",{
            animateTarget: targetEl
        });
    },

    // MOSTRA FOGLIO CONSEGNA
    mostraFoglioConsegna: function(btn){

        var window = btn.up("window"),
            form = window.down("form"),
            values = form.getValues(),
            record = form.getRecord(),
            richiesta_id = record.get("id");

        Ext.create("Ext.window.Window",{
            animateTarget: btn.el,
            title: '<b>Foglio Di Consegna</b>',
            autoShow: true,
            name: 'preview_pdf',
            height: 650,
            width: 960,
            layout: 'fit',
            resizable: false,
            constrain: true,
            modal: true,
            items: [
                {
                    xtype:'panel',
                    name: 'loading',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },

                    items: [
                        {
                            xtype:'image',
                            src: 'resources/lib/pdfjs/loading.gif',
                            height: 200,
                            width: 200
                        }
                    ]
                },
                {
                    xtype: 'box',
                    id: 'my_iframe',
                    autoEl: {
                        tag: 'iframe',
                        src: 'data/richiesta/getPDF.php?richiesta_id='+richiesta_id
                    }
                }
            ],
            listeners: {
                //nascondo la gif di caricamento
                afterrender: function(){
                    document.getElementById("my_iframe").onload = function() {
                        Ext.ComponentQuery.query('window[name=preview_pdf] panel[name=loading]')[0].destroy();
                    };
                }
            }
        });


        setTimeout(function(){
            var hardware_non_assegnato = 0;
            Ext.ComponentQuery.query("richiesta_edit grid")[0].getStore().each(function(tipo_hardware){
                if(tipo_hardware.data.seriale_id == "")
                    hardware_non_assegnato++;
            });
            if(hardware_non_assegnato > 0){
                Ext.Msg.alert("<b>Attenzione!</b>","Non è stato assegnato <i>tutto</i> l'hardware richiesto,<br>di conseguenza il foglio di consegna potrebbe<br> essere <b>nullo o parziale</b>")
            }
        }, 1500);


    },

    // DO EDIT
    doEdit: function(btn){
        var window = btn.up("window"),
            form = window.down("form"),
            values = form.getValues(),
            record = form.getRecord(),
            store = Ext.StoreManager.lookup("S_richiesta");

        Ext.Msg.confirm('Attenzione!', 'Modificare la richiesta?',function(btn){
            if (btn === 'yes'){
                record.set(values);
                store.sync();

                window.close();
                store.reload();
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
                        Ext.Msg.alert("Attenzione!","Errore interno. Si è pregati di riprovare più tardi.")
                    },
                    success: function(){
                        Ext.getBody().unmask();
                        Ext.Msg.alert("Successo!","La registrazione è stata correttamente effettuata!<br>A breve riceverà una mail di conferma su <b>"+(values.email)+"</b><br>con relativo con codice di <i>tracciabilità</i>.",function(){
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

        //win.down("form").loadRecord(record);

        //nel caso in cui si tratti di pregresso,
        //non farò editare lo stato (guarda la View) e la data di assegnazione
        if(record.get("stato") == "Pregresso")
            Ext.ComponentQuery.query("richiesta_edit datefield[name=assegnata_il]")[0].readOnly = true;


        Ext.StoreManager.lookup("S_assegnazione").load({
            params:{
                richiesta_id: record.get("id")
            }
        });
        Ext.StoreManager.lookup("S_sede").load({
            params:{
                flag_full: true
            }
        });
        Ext.StoreManager.lookup("S_ufficio").load({
            params:{
                sede_id: record.get("sede_id")
            }
        });
	Ext.StoreManager.lookup("S_utente").load({
	    params:{
	        flag_full: true
	    }
	});

	win.down("form").loadRecord(record);
    }

});
