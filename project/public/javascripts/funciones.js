function render(vista){
      
    fetch(vista).then(function(response){
          return response.text();
    }).then(function(html){
      document.getElementById("visualizar").innerHTML=html;
    });
}
