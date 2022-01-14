
(function () { //verifica se o usuário já está logado
    if(!(localStorage.getItem('jwt_token'))){
        window.location = 'https://harveys-cloud-mining.online'
    }
})()


function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}
const apiURL = 'http://api.harveys-cloud-mining.online'

function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds;
}

async function setNextPayment(timestamp_after_24_hr, id){
    $(`#${id}`).text(`${msToTime(timestamp_after_24_hr - new Date().getTime())}`);
    await delay(1000)
    await setNextPayment(timestamp_after_24_hr, id)
}


(async function(){

    if(localStorage.getItem('jwt_token').length > 0){
        
        try{
            const request = await axios.get(`${apiURL}:3002/dashboard`, {
            headers: {
                'x-access-token': localStorage.getItem('jwt_token')
            }
            })


            const allTransactions = request.data[0].allTransac[0].allTransaction.map(function (res) {
                var timestamp = res.Expire_in
                let day = (new Date(parseInt(timestamp))).getDate()
                let month = parseInt(new Date(parseInt(timestamp)).getMonth()+1)
                let year = (new Date(parseInt(timestamp))).getFullYear()
                var date = year + "-" + month + "-" + day
                $("#all-transactions").append(`<tr><td data-label="ID">#${res.id}</td><td data-label="Day/Hour">${res.data.split('T')[0]}</td><td data-label="Crypto Name">${res.cryptoname}</td><td data-label="Value">${res.value}</td><td data-label="Percentage per day">${res.percentage_per_day}</td><td data-label="Value per day">${res.value_per_day}</td><td data-label="Gh/s">${res.ghs}</td><td data-label="Next payment in" id="${res.next_payment}">${res.next_payment}</td><td data-label="Expires in">${date}</td></tr>`);
                setNextPayment(res.next_payment, res.next_payment)
                //return res
            })
            const username = request.data[0].user_data[0].username
            const refNumber = request.data[0].user_data[0].affiliate_id
            const btc_balance = request.data[0].wallet_user_data[0].btc_balance
            const trx_balance = request.data[0].wallet_user_data[0].tron_balance
            console.log(request.data[0])
            const ghsBTC = request.data[0].wallet_user_data[0].total_power_btc
            const ghsTRX = request.data[0].wallet_user_data[0].total_power_trx

            //inssit(timestamp_after_24_hr)

            //console.log(allTransactions)
            
            
            $("#welcome-to-dashboard").text(`Hi ${username}, Welcome to Dashboard 😊`);

            $("#referal-link").val(`https://harveys-cloud-mining.online/index.html?referred=${refNumber}`);

            $("#btc-balance").text(`Balance BTC: ${btc_balance}`);

            $("#trx-balance").text(`Balance TRX: ${trx_balance}`);
            
            $("#ghs-btc").text(`${ghsBTC} GH/s`);

            $("#ghs-trx").text(`${ghsTRX} GH/s`);

            $("#withdraw-btc").click(function(){
                window.location = "sacar.html"
            })

            $("#deposit-btc").click(function(){
                window.location = "depositar.html"
            })

            $("#withdraw-trx").click(function(){
                window.location = "sacar.html"
            })

            $("#deposit-trx").click(function(){
                window.location = "depositar.html"
            })

            $("#copy-referal").click(function(){
                navigator.clipboard.writeText(document.getElementById("referal-link").value).then(function() {
                    alert('copied!');
                }, function(err) {
                    console.error('Click in allow for copy');
                });
            })
        }catch(err){
            console.log(err)
            localStorage.removeItem('jwt_token')
            location.reload();
        }
        

    }

})()