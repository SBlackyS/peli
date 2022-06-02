const find = document.querySelector("#find");

find.addEventListener('keyup', e => {
    var a = e.target.value;
    let aux;
    
    socket.emit('find-pelicula', a, (callback) => {
        // console.log(callback);
        var resultados=[];
        for(let i=0;i<callback.length;i++){
            const { nombre } = callback[i];
            for(let n = 0;n<a.length;n++){
                if(a[n]==nombre[n]){
                    aux = true;
                } else {
                    aux = false;
                    break;
                }

            }
            if(aux===true){
                resultados.push(nombre)   
            }
        }
        // console.log(resultados)
        const divContainer = document.querySelector("#buscado");
        var contador = resultados.length;
        let i = 1;
        console.log(contador);
        while( i<contador){
            
            const div = document.createElement("div");
            const p = document.createElement("p");
            const txt = document.createTextNode(resultados[i]);

            div.setAttribute("class", "container-peliculas");
            p.setAttribute("class", "caja-trasera");
            p.appendChild(txt);
            div.appendChild(p);
            divContainer.appendChild(div);
            // console.log(contador)
            console.log(i);
            if(i==contador){
                break;
            }
            i++;
            
        }
        
    })

    
        // console.log(cantidad);
})