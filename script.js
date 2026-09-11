function filtrarServicos(){
 let busca = document.getElementById('buscaServico').value.toLowerCase();
 let options = document.getElementById('servico').options;
 for(let i=0;i<options.length;i++){
   let txt = options[i].text.toLowerCase();
   if(options[i].value === ""){ options[i].style.display=""; continue; }
   options[i].style.display = txt.includes(busca)? "" : "none";
 }
}
document.addEventListener('DOMContentLoaded', mostrar);
document.getElementById('formAgendamento').addEventListener('submit', function(e){
 e.preventDefault();
 const nome=document.getElementById('nome').value;
 const serv=document.getElementById('servico').value;
 const data=document.getElementById('data').value;
 const hora=document.getElementById('hora').value;
 if(!serv){alert('Escolha um serviço!');return;}
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
