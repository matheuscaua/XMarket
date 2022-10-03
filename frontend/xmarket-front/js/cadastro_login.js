export default async function login_service(){
    
    var endPoint ="https://fakestoreapi.com/products"
    
    var dados = {
        
    }

    const init = {
        method: "POST",
        headers: {

        },
        body: JSON.stringify(cadastro),
    }

    await fetch(endPoint)
        .then(function(response){
            return response.json()
        } )
        .then(function(data){
           dados = data

        }).catch(eer => console.log(eer))
    
    return dados;

}
