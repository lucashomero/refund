// Seleciona os elementos do formulario
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

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

      // Chama a funcao que ira adicionar o item na lista
      expenseAdd(newExpense)
}

// Função que adiciona o objeto com uma nova despesa
// Adiciona um novo item na lista
function expenseAdd(newExpense){
    try {
        // Cria o elemento para adicionar o item(li) na lista(ul)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense") // <li class="expense"></li>
        
        // Cria o icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // Cria a div expense-info
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")
        
        // Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense
        // Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name
        // Adiciona nome e categoria na div expense-info
        expenseInfo.append(expenseName, expenseCategory)

        // Cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        // Substituindo o cifrão formatado pelo cifrão do css
        expenseAmount.innerHTML= `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        // Cria o ícone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "img/remove.svg")

        // Adiciona as informacoes no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon )

        // Adiciona o item na lista
        expenseList.append(expenseItem)

        // Atualiza os totais
        updateTotals()

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }

    formClear()
}

// Função que atualiza os totais
function updateTotals(){
    try{
        // Recupera todos os itens(li) da lista (ul)
        const items = expenseList.children
        // Atualiza a quantidade de itens da lista
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`
        // Variavel para incrementar o total
        let total = 0

        // Percorre cada item(li) da lista (ul)
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")

            // Remove caracteres não numéricos e substitui a vírgula pelo ponto
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

            // Converte o valor para float.
            value = parseFloat(value)

            // Verifica se é um número válido
            if(isNaN(value)){
                return alert("Não foi possível calcular o total. O valor não parece ser um numero")
            }
            // Incrementar o valor total
            total += Number(value)
        }   

        // Exibir o total formatado
        // Criando a span para adicionar o R$ formatado
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"
        

        // Formata o valor e remove o R$ que será exibido pela small com um estilo customizado
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        // Limpa o conteúdo do elemento
        expensesTotal.innerHTML = ""

        // Adiciona o símbolo da moeda e o valor total formatado
        expensesTotal.append(symbolBRL, total)

    } catch (error){
        console.log(error)
        alert("Não foi possível atualizar os totais")
    }
}

// Evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function(event){
    // Verifica se o elemento clicado é o ícone de remover
    if(event.target.classList.contains("remove-icon")){
        // Obtém a li pai do elemento clicado
        const item = event.target.closest(".expense")

        // Remove item da lista
        item.remove()
    }
    
    updateTotals()
})

// limpar os campos do formulário após adicionar uma nova despesa
function formClear(){
    // Limpa os inputs
    expense.value = ""
    category.value = ""
    amount.value = ""

    // Coloca o foco nos inputs
    expense.focus()
}
