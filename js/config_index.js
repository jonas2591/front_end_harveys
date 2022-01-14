function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
const apiURL = 'http://api.harveys-cloud-mining.online'
(async function () { //verifica se o usuário já está logado para fazer as devidas mudanças na index
    try{
        if(localStorage.getItem('jwt_token').length > 0){
            //$("#button-1").append(`<a href='dashboard/' style='cursor:pointer;' id='dashboard'>Dashboard</a>`)
            //$("#button-2").append(`<a href='#' style='cursor:pointer;' id='logout'>Logout</a>`)
            document.getElementById("button-1").innerHTML = "<a href='dashboard/' style='cursor:pointer;' id='dashboard'>Dashboard</a>"
            document.getElementById("button-2").innerHTML = "<a href='#' style='cursor:pointer;' id='logout'>Logout</a>"
        }
    }catch(err){
        console.log(err)
    }
    try{ 
        const queryStringReferred = window.location.search.split('=')[1]
        const request = await axios.get(`${apiURL}:3002/home/affiliate?id=${queryStringReferred}`)
        setCookie('dad_affiliate_id', queryStringReferred, 1)
    }catch(err){
        console.log(err)
    }
})()


$("#logout").click(function() { //desloga usuario
    localStorage.removeItem('jwt_token')
    location.reload();
});

