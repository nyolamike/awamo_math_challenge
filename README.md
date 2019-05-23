# docker_php_bee
a dockarised php backend engine  

The front end application will be running at port 80  

# change git remote to your repo  
```
 git remote set-url  --add origin https://github.com/nyolamike/awamo_math_challenge.git  
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
"is_registration_public": true,  
"is_registration_offline": false,  
"sudo_delete":true,  



# application entities  
Configure Application Entities
```  
"operand_category":{
    "name":["vcnn",30],
    "description":["tn"]
},
"guess":{
    "operand_id":["fk"],
    "operation_id":["fk"],
    "will_be_correct": ["inn",30,0],
    "was_correct": ["inn",30,0],
    "score": ["dnn"]
},
"operand":{
    "operand_category_id":["vcnn",30],
    "name":["vcnn",30],
    "description":["tn"],
    "symbol":["vcnn",5]
},
"operation":{
    "num1":["dnn"],
    "num2":["dnn"],
    "operand_id":["fk"],
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


#demo _hidding data from response