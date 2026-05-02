// Copyright (c) 2025 Antonio Jose Brito da Silva. Todos os direitos reservados.
// ==================== CONTROLE DO QUIZ ====================
let usuarioNome = '';
let respostas = [];
let indicePerguntaAtual = 0;
let pontuacoes = {};

const areasMap = {
  logica:0, linguagem:0, criatividade:0, organizacao:0, empatia:0,
  lideranca:0, resiliencia:0, tecnologia:0, humanas:0, estabilidade:0,
  comunicacao:0, educacao:0, versatilidade:0, aversao_risco:0,
  financas:0, servico_publico:0, ciencia:0, interpessoal:0,
  cooperacao:0, qualidade_vida:0, equilibrio:0, inovacao:0, atencao:0,
  empreendedorismo:0, saude:0
};

let telaNome, telaPerguntas, telaResultado, telaMaterias, nomeInput, iniciarBtn;
let nomeUsuarioSpan, perguntaContainer, progressoTexto, barraProgresso, btnProximo, btnConcluir;
let resultadoNome, resultadoCursosDiv, resultadoCargosDiv, btnReiniciar;

function resetPontuacoes() { for (let key in areasMap) pontuacoes[key] = 0; }

function carregarPergunta() {
  const p = perguntas[indicePerguntaAtual];
  let html = `<div class="pergunta"><p><strong>${p.texto}</strong></p><div class="opcoes">`;
  const opcoesTexto = ["Não gosto nada", "Não gosto", "Indiferente", "Gosto", "Gosto muito"];
  for (let i = 0; i < opcoesTexto.length; i++) {
    const selected = (respostas[indicePerguntaAtual] === i) ? 'selected' : '';
    html += `<div class="opcao ${selected}" data-val="${i+1}">${opcoesTexto[i]}</div>`;
  }
  html += `</div></div>`;
  perguntaContainer.innerHTML = html;
  document.querySelectorAll('.opcao').forEach(opt => {
    opt.addEventListener('click', (e) => {
      document.querySelectorAll('.opcao').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      respostas[indicePerguntaAtual] = parseInt(opt.dataset.val) - 1;
    });
  });
  atualizarProgresso();
}

function atualizarProgresso() {
  const total = perguntas.length;
  const atual = indicePerguntaAtual + 1;
  progressoTexto.innerText = `Questão ${atual} de ${total}`;
  barraProgresso.value = (atual / total) * 100;
}

function avancar() {
  if (respostas[indicePerguntaAtual] === undefined) {
    alert("Por favor, responda a pergunta antes de avançar.");
    return;
  }
  if (indicePerguntaAtual + 1 < perguntas.length) {
    indicePerguntaAtual++;
    carregarPergunta();
  } else {
    btnProximo.style.display = 'none';
    btnConcluir.style.display = 'inline-block';
  }
}

function calcularPerfil() {
  resetPontuacoes();
  for (let i = 0; i < perguntas.length; i++) {
    const respostaVal = respostas[i] + 1;
    const areas = perguntas[i].areas;
    for (let area in areas) {
      if (pontuacoes.hasOwnProperty(area)) {
        pontuacoes[area] += areas[area] * respostaVal;
      }
    }
  }
}

function calcularSimilaridade(perfilUsuario, perfilReferencia) {
  let produto = 0, normaU = 0, normaR = 0;
  for (let area in perfilUsuario) {
    if (area in perfilReferencia) {
      let u = perfilUsuario[area] || 0;
      let r = perfilReferencia[area];
      produto += u * r;
      normaU += u * u;
      normaR += r * r;
    }
  }
  if (normaU === 0 || normaR === 0) return 0;
  let cosseno = produto / (Math.sqrt(normaU) * Math.sqrt(normaR));
  return Math.round(((cosseno + 1) / 2) * 100);
}

