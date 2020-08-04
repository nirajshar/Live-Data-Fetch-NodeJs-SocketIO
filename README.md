Hassle free, Fetch & show Live Data from Mysql / SqlServer using Node.JS & Socket.IO 

Socket.IO : 
To connect web socket connection with server which will emit data every second from DB.

/getLiveData :
Endpoint to check connection is ready we can fetch Data from DB.

Query :
SELECT * FROM node_test.View_Pending  - MySQL query to Fetch data from DB (VIEW)

getLiveData :
Socket name from which we listen & emit data to & fro

UI :
Can export to CSV 
Can start / stop listening to data (Switch)
Can search data from table

![alt Live_Data](https://github.com/nirajshar/Live-Data-Fetch-NodeJs-SocketIO/blob/master/Live%20Data%20Fetch.jpg)