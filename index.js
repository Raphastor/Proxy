
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const PlayerData = require('./jogoData.js');
const JogoData = require('./jogoData.js');

const io = new Server(server);

let numConexoesAtivas = 0;


let  jogoData = new JogoData();
const player = new PlayerData();


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); 
  app.use(express.static(__dirname + '/')); 
});

io.on('connection', (socket) => {
  console.log('Novo usuário conectado');
  numConexoesAtivas++;
  io.emit('atualizar_num_conexoes', numConexoesAtivas);  
  
  socket.emit('CriaPlayer', (jogoData));

  
   setInterval(() => {
     // Serializa o objeto jogoData como uma string JSON
    //const jogoDataJson = JSON.stringify(jogoData);
     socket.emit('AtualizaCliente', (jogoData));
   }, 60);
  
   socket.on('socketRecebeJogador', (player) => {  
    console.log("player = "+ JSON.stringify(player));
    jogoData.UpdatePlayer(jogoData, player);
    
    // faça algo com os dados recebidos do cliente
    //socket.emit('AtualizaEsteCliente', JSON.stringify(jogoData));
   });

  socket.on('disconnect', () => { 
    //Cria Array um novo array removendo o socket.id
    // const newPlayArray = jogoData.playerData.filter((player) => {
    //   return player.idUsuario !== socket.id;
    // });

    jogoData.playerData = jogoData.DeletePlayer(jogoData, socket.id);    
    //MataJogador(socket);    
    numConexoesAtivas--;
    io.emit('atualizar_num_conexoes', numConexoesAtivas);
  });  
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});