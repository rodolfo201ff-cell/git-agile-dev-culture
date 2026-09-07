document.addEventListener('DOMContentLoaded', carregarAgendamentos);

document.getElementById('formAgendamento').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const servico = document.getElementById('servico').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    
    // OPÇÃO 4: VERIFICA SE JÁ TEM AGENDAMENTO NESSA DATA E HORA
    let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const conflito = agendamentos.find(ag => ag.data === data && ag.hora === hora);
    if(conflito) {
        alert('❌ Ops! Esse horário já está ocupado. Escolha outro.');
        return;
    }
    
    const agendamento = { nome, servico, data, hora };
    agendamentos.push(agendamento);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    
    // OPÇÃO 2: ENVIA PRO WHATSAPP AUTOMATICO
    const msg = `Olá Studio Lídia Siqueira!%0AQuero agendar:%0A👤 Nome: ${nome}%0A💅 Serviço: ${servico}%0A📅 Data: ${data}%0A⏰ Hora: ${hora}`;
    window.open(`https://wa.me/5591981800016?text=${msg}`, '_blank');
    
    mostrarAgendamentos();
    this.reset();
});

function mostrarAgendamentos() {
    const lista = document.getElementById('listaAgendamentos');
    lista.innerHTML = '';
    let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    
    agendamentos.forEach((ag, index) => {
        const dataFormatada = new Date(ag.data + 'T00:00:00').toLocaleDateString('pt-BR');
        const li = document.createElement('li');
        li.innerHTML = `
            <span><b>${ag.nome}</b><br>${ag.servico}<br>📅 ${dataFormatada} às ${ag.hora}</span>
            <button class="btn-excluir" onclick="excluir(${index})">X</button>
        `;
        lista.appendChild(li);
    });
}

function excluir(index) {
    if(confirm('Tem certeza que deseja cancelar este agendamento?')) {
        let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        agendamentos.splice(index, 1);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
        mostrarAgendamentos();
    }
}

function carregarAgendamentos() { mostrarAgendamentos(); }