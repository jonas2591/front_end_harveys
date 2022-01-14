(function () { //verifica se o usuário já está logado
    try{
        if(localStorage.getItem('jwt_token').length > 0){
        
            window.location.href = "dashboard/index.html"
            
        }
    }catch(err){

    }
})()
const apiURL = 'http://harveys-cloud-mining.online'
async function requestLogin(email, senha){ //quando o usuario for logar

    const recaptchaResponse = grecaptcha.getResponse()
    
    if(recaptchaResponse != ""){
        if(email.length > 0 && senha.length > 0){
            const request = await axios.post(`${apiURL}:3002/login`, {"email": email, "password": senha, "recaptcha": recaptchaResponse})

            console.log(request.data)
            if(request.data.error === "Enviamos um link de confirmação para seu email"){
                alert('Vefifique seu email, um link de confirmação foi enviado! ')
                //Reenvia o codigo de confirmação
            }

            if(request.data.error != "Enviamos um link de confirmação para seu email"){
                try{
                    if(request.data[0].jwt){
                        console.log(request.data)
                        localStorage.setItem('jwt_token', request.data[0].jwt); //Salva o token no localstorage
                        window.location = "dashboard/"
                        //Redireciona para dashboard
                    }
                }catch(err){
                    alert(request.data.error)
                }
                
                //location.reload();
            }
            
            
            
            
    
        }else{
            alert("Campos invalidos")
        }
    }else{
        alert("por favor clique em não sou um robo")
    }

    
    
}


$("#btn-login").click(function() {
    const email = $('#email').val()
    const senha = $('#senha').val()

    requestLogin(email, senha)
});


