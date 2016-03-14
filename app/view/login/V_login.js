Ext.define('CL.view.login.V_login', {
    extend: 'Ext.panel.Panel',
    xtype: 'login',
    itemId: 'login_id',
    alias: 'widget.login',

    bodyStyle: 'backgroundColor: transparent',

    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },

    listeners: {
        afterRender: function(thisForm, options){
            this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                enter: function(){Ext.ComponentQuery.query('login button[action=do_login]')[0].fireEvent("click")}
            });
        }
    },

    padding: 30,

    items: [
        {
            xtype: 'image',
            src: 'resources/images/colonna.png',
            alt: " ",
            width: 300,
            height: 498
        },
        {
            xtype: 'form',
            title: 'Login',

            border: true,

            bodyPadding: 10,
            items: [
                {
                    xtype: 'textfield',
                    name: 'username',
                    fieldLabel: 'Username',
                    allowBlank: false,
                    listeners: {
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER){
                                var btn = Ext.ComponentQuery.query("login button[action=do_login]")[0];
                                btn.fireEvent("click",btn);
                            }
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'password',
                    fieldLabel: 'Password',
                    inputType: 'password',
                    allowBlank: false,
                    listeners: {
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER){
                                var btn = Ext.ComponentQuery.query("login button[action=do_login]")[0];
                                btn.fireEvent("click",btn);
                            }
                        }
                    }
                }
            ],
            buttons: [
                {
                    text: 'Login',
                    formBind: true,
                    action: 'do_login'
                }
            ]
        },
        {
            xtype: 'image',
            src: 'resources/images/colonna.png',
            alt: " ",
            width: 300,
            height: 498
        }
    ]
});
