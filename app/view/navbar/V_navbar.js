Ext.define('CL.view.navbar.V_navbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'navbar',
    itemId: 'navbar_id',
    alias: 'widget.navbar',

    height: 38,
    width: '100%',
    hidden: true,  //parte come nascosta

	initComponent: function() {
		var this_view = this;

        // se sono loggato come gestore allora la mostro
        if(Ext.util.Cookies.get("ced_logged") !== null){
            this_view.setHidden(false);

            this_view.items = [
                {
                    icon: 'resources/images/icon_sede.png',
                    tooltip: 'Torna alla home',
                    handler: function(){
                        CL.app.getController("C_navbar").redirectTo("home");
                    }
                },
                {
                    text:'Vista ad albero',
                    icon: 'resources/images/icon_tree.png'
                },
                {
                    text: 'Cerca materiale per utente',
                    icon: "resources/images/icon_utente.png"
                },
                {
                    text: 'Cerca info seriale',
                    icon: "resources/images/icon_serial.png"
                },
                {
                    text: 'Tabelle',
                    icon: "resources/images/icon_list.png",
                    menu:[
                        {
                            text: 'Tipologie HW',
                            route: 'todo'
                        },
                        {
                            text: 'Marche HW',
                            route: 'todo'
                        },
                        {
                            text: 'Modelli HW',
                            route: 'todo'
                        },
                        {
                            text: 'Fatture',
                            route: 'todo'
                        },
                        {
                            text: 'Tipi di ditte',
                            route: 'todo'
                        },
                        {
                            text: 'Fornitori',
                            route: 'todo'
                        },
                        {
                            text: '<b>Sedi</b>',
                            route: 'sedi'
                        },
                        {
                            text: 'Uffici',
                            route: 'todo'
                        },
                        {
                            text: 'Utenti',
                            route: 'todo'
                        }
                    ]
                }
    		]
        }


		this.callParent(arguments);
    }

});
