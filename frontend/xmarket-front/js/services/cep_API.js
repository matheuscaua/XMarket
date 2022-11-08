import request_API from "./request_API.js";

export default async function cep_API(cep){
    let endPoint = `https://viacep.com.br/ws/${cep}/json/`;
    let response;
    let dados;
    
    response = await request_API("GET", endPoint).catch(err => {return null});

    
    if(response == null || response.status != 200){
        return null;
    }
    
    dados = await response.json();
    
    return dados;

}