function gerarResultados() {
  calcularPerfil();
  let resultadosCursos = cursos.map(curso => {
    let sim = calcularSimilaridade(pontuacoes, curso.perfil);
    return { ...curso, similaridade: sim };
  });
  resultadosCursos.sort((a,b) => b.similaridade - a.similaridade);
  resultadoCursosDiv.innerHTML = '<h2>🎓 Cursos superiores recomendados</h2>';
  for (let i = 0; i < Math.min(20, resultadosCursos.length); i++) {
    const c = resultadosCursos[i];
    resultadoCursosDiv.innerHTML += `
      <div class="card">
        <h3>${c.nome} (${c.similaridade}% compatível)</h3>
        <p><strong>✅ Prós:</strong> ${c.pros}</p>
        <p><strong>❌ Contras:</strong> ${c.contras}</p>
        <p><strong>💰 Salário inicial:</strong> R$ ${c.salarioInicial.toLocaleString()} &nbsp; | &nbsp; <strong>Máximo:</strong> R$ ${c.salarioMaximo.toLocaleString()}</p>
        <p><strong>⏱️ Carga horária típica:</strong> ${c.cargaHoraria}</p>
        <p><strong>🏠 Equilíbrio com família:</strong> ${c.vidaFamiliar}/10 &nbsp; | &nbsp; <strong>🧘 Vida saudável:</strong> ${c.saudavel}/10</p>
        <p><strong>💡 Mensagem:</strong> ${c.nome} pode oferecer ${c.tempoLivre.toLowerCase()} e exige dedicação, mas com planejamento é possível ter qualidade de vida.</p>
      </div>
    `;
  }
  let resultadosCargos = cargosPublicos.map(cargo => {
    let sim = calcularSimilaridade(pontuacoes, cargo.perfil);
    return { ...cargo, similaridade: sim };
  });
  resultadosCargos.sort((a,b) => b.similaridade - a.similaridade);
  resultadoCargosDiv.innerHTML = '<h2>🏛️ Cargos públicos recomendados</h2>';
  for (let i = 0; i < Math.min(20, resultadosCargos.length); i++) {
    const c = resultadosCargos[i];
    resultadoCargosDiv.innerHTML += `
      <div class="card">
        <h3>${c.nome} (${c.similaridade}% compatível)</h3>
        <p><strong>✅ Prós:</strong> ${c.pros}</p>
        <p><strong>❌ Contras:</strong> ${c.contras}</p>
        <p><strong>💰 Salário inicial:</strong> R$ ${c.salarioInicial.toLocaleString()} &nbsp; | &nbsp; <strong>Máximo:</strong> R$ ${c.salarioMaximo.toLocaleString()}</p>
        <p><strong>⏱️ Jornada:</strong> ${c.cargaHoraria}</p>
        <p><strong>🏠 Equilíbrio com família:</strong> ${c.vidaFamiliar}/10 &nbsp; | &nbsp; <strong>🧘 Vida saudável:</strong> ${c.saudavel}/10</p>
        <p><strong>💡 Motivação:</strong> Este cargo permite ${c.tempoLivre.toLowerCase()}. Com disciplina, você constrói uma carreira estável e satisfatória.</p>
      </div>
    `;
  }
}

const materiasLista = ["Matemática", "Português", "História", "Ciências", "Artes", "Tecnologia", "Filosofia", "Geografia", "Biologia", "Química", "Física", "Educação Física"];
let notasMaterias = {};

