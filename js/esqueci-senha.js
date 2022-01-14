
const apiURL = 'http://api.harveys-cloud-mining.online'



async function requestLogin(email){ //quando o usuario for logar

    try{
        const recaptchaResponse = grecaptcha.getResponse()
    
        
        if(recaptchaResponse != ""){
            if(email.length > 0){

                const request = await axios.post(`${apiURL}:3002/sendmailchange`, {"email": email, "recaptcha": recaptchaResponse})
                console.log(email)
                if(request.data.msg){
                    alert(request.data.msg)
                }

                if(request.data.error){
                    alert(request.data.error)
                }
        
            }else{
                alert("Campos invalidos")
            }
        }else{
            alert("por favor clique em não sou um robo")
        }
    }catch(err){
        console.log(err)
        //alert('Error')
        //location.reload();
    }

    
    
}


$("#btn-login").click(function() {
    const email = $('#email').val()

    requestLogin(email)
});


