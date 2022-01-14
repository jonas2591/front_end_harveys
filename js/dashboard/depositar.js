
(function () { //verifica se o usuário já está logado
    if(!(localStorage.getItem('jwt_token'))){
        window.location = 'https://harveys-cloud-mining.online'
    }
})()

function percentage(percent, total) {
    return ((percent/ 100) * total).toFixed(2)
}
const apiURL = 'http://api.harveys-cloud-mining.online'
const ghs = 0.01

setInterval(function () {
    
    if((document.getElementById('buy-ghs-btc-input').value).length > 1){
        const valueForBuyBtc = document.getElementById('buy-ghs-btc-input').value
        document.getElementById('ghs-to-usd-btc').innerHTML = `${(ghs * parseInt(valueForBuyBtc)).toFixed(2)} USD`
        document.getElementById('usd-per-day-btc').innerHTML = `Per day: ${percentage(6, (ghs * parseInt(valueForBuyBtc)))} USD`
    }
    if((document.getElementById('buy-ghs-btc-input').value).length == 0){
        document.getElementById('ghs-to-usd-btc').innerHTML = `0 USD`
        document.getElementById('usd-per-day-btc').innerHTML = `Per day: 0 USD`
    }
}, 100);



setInterval(function () {
    if((document.getElementById('buy-ghs-trx-input').value).length > 1){
        const valueForBuyBtc = document.getElementById('buy-ghs-trx-input').value
        document.getElementById('ghs-to-usd-trx').innerHTML = `${(ghs * parseInt(valueForBuyBtc)).toFixed(2)} USD`
        document.getElementById('usd-per-day-trx').innerHTML = `Per day: ${percentage(6, (ghs * parseInt(valueForBuyBtc)))} USD`
    }

    if((document.getElementById('buy-ghs-trx-input').value).length == 0){
        document.getElementById('ghs-to-usd-trx').innerHTML = `0 USD`
        document.getElementById('usd-per-day-trx').innerHTML = `Per day: 0 USD`
    }
}, 100);


$("#button-buy-ghs-for-btc").click(async function() {

    var soundConfirm = new Audio('../js/sounds/confirm.wav');
    try{
        const request = await axios.post(`${apiURL}:3002/transaction`, {"transaction_type": "deposit", "ghs_value": document.getElementById('buy-ghs-btc-input').value, "type_wallet": "BTC"}, {
            headers: {
                'x-access-token': localStorage.getItem('jwt_token')
            }
        })

        if(request.data.wallet){
            $("#button-buy-ghs-for-trx").attr('disabled','disabled');
            $("#button-buy-ghs-for-trx").attr('disabled','disabled');
            $(".modal-transaction").css("display", "block");
            soundConfirm.play();
            $("#wallet-deposit").text(request.data.wallet)
            $("#message-value").text(`Deposit ${request.data.value_transaction} BTC in wallet:`)
            //LOOOP QUE VAI FICAR VERIFICANDO SE A TRANSAÇÃO JÁ FOI PAGA, SE FOI ELE RETORNA A DIV DE PAGAMENTO CONFIRMADO
            const idTransaction = request.data.id_transaction

            setInterval(async function () { //Verifica se o pagamento ja foi confirmado
                const requestVerifyTransact = await axios.post(`${apiURL}:3002/transaction/verify`, {"id_transaction": idTransaction}, {
                    headers: {
                        'x-access-token': localStorage.getItem('jwt_token')
                    }
                })
                if(requestVerifyTransact.data.status === 'success'){
                    $("#transaction-id").text(`Transaction ID: ${idTransaction}`)
                    $(".modal-transaction").css("display", "none");
                    $(".modal-approved").css("display", "block");
                }
            }, 1000);
        }
        if(request.data.error){
            alert('minimum value is 1000 GH/s')
        }
    }catch(err){
        console.log(err)
        localStorage.removeItem('jwt_token')
        window.location = 'index.html'
     }
});


$("#button-buy-ghs-for-trx").click(async function() {
   
    var soundConfirm = new Audio('../js/sounds/confirm.wav');
    try{
        const request = await axios.post(`${apiURL}:3002/transaction`, {"transaction_type": "deposit", "ghs_value": document.getElementById('buy-ghs-trx-input').value, "type_wallet": "TRX"}, {
            headers: {
                'x-access-token': localStorage.getItem('jwt_token')
            }
        })

        if(request.data.wallet){
            $("#button-buy-ghs-for-trx").attr('disabled','disabled');
            $("#button-buy-ghs-for-trx").attr('disabled','disabled');
            console.log(request.data.value_transaction)
            $(".modal-transaction").css("display", "block");
            soundConfirm.play();
            $("#wallet-deposit").text(request.data.wallet)
            $("#message-value").text(`Deposit ${request.data.value_transaction} TRX in wallet:`)
            //LOOOP QUE VAI FICAR VERIFICANDO SE A TRANSAÇÃO JÁ FOI PAGA, SE FOI ELE RETORNA A DIV DE PAGAMENTO CONFIRMADO
            const idTransaction = request.data.id_transaction

            setInterval(async function () { //Verifica se o pagamento ja foi confirmado
                const requestVerifyTransact = await axios.post(`${apiURL}:3002/transaction/verify`, {"id_transaction": idTransaction}, {
                    headers: {
                        'x-access-token': localStorage.getItem('jwt_token')
                    }
                })
                if(requestVerifyTransact.data.status === 'success'){
                    $("#transaction-id").text(`Transaction ID: ${idTransaction}`)
                    $(".modal-transaction").css("display", "none");
                    $(".modal-approved").css("display", "block");
                }
            }, 1000);
        }
        if(request.data.error){
            alert('minimum value is 1000 GH/s')
        }
    }catch(err){
        console.log(err)
        localStorage.removeItem('jwt_token')
        window.location = 'index.html'
     }
});


$("#close-modal-approval").click(async function() {
    $(".modal-approved").css("display", "none");
})

$("#close-modal-pending").click(async function() {
    $(".modal-transaction").css("display", "none");
    
})