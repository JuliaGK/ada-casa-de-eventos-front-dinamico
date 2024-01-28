const form = document.getElementById("formAtracaoMusical");
const database =
	"https://crudcrud.com/api/64ed3ff7f1574c259f29bd057ae66280/votos";

(async () => {
	const listaResultado = document.getElementById("listaResultados");
	const votos = await getAllVotes();

	votos.sort(function (a, b) {
		return b.counter - a.counter;
	});

	votos.forEach((voto) => {
		const resultado = document.createElement("li");
		resultado.textContent = voto.name;
		listaResultado.append(resultado);
	});
})();

form.addEventListener("submit", async (e) => {
	const nomeVoto = document.querySelector(
		'input[name="atracao_musical"]:checked'
	).value;

	const votos = await getAllVotes();

	let id = "";
	let count = 1;
	votos.forEach((voto) => {
		if (voto.name == nomeVoto) {
			id = voto._id;
			count = Number(voto.counter) + 1;
		}
	});

	const json = JSON.stringify({
		name: nomeVoto,
		counter: count,
	});

	if (id) {
		updateVote(id, json);
	} else {
		postVote(json);
	}

	window.location.reload();
});

async function updateVote(id, json) {
	await fetch(database + `/${id}`, {
		method: "PUT",
		body: json,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

async function postVote(json) {
	await fetch(database, {
		method: "POST",
		body: json,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

async function getAllVotes() {
	const resultado = await fetch(database);
	const votos = await resultado.json();
	return votos;
}
