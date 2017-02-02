// importando o módulo express
const express = require('express');

// criando uma instância do express
const app = express();

// criando o servidor http para a nossa app
const server = require("http").Server(app);

// importando o Socket.io e executando-o passando nosso server
// como parâmetro
const io = require("socket.io").listen(server);

// importando o módulo path do node
const path = require('path');

// definindo a pasta public como o local onde o front-end reside
app.use(express.static(path.join(__dirname, "public")));

// ouvindo o evento 'connection' no servidor e criando um novo
// socket para cada nova conexão
io.on("connection", socket => {
    console.log('user connected');
    socket.on("mensagem_mano", msg => {
        console.log('enviando msg', msg);
        io.emit("mensagem_mano", msg);
    });
});

// importando nosso arquivo de rotas e executando-o imediatamente 
// depois com a instância do Express sendo passada por parâmetro
const routes = require("./routes/routes.js")(app);

server.listen(3000, () =>
    console.log("Listening on port %s...", server.address().port));