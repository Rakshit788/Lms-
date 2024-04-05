import { app } from './app.js';
import connectDB from './config/dbconnection.js';



const Port = 8112

app.listen(Port, async () => {
    
  await connectDB() ;
    console.log(`app is running at port ${Port}`);
});

