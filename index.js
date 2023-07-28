const express = require('express');
const app = express();


const getDatasetRoutes = require("./routes/getDatasetRoutes")

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(express.static('public'))

app.use('/', getDatasetRoutes)

app.listen(3000, function() {
    console.log('Servidor ouvindo na porta 3000');
});
