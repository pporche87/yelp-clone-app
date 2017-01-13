#Comment New/Create 
* Discuss nested routes 
* Add the comment new and create routes 
* Add the new comment form 


RESTFUL ROUTES 

name        url         verb        desc. 
===============================================================
INDEX       /dogs       GET         Display a list of all dogs 
NEW         /dogs/new   GET         Displays form to make a new dog 
CREATE      /dogs       POST        Add new dog to DB 
SHOW        /dogs/:id   GET         Shows info about one dog 

INDEX       /hangryhacks
NEW         /hangryhacks/new
CREATE      /hangryhacks
SHOW        /hangryhacks/:id

NEW         /hangryhacks/:id/comments/new   GET
CREATE      /hangryhacks/:id/comments       POST