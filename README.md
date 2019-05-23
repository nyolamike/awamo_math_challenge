# docker_php_bee
a dockarised php backend engine  

# Inspiration  
https://awamodevprac.firebaseapp.com/  

 

# Assumptions  
* The front end application will be running at port 80  
* You have installed git and created and empty repo online for your project  
* You have installed docker, you have shared the directory where project is to be created and docker is running  
* You have some knowledge of json and javascript  

# Clone the php BEE(back end engine) docker project  
```  
git clone https://github.com/nyolamike/docker_php_bee.git  
```  
delete the read me files from db folder as this must be empty  



# Change git remote to your repo  
```
 git remote set-url --add origin https://github.com/nyolamike/awamo_math_challenge.git  
 git remote set-url --delete origin https://github.com/nyolamike/docker_php_bee.git  
 verify that we are pointing to the right repo  
 git remote -v  
```  


# Basic _hive.json edits  
Delete the accounting section  
add the following settings  
```  
"hive_of_a":"maths",
"app_name": "mcp",
```  
make sure the following match  
```  
"is_registration_public": true,  
"is_registration_offline": false,  
"sudo_delete":true,  
```  



# application entities  
Configure Application Entities
```  
"operator_category":{
    "name":["vcnn",30],
    "description":["tn"]
},
"guess":{
    "operator_id":["fk"],
    "operation_id":["fk"],
    "will_be_correct": ["inn",30,0],
    "was_correct": ["inn",30,0],
    "score": ["dnn"]
},
"operator":{
    "operator_category_id":["vcnn",30],
    "name":["vcnn",30],
    "description":["tn"],
    "symbol":["vcnn",5]
},
"operation":{
    "operand1":["dnn"],
    "operand2":["dnn"],
    "operator_id":["fk"],
    "expected": ["dnn"],
    "response": ["dnn"],
    "was_correct": ["inn",30,0],
    "operation_id": ["inn",30,0],
    "guess_id": ["fk"],
    "_comments":[
        "was_correct: indicates wether the operation was correct, try -> passed on ui",
        "operation_id: the parent operaation, important for tree operations",
        "guess_id: needs a guess_id"
    ]
},     
```  

# Seeding  
because we are not going to do an interface for entering categories  
```  
"operator_categories":[{  
    "name":"unnary",  
    "description":"works on one operands"  
},{  
    "name":"binary",  
    "description":"the order in which the numbers are added does not matter"  
}]  
```  



# Docker compose  
run the command below from the projects root where the docker-compose.yml file is, to get our backend up and running  
```  
docker-compose up  
```   
this will download and cache mysql, phpmyadmin images if you have never pulled then before, if you already done this this will be faster  
also it will build our backend image using the Dockerfile, in the end the following containers will be running our services  
* mysql -from localhost:8888  
* phpmyadmin -from localhost:8080  
* bee -from localhost:8989  
each is service is running in its on container, but thats all i can say for docker, since this is not a talk about docker  

# Access our services  
Mysql -in another the terminal enter  
```  
docker exec -it mysql_cnt bash  
mysql -u root -p  
```  
use mysql-2015 as the password and run some db queries e.g  
```  
show databases;  
```  
Phpmyadmin -go the broswer and enter the following url  
```  
http://localhost:8080/  
```  
login using  
server --> mysql_srv  
username -->  root  
password ---> qwerty  
You will see that our database is prity much empty  
Bee -go the broswer and enter the following url  
```  
http://localhost:8989/?q=eyJfZl9iZWUiOnt9fQ==  
```  
Explain the url (l2p 1)  
Explain the response  
Go to php my admin and see that the master db has been created  


# And thats our back end  
show slide, now the rest of the action is for the front end  
now almost all your devs can do fe work, cutting dev time woooow 

# Get the UI template file from  
//nyd  

# Update Our docker file with ui

# Bee js (beejs_important_code)  
just a simple xmlhttp request rapper but any http client will do  

# Base Url to backend engine (env_base_url_code)  
set up our base url to poin to the backend end engine  

# Docker Compose Ui configs  
```  
  ui_srv:
    container_name: ui_cnt
    image: ui_img
    build: 
      context: ./
      dockerfile: ./ui/Dockerfile
    volumes:
      - ./ui:/var/www/html/
    ports:
      - 80:80
    depends_on: 
      - bee_srv
    env_file: ./ui/.env
    environment:
      api_base_url: http://localhost:8989/
```  
now stop docker by pressing ```ctr + z````  
run docker-compose again and we have a ui container  
go localhost:80 to see the curren ui  

# All native engine functionality begins with under score _  
* tenant registration
* login
* account activation
* password reset request
* password reset
* updating password
* request bundlling
* open basic data



# Request bundling (julz_power_bundling)  
Use this feature to load prerequisite data thats needed for forms, ui, display etc  
```
var inec = {
    _julz:{
        _gets:[
            { _f_bee:{}},
            {_f_modules:{}},
            {_f_permissions:{}},
            {_f_countries:{}}
        ],
        _posts:[
            { 
                "operator_categories":[{
                    "name":"unnary",
                    "description":"works on one operands"
                },{
                    "name":"binary",
                    "description":"the order in which the numbers are added does not matter"
                }]
            },
            //post some thing else here etc
        ],
        _updates:[ ... ],
        _delete: [ ... ]
    }
}
```

# Register Tenant (register_tenant_code)  
This will create a db for the tenant, make this user a super user, send him an activation link  
```  
{
    _f_register: {
        name: "tenants first and last name",
        app_name: "organisations name",
        email: "of the person registering their organisation",
        phone_number: "of the person registering their organisation",
        country: "of the tenant",
        password: "tenants password"
    }
}
```  


# Account activation (activate_code)
```  
{  
    _f_activate: {  
        app_name: "tenants organisations name",  
        hive_id: "teanant",  
        code: "activation code sent to email or sms"  
    }  
}  
``` 

# Login (login_code)  
all users of the system from all tenants have their accounts partially managed at the master db  
so the tenant db will be picked by the enginee  
```  
{
    _f_login:{
        email: "users email",
        password: "users password"
    }
}
```  

# Recover/ request password reset (recover_code)  
A reset code is sent to this email  
```  
{
    _f_recover: {
        email: "email to send reset code"
    }
}
```  

# Reset password  
```  
{
    _f_reset: {
        hive_name: "name of tenant",
        user_id: "the user id",
        code: "the reset code",
        password: "the new password"
    }
};
```  


# Load Tenants application configurations (load_tenant_config_code)  
```  
{
    configs: {}
};
```  


# Update password (update_password_code)  
You cannot execute this unless you are logged in   
```  
{
    _f_password: {
        old_password: "the old password/ current password",
        new_password: "the new password",
        confirm_password: "the confirm password"
    }
};
```  











# demo _hidding data from response  

# future improments  
- database migrations  
- cross db queries (back officee)  
- other data formats like xml, yaml, toml etc  
- _url to make xternal requests  


# hopes  
- to build a cloud platform like firebase where app backends cand be easily  
bootstrapped and store for people their data  
- create the (Not Your Object Query Language), as a specification for requesting data from datasources  
