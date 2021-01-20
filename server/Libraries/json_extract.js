
const fs = require("fs"); 
  
let obj = {}

fs.readFile(
    'log_result.txt',
    'utf8',
    function(err,data) {
        if(err) throw err;
        let splitted = data.toString().split("\r\n");
        splitted = splitted.filter(item => item != ' ');
        for (let i = 0; i<splitted.length; i++) {
            let splitLine = splitted[i].split();
            splitLine = splitLine.filter(item => item != ' ')
            console.log(splitLine)
            obj[splitLine[i]] = splitLine[i+1];
        }
        console.log(obj);
        // Writing to a file 
        fs.writeFile("test.json", JSON.stringify(obj), err => { 
            
            // Checking for errors 
            if (err) throw err;  
        
            console.log("Done writing"); // Success 
        }); 
        
    }
);
  
