const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    // console.log(req.url );
    const method = req.method;
    if(req.url === '/'){
    res.setHeader('content-type', 'text/html');
    res.write('<html><body><form method="POST" action = "message"><input type="text"></input><button type="submit" name="message">Send</button></form></body></html>')
    return res.end();
    }
    console.log(req.url + "   " + method);
    
    if(req.url === '/message' && method === 'POST'){
        const req_body = [];
        req.on('data',(chunk)=>{
            console.log(chunk);
            req_body.push(chunk);
                
        });
        req.on('end', ()=>{
            console.log(req_body);
            const parsebody = Buffer.concat(req_body);
            console.log(parsebody.toString());   

        });

        fs.writeFileSync('message.txt','dummy data');
        res.statusCode = 302;
        res.setHeader('Location', '/')
        return res.end();
    }
   // res.write('<html><body><h1>hello node js </h1></body></html>')

});
server.listen(5000);