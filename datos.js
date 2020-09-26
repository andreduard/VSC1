//Aqu\u00ED van los datos de todos los cantones

//Tengo que colocar las variables del Xlsx suministrado en el repositorio aqu\u00ED:
//https://es.wikipedia.org/wiki/Anexo:Cantones_de_Costa_Rica_por_poblaci\u00F3n

var arregloPaises = [];
var data = [];
var poblaciones = [];
var areas = [];
var densidades = [];
d3.csv("https://raw.githubusercontent.com/andreduard/VSC1/master/data.csv",function(data){
	arregloPaises.push({
	"Country":data["Country"],
	"Population": parseFloat(data["Population"]),
	"TotalBiocapacity": parseFloat(data["TotalBiocapacity"]),
	"TotalEcologicalFootprint":parseFloat(data["TotalEcologicalFootprint"])
	});	

}).then(function(){
		console.log(arregloPaises)
		for (i = 0; i < arregloPaises.length; i++) {
		poblaciones.push(arregloPaises[i]["Population"]);
		areas.push(arregloPaises[i]["TotalBiocapacity"]);
		densidades.push(arregloPaises[i]["TotalEcologicalFootprint"]);
		}
		
}
	);



//Necesito estos 3 arreglos para poder tener los valores m\u00E1ximos de cada uno, as\u00ED como el valor m\u00EDnimo
//de las densidades
// var poblaciones = [];
// var areas = [];
// var densidades = [];
// for (i = 0; i < arregloPaises.length; i++) {
    // poblaciones.push(arregloPaises[i].Population);
    // areas.push(arregloPaises[i].TotalBiocapacity);
    // densidades.push(arregloPaises[i].TotalEcologicalFootprint);
	
	// console.log(poblaciones);
	
// }











