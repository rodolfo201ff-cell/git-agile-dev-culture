function buscar(){
 let t=document.getElementById('busca').value.toLowerCase();
 document.querySelectorAll('.item').forEach(el=>{
   el.style.display = el.dataset.nome.includes(t) ? 'flex' : 'none';
 });
}
document.addEventListener('DOMContentLoaded', carregar);
document.getElementById('formAgendamento').addEventListener('submit', function(e){
 e.preventDefault();
 const nome=document.getElementById('nome').value;
 const serv=document.getElementById('servico').value;
 const data=document.getElementById('data').value;
 const hora=document.getElementById('hora').value;
 let ags=JSON.parse(localStorage.getItem('ags')||'[]');
 if(ags.find(a=>a.data===data && a.hora===hora)){alert('Horário ocupado!');return;}
 ags.push({nome,serv,data,hora});
 localStorage.setItem('ags',JSON.stringify(ags));
 window.open(`https://wa.me/5591981800016?text=Olá! Quero agendar ${serv} em ${data} às ${hora} - ${nome}`,'_blank');
 mostrar(); this.reset();
});
function mostrar(){
 const ul=document.getElementById('listaAgendamentos'); ul.innerHTML='';
 JSON.parse(localStorage.getItem('ags')||'[]').forEach((a,i)=>{
   const li=document.createElement('li');
   li.innerHTML=`<span><b>${a.nome}</b> - ${a.serv}<br>📅 ${a.data} ${a.hora}</span><button onclick="del(${i})" style="background:#ef4444;color:#fff;border:none;padding:6px 10px;border-radius:6px">X</button>`;
   ul.appendChild(li);
 });
}
function del(i){let ags=JSON.parse(localStorage.getItem('ags')||'[]');ags.splice(i,1);localStorage.setItem('ags',JSON.stringify(ags));mostrar();}
function carregar(){mostrar();}
