function populateUFs() {
  const ufSelect = document.querySelector("[name=uf");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUFs();

//addEventListener -> monitor de eventos
document.querySelector("select[name=uf").addEventListener("change", getCities);

function getCities(e) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");

  const indexOfSelectState = e.target.selectedIndex;
  stateInput.value = e.target.options[indexOfSelectState].text;

  citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`;
  citySelect.disabled = true;

  const idUF = e.target.value;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idUF}/municipios`;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

//itens de coleta
const itemsToCollet = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollet) {
  item.addEventListener("click", handleSelectedItems);
}

const collectItems = document.querySelector("input[name=items]");

let selectedItems = [];

//usando "id" na "li" e pegando o "e.target.id" tb funciona
function handleSelectedItems(e) {
  const itemLi = e.target;

  //add ou remover class css
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  //verificar se existem items selecionados, se sim, pegar items
  const alreadySelected = selectedItems.findIndex((item) => item === itemId); //retorna true ou false

  //se ja selecionado, tirar selecao
  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    });

    selectedItems = filteredItems;
  } else {
    //se n estiver selecionado, adicionar
    selectedItems.push(itemId);
  }

  collectItems.value = selectedItems;
}
