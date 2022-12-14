const socketController = socket => {
	//Estos son los mensajes que el servidor va a responder en caso de conexion o desconexion
	console.log("Cliente conectado", socket.id);

	socket.on("disconnect", () => {
		console.log("Cliente desconectado", socket.id);
	});

	//Escuchamos el evento enviar mensaje que viene del front en el servidor, nos viene el payload y un callback
	socket.on("enviar-mensaje", (payload, callback) => {
		//Mostramos la confirmacion del lado del servidor, esto solo lo vera el cliente que inicio la accion, lo ejecutamos a traves del callback
		const id = new Date().getTime();
		callback(id);

		//Emitimos el mensaje obtenido del cliente a todos los clientes conectados, menos al que lo envio a traves del payload
		socket.broadcast.emit("enviar-mensaje", payload);
	});
}

export {
	socketController
}