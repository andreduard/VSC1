//Aqu\u00ED van los datos de todos los cantones

//Tengo que colocar las variables del Xlsx suministrado en el repositorio aqu\u00ED:
//https://es.wikipedia.org/wiki/Anexo:Cantones_de_Costa_Rica_por_poblaci\u00F3n


var data = [];
d3.csv("https://raw.githubusercontent.com/andreduard/VSC1/master/data.csv", function(data){
    console.log(data[0][1])
});


//Necesito estos 3 arreglos para poder tener los valores m\u00E1ximos de cada uno, as\u00ED como el valor m\u00EDnimo
//de las densidades
var poblaciones = [];
var areas = [];
var densidades = [];
for (i = 0; i < data.length; i++) {
    poblaciones.push(data[i][1]);
    areas.push(data[i][3]);
    densidades.push(data[i][2]);
}











