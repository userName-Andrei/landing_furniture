const request = async ({url, body, method}) => {
    if(method == 'POST'){
        let response = await fetch(url, {
            headers: {
                'Content-type': 'application/json'
            },
            body: body,
            method: method
        });
    
        if(!response.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await response.json();
    } else {
        let response = await fetch(url);
    
        if(!response.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await response.json();
    }
    
};

export default request;