const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

MongoClient.connect('mongodb+srv://test:sparta@cluster0.hwebk.mongodb.net/?retryWrites=true&w=majority', function (err, client){

    if(err) return console.log(err)
    db = client.db('todoapp');

    app.listen(3000, function () {
    console.log('listening on port 3000')
});

})



app.get('/pet', function (req, res) {
    res.send('펫 용품 사이트 입니다.');
});

app.get('/beauty', function (req, res) {
    res.send('뷰티용품 사이트 입니다.');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/write', function (req, res) {
    res.sendFile(__dirname + '/write.html');
});



app.post('/add', function (req, res) {
    res.send('전송완료');
    db.collection('counter').findOne({name : '게시물 갯수'}, function(err, result){
        let totalPostNum = result.totalPost;

        db.collection('post').insertOne( { _id: totalPostNum + 1, 제목 : req.body.title, 날짜 : req.body.date} , function(err, result){
            console.log('저장완료');
            db.collection('counter').updateOne({name : '게시물 갯수'},{ $inc : {totalPost:1} }, function(err, result){
                if(err){return console.log(err)}
            })
        });


    });
});


app.get('/list', function(req, res){

    db.collection('post').find().toArray(function(err, result){
        console.log(result);
        res.render('list.ejs', { posts : result });
    });
});