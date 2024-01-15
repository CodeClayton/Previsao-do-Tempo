const form = document.getElementById('form');

form.addEventListener('submit', async (event) =>{
    event.preventDefault();
    //Não deixa a páginar reinciar quando enviar form

    let input = document.getElementById('inputForm').value;

    if(input != ''){
       showWarning("Procurando a cidade....");
       
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d2771a0d8ca543807127cae07746c481&units=metric&lang=pt-br`;

        let result = await fetch(url);
        //Faz um requisição a url acima para acessar a API.

        let json = await result.json();
        //faz uma requisição, await espera ate responder, apos isso o json converte a resposta HTTP em um objeto js.
        
        if(json.cod == 200){
        //json.cod e o status que recebe da network, 200 e sucesso.    
            showPrevision({
            //Acessa os valores da rede pelo json.
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                humidity: json.main.humidity,
                sensation: json.main.feels_like,
                wind: json.wind.speed,
                icon: json.weather[0].icon
            })
        }else{
            showWarning("Não encotramos essa cidade.");
        }
    }else{
        clearPrevision();
    }
});

function showWarning(text){
    document.getElementById('titulo').innerHTML = text;
    document.querySelector('.prevision').style.display = "none";
};

function showPrevision(json){
    document.querySelector('.prevision').style.display = "block";

    document.getElementById('titulo').innerHTML = `${json.name}, ${json.country}.`;

    let temp = Math.round(json.temp);
    
    document.getElementById('temperature').innerHTML = `${temp} <sup>ºC</sup>`;

    let sensation = Math.round(json.sensation);

    document.getElementById('sensation').innerHTML = `${sensation}<sup>ºC</sup>`;
    
    document.getElementById('humidity').innerHTML = `${json.humidity}%`;
    
    document.querySelector('.wind').innerHTML = `${json.wind}<span>Km/h</span>`;
    document.querySelector('.windInfo img').setAttribute('src', `http://openweathermap.org/img/wn/${json.icon}@2x.png`);
};

function clearPrevision(){
    document.querySelector('.prevision').style.display = "none";
    document.getElementById('titulo').innerHTML = "";
}