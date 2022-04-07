let express = require('express');
let app = express();
let expressWs = require('express-ws')(app);
let bcrypt = require('bcrypt');
let bP = require('body-parser');

let port = process.env.PORT || 8080;
let users = [],
data = {};
app.use(express.static('public'))
app.use(bP.urlencoded({extended : true}));
app.use(bP.json());
app.use(function (req, res, next) {
    return next();
  });

app.set('views', './views' )
app.set('view engine', 'ejs')
app.get('/', function(req, res){
    res.render('canvas',{data:data});
  });

let recent = 'empty';
app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
        if(msg == 'new') {
            ws.send(recent)
        } else {
            recent = msg
            expressWs.getWss().clients.forEach(client => {
                client.send(recent)
            })
        }
    });
})

app.listen(port, () => {
    console.log('App listening on http://localhost:' + port)
})
