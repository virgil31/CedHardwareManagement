Ext.application({
    extend: 'Ext.app.Application',

    name: 'CL',

    controllers: [
        'C_login',
        'C_home',
        'C_bbar',
        'C_tbar',
        'C_navbar',

        'C_utente',
        'C_sede',
        'C_richiesta',
        'C_controlla_richieste',

        'C_accessorio',
        'C_acquisto',
        'C_utente_dominio',

        'C_materiale',
        'C_tipo_materiale',
        'C_modello'
    ],

    // vv ROUTING

    defaultToken : 'home', //se arrivo www.miosito.it ==> www.miosito.it/#home

    // Quando nessuna route è stata trovata
    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onUnmatchedRoute'
            }
        }
    },

    onUnmatchedRoute: function(hash) {
        if(Ext.ComponentQuery.query('not_found').length === 0)
            Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'not_found'});

        Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('not_found_id');
    },

    // ^^

    launch: function () {

        //rimuovo l'icona di caricamento
        var item = document.getElementById("img_loader_id");
        item.parentNode.removeChild(item);

        //applico tutti i miei overrides
        this.applyOverrides();

        // carico le costanti
        this.caricaCostanti();

        // disabilito il controllo di accessibilità ARIA sui bottoni
        Ext.enableAriaButtons = false;

        //previene la creazione dei context menu del browser
        //Ext.getDoc().on('contextmenu', function(ev) {
        //     ev.preventDefault();
        //});

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items:[
                {
                    xtype: 'panel',
                    scrollable: true,
                    //bodyStyle: "background: #646464",// 3892D4
                    bodyStyle: {
                        background: 'url(resources/images/background.jpg)'
                    },
                    tbar: Ext.widget('tbar'),
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            name: 'card',
                            layout: 'card',
                            width: 960,
                            minHeight: window.innerHeight - 88 - 88,
                            bodyStyle: 'backgroundColor: transparent',
                            tbar: {xtype: 'navbar'}
                        }
                    ],
                    bbar: Ext.widget('bbar')
                }
            ]
        });


        window.onresize = function() {
            Ext.ComponentQuery.query('viewport panel[name=card]')[0].minHeight = window.innerHeight - 88 - 88;
        };

    },


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////


    caricaCostanti: function(){
        Ext.Ajax.request({
            scope: CL.app,
            url: 'data/costanti.php',
            params:{
                flag_echo: true
            },
            success: function(response, opts) {
                var risposta = Ext.decode(response.responseText),
                    costanti = risposta.COSTANTI,
                    connessione_db = risposta.connessione_db;

                if(!connessione_db){
                    Ext.Msg.show({
                        title:"<b>Errore Critico!</b>",
                        message: "<b>Impossibile connettersi al database!</b> Ricaricare l'applicazione con F5 prego.",
                        icon: Ext.Msg.ERROR,
                        closable: false
                    });
                }

                Ext.define('COSTANTI', {
                    singleton: true,

                    stati: costanti.stati
                });
            },
            failure: function(response, opts) {
                Ext.Msg.show({
                    title:"<b>Critical Error</b>",
                    message: "Impossibile caricare le costanti!</b>Ricaricare l'applicazione con F5 prego.",
                    icon: Ext.Msg.ERROR,
                    closable: false
                });
            }
        });
    },

    applyOverrides: function () {

        Ext.override(Ext.form.field.Text, {
            msgTarget: 'side',
            listeners: {
                blur: function() {
                    if(this.xtype != "datefield" && this.xtype != "combobox" && this.xtype != "numberfield") {
                        var value = this.getValue();
                        this.setValue(value.trim());
                    }
                }
            }
        });
        Ext.override(Ext.form.field.Number, {
            msgTarget: 'side'
        });
        Ext.override(Ext.form.field.TextArea, {
            listeners: {
                blur: function() {
                    var value = this.getValue();
                    this.setValue(value.trim());
                }
            }
        });

        /*
         fade animation card layout
         */
        Ext.override(Ext.layout.container.Card, {
            setActiveItem: function (newCard) {

                var me = this,
                    owner = me.owner,
                    oldCard = me.activeItem,
                    rendered = owner.rendered,
                    newIndex;

                newCard = me.parseActiveItem(newCard);
                newIndex = owner.items.indexOf(newCard);

                // If the card is not a child of the owner, then add it.
                // Without doing a layout!
                if (newIndex === -1) {
                    newIndex = owner.items.items.length;
                    Ext.suspendLayouts();
                    newCard = owner.add(newCard);
                    Ext.resumeLayouts();
                }

                // Is this a valid, different card?
                if (newCard && oldCard !== newCard) {
                    // Fire the beforeactivate and beforedeactivate events on the cards
                    if (newCard.fireEvent('beforeactivate', newCard, oldCard) === false) {
                        return false;
                    }
                    if (oldCard && oldCard.fireEvent('beforedeactivate', oldCard, newCard) === false) {
                        return false;
                    }

                    if (rendered) {
                        Ext.suspendLayouts();

                        // If the card has not been rendered yet, now is the time to do so.
                        if (!newCard.rendered) {
                            me.renderItem(newCard, me.getRenderTarget(), owner.items.length);
                        }

                        var handleNewCard = function () {
                            // Make sure the new card is shown
                            if (newCard.hidden) {
                                newCard.show();
                            }

                            if (!newCard.tab) {
                                var newCardEl = newCard.getEl();
                                newCardEl.dom.style.opacity = 1;
                                if (newCardEl.isStyle('display', 'none')) {
                                    newCardEl.setDisplayed('');
                                } else {
                                    newCardEl.show();
                                }
                            }

                            // Layout needs activeItem to be correct, so set it if the show has not been vetoed
                            if (!newCard.hidden) {
                                me.activeItem = newCard;
                            }
                            Ext.resumeLayouts(true);
                        };

                        var handleOldCard = function () {
                            if (me.hideInactive) {
                                oldCard.hide();
                                oldCard.hiddenByLayout = true;
                            }
                            oldCard.fireEvent('deactivate', oldCard, newCard);
                        };

                        if (oldCard && !newCard.tab) {
                            var oldCardEl = oldCard.getEl();
                            oldCardEl.fadeOut({
                                callback: function () {
                                    handleOldCard();
                                    handleNewCard();
                                }
                            });

                        } else if (oldCard) {
                            handleOldCard();
                            handleNewCard();
                        } else {
                            handleNewCard();
                        }

                    } else {
                        me.activeItem = newCard;
                    }

                    newCard.fireEvent('activate', newCard, oldCard);

                    return me.activeItem;
                }
                return false;
            }
        });
        //^^ fade animation card layout
    }
});
