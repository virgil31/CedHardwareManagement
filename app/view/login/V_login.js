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
            xtype: 'panel',
            bodyStyle:{
                background: "transparent"
            },
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items:[
                {
                    html: '<br><br><br><br><br>'
                },
                {
                    xtype: 'form',
                    title: 'Login Amministratori',
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
                    xtype: 'button',
                    margin: '20 0 0 0',
                    text: 'Richiesta Hardware',
                    padding: 40,
                    scale: 'large',
                    style: {
                        background: "#5CC25C"
                    },
                    handler: function(){
                        var btn = this;
                        Ext.create("Ext.window.Window",{
                            autoShow: true,
                            modal: true,
                            resizable: false,
                            constrain: true,
                            animateTarget: btn.el,
                            width: 330,
                            title: 'Accesso per le richieste',
                            padding: 10,
                            items: [
                                {
                                    xtype: 'form',
                                    items: [
                                        {
                                            xtype: 'label',
                                            html: 'Per richiedere del nuovo hardware è necessario fare accesso con le proprie credenziali di dominio. <br><br><b>NB! </b>La richiesta che verrà scaturita di seguito sarà automaticamente assegnata a tali credenziali!'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'username',
                                            fieldLabel: 'Username',
                                            width: '100%',
                                            allowBlank: false,
                                            margin: '10 0 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'password',
                                            fieldLabel: 'Password',
                                            inputType: 'password',
                                            width: '100%',
                                            allowBlank: false,
                                            margin: '10 0 10 0'
                                        }
                                    ],
                                    buttons: [
                                        {
                                            text: 'Login',
                                            formBind: true,
                                            action: 'do_login_richiesta'
                                        }
                                    ]
                                }
                            ]

                        });
                    }
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
