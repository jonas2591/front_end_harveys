
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


(function () { //verifica se o usuário já está logado
    try{
        if(localStorage.getItem('jwt_token').length > 0){
        
            window.location.href = "dashboard/index.html"
            
        }
    }catch(err){

    }
})()
const apiURL = 'http://api.harveys-cloud-mining.online'
async function requestRegister(username, email, senha){ //quando o usuario for logar

    const recaptchaResponse = grecaptcha.getResponse()
    

    if(recaptchaResponse != ""){
        if(email.length > 0 && senha.length > 0){

            
            let referalCookie = getCookie('dad_affiliate_id')


            const request = await axios.post(`${apiURL}:3002/register`, {"referal": referalCookie, "username":username, "email": email, "password": senha, "recaptcha": recaptchaResponse})

            
            if(request.data.error){
                alert(request.data.error)
                //Reenvia o codigo de confirmação
            }
            if(request.status == 201){
                alert('We send a confirmation link to your email')
                window.location = "login.html"
            }
            /*

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
            
            */
            
            
    
        }else{
            alert("Campos invalidos")
        }
    }else{
        alert("por favor clique em não sou um robo")
    }
    
    
}


$("#btn-login").click(function() {
    const username = $('#username').val()
    const email = $('#email').val()
    const senha = $('#senha').val()
    const confirm_senha = $('#confirm-senha').val()

    if(confirm_senha != senha){
        alert('passwords do not match')
    }else{
        console.log(`${username} ${email} ${senha} ${confirm_senha}`)
        requestRegister(username, email, senha)

    }
});


