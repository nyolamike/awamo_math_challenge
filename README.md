# docker_php_bee
a dockarised php backend engine  

 

# Assumptions  
* The front end application will be running at port 80  
* You have installed git and created and empty repo online for your project  
* You have installed docker, you have shared the directory where project is to be created and docker is running  
* You have some knowledge of json and javascript  

# Clone the php BEE(back end engine) docker project  
```  

```  


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



#demo _hidding data from response

# future improments  
- database migrations  