function carregarTelaMaterias() {
  const container = document.getElementById("materias-container");
  if (!container) return;
  const materiasLista = ["Matemática", "Português", "História", "Ciências", "Artes", "Tecnologia", "Filosofia", "Geografia", "Biologia", "Química", "Física", "Educação Física"];
  let html = "";
  materiasLista.forEach(materia => {
    html += `<div style="margin-bottom: 1rem; display: flex; align-items: center;">
      <span style="width: 130px; font-weight: bold; color: #e0e0e0;">${materia}:</span>
      <input type="range" id="nota_${materia}" min="1" max="5" step="1" value="3" style="flex: 1; margin: 0 1rem;">
      <span id="valor_${materia}" style="width: 30px; text-align: center; color: #4caf50;">3</span>
    </div>`;
  });
  container.innerHTML = html;
  materiasLista.forEach(materia => {
    const slider = document.getElementById(`nota_${materia}`);
    const span = document.getElementById(`valor_${materia}`);
    if (slider && span) slider.addEventListener("input", () => { span.innerText = slider.value; });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  telaNome = document.getElementById('tela-nome');
  telaPerguntas = document.getElementById('tela-perguntas');
  telaResultado = document.getElementById('tela-resultado');
  telaMaterias = document.getElementById('tela-materias');
  nomeInput = document.getElementById('nome');
  iniciarBtn = document.getElementById('btn-iniciar');
  nomeUsuarioSpan = document.getElementById('nome-usuario');
  perguntaContainer = document.getElementById('pergunta-container');
  progressoTexto = document.getElementById('progresso-texto');
  barraProgresso = document.getElementById('barra-progresso');
  btnProximo = document.getElementById('btn-proximo');
  btnConcluir = document.getElementById('btn-concluir');
  resultadoNome = document.getElementById('resultado-nome');
  resultadoCursosDiv = document.getElementById('resultado-cursos');
  resultadoCargosDiv = document.getElementById('resultado-cargos');
  btnReiniciar = document.getElementById('btn-reiniciar');

  if (!iniciarBtn || !telaMaterias) {
    console.error("Elementos essenciais não encontrados. Verifique o HTML.");
    return;
  }

  iniciarBtn.addEventListener("click", () => {
    const nome = nomeInput.value.trim();
    if (nome === "") {
      alert("Por favor, digite seu nome.");
      return;
    }
    usuarioNome = nome;
    nomeUsuarioSpan.textContent = usuarioNome;
    resultadoNome.textContent = usuarioNome;
    telaNome.style.display = "none";
    telaMaterias.style.display = "block";
    carregarTelaMaterias();
  });

  const btnProximoMaterias = document.getElementById('btn-proximo-materias');
  if (btnProximoMaterias) {
    btnProximoMaterias.addEventListener("click", () => {
      materiasLista.forEach(materia => {
        const slider = document.getElementById(`nota_${materia}`);
        if (slider) notasMaterias[materia] = parseInt(slider.value);
      });
      localStorage.setItem("preferenciasMaterias", JSON.stringify(notasMaterias));
      telaMaterias.style.display = "none";
      telaPerguntas.style.display = "block";
      respostas = new Array(perguntas.length).fill(undefined);
      indicePerguntaAtual = 0;
      btnProximo.style.display = "inline-block";
      btnConcluir.style.display = "none";
      carregarPergunta();
    });
  }
  if (btnProximo) btnProximo.addEventListener('click', avancar);
  if (btnConcluir) {
    btnConcluir.addEventListener('click', () => {
      if (respostas[indicePerguntaAtual] === undefined) {
        alert("Responda a última pergunta.");
        return;
      }
      gerarResultados();
      telaPerguntas.style.display = 'none';
      telaResultado.style.display = 'block';
    });
  }
  if (btnReiniciar) {
    btnReiniciar.addEventListener('click', () => {
      telaResultado.style.display = 'none';
      telaNome.style.display = 'block';
      nomeInput.value = '';
      respostas = [];
      indicePerguntaAtual = 0;
    });
  }

  const btnCompartilhar = document.getElementById('btn-compartilhar');
  if (btnCompartilhar) btnCompartilhar.addEventListener('click', () => {
    let resumo = `Quiz Vocacional - Resultado para ${usuarioNome || "usuário"}:\n\n`;
    resumo += "🎓 Cursos superiores recomendados:\n";
    document.querySelectorAll("#resultado-cursos .card h3").forEach(h3 => resumo += `- ${h3.innerText}\n`);
    resumo += "\n🏛️ Cargos públicos recomendados:\n";
    document.querySelectorAll("#resultado-cargos .card h3").forEach(h3 => resumo += `- ${h3.innerText}\n`);
    navigator.clipboard.writeText(resumo).then(() => alert("Resumo copiado!")).catch(() => alert("Falha ao copiar."));
  });

  const whatsBtn = document.getElementById('btn-whatsapp');
  if (whatsBtn) {
    whatsBtn.addEventListener('click', () => {
      const nome = usuarioNome || "Usuário";
      const cursos = Array.from(document.querySelectorAll("#resultado-cursos .card h3")).map(h => h.innerText).join(", ");
      const cargos = Array.from(document.querySelectorAll("#resultado-cargos .card h3")).map(h => h.innerText).join(", ");
      const msg = `*Quiz Vocacional* - Resultado para *${nome}*%0a%0a*🎓 Cursos:*%0a${cursos}%0a%0a*🏛️ Cargos:*%0a${cargos}%0a%0a📖 Detalhes no site`;
      window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  const imgBtn = document.getElementById('btn-img');
  if (imgBtn) {
    imgBtn.addEventListener('click', async () => {
      const el = document.querySelector('#tela-resultado');
      if (!el) return alert("Nenhum resultado");
      try {
        imgBtn.innerText = "⏳";
        imgBtn.disabled = true;
        const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#0a0f1c' });
        const link = document.createElement('a');
        link.download = 'resultado.png';
        link.href = canvas.toDataURL();
        link.click();
        alert("Imagem salva!");
      } catch (err) {
        alert("Erro: " + err);
      } finally {
        imgBtn.innerText = "📸 Gerar Imagem";
        imgBtn.disabled = false;
      }
    });
  }
});
// força atualização

// Função para gerar HTML das disciplinas mais exigidas
function getDisciplinasAdequacao(itemNome, tipo) {
  const pesos = window.disciplinasPesos?.[tipo]?.[itemNome];
  if (!pesos) return "";
  const notas = JSON.parse(localStorage.getItem("preferenciasMaterias") || "{}");
  let html = '<p><strong>📖 Disciplinas mais exigidas:</strong><br>';
  for (let [disc, peso] of Object.entries(pesos)) {
    const notaUsuario = notas[disc] || 3;
    let emoji = notaUsuario >= 4 ? "✅" : (notaUsuario <= 2 ? "⚠️" : "➖");
    html += `${emoji} ${disc}: sua nota ${notaUsuario} (peso ${peso})<br>`;
  }
  html += '</p>';
  return html;
}

// Função para adicionar bloco de disciplinas após os resultados serem exibidos
function adicionarDisciplinasAposResultados() {
  const cards = document.querySelectorAll('#resultado-cursos .card, #resultado-cargos .card');
  cards.forEach(card => {
    // Evita duplicar
    if (card.querySelector('.disciplinas-wrapper')) return;
    const titulo = card.querySelector('h3')?.innerText || '';
    const nomeCurso = titulo.split('(')[0].trim();
    const tipo = card.closest('#resultado-cursos') ? 'cursos' : 'cargos';
    const pesos = window.disciplinasPesos?.[tipo]?.[nomeCurso];
    if (!pesos) return;
    const notas = JSON.parse(localStorage.getItem('preferenciasMaterias') || '{}');
    let html = '<div class="disciplinas-wrapper" style="margin-top:0.8rem; border-left:3px solid #4caf50; background:#1e2a3a; padding:0.5rem; border-radius:0.5rem;">';
    html += '<p><strong>📖 Disciplinas mais exigidas:</strong><br>';
    for (let [disc, peso] of Object.entries(pesos)) {
      const nota = notas[disc] || 3;
      const emoji = nota >= 4 ? '✅' : (nota <= 2 ? '⚠️' : '➖');
      html += `${emoji} ${disc}: sua nota ${nota} (peso ${peso})<br>`;
    }
    html += '</p></div>';
    // Insere após a mensagem (último <p> antes do final do card)
    const mensagemP = card.querySelector('p:last-of-type');
    if (mensagemP) mensagemP.insertAdjacentHTML('afterend', html);
    else card.insertAdjacentHTML('beforeend', html);
  });
}

// Observa quando a tela de resultado se tornar visível e adiciona as disciplinas
const observerDisciplinas = new MutationObserver(() => {
  const telaResultado = document.getElementById('tela-resultado');
  if (telaResultado && telaResultado.style.display === 'block') {
    setTimeout(() => adicionarDisciplinasAposResultados(), 100);
    observerDisciplinas.disconnect();
  }
});
observerDisciplinas.observe(document.body, { attributes: true, childList: true, subtree: true });

// Alternância de tema (claro/escuro)
const toggleBtn = document.getElementById('toggleTheme');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('tema-claro');
    toggleBtn.innerText = document.body.classList.contains('tema-claro') ? '🌙 Modo Escuro' : '🌓 Modo Claro';
    localStorage.setItem('tema', document.body.classList.contains('tema-claro') ? 'claro' : 'escuro');
  });
  // Recuperar preferência salva
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'claro') {
    document.body.classList.add('tema-claro');
    toggleBtn.innerText = '🌙 Modo Escuro';
  }
}

