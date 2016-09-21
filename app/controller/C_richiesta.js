Ext.define('CL.controller.C_richiesta', {
    extend: 'Ext.app.Controller',

    routes: {
        'richiesta' : 'showView'
    },

    stores: [
        'S_richiesta'
    ],
    models: [
        'CL.model.M_richiesta'
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
            },

            //ANNULLA RICHIESTA
            'richiesta_edit button[action=annulla_richiesta]':{
                click: this.annullaRichiesta
            }
        }, this);
    },
    /////////////////////////////////////////////////

    //ROUTES

    showView: function() {
        if(Ext.util.Cookies.get("richiedente_id") != null && Ext.util.Cookies.get("richiedente_nome") != null && Ext.util.Cookies.get("richiedente_cognome") != null) {
            if(Ext.ComponentQuery.query('form_richiesta').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'form_richiesta'});

            Ext.ComponentQuery.query('form_richiesta')[0].destroy();                                    // -
            Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'form_richiesta'});    // -

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('form_richiesta_id');

            //
            Ext.ComponentQuery.query("form_richiesta form")[0].reset(true);

            Ext.ComponentQuery.query("form_richiesta textfield[name=ric_id_richiedente]")[0].setValue(Ext.util.Cookies.get("richiedente_id"));
            Ext.ComponentQuery.query("form_richiesta textfield[name=nome_cognome_richiedente]")[0].setValue(Ext.util.Cookies.get("richiedente_cognome")+" "+Ext.util.Cookies.get("richiedente_nome"));

        }
        else {
            this.redirectTo('login');
        }

    },

    /////////////////////////////////////////////////

    // DO RICHIESTA
    doRichiesta: function(btn){
        var form = btn.up("form"),
            record_richiesta = form.getRecord(),
            values = form.getValues(),
            to_save = false;

        if (form.isValid()) {
            //controllo se è una CREAZIONE (basandomi sulla presenza del "record_richiesta")
            if (record_richiesta == null) {
                Ext.getBody().mask("Salvataggio richiesta in corso...");
                var record_richiesta = Ext.create('CL.model.M_richiesta', values);
                to_save = true;
            }
            //altrimenti vuol dire che sono in fase di MODIFICA
            else{
                //controllo se ci sono stati reali cambiamenti
                if(form.isDirty()){
                    var stato = record_richiesta.get("ric_stato");
                    //controllo che sia attualmente modificabile (check dello stato)
                    if(COSTANTI.stati[stato].puo_modificare){
                        Ext.getBody().mask("Salvataggio richiesta in corso...");
                        record_richiesta.set(values);
                        to_save = true;
                    }
                    else{
                        Ext.Msg.alert("Attenzione","Non è più possibile modificare tale richiesta.");
                    }
                }
            }
            if(to_save){
                record_richiesta.save({
                    failure: function(){
                        Ext.getBody().unmask();
                        //store.rejectChanges();
                        Ext.Msg.alert("Attenzione!","Errore interno. Si è pregati di riprovare più tardi.")
                    },
                    success: function(richiesta) {
                        Ext.getBody().unmask();
                        // ricarico il form con il loadRecord per resettare il "dirty" del form (grazie al "trackResetOnLoad")
                        form.loadRecord(richiesta);
                        Ext.Msg.alert("Successo!","Il salvataggio della richiesta è stata correttamente effettuato!");
                    }
                });
            }
        }
    },


    //ANNULLA RICHIESTA
    annullaRichiesta: function(btn){
        var richiesta_id = btn.up("form").getRecord().get("id");

        Ext.Msg.confirm("Attenzione!","Sicuro di voler eliminare la richiesta e rendere disponibili gli eventuali seriali assegnati?", function(btnId){
            if(btnId == "yes"){
                Ext.Ajax.request({
                    url: 'data/richiesta/annulla_richiesta.php',
                    method: "POST",
                    params: {richiesta_id:richiesta_id},

                    success: function(response, opts) {
                        var risposta = Ext.decode(response.responseText);
                        if(risposta["success"]){
                            btn.up("window").close();
                            Ext.StoreManager.lookup("S_richiesta").reload();
                        }
                        else{
                            Ext.Msg.alert('Errore');
                        }
                    },

                    failure: function(response, opts) {
                        Ext.Msg.alert('server-side failure with status code ' + response.status);
                    }
                });

            }
        });
    },

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
