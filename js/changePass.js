
const apiURL = 'http://api.harveys-cloud-mining.online'



async function requestLogin(senha, confirmsenha){ //quando o usuario for logar

    try{
        const recaptchaResponse = grecaptcha.getResponse()
    
        const queryStringDataPass = window.location.search.split('=')[1]

        if(recaptchaResponse != ""){

            if(senha === confirmsenha){
                if(senha.length > 0 && confirmsenha.length > 0){

                    const request = await axios.post(`${apiURL}:3002/changepass/${queryStringDataPass}`, {"newPassword": senha, "recaptcha": recaptchaResponse})
    
                    console.log(request.data)
                    if(request.data.error){
                        alert(request.data.error)
                    }
                    if(request.data.msg){
                        alert(`${request.data.msg}, redirecting...`)
                        window.location = 'login.html'
                    }
                    
            
                }else{
                    alert("Campos invalidos")
                }
            }else{
                alert('passwords do not match ')
            }

            
        }else{
            alert("please click I'm not a robot ")
        }
    }catch(err){
        alert('Error')
        location.reload();
    }

    
    
}


$("#btn-login").click(function() {
    const senha = $('#new-password').val()
    const confirmsenha = $('#confirm-new-password').val()

    requestLogin(senha, confirmsenha)
});


