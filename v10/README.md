#Editing Campgrounds 
* Add Method-Override 
* Add Edit Route for Hangryhacks 
* Add Link to Edit Page 
* Add Update Route 

#Deleting Campgrounds
* Add Destroy Route 
* Add Delete button

#Authorization Part 1: Campgrounds 
* User can only edit his/her hangryhacks 
* User can only delete his/her hangryhacks
* Hide/Show edit and delete buttons

#Editing Comments 
* Add Edit route for comments
* Add Edit button 
* Add update route 

Campground Edit Route <!--/hangryhacks/:id/edit-->
Comment Edit Route <!--/hangryhacks/:id/comments/:comment_id/edit-->

#Deleting Comments 
* Add Destroy route 
* Add Delete button 

Campground Destroy Route: <!--/hangryhacks/:id--> 
Comment Destroy Route: <!--/hangryhacks/:id/comments/:comment_id-->

#Authorization Part 2: Comments 
* User can only edit his/her comments 
* User can only delete his/her comments 
* Hide/Show edit and delete buttons 
* Refactor Middleware 
