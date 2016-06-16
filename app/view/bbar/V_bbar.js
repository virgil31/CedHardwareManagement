Ext.define('CL.view.bbar.V_bbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'bbar',
    itemId: 'bbar_id',
    alias: 'widget.bbar',

    height: 88,
    cls: 'mybbar',
	//style: 'background: #333333',


    initComponent: function() {
        var this_view = this;

        if(Ext.util.Cookies.get("ced_logged") !== null){
            this_view.items = [
                '->',
                {
        			html: '<marquee behavior="scroll" scrollamount="5" direction="left" width="900">'+
        				'Uno studente disse al suo Maestro: "Tu mi insegni a combattere e mi parli di pace, come puoi conciliare le due cose?".  Il Maestro rispose: "E’ meglio essere un guerriero in un giardino, che un giardiniere in guerra."'+
        				'</marquee>'
        		},
                '->'
            ];
        }

        this.callParent(arguments);

    }

});
