const lblOnline = document.getElementById("lblOnline");
const lblOffline = document.getElementById("lblOffline");
const txtMensaje = document.getElementById("txtMensaje");
const btnEnviar = document.getElementById("btnEnviar");
const form = document.querySelector('form');

//Esto levanta el socket del lado del cliente, que esta usando mi aplicacion web.
const socket = io();

//Si el usuario esta conectado entonces vamos a poner online en verde en la pagina
socket.on("connect", () => {
	lblOffline.style.display = "none";
	lblOnline.style.display = "inline-block";
});

//Si el usuario esta desconectado vamos a poner offline en rojo en la pagina
socket.on("disconnect", () => {
	lblOnline.style.display = "none";
	lblOffline.style.display = "inline-block";
});

//Creamos el evento enviar-mensaje
socket.on("enviar-mensaje", payload => {
	console.log(payload);
});

form.addEventListener('submit', event => {
	event.preventDefault();
});

btnEnviar.addEventListener("click", () => {
	const mensaje = txtMensaje.value; //Obtenemos el valor del input de la pagina
	const payload = {
		mensaje,
		id: new Date().getTime(),
		fecha: new Date().toISOString().slice(0, 10)
	};

	//Con socket emit enviamos el mensaje que obtuvimos del cliente al servidor a traves del payload, ademas enviamos un callback que se ejcutara solo para el cliente que inicia la accion
	socket.emit("enviar-mensaje", payload, (id) => {
		console.log("Desde el server", id);
	});
});