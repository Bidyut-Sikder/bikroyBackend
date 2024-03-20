const app = require("./app");
require("dotenv").config()






 
 

  

 





app.listen(process.env.RUNNING_PORT, () => {
   console.log("runnig on port " + process.env.RUNNING_PORT)

})
