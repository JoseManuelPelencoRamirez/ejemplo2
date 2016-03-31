//funciones basicas para jsp



 function getObj(id){

	var componente = document.getElementByid(id);
	return componente;

 }

 function setValor(id,valor){

	getObj(id).value = valor;
 }


 function setClass(id, cls){
 	getObj(id).className = cls;
}

function setValor(id, valor){
	getObj(id).value = valor;
	}

function getValorCampo(id){
	var valor= getObj(id).value;
	return valor;
}

function blockBoton(id){
	getObj(id).className = "Boton BotonMargenDer";
	getObj(id).disabled = false;
}


function desAnt(){
	getObj("anterior").src = "/keon_mult_mult_pub/images/Izq2off.gif";
	getObj("anterior").disabled = true;
	getObj("anterior").alt ="";
	getObj("anterior").onclick =function(){return false;};
	setClass("anterior","BotonPrismatico linkDes");
}

function habAnt(){
	getObj("anterior").src = "/keon_mult_mult_pub/images/Izq2.gif";
	getObj("anterior").disabled = false;
	getObj("anterior").alt = "anterior";
	setClass("anterior","linkAbi BotonPrismatico");
}




