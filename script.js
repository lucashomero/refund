// Seleciona os elementos do formulario
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")

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

        // Cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        // Substituindo o cifrão formatado pelo cifrão do css
        expenseAmount.innerHTML= `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        // Adiciona nome e categoria na div expense-info
        expenseInfo.append(expenseName, expenseCategory, expenseAmount)

        // Adiciona as informacoes no item
        expenseItem.append(expenseIcon, expenseInfo)

        // Adiciona o item na lista
        expenseList.append(expenseItem)

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}