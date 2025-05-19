

// // process.on('exit', function(){
    
// // })

// const {EventEmitter} = require('events');
// const eventEmitter = new EventEmitter();

// eventEmitter.on('lunch', () => {
//     console.log('yum');
// })

// eventEmitter.emit('lunch');
// eventEmitter.emit('lunch');


// const {readFile, readFileSync} = require('fs');

// // const txt = readFileSync('./hello.txt', 'utf8')

// // console.log(txt)

// readFile('./hello.txt', 'utf8', (err, txt) => {
//     console.log(txt);
// })

// console.log('do project quick')


const {readFile} = require('fs').promises;

async function hello(){
    const file = await readFile('./hello.txt', 'utf8');
}


const express = require('express');

const app = express();

app.get('/', async (request, response) => {
    // readFile('./check.html', 'utf8', (err, html) => {

    //     if (err){
    //         response.status(500).send('sorry out of order')
    //     }

    //     response.send(html)



    // })

    response.send(await readFile('./check.html', 'utf8'))

});


app.listen(process.env.PORT || 3000, () => console.log('server is running on port 3000'));
