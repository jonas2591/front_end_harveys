
(function () { //verifica se o usuário já está logado
    if(!(localStorage.getItem('jwt_token'))){
        window.location = 'https://harveys-cloud-mining.online'
    }
})()

var soundConfirm = new Audio('../js/sounds/confirm.wav');
const apiURL = 'http://api.harveys-cloud-mining.online'

function tipo(nr) {
    if (typeof nr == 'string' && nr.match(/(\d+[,.]\d+)/)) return 'string decimal';
    else if (typeof nr == 'string' && nr.match(/(\d+)/)) return 'string inteiro';
    else if (typeof nr == 'number') return nr % 1 == 0 ? 'numero inteiro' : 'numero decimal';
    else return false;
}



function isLetter(str) {
    if(str.match(/[-+@!#$%^&*()/\\a-zA-Z]/) === null){
        return true
    }else{
        return false
    }
    
}


(async function(){
    try{
        const request = await axios.get(`${apiURL}:3002/dashboard`, {
            headers: {
                'x-access-token': localStorage.getItem('jwt_token')
            }
        })
        $('#btc-balance').text(`Balance: ${request.data[0].wallet_user_data[0].btc_balance} BTC`)
        $('#trx-balance').text(`Balance: ${request.data[0].wallet_user_data[0].tron_balance} TRX`)
    }catch(err){
        console.log(err)
        localStorage.removeItem('jwt_token')
        window.location = 'index.html'
    }
   
})()


$("#withdraw-btc").click(async function() {

    try{
        const walletAddressBTC = document.getElementById('wallet-address-btc').value
        const value_transaction = document.getElementById('value-withdraw-btc').value

        if(!isLetter(value_transaction)){
            alert('Invalid transaction amount')
        }

        if(isLetter(value_transaction)){
            const request = await axios.post(`${apiURL}:3002/transaction`, {"transaction_type": "withdraw", "wallet_type":"BTC", "destination_wallet": walletAddressBTC, "value_transaction": value_transaction}, {
                headers: {
                    'x-access-token': localStorage.getItem('jwt_token')
                }
            })
            if(request.data.error){
                alert(request.data.error)
            }
            if(request.data.message === 'successful withdrawal!'){
                soundConfirm.play();
                alert(request.data.message)
                location.reload()
            }else{
                if(request.data.message){
                    alert(request.data.message)
                    location.reload()
                }
            }

            
        }

    }catch(err){
        console.log(err)
    }
    
});



$("#withdraw-trx").click(async function() {

    try{
        const walletAddressBTC = document.getElementById('wallet-address-trx').value
        const value_transaction = document.getElementById('value-withdraw-trx').value

        if(!isLetter(value_transaction)){
            alert('Invalid transaction amount')
        }

        if(isLetter(value_transaction)){
            const request = await axios.post(`${apiURL}:3002/transaction`, {"transaction_type": "withdraw", "wallet_type":"TRX", "destination_wallet": walletAddressBTC, "value_transaction": value_transaction}, {
                headers: {
                    'x-access-token': localStorage.getItem('jwt_token')
                }
            })
            if(request.data.error){
                alert(request.data.error)
            }
            if(request.data.message === 'successful withdrawal!'){
                soundConfirm.play();
                alert(request.data.message)
                location.reload()
            }else{
                if(request.data.message){
                    alert(request.data.message)
                    location.reload()
                }
            }
        }

    }catch(err){
        console.log(err)
    }
    
});