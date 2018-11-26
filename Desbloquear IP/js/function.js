eventListener();


function eventListener(){
    if(document.querySelector('#btnGET') !== null ) {
        document.querySelector('#btnGET').addEventListener('click', unbanIP);
    }
    window.onload = showIP;
}

function showIP(){
    fetch('https://api.ipify.org?format=json')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        document.getElementById("ip_address").innerHTML = myJson.ip;
    });
}

function unbanIP (e) {
    e.preventDefault();
    document.querySelector('#btnGET').removeEventListener('click', unbanIP);

    fetch('https://api.ipify.org?format=json')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        var currentIP = myJson.ip,
            action = 'unban';
        // console.log(currentIP + action);
        var data_send = new FormData();
        data_send.append ('current_ip', currentIP);
        data_send.append ('accion', action);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'includes/model/unban.php', true);
        xhr.onload = function(){
            if (this.status === 200 && this.readyState == 4) {
                var respuesta = JSON.parse(xhr.responseText);
                console.log(respuesta);
                if (respuesta.estado === 'OK') {
                    var info = respuesta.info;
                    swal({
                            title: 'Desbloqueo exitoso!',
                            text: info,
                            type: 'success',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false
                        })
                        .then(resultado => {
                                if(resultado.value) {
                                   location.reload();
                                }
                            })
                } else {
                    // Hubo un error
                    swal({
                        title: 'Error!',
                        text: 'Hubo un error',
                        type: 'error'
                    })
                }
            }
        }
        xhr.send(data_send);
    });
    
}