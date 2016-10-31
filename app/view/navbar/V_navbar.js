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
                    text: 'Tabelle',
                    icon: "resources/images/icon_list.png",
                    menu:[
                        {
                            text: '<b>Accessori</b>',
                            route: 'accessori'
                        },
                        {
                            text: '<b>Acquisti</b>',
                            route: 'acquisti'
                        },
                        {
                            text: '<b>Materiali</b>',
                            route: 'materiali'
                        },
                        {
                            text: '<b>Modelli</b>',
                            route: 'modelli'
                        },
                        {
                            text: '<b>Sedi</b>',
                            route: 'sedi'
                        },
                        {
                            text: '<b>Tipi Materiale</b>',
                            route: 'tipi_materiale'
                        },
                        {
                            text: '<b>Utenti</b>',
                            route: 'utenti'
                        }
                    ]
                },
                {
                    text:'Vista ad albero',
                    icon: 'resources/images/icon_tree.png',
                    disabled: true
                },
                {
                    text: 'Cerca materiale per utente',
                    icon: "resources/images/icon_utente.png",
                    disabled: true
                },
                {
                    text: 'Cerca info seriale',
                    icon: "resources/images/icon_serial.png",
                    disabled: true
                }
    		];
        }
		this.callParent(arguments);
    }

});
