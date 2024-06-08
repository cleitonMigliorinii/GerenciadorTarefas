import { Nfe, AMBIENTE_HOMOLOGACAO } from "sdk-cloud-dfe/dist";

async function nfeStatus() {

    try{
        // DEFINIÇÕES DOS PARAMETROS BASICOS DA CLASSE

        const config = {
            ambiente: AMBIENTE_HOMOLOGACAO,
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbXAiOiJ0b2tlbl9leGVtcGxvIiwidXNyIjoidGsiLCJ0cCI6InRrIn0.Tva_viCMCeG3nkRYmi_RcJ6BtSzui60kdzIsuq5X-sQ",
            options: {
                timeout: 60,
                port: 443,
            //utilizar quando for utilizar o SDK por npm ou yarn 
            configPath: "./src/config.json"
            }
        }

        // INSTANCIE A CLASSE PARA A OPERAÇÃO DESEJADA

        const nfe = new Nfe(config)

        // REALIZE A OPERAÇÃO DESEJADA

        const resp = await nfe.status()

        // resp RETORNA O OBJETO DE RETORNO DA API

        console.log(resp)

    } catch (error) {

        console.error("Ocorreu um erro:", error);

    }

}

// EXECUTA A FUNCÃO CRIADA

nfeStatus()