Ext.define('CL.controller.C_fornitore', {
    extend: 'Ext.app.Controller',

    routes: {
        'fornitori' : 'showView'
    },

    stores: [
        'S_fornitore'
    ],

    models: [
        'M_fornitore'
    ],

    views: [
        'fornitore.V_list',
        'fornitore.V_create',
        'fornitore.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            //ON CREATE
            'fornitore_list button[action=on_create]': {
                click: this.onCreate
            },

            //DO CREATE
            'fornitore_create button[action=do_create]':{
                click: this.doCreate
            },

            //DO EDIT
            'fornitore_edit button[action=do_edit]':{
                click: this.doEdit
            }

        }, this);
    },
    /////////////////////////////////////////////////


    //ON DESTROY
    onDestroy: function(record){

        Ext.Msg.confirm('Attenzione!', 'Eliminare <b>'+record.get("nome")+"</b>?",function(btn){
            if (btn === 'yes')
                Ext.StoreManager.lookup("S_fornitore").remove(record);
        });

    },


    //ON EDIT
    onEdit: function(animateTargetEl,record){
        var win = Ext.widget("fornitore_edit",{
            animateTarget: animateTargetEl
        });

        var form = win.down("form").getForm();
        form.loadRecord(record);
    },

    //DO EDIT
    doEdit: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            record = form.getRecord(),
            values = form.getValues();

            console.log(record);

        Ext.Msg.confirm('Attenzione!', "Modificare il fornitore?",function(btn){
            if (btn === 'yes'){
                record.set(values);
                window.close();
                Ext.StoreManager.lookup("S_fornitore").reload();
            }
        });
    },


    //ON CREATE
    onCreate: function(btn){
        Ext.widget("fornitore_create",{
            animateTarget: btn.el
        });
    },


    //DO CREATE
    doCreate: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            values = form.getValues();


        if(form.isValid()){
            Ext.StoreManager.lookup("S_fornitore").add(values);

            if(window.callbackOnCreated != null)
                window.callbackOnCreated();

            window.close();
            setTimeout(function(){
                Ext.StoreManager.lookup("S_fornitore").reload();
            }, 250);
        }

    },


    //SHOW VIEW
    showView: function(){
        //Ext.ComponentQuery.query("window").forEach(function(win){win.destroy();});  //per eliminare le vecchie windows

        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('fornitore_list').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'fornitore_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('fornitore_list_id');

            Ext.StoreManager.lookup("S_fornitore").loadPage(1);
        }
        else
            this.redirectTo('login');
    },


    // per gli hyperlink
    onEditById: function(animateTargetEl,id){
        var my_controller = this;
        var record = Ext.StoreManager.lookup("S_fornitore").getById(id);

        my_controller.onEdit(animateTargetEl,record);
    }



});
