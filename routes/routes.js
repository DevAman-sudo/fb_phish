module.exports = function(app){

    // index page //
    app.get('/', (req, res) => {
        res.render('index');
    });
    
    
    
};