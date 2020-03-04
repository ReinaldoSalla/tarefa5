export class HttpService {
    _handleErrors(res) {
        if(!res.ok) console.log(`Error ${res.statusText}`);
        return res;
    }

    get(url) {
        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
        
    }
    
    post(url, dado) {
        return fetch(url, {
            headers: { 'Content-type' : 'application/json'},
            method: 'post',
            body: JSON.stringify(dado)
        })
    }

    delete(url) {
        return fetch(url, {
            method: "delete"
        }) 
    }
}