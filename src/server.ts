import http from 'http'
import fs from 'fs'
import path from 'path'
// Check the README.md file for instructions to the exercise
const FILE_PATH = path.join(__dirname, '../dist/images','veryhappydog.jpg')
const server = http.createServer(
    (req:http.IncomingMessage, res:http.ServerResponse)=>{

        if(req.url ==="/"&&req.method==="GET"){
            res.writeHead(200, {'content-type':'text/plain'})
            res.end('Home')
            return
        }
        
        if(req.url==="/view-image"){
            fs.readFile(FILE_PATH,(err, data)=>{
                if(err){
                    res.writeHead(500, {'content-type':'text/plain'})
                    res.end(`Error reading file: ${err}`)
                    return
                }
                res.writeHead(200,{'content-type':'image/jpeg'})
                res.end(data||'File is empty')
            })
            return
        }
        res.writeHead(404, {'content-type':'text/plain'})
        res.end("Page not found")

    }
)

const PORT = 3000
server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})