# docker
To start:

`docker build -t a1-301 .`

`docker run -d --name a1-301-container -p 80:80 a1-301:latest`

`docker start a1-301-container`

To stop/remove container:

`docker stop a1-301-container`

`docker rm a1-301-container`

# heroku
`heroku login`

`heroku create --app <app-server-name>`

`heroku container:login`

`heroku container:push web --app <app-server-name>`

`heroku container:release web --app <app-server-name>`

`heroku open --app <app-server-name>`

# Write your documentation below

# objective statement
1.	Actors will get blocking information from this web app so that they can check their blocking information clearly and prepare for rehearsal anytime and anywhere.
2.	Directors can show actors blocking directly and clearly. Also they can modify information easily in order to give actors information before rehearsal.
3.	Actors and directors will share blocking information easily. This web app can improve rehearsal efficiency significantly.
#personas
1.  Paul the Director  <br />
    Age: 40 <br />
    Background: Paul is a famous and experienced director.  He is too busy to present  for each rehearsal and performance. He is also interested in new Tech to improve working efficiency of theatre
2.	Anya the actress <br />
    Age: 23 <br />
    Background: as a young actress who just start her career, she hopes she can know blocking as early as possible in order to practice and prepare early. Also, she prefers high tech support rather than old traditional way.
3. Gary the actor    <br />
    age: 76          <br />
    Background: Gary is a experienced actor with a long and successful career . He is the treasure of  theater. However, he is aged and  cannot often present for  a long time rehearsal. 
    
#user stories   
1. As a busy and famous director, I want to be able to give my actors correct blocking information even though sometime I cannot present in rehearsal. So I can give actor directly and clearly information to ensure the quality of rehearsal and performances.
2. As a young and professional actor, I hope I can watch clearly blocking information everywhere also  in order to  some reduce misleading of directly getting blocking from stage manager or watch some paper drawing  blocking.
3. As a experienced  actor, I hope this web app  can help me get blocking information before rehearsal. It will save me a lot of time. Since I am very familiar with stage, A clear blocking will help me complete rehearsal faster.

#acceptance criteria
 For directos:
1. only directors can modify the blocking. For each blocking move, it can script and time to make sure the blocking's accuracy.<br />
             
2. It must be easy to used in  smart phones or tablet. So directors can put on new information everywhere. It must be updated in time.<br />
For actors:<br />

1.it not only show the information  of their own blockin  also show blocking of some actors who has position conflict and have related script. 
2.easy to read and can play position dynamically
#JSON
get: Based on UI's parameters, it's necessary to have script , start date and end date.  Also we need a list of dictionary to record actor's position. Each part is a dict and all part combine a list. Since in actor.js we ask for actor's id and in directors.js we ask for actor's name. In order to keep all database connection  in backend. I also decided to have a actor and id table. This make front end  can find name  through ID.  I think two different route for both name and ID is a better Idea. However we cannot add route in this assignment.<br />
post: Script num and  name-position array is good enough for this call. We can search file by script number and just change blocking in order. Because in director web we load information  ordered by  part number. So we don't need part number in this json. Also we can get script , start char and end char once we find the file. 
#Enhancements
Basically, I think Lighting designer is another work that is strongly connected to blocking.
With this app they can tell their design and thoughts to stuffs and directors easily and stuffs can follow these instruction to put light.
Just some modifies of this web app can make it a great light blocking app. 
actors change to different kind of light. Lighting designer can assign these light into blocks with accrate time. Everything can be show directly and dynamically.

#link
https://zhan2158xy.herokuapp.com/actor.html