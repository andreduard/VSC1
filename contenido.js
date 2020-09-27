
//Este archivo define cómo se muestra el contenido del gráfico, cuyos datos se encuentran en datos.js.


var arregloPaises = [];
var data = [];
var poblaciones = [];
var areas = [];
var densidades = [];
var mi3d="off";

var brilloFiguras="off";
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

/*
Ahora colocar las dimensiones específicas del svg, que es donde dibujaré todo
SVG significa Scalable Vector Graphics.
*/
var svgWidth = 1495, svgHeight = 675;

var barWidth = (svgWidth / arregloPaises.length);

var colorFigura = "#80ff00";

var tamannoFigura = 20;

var tipoDibujo = "burbujas";

//Selecciono el svg
var svg = d3.select('svg')
    //Modifico sus atributos, para definir todos los tamaños.
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//Necesito dos escaladores que me permitan escalar los datos en ejecución
//Uno para el eje X y otro para el eje Y
var xScale = d3.scaleLinear()
    .domain([max(d3.min(poblaciones) - 50, 0), 200,d3.max(poblaciones) + 20])//estos 5000 es para dejar algo de espacio extra
    .range([40, svgWidth*0.90 ,svgWidth-20]);

var yScale = d3.scaleLinear()
    .domain([max(d3.min(areas) - 50, 0), 30,d3.max(areas) + 5])
    //Nótese que el rango en Y es alrevez que el rango en X
    .range([svgHeight-20, svgHeight*0.20,0]);

/*
Ahora necesito un nuevo escalador para evitar que una burbuja sea insignificantemente pequeña, o gigantesca
Para esto declaro una variable que luego multiplicaré con el tamaño base de las burbujas.
Para esto defino una variable que me diga el radio mínimo, el radio máximo, y finalmente el tamaño base.
*/
var multiplicadorMaximo = 30; //Estas dos variables se podrá modificar en ejecución
var tamanhoBase = 25;

var sizeScale = d3.scaleLinear()
    .domain([d3.min(densidades), d3.max(densidades)])
    .range([5, multiplicadorMaximo]);

//Ahora defino los dos ejes
var eje_x = d3.axisBottom()
    .scale(xScale);
	
var eje_y = d3.axisLeft()
    .scale(yScale);

//Ahora coloco los dos ejes en el svg
svg.append("g")
    /*
    El transform es para transformar la posición del eje
    Esto se define como colocarlo 40 a la derecha, -20 hacia arriba de la
    esquina inferior izquierda
    */
    .attr("transform", "translate(40,0)")
    .call(eje_y);

//Para el eje x tengo que colocar más abajo del svg
var xAxisTranslate = svgHeight - 20;

svg.append("g")
    .attr("transform", "translate(0, " + xAxisTranslate  +")")
    .call(eje_x);

//Necesito tooltips encima de cada elemento para poder mostrar
//información específica de cada figura.
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
        return "<strong>Cant\u00F3n:</strong> <span style='color:red'>" + d.Country + "</span> <br>" +
            "<strong>Poblaci\u00F3n:</strong> <span style='color:red'>" + d.Population + " habitantes</span> <br>" +
            "<strong>\u00C1rea:</strong> <span style='color:red'>" + d.TotalBiocapacity + " km²</span> <br>" +
            "<strong>Densidad:</strong> <span style='color:red'>" + d.TotalEcologicalFootprint + " habitantes/km²</span> <br>";
    });

//Aplico los tooltips
svg.call(tip);

/*
Ahora finalmente colocar algunos elementos dentro del svg
Para este objetivo definí una función que dibuja todos los elementos
En el SVG
*/

var symbol = d3.symbol()
    .type(d3.symbolCircle)
    //.type(rectangulo)
    .size(function (d) {
        return tamanhoBase * sizeScale(d.TotalEcologicalFootprint);
    });

var path = svg
    .selectAll('path')
    .data(arregloPaises)
    .enter()
    .append('path')
	.attr('d',symbol)
	.attr('class','figure')
    .attr('id', function (d) {
        return d.Country;
    })
    .attr('transform', function (d) { return 'translate(' + xScale(d.Population) + ',' + yScale(d.TotalBiocapacity) + ')'; })
    .attr('stroke', 'black')
    .attr('fill-opacity', 0.4)
    .on("mouseover", function(d,i){
		d3.select(this)
		.transition()
		.attr('fill-opacity', 0.8)
		.style("fill","white");
        
        document.getElementById("infoNombre").innerHTML = d.Country;
        document.getElementById("infoPoblacion").innerHTML = d.Population;
        document.getElementById("infoArea").innerHTML = d.TotalBiocapacity;
        document.getElementById("infoDensidad").innerHTML = d.TotalEcologicalFootprint;
        tip.show;
    })
    .on("mouseout", function(d,i){
        	
		colorFigura = "#80ff00";
		
		d3.select(this).transition().attr('fill-opacity', 0.4)
		.style("fill", colorFigura);
	
    });

    var gradient = svg.append("svg:defs")
    .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    gradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", "#AAffFF")
        

    gradient.append("svg:stop")
        .attr("offset", "50%")
        .attr("stop-color", "#0000FF")

    gradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", "black")
    .attr("stop-opacity", 1);

		
	}	

);


