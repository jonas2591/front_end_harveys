(async function () { //Retorna todas as transações do usuário
    const apiURL = 'http://api.harveys-cloud-mining.online'
    if(!(localStorage.getItem('jwt_token'))){
        window.location = 'https://harveys-cloud-mining.online'
    }
    
    try{
        const request = await axios.get(`${apiURL}:3002/transaction/all`, {
            headers: {
                'x-access-token': localStorage.getItem('jwt_token')
            }
        })
    
        console.log(request.data.allTransactions)
        
        const allTransactions = request.data.allTransactions.map(function (res) {
            if(res.wallet_cripto_name == 'BTC'){
                if(res.link_transaction != 'wait'){
                    $("#historic-transactions").append(`<tr><td data-label="ID">#${res.id}</td><td data-label="Transaction Type">${res.transaction_type}</td><td data-label="Wallet Address" style='overflow: scroll;'>${res.wallet_crypto}</td><td data-label="Crypto Name">${res.wallet_cripto_name}</td><td data-label="Value Transaction">${res.value_transaction}</td><td data-label="TxID" style='overflow: scroll;'><a href='https://www.blockchain.com/btc/tx/${res.link_transaction}' target="_blank" style='border-bottom:solid 2px #fff;'>${res.link_transaction}</a></td><td data-label="GH/s">${res.ghs}</td><td data-label="Status">${res.status}</td><td data-label="Created_at">${res.created_at}</td></tr>`);
                }
                if(res.link_transaction == 'wait'){
                    $("#historic-transactions").append(`<tr><td data-label="ID">#${res.id}</td><td data-label="Transaction Type">${res.transaction_type}</td><td data-label="Wallet Address" style='overflow: scroll;'>${res.wallet_crypto}</td><td data-label="Crypto Name">${res.wallet_cripto_name}</td><td data-label="Value Transaction">${res.value_transaction}</td><td data-label="TxID" style='overflow: scroll;'><a href='#' target="_blank" style='border-bottom:solid 2px #fff; overflow: scroll;'>${res.link_transaction}</a></td><td data-label="GH/s">${res.ghs}</td><td data-label="Status">${res.status}</td><td data-label="Created_at">${res.created_at}</td></tr>`);
                
                }
                
            }
            if(res.wallet_cripto_name == 'TRX'){
                if(res.link_transaction != 'wait'){
                    $("#historic-transactions").append(`<tr><td data-label="ID">#${res.id}</td><td data-label="Transaction Type">${res.transaction_type}</td><td data-label="Wallet Address" style='overflow: scroll;'>${res.wallet_crypto}</td><td data-label="Crypto Name">${res.wallet_cripto_name}</td><td data-label="Value Transaction">${res.value_transaction}</td><td data-label="TxID" style='overflow: scroll;'><a href='https://tronscan.org/#/transaction/${res.link_transaction}' target="_blank" style='border-bottom:solid 2px #fff; overflow: scroll;'>${res.link_transaction}</a></td><td data-label="GH/s">${res.ghs}</td><td data-label="Status">${res.status}</td><td data-label="Created_at">${res.created_at}</td></tr>`);
                }
                if(res.link_transaction == 'wait'){
                    $("#historic-transactions").append(`<tr><td data-label="ID">#${res.id}</td><td data-label="Transaction Type">${res.transaction_type}</td><td data-label="Wallet Address" style='overflow: scroll;'>${res.wallet_crypto}</td><td data-label="Crypto Name">${res.wallet_cripto_name}</td><td data-label="Value Transaction">${res.value_transaction}</td><td data-label="TxID" style='overflow: scroll;'><a href='#' target="_blank" style='border-bottom:solid 2px #fff; overflow: scroll;'>${res.link_transaction}</a></td><td data-label="GH/s">${res.ghs}</td><td data-label="Status">${res.status}</td><td data-label="Created_at">${res.created_at}</td></tr>`);
                
                }
            }
            
            //return res
        })


    }catch(err){
        console.log(err)
        localStorage.removeItem('jwt_token')
        window.location = 'index.html'
    }
})()