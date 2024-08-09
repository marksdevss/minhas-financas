const form = document.getElementById('transacao-form');
const descricaoInput = document.getElementById('descricao');
const valorInput = document.getElementById('valor');
const tipoSelect = document.getElementById('tipo');
const listaTransacoes = document.getElementById('lista-transacoes');
const totalReceitas = document.getElementById('total-receitas');
const totalDespesas = document.getElementById('total-despesas');
const saldoAtual = document.getElementById('saldo-atual');

let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];

function salvarTransacoes() {
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
}

function carregarTransacoes() {
    transacoes.forEach(transacao => adicionarTransacaoNaTabela(transacao));
    atualizarResumo();
}

function adicionarTransacaoNaTabela(transacao) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${transacao.descricao}</td>
        <td>${transacao.tipo === 'despesa' ? '-R$' : 'R$'}${transacao.valor.toFixed(2)}</td>
        <td>${transacao.tipo}</td>
    `;
    listaTransacoes.appendChild(row);
}

function atualizarResumo() {
    let receitas = 0;
    let despesas = 0;

    transacoes.forEach(transacao => {
        if (transacao.tipo === 'receita') {
            receitas += transacao.valor;
        } else {
            despesas += transacao.valor;
        }
    });

    const saldo = receitas - despesas;

    totalReceitas.textContent = `R$ ${receitas.toFixed(2)}`;
    totalDespesas.textContent = `R$ ${despesas.toFixed(2)}`;
    saldoAtual.textContent = `R$ ${saldo.toFixed(2)}`;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const descricao = descricaoInput.value;
    const valor = parseFloat(valorInput.value);
    const tipo = tipoSelect.value;

    if (descricao === '' || isNaN(valor)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const transacao = {
        descricao,
        valor,
        tipo
    };

    transacoes.push(transacao);
    adicionarTransacaoNaTabela(transacao);
    atualizarResumo();
    salvarTransacoes();
    limparFormulario();
});

function limparFormulario() {
    descricaoInput.value = '';
    valorInput.value = '';
    tipoSelect.value = 'receita';
}

// Carregar transações ao iniciar o site
carregarTransacoes();
