Ext.define('CL.view.bbar.V_bbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'bbar',
    itemId: 'bbar_id',
    alias: 'widget.bbar',

    height: 88,
	style: 'background: #333333',


    initComponent: function() {
        var this_view = this;

        if(Ext.util.Cookies.get("ced_logged") !== null){
            this_view.items = [
                '->',
                {
        			html: '<marquee behavior="scroll" scrollamount="5" direction="left" width="900">'+
        				'Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena Lena '+
        				'</marquee>'
        		},
                '->'
            ];
        }

        this.callParent(arguments);

    }

});
