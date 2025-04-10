// Seleciona os elementos do formulario
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Obtem o valor do input, aceitando somente numeros
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "")
    // Transforma o valor em centavos (150 = 1.50 => R$ 1,50)
    value = Number(value) / 100
    // Atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
}

// Formata o valor no padrao BRL
function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    })
    return value
}

// Captura o evento de submit do formulario
form.onsubmit = (event) => {
    event.preventDefault()
    // Cria um objeto com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
      }
      console.log(newExpense)
}