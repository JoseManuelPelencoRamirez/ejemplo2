/*GRR - DyD*/

/*Obtiene el objeto*/
function getObj(id){
	nmOb = document.getElementById(id);
	return nmOb;
}

/*Establece una clase*/
function setClass(id, cls){
	getObj(id).className = cls;
}

/*Establece un valor en el campo*/
function setValor(id, valor){
	getObj(id).value = valor;
}

/*Obtiene valor del campo*/
function getValorCampo(id){
	var valor= getObj(id).value;
	return valor;
}

/*Habilita Botón*/
function setHabBot(id){
	getObj(id).className = "Boton BotonMargenDer";
	getObj(id).disabled = false;
}

/*Deshabilita Botón*/
function setDesBot(id){
	getObj(id).className = "BotonDisabled BotonMargenDer";
	getObj(id).disabled = true;
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

function desSig(){
	getObj("siguiente").src = "/keon_mult_mult_pub/images/Dere2off.gif";
	getObj("siguiente").disabled = true;
	getObj("siguiente").alt ="";
	getObj("siguiente").onclick =function(){return false;};
	setClass("siguiente","BotonPrismatico linkDes");
}

function habSig(){
	getObj("siguiente").src = "/keon_mult_mult_pub/images/Dere2.gif";
	getObj("siguiente").disabled = false;
	getObj("siguiente").alt = "Siguiente";
	setClass("siguiente","linkAbi BotonPrismatico");
}

function setPag(){
	if(getValorCampo("HD_CON")=="0")
		desAnt();
	else
		habAnt();
	
	if(getValorCampo("HD_PAG")=="S"){
		habSig();
		if(getValorCampo("HD_IND")=="N" || getValorCampo("HD_IND")=="")
			desSig();
	}
}

/*Sólo permite caracteres alfabéticos*/
function alfabeticos(e){
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==8 ||tecla==0 ) return true;
    patron =/[a-z A-Z\t]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}

/*Sólo permite caracteres numéricos*/
function numericos(e){
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==8 ||tecla==0 ) return true;
    patron =/[0-9]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}

/*Alfanuméricos*/
function alfanumericos(e){
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==8 ||tecla==0) return true;
    patron =/[0-9a-zA-Z]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}

/*Valida e-mails*/
function validaEmail(){
	var expregEmail = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    var email = getObj("CT_CORREO").value;
    if(!expregEmail.test(email)){
		alert("Dirección de email inválida");
		if(getObj("CT_CORREO").value != ""){
			getObj("CT_CORREO").focus();
		}
		desHabSav();
	}else{
		habilitaGuardar();
	}
}

//Evaluación de campo vacio Si vacio Obligatorio, 1 Char Entrada
function evCampo(id){
	if(getObj(id).value !=""){
		setClass(id,"CampoEntrada");
	}else{
		setClass(id,"CampoObligatorio");
	}
}

//Busca campos obligatorios
function existeObligatorios(){
	var bsq_campoEO = false;
	
	var frm = getObj("NCMXVE71011"); //Nombre de la ventana
	var cajasTexto = frm.getElementsByTagName("input");
	
	for (i = 0; i < cajasTexto.length; i++){
		if(cajasTexto[i].className == "CampoObligatorio" || cajasTexto[i].className == "CampoEntradaError" || cajasTexto[i].className == "CampoObligatorio hasDatepicker" ){
			bsq_campoEO = true;
		}
	}
	return bsq_campoEO;
}

/*Obtiene la fecha del día*/
function setFechaHoy(){
	var f = new Date();
	
	dia =f.getDate();
	if(dia<10)
	    dia='0'+dia;

	mes = f.getMonth()+1;
	if(mes<10)
		mes='0'+mes;
	
	anio = f.getFullYear();
	
	var diaDeHoy = dia + "-" + mes + "-" + anio;
	return diaDeHoy;
}

/*Lanza una ventana modal*/
function viewDetail(fecha){
	var datos = setDataDetail(fecha);
	
	if( window.location.href.indexOf("localhost") != -1 ){
		sURL = "http://localhost:8101/servlet/atad.thin.pres.servlet.AtadSvLanzarFlujo?" + datos;
	}else{
		sURL = getBase() + "web?" + datos;
	}
	var sPropiedades="dialogWidth:430px;dialogHeight:515px;help:no;maximize:no;minimize:no;scrollbars:no;status:no;";
	var sTitulo= "Detalle Saldos Promedio de Liqidación";
	var activar="true";
	lanzarVentanaModalTitulo(sURL, parametros, sPropiedades, sTitulo,"true",activar);
	
	/*
	var parametros=new Array();
	parametros[100]="obtenerResultadosVentanaModal()";//Función de respuesta*/
} 

/*Obtiene la base de la URL*/
function getBase(url){
	if(!url)url = window.location.href;
	var pos = url.indexOf("?");
	if(pos!=-1)url = url.substring(0, pos);
	pos = url.indexOf("://") + 3;
	url = url.substr(pos);
	pos = url.indexOf("/");
	url = url.substr(pos);
	pos = url.lastIndexOf("/") + 1;
	url = url.substring(0, pos);
	return (url!="")?url:"/";
}

/*Lanza un evento*/
function setEvento(eventoHexad,forma) {
	var raiz="";
	if(forma){
		raiz+='document.forms["'+forma+'"].'
	}else{
		raiz+='document.forms[0].';
	}
	eval(raiz+"evento.value='"+eventoHexad+"'");
	eval(raiz+"submit();");
}

/*Separa por miles con coma*/
function setMiles(cantidad){
	var cadSep = new Array();
	var dec;
	var ent;
	cadSep = cantidad.split(".");
	ent = cadSep[0];
	dec = cadSep[1];
	
    var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
    while(miles.test(ent)){
		ent=ent.replace(miles, "$1" + "," + "$2");
	}
	ent = ent + "." + dec;
	return ent;
}