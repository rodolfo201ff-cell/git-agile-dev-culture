const form = document.getElementById('formAgendamento');
const lista = document.getElementById('listaAgendamentos');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const servico = document.getElementById('servico').value;
    const data = document.getElementById('data').value;
    
    const item = document.createElement('li');
    item.textContent = `${nome} - ${servico} em ${data}`;
    lista.appendChild(item);
    
    form.reset();
    alert('Agendamento salvo com sucesso!');
});
