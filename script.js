// Seleciona os elementos do formulario
const amount = document.getElementById("amount")

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