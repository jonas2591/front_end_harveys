
(async function () { //Retorna todas as transações do usuário
    const apiURL = 'http://api.harveys-cloud-mining.online'
    /*
    if(!(localStorage.getItem('jwt_token'))){
        window.location = apiURL
    }*/
    
    try{
        const request = await axios.get(`${apiURL}:3002/affiliate`, {
            headers: {
                'x-access-token': localStorage.getItem('jwt_token')
            }
        })
    
        $('#refer-length').text(`Referral: ${request.data.lengh_affiliates}`)
        $('#win-btc-refer').text(`Referred earnings BTC: ${request.data.btc_percentage_win}`)
        $('#win-trx-refer').text(`Referred earnings TRX: ${request.data.trx_percentage_win}`)
        $('#link-referal').val(`https://harveys-cloud-mining.online/index.html?referred=${request.data.my_affiliate_id}`)
        //console.log()
        request.data.users_and_percentage.map(function(r){
            $('#referal-users').append(`<tr><td data-label="Usuario">${r.userdata}</td><td data-label="Tempo registrado">${r.created_at_user}</td></tr>`)
        
        })

        request.data.users_and_percentage.map(function(r){
            $('#referal-transactions').append(`<tr><td data-label="Usuario">${r.userdata}</td><td data-label="Comissao">${r.percentage}</td><td data-label="Tipo de criptomoeda">${r.wallet_cripto_name}</td><td data-label="Data/hora">${r.created_at_transaction}</td></tr>`)
        })
        
       

    }catch(err){
        console.log(err)
        localStorage.removeItem('jwt_token')
        window.location = 'index.html'
    }
})()