// Frase de direcionamento baseada no curso mais compatível
function atualizarFraseDirecionamento() {
  const container = document.getElementById('frase-direcionamento');
  if (!container) return;
  
  const primeiroCurso = document.querySelector('#resultado-cursos .card h3');
  if (!primeiroCurso) return;
  
  const nomeCurso = primeiroCurso.innerText.split('(')[0].trim();
  let area = '';
  let dica = '';
  
  // Personalize os blocos conforme seus cursos
  if (nomeCurso.includes('Direito')) {
    area = 'jurídica e humanidades';
    dica = 'invista em leitura, argumentação e conhecimento da legislação';
  } else if (nomeCurso.includes('Medicina')) {
    area = 'saúde e biológicas';
    dica = 'dedique-se à biologia, química e ao desenvolvimento da empatia';
  } else if (nomeCurso.includes('Engenharia')) {
    area = 'exatas e tecnologia';
    dica = 'fortaleça seu raciocínio lógico, matemática e habilidades práticas';
  } else if (nomeCurso.includes('Ciência da Computação') || nomeCurso.includes('Software')) {
    area = 'tecnologia e programação';
    dica = 'estude lógica de programação, algoritmos e mantenha-se atualizado';
  } else if (nomeCurso.includes('Psicologia')) {
    area = 'comportamento e saúde mental';
    dica = 'desenvolva escuta ativa, ética e conhecimento em neurociência';
  } else {
    area = 'humanidades e sociais';
    dica = 'valorize sua capacidade analítica, comunicação e senso crítico';
  }
  
  const frase = `🔍 **Direcionamento:** Seu perfil tem forte afinidade com a área ${area}. Para se destacar, ${dica}. Continue explorando esse caminho!`;
  container.innerHTML = `<p style="margin:0;">${frase}</p>`;
}

