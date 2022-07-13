(function()
{
'strict mode'

const url = "http://hp-api.herokuapp.com/api/characters/students"
const  resultsToShow = [] 
let    paginaAtual   = 0

fetch(url)
.then(response => response.json())
.then(response =>
    {
        const __resultadosPorPagina = 10
        const __numeroDePaginas     = parseInt(response.length / __resultadosPorPagina)

        renderizarBotoesPaginacao(__numeroDePaginas)
        dividirResponse(__numeroDePaginas, __numeroDePaginas, response)
        renderizarAlunos(0)
    }
    )

    document.addEventListener("click", (event)=>
    {
        if(event.target.getAttribute('btn-pg'))
        {
            paginaAtual = event.target.getAttribute('btn-pg')
            renderizarAlunos(paginaAtual)
        }    
    })

    function renderizarBotoesPaginacao(NumberOfpages)
    {
        for (let index = 0; index < NumberOfpages ; index++) 
        {
            document.querySelector('.container__botoes').insertAdjacentHTML("beforeend", `<button btn-pg="${index}">${index}</button>`)

        } 
    }
    function dividirResponse(numeroDePaginas, resultadosPorPagina,response)
    {
        for (let index = 0; index < numeroDePaginas; index++) 
        {
            let incialIndex = index * (resultadosPorPagina + 1) 
            let finalIndex  = incialIndex + (resultadosPorPagina + 1)
    
            resultsToShow.push(response.slice(incialIndex,finalIndex))
        }

    }
    function renderizarAlunos(numeroDoBotao)
    {
        const containerAlunos = document.querySelector(".container__alunos")
            containerAlunos.innerHTML = ""
        resultsToShow[numeroDoBotao].forEach((element)=>
        {
            containerAlunos.insertAdjacentHTML("afterbegin",`
            <ul class="list-group aluno-ul">
                <li class="list-group-item ">
                    <span class="aluno-span">  Nome : ${element.name} </span>
                    <span class="aluno-span"> Casa :  ${element.house}</span>
                 </li>
            </ul>
            ` ) 
        })
    }

})()