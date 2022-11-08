export default async function request_API_imagem(endPoint, body){
    let init, response;

    init = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        referrerPolicy: 'no-referrer',
        body: body
    }
    response = await fetch(endPoint, init);

    return response;
}