// Observar quando a tela de resultado se tornar visível
const observadorFrase = new MutationObserver(() => {
  const telaResultado = document.getElementById('tela-resultado');
  if (telaResultado && telaResultado.style.display === 'block') {
    setTimeout(atualizarFraseDirecionamento, 100);
    observadorFrase.disconnect();
  }
});
observadorFrase.observe(document.body, { attributes: true, childList: true, subtree: true });

// Botão para gerar PDF
document.addEventListener('DOMContentLoaded', function() {
});

// Botão para gerar PDF (versão corrigida)
document.addEventListener('DOMContentLoaded', function() {
});

// Botão para gerar PDF com múltiplas páginas
document.addEventListener('DOMContentLoaded', function() {
});

// Botão para compartilhar via WhatsApp (texto com resumo)
document.addEventListener('DOMContentLoaded', function() {
});

// Botão para baixar PDF (salvar arquivo)
document.addEventListener('DOMContentLoaded', function() {
});

// Botão para baixar PDF com múltiplas páginas
document.addEventListener('DOMContentLoaded', function() {
  const btnPdf = document.getElementById('btn-pdf');
  if (!btnPdf) return;
  
  btnPdf.addEventListener('click', async function() {
    if (typeof html2canvas === 'undefined') {
      alert("Biblioteca html2canvas não carregada.");
      return;
    }
    if (typeof jspdf === 'undefined') {
      alert("Biblioteca jsPDF não carregada.");
      return;
    }
    const { jsPDF } = jspdf;
    const nome = usuarioNome || "Usuário";
    const resultadoDiv = document.getElementById('tela-resultado');
    if (!resultadoDiv || resultadoDiv.style.display !== 'block') {
      alert("Nenhum resultado visível.");
      return;
    }
    
    // Inserir notas das matérias temporariamente
    const notasMaterias = JSON.parse(localStorage.getItem('preferenciasMaterias') || '{}');
    const materiasLista = ["Matemática", "Português", "História", "Ciências", "Artes", "Tecnologia", "Filosofia", "Geografia", "Biologia", "Química", "Física", "Educação Física"];
    const notasDiv = document.createElement('div');
    notasDiv.id = 'temp-notas-pdf';
    notasDiv.style.backgroundColor = '#f0f0f0';
    notasDiv.style.padding = '12px';
    notasDiv.style.marginBottom = '20px';
    notasDiv.style.borderRadius = '8px';
    let htmlNotas = `<h3>📋 Notas nas disciplinas (1 a 5)</h3><table style="width:100%; border-collapse:collapse;">`;
    materiasLista.forEach(materia => {
      const nota = notasMaterias[materia] || 3;
      htmlNotas += `<tr><td style="padding:4px;"><strong>${materia}</strong></td><td style="padding:4px;">${nota}</td></tr>`;
    });
    htmlNotas += `</table><hr>`;
    notasDiv.innerHTML = htmlNotas;
    resultadoDiv.insertBefore(notasDiv, resultadoDiv.firstChild);
    
    try {
      const canvas = await html2canvas(resultadoDiv, { scale: 2, backgroundColor: '#ffffff', logging: false });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // mm
      const pageHeight = 297; // mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`resultado_quiz_${nome.replace(/[^a-z0-9]/gi, '_')}.pdf`);
      alert("PDF gerado com sucesso!");
    } catch (err) {
      alert("Erro ao gerar PDF: " + err.message);
    } finally {
      if (notasDiv && notasDiv.parentNode) notasDiv.parentNode.removeChild(notasDiv);
    }
  });
});
