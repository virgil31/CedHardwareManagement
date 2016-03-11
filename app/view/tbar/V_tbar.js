Ext.define('CL.view.tbar.V_tbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'tbar',
    itemId: 'tbar_id',
    alias: 'widget.tbar',

    height: 88,
	style: 'background: #333333',

	initComponent: function() {
		var this_view = this;

		this_view.items = [
			'->',
		    {
		        xtype: 'toolbar',
		        width: 960,
		        style: "background-color: transparent; border:none;",
		        items:[
		            {
		                xtype: 'button',
		                width: 60,
		                height: 60,
		                style: "background-image: url('resources/images/logos/logo3.png') !important; " +
		                    "background-size: 100% 100%;" +
		                    "border-color: transparent;" +
		                    "background-color: transparent;" +
		                    "background-repeat: no-repeat;",
		                handler: function () {
		                    window.location.href = window.location.pathname + "#home";
		                    location.reload();
		                }
		            },
		            {
		                xtype: 'button',
		                width: 325,
		                height: 53,
		                margin: '0 0 0 10',
		                style: "background-image: url('resources/images/logos/logo_ced2.png') !important; " +
		                    "background-size: 100% 100%;" +
		                    "border-color: transparent;" +
		                    "background-color: transparent;" +
		                    "background-repeat: no-repeat;",
		                handler: function () {
		                    window.open("http://i109.photobucket.com/albums/n51/Izariel/ChromaticEmperorDragon.jpg",'_blank');
		                }
		            },
		            '->',
		            {
		            	xtype: 'form',
	    		        bodyStyle: "background-color: transparent;",

		            	items: [
							{
					        	xtype: 'button',
					        	text: 'Esci',
					        	action: 'do_logout',
					        	iconCls: 'x-fa fa-remove',
					        	width: 80,
					        	padding: 10,
					        	margin: '0 2 0 0',
					        	hidden: Ext.util.Cookies.get('ced_logged') == null
					        }
		            	]
		            }

		        ]
		    },
		    '->'
		]


		this.callParent(arguments);
    }

});
