
function adicionarInteresse() {
  const input_interesse = document.getElementById("input-interesse");
  const valorInput_interesse = input_interesse.value.trim();

  if (valorInput_interesse) {
    const item = document.createElement("li");
    item.textContent = valorInput_interesse;
    let interesses = pegarDados();
    interesses.push(item.textContent);
    localStorage.setItem("meus-interesses", JSON.stringify(interesses)); 
    mostrarInteresses();
    input_interesse.value = "";
  } else {
    alert("Digite um interesse");
  }
}


function addEnter(event) {
  if (event.key === "Enter") {
    adicionarInteresse();
  }
}

function pegarDados() {
  let interesses = localStorage.getItem("meus-interesses");
  return interesses ? JSON.parse(interesses) : [];
}

function mostrarInteresses() {
  let interessesSalvos = pegarDados();
  let lista = document.getElementById("lista-interesses");
  lista.innerHTML = "";

  interessesSalvos.forEach((interesse, index) => {
    let item = document.createElement("li");
    item.innerHTML = interesse;
    
    let divExcluir = document.createElement('div')
    divExcluir.className = 'div_excluir'

    let btn_excluir = document.createElement("button");
    btn_excluir.textContent = "Excluir";
    btn_excluir.className = 'btn_excluir'
    btn_excluir.onclick = function () {
        excluirInteresse(index);
    };

    item.appendChild(divExcluir);
    divExcluir.appendChild(btn_excluir)

    lista.appendChild(item);
  });
}

function excluirInteresse(index) {
  let interesses = pegarDados();
  interesses.splice(index, 1);
  localStorage.setItem("meus-interesses", JSON.stringify(interesses));
  mostrarInteresses();
}


async function news() {
  const span = document.getElementById("title-news-today");
  const url = document.getElementById('div-news')

  const response = await fetch(
    "https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release"
  )
  const dados = await response.json();
  const noticias = dados.items;
  let index = 0;

  function atualizarNoticia() {
    span.innerText = noticias[index].titulo;
    url.addEventListener("click", () => window.open(noticias[index].link))
    index = (index + 1) % noticias.length;
  }

  atualizarNoticia();
  setInterval(atualizarNoticia, 30000);
}

news();


function limparLista() {
  localStorage.removeItem("meus-interesses");
  mostrarInteresses()
}


function footer(){
  const footer = document.querySelector('footer')
  const rights = document.createElement('p')
  rights.innerHTML = `Copyright © ${new Date().getFullYear()} Geovanna Barros`
  footer.prepend(rights)

}
footer()


setInterval(() => {
  mostrarInteresses();
}, 1000);
