var action_groups = {
    index: 0,
    add : function(act){
        act["id"] = this.index;
        this.index = this.index + 1;
        this.acts[act["id"]] = act;
    },
    acts:{},
    getPermission:function(perm,t){
        if (this.acts.hasOwnProperty(perm)) {
            var act = this.acts[perm];
            for (const permKey in act.perms){
                if (act.perms.hasOwnProperty(permKey)) {
                    var p = act.perms[permKey];
                    //check if I already have this permission
                    var found = false;
                    var ind = 0;
                    for (var index = 0; index < t.length; index++) {
                        if(t[index].permission == permKey){
                            found = true;
                            ind = index;
                            break;
                        }
                    }
                    if(found == false){
                        t.push({
                            _fk_role_id: "role",
                            permission: permKey,
                            can_create: p.c,
                            can_read: p.r,
                            can_update: p.u,
                            can_delete: p.d
                        });
                    }else{
                        //update
                        t[ind].can_create = (t[ind].can_create < p.c)? p.c : t[ind].can_create;
                        t[ind].can_read = (t[ind].can_read < p.r)? p.r : t[ind].can_read;
                        t[ind].can_update = (t[ind].can_update < p.u)? p.u : t[ind].can_update;
                        t[ind].can_delete = (t[ind].can_delete < p.d)? p.d : t[ind].can_delete;
                    }
                }
            }
        }
        return t;
    },
    getActionGroupNames:function(role_permisiions){
        var actsX = [];
        for (const permKey in this.acts){ //action_groups
            if (this.acts.hasOwnProperty(permKey)) {
                var truths = [];
                var actionGroup = this.acts[permKey]; //a single action group e.g secutiry management
                for (var permName in actionGroup.perms) {//permName is like log, user_role etc
                    if (actionGroup.perms.hasOwnProperty(permName)) {
                        truths.push(0);
                        var  pamis = actionGroup.perms[permName]; //pamis like log: {c:0,r:1,u:0,d:0}
                        var permissionFound = false;
                        var permissionPassed = false;
                        //get the coresponding permisiion in list
                        for (let i = 0; i < role_permisiions.length; i++) {
                            var  role_perm = role_permisiions[i];
                            var dbPermName = role_perm.permission;
                            if(permName == dbPermName){
                                permissionFound = true;
                                //compare
                                if(pamis.c != role_perm.can_create ||
                                    pamis.r != role_perm.can_read ||
                                    pamis.u != role_perm.can_update ||
                                    pamis.d != role_perm.can_delete
                                ){
                                    permissionPassed = false;
                                }else{
                                    permissionPassed = true;
                                }
                                break;
                            }
                        }
                        if(permissionFound == false || permissionPassed == false){
                            break;//go to the next action group
                        }else if(permissionFound == true && permissionPassed == true){
                            //update the inserted miss truth
                            truths[truths.length - 1] = 1;
                        }
                    }
                }
                if(truths.length > 0 && truths.indexOf(0) < 0){
                    actsX.push(actionGroup.name);
                }
            }
        }
        return actsX;
    }
};

//guests rooms inventory
//nyd this is not complete
action_groups.add({
    name: "sub managment",
    perms: {
        booking: {c:0,r:1,u:0,d:0,i:"To read bookings"},
        booked_room: {c:0,r:1,u:0,d:0,i:"read booked rooms"},
        booked_room_bill: {c:0,r:1,u:0,d:0,i:"to know the bill on the room"},
        booked_room_payment: {c:0,r:1,u:0,d:0,i:"to know the payments made on the room"},
        guest: {c:0,r:1,u:0,d:0,i:"view guests"},
        room: {c:1,r:1,u:1,d:0,i:"create read update rooms"},
        facility: {c:0,r:1,u:0,d:0,i:"view facilities"},
        room_category: {c:0,r:1,u:0,d:0,i:"view categories of rooms"},
        room_category_facility: {c:0,r:1,u:0,d:0,i:"facilities of categories"},
        unit: {c:0,r:1,u:0,d:0,i:"read units"},
        unit_conversion: {c:0,r:1,u:0,d:0,i:"read"},
        item_category: {c:0,r:1,u:0,d:0,i:"read"},
        item_type: {c:0,r:1,u:0,d:0,i:"read"},
        trail: {c:1,r:0,u:0,d:0,i:"read"}
    }
});

action_groups.add({
    name: "secutiry management",
    perms: {
        log: {c:0,r:1,u:0,d:0,i:"reading audit trails and logs"},
        user_role: {c:0,r:1,u:1,d:1,i:"assigning users to roles"},
        role_permisiion: {c:1,r:1,u:1,d:1,i:"assigning permissions to roles"},
        role_module: {c:1,r:1,u:1,d:1,i:"assigning roles to menu items"},
        role: {c:1,r:1,u:1,d:1,i:"manage roles"},
        user: {c:1,r:1,u:1,d:1,i:"manage system users"},
        trail: {c:1,r:1,u:0,d:0,i:"read"}
    }
});


action_groups.add({
    name: "system configuration",
    perms: {
        unit: {c:1,r:1,u:1,d:0,i:"measurement units"},
        unit_conversion: {c:1,r:1,u:1,d:0,i:"unit conversions"},
        facility: {c:1,r:1,u:1,d:0,i:"facility like shawer, tv, air conditioner"},
        room_category: {c:1,r:1,u:1,d:0,i:"room categories e.g presidential"},
        room_category: {c:1,r:1,u:1,d:0,i:"room categories e.g presidential"},
        room_category_facility: {c:1,r:1,u:1,d:0,i:"Assign facilities to room categories"},
        brand: {c:1,r:1,u:1,d:0,i:"manufacturers of products"},
        section: {c:1,r:1,u:1,d:0,i:"sections"},
        trail: {c:1,r:1,u:0,d:0,i:"read"}
    }
});

action_groups.add({
    name: "Super User",
    perms: {
        unit: {c:1,r:1,u:1,d:1,i:"measurement units"},
        unit_conversion: {c:1,r:1,u:1,d:1,i:"unit conversions"},
        facility: {c:1,r:1,u:1,d:1,i:"facility like shawer, tv, air conditioner"},
        room_category: {c:1,r:1,u:1,d:1,i:"room categories e.g presidential"},
        room_category: {c:1,r:1,u:1,d:1,i:"room categories e.g presidential"},
        room_category_facility: {c:1,r:1,u:1,d:1,i:"Assign facilities to room categories"},
        brand: {c:1,r:1,u:1,d:1,i:"manufacturers of products"},
        section: {c:1,r:1,u:1,d:1,i:"sections"},
        trail: {c:1,r:1,u:1,d:0,i:"do every thing to "}
    }
});