const soap = require("soap")

module.exports = class getDatasetController {

    static async getDataset(req, res) {
        const url = '{{URL SERVIDOR}}/webdesk/ECMDatasetService?wsdl';

        soap.createClient(url, function (err, client) {
            if (err) {
                console.log("Erro ao criar cliente SOAP:", err);
                res.status(503).json({message: "Client Soap fora"});
                return;
            }

           
            const obj = {
                username: "",
                password: "",
                companyId: "",
                name: req.body.dataset,
                fields: "",
                constraints: "",
                order: "",
            }

            client.getDataset(obj, function (err, result) {
                if (err) {
                    console.log(err)
                    res.status(503).json({message: "Não foi possível consultar o dataset"});
                    return;
                }
                
                const colunas = result.dataset.columns
                const dsValues = result.dataset.values
                let valores = []
                

                for(let p = 0; p < dsValues.length; p++){
                    let objValores = {}
                    for(let i = 0; i < dsValues[p].value.length; i++){
                        objValores[[colunas[i]]] = dsValues[p].value[i]['$value']
                    }

                    valores.push(objValores)
                }


                const objRetorno = {
                    columns: colunas,
                    values: valores
                }

                res.status(200).json(objRetorno);
            });
        });
    }
}