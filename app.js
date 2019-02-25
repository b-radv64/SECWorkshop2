const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({sxtended: false}));

app.use(bodyParser.json());

const url = 'mongodb://Nick:SecWorkshop2@ds133202.mlab.com:33202/nasa-missions';

const databasename = 'nasa-missions';

MongoClient.connect(url, function(err, client){
    if(err){
        console.log(err);
    }

    const db = client.db(databasename);

    app.get('/', function(req, res) {
        res.status(200).json({message: "Welcome to the NASA missions api"});
    })

    app.get('/missions', function(req, res){
        db.collection('missions')
            .find()
            .toArray(function(err, doc){
                if(err){
                    console.error(err);
                    res.status(500).json({message: "Houston we have a problem"})
                }
                else{
                    res.status(200).json(doc);
                }

            });
    });

    app.post('/missions', function(req, res){
        const mission = req.body;
        db.collection('mission')
            .insert(mission,
                function(err, result){
                    if(err){
                        console.error(err);
                        res.status(500).json({message: "An error has occured"});
                    }
                    else{
                        res.status(200).json(result);
                    }

                });
    })
    
    app.listen(9000, () => {
        console.log('NASA Server launched on port 9000');
    });
});