frappe.listview_settings['GHG Inventory'] = {
    refresh:function(frm){
        $('[data-fieldname="sector"]').on(function(){
            $('[data-fieldname="category"]')[1]['innerHTML']= '<option></option><option value="1. Energy">JP</option><option value="Pandi">1. Energy</option><option value="Raino">Raino</option><option value="Sandy">Sandy</option>'
        })
            console.log($('[data-fieldname="category"]')[0]['fieldobj']['value'])
    
    }
}
