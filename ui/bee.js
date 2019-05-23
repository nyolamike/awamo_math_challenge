var bee = {
    baseUrl: "",
    token:null,
    get: function (nectar, callback) {
        //#beejs_important_code
        var q = btoa(JSON.stringify(nectar));
        var link = this.baseUrl + "?q=" + q;
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                //console.log(this.responseText);
                if (typeof callback != 'undefined') {
                    bee.handleResponse(this.responseText,callback);
                }
            }
        });
        xhr.open("GET", link);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        if(this.token != null && this.token.length > 0){
            xhr.setRequestHeader("Authorization", "Bearer " + this.token);
        }
        xhr.send(data);
    },
    onTokenExpired: null,
    handleResponse:function(responseText,callback){
        var rep = JSON.parse(responseText);
        $expired = false;
        if(rep.hasOwnProperty("_errors") && rep._errors.length > 0 ){
            //check for Token expired
            for (let i = 0; i < rep._errors.length; i++) {
                var e = rep._errors[i];
                if(typeof e != "undefined" && e != null && e.indexOf("oken expired") > -1){
                    alert("Your session expired, please login");
                    $expired = true;
                    break;
                }
            }
            if($expired == true && bee.onTokenExpired !=  null){
                bee.onTokenExpired();
            }
        }
        if($expired == false){
            callback(rep);
        }else if($expired == true && bee.onTokenExpired !=  null){
            //was called
        }else{
            callback(rep);
        }
    },
    post: function (nectar, callback) {
        //#beejs_important_code
        var data = JSON.stringify(nectar);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                //console.log(this.responseText);
                if (typeof callback != 'undefined') {
                    bee.handleResponse(this.responseText,callback);
                }
            }
        });

        xhr.open("POST", this.baseUrl);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        if(this.token != null && this.token.length > 0){
            xhr.setRequestHeader("Authorization", "Bearer " + this.token);
        }
        xhr.send(data);
    },
    log:function(activity, description){
        var who = app.user.email;
        if(app.user.name != null || app.user.name.length > 0){
            who = who + " " + app.user.name;
        }
        var role = "";
        var rid = 0;
        if(app.user.user_roles.length > 0){
            role = app.user.user_roles[0].role.name;
            rid = app.user.user_roles[0].role.id;
        }
        if(typeof description == "undefined" || description == null){
            description = "";
        }
        var logNec = {
            trail:{
                who: who,
                user_id: app.user.id,
                activity: activity,
                role: role,
                role_id: rid,
                description: description
            }
        };
        bee.post(logNec,function(hny){console.log("logresponse : for " + activity,  hny);});
    },
    update: function (nectar,callback) {
        //#beejs_important_code
        var data = JSON.stringify(nectar);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                //console.log(this.responseText);
                if (typeof callback != 'undefined') {
                    bee.handleResponse(this.responseText,callback);
                }
            }
        });

        xhr.open("PUT", this.baseUrl);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        if(this.token != null && this.token.length > 0){
            xhr.setRequestHeader("Authorization", "Bearer " + this.token);
        }
        xhr.send(data);
    },
    delete: function () {

    },
    upload: function(formData,callback){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                //console.log(this.responseText);
                if (typeof callback != 'undefined') {
                    bee.handleResponse(this.responseText,callback);
                }
            }
        });
        xhr.open("POST", this.baseUrl);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        if(this.token != null && this.token.length > 0){
            xhr.setRequestHeader("Authorization", "Bearer " + this.token);
        }
        xhr.send(formData);
    },
    where:function(l,m,r){
        var _w = [[l,m,r]];
        return {
            _w: _w,
            and:function(l,m,r){
                this._w[0] = [this._w[0],"AND",[l,m,r]];
                return this;
            },
            or:function(l,m,r){
                this._w[0] = [this._w[0],"OR",[l,m,r]];
                return this;
            }
        }
    }
};

