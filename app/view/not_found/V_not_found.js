Ext.define('CL.view.not_found.V_not_found', {
    extend: 'Ext.panel.Panel',
    xtype: 'not_found',
    itemId: 'not_found_id',
    alias: 'widget.not_found',

    bodyStyle: 'backgroundColor: transparent',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    items: [        
        {
            xtype: 'image',
            src: 'resources/images/404_augusto.png',
            alt: ' ',
            width: 450,
            height: 550
        },
        {
            xtype: 'button',
            text: 'Portami alla home page!',
            action: 'go_to_home',
            margin: '20 0 0 0',
            padding: '10',
            style: 'backgroundColor: #333333'
        }
    ]

});
