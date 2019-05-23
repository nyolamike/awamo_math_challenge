<script>
    app.pages.master_page = {
        id: "master_page",
        pages:{},
        loadedPages:[]
    };
</script>

<div class="wrapper app-page hidden-page" id="master_page">
    <!-- Top horizontal header bar -->
    <?php include("master_page_header.html"); ?>
    <!-- Left side column. contains the logo and sidebar -->
    <?php include("master_page_left_side_bar.html"); ?>


    <!-- Content Wrapper. Contains page content -->
    <!-- default page -->
    <?php include("master_page_content_wrapper.html"); ?>


    <!-- dashboard page-->
    <?php include("page_content_dashboard_page.html"); ?>
    <!-- operations -->
    <?php include("page_content_operations_page.html"); ?>
    <!-- report page-->
    <?php include("page_content_report_page.html"); ?>
    <!-- security -->
    <?php include("page_content_security_page.html"); ?>
    <!-- config -->
    <?php include("page_content_config_page.html"); ?>


    <!-- footer -->
    <footer class="main-footer">
        <div class="pull-right hidden-xs">
            <b>Version</b> 2.0.0
        </div>
        <strong>
            Copyright &copy; 
            <?php echo date("Y"); ?> 
            <a href="#">Nyola Mike</a>.
        </strong> 
        All rights reserved.
    </footer>  
</div>

<script>
    
    app.pages.master_page.menuLink = function(pageName){
        $(".for_role_module_"+pageName).on("click",function(event){
            //console.log($(this).hasClass("disabled_module"));

            //check if am not enabled
            if(!$(this).hasClass("disabled_module")){
                app.pages.master_page.loadPage(pageName);
                //make this link the active link
                $(".app_menu_item a").removeClass("activex");
                $(".for_role_module_"+pageName+ " a").addClass("activex");
            }
        });
    };
    app.pages.master_page.loadPage = function(pageName){
        if(typeof pageName == "undefined" || pageName == null || pageName.trim().length == 0){
            pagename = "default";
        }
        //hide all other pages
        $(".page_content").addClass("page_content_hidden");

        //I must have access to this page
        var isDisabled = $(".for_role_module_"+pageName).hasClass("disabled_module");
        if(!isDisabled){
            $("#page_content_"+pageName+"_page").removeClass("page_content_hidden");
            //menu item
            $(".app_menu_item a").removeClass("activex");
            $(".for_role_module_"+pageName+ " a").addClass("activex");
        }   
        //set this page as the current page
        this.setCurrentPage(pageName);
        if(this.loadedPages.indexOf(pageName) == -1){ //load page for the first time
            this.pages[pageName].load();
            this.loadedPages.push(pageName);
        }else{
            //this page has already been loaded
            if(this.pages[pageName].hasOwnProperty("onOpen")){
                this.pages[pageName].onOpen();
            }
        }
    };
    app.pages.master_page.getCurrentPage = function(){
        var page = localStorage.getItem("nnetego_current_content_page");
        if(page == null){
            page = "default";
        }
        return page;
    }
    app.pages.master_page.setCurrentPage = function(page){
        localStorage.setItem("nnetego_current_content_page",page);
    }
    app.pages.master_page.load = function(){
        //get system configurations
        app.pages.master_page.getSystemConfig(function(config){
            app.pages.master_page.master_page_header.load(); //load the header
            app.pages.master_page.master_page_side_bar.load(); //side bar
            var cp = app.pages.master_page.getCurrentPage();
            app.pages.master_page.loadPage(cp);
        });
    };
    app.pages.master_page.getSystemConfig = function(callback){
        if(app.config == null){
            //#load_tenant_config_code
            // var nec = {
            //     configs: {}
            // };
            bee.get(nec, function (hny) {
                if (hny._errors.length > 0) {
                    app.showErrors(hny._errors);
                    app.config = null;
                    callback(app.config);
                } else {
                    if(hny.configs.length > 0){
                        app.config = hny.configs[0];
                    }
                    if(app.config.name != null &&  app.config.name.length > 0 ){
                        $("#master_page_header_business_name_display").html(app.config.name);
                    }
                    callback(app.config);
                }
            });
        }else{
            callback(app.config);
        }
    };
</script>
