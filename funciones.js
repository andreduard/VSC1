
//Algunas funciones auxiliares que necesité
function max(number1, number2) {
    if (number1 > number2) {
        return number1;
    }
    return number2;
}

function cambiarColor(self) {
    //Busca el color dentro del componente CambiadorColor y se lo aplica
    //los objetos dentro de la grafica
    colorFigura = self.value;
    path.transition().style('fill', colorFigura);
}

//funcion encargado de cambiar el tamaño a las figuras
function cambioTamanho(self) {

    valorSlider = self.value;
    tamanhoFigura = parseInt(valorSlider);

    //Cambio de tamaño a las Burbujas del grafico
	symbol.size(function (d) {
		return tamanhoFigura * sizeScale(d.densidad);
	});
	path.transition().attr('d', symbol);

    document.getElementById("lblTamanno").innerHTML = tamanhoFigura;    
}

function mostrar3d(){
    if(mi3d=="off"){
        path.transition().style("fill","url(#gradient)")
        .attr('fill-opacity', 0.9);
        mi3d="on";
    }
    else{
        if(brilloFiguras=="off"){
            colorFigura = document.getElementById("CambiadorColor").value;
                path.transition().attr('fill-opacity', 0.4)
                .style("fill", colorFigura);
                
        }
        else{
            colorFigura = document.getElementById("CambiadorColor").value;
                path.transition().style("fill", colorFigura);
        }
        mi3d="off";
    }
    
}
function mostrarBrillo(){
    if(brilloFiguras=="off"){

        path.transition().attr('stroke', 'white').attr('fill-opacity', 0.9);
        brilloFiguras="on";
    }
    else{
        if(mi3d=="off"){
            path.transition().attr('stroke', 'black').attr('fill-opacity', 0.4);
            
        }else{
            path.transition().attr('stroke', 'black');
        }
        brilloFiguras="off";
    }
}

function transparenciaIN() {
    tip.show;
    path.attr('fill-opacity', 0.4);
}
