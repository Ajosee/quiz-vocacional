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

// Elementos DOM
const telaNome = document.getElementById('tela-nome');
const telaPerguntas = document.getElementById('tela-perguntas');
const telaResultado = document.getElementById('tela-resultado');
const telaMaterias = document.getElementById("tela-materias");
const nomeInput = document.getElementById('nome');
const iniciarBtn = document.getElementById('btn-iniciar');
const nomeUsuarioSpan = document.getElementById('nome-usuario');
const perguntaContainer = document.getElementById('pergunta-container');
const progressoTexto = document.getElementById('progresso-texto');
const barraProgresso = document.getElementById('barra-progresso');
const btnProximo = document.getElementById('btn-proximo');
const btnConcluir = document.getElementById('btn-concluir');
const resultadoNome = document.getElementById('resultado-nome');
const resultadoCursosDiv = document.getElementById('resultado-cursos');
const resultadoCargosDiv = document.getElementById('resultado-cargos');
const btnReiniciar = document.getElementById('btn-reiniciar');

function resetPontuacoes() {
  for (let key in areasMap) pontuacoes[key] = 0;
}

function carregarPergunta() {
  const p = perguntas[indicePerguntaAtual];
  let html = `<div class="pergunta"><p><strong>${p.texto}</strong></p><div class="opcoes">`;
  const opcoesTexto = ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"];
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
  // Converte para porcentagem (0..100) -> similaridade = (cosseno + 1) / 2 * 100
  return Math.round(((cosseno + 1) / 2) * 100);
}


iniciarBtn.addEventListener('click', () => {
  const nome = nomeInput.value.trim();
  if (nome === '') {
    alert('Por favor, digite seu nome.');
    return;
  }
  usuarioNome = nome;
  nomeUsuarioSpan.textContent = usuarioNome;
  resultadoNome.textContent = usuarioNome;
  telaNome.style.display = 'none';
  telaPerguntas.style.display = 'block';
  respostas = new Array(perguntas.length).fill(undefined);
  indicePerguntaAtual = 0;
  btnProximo.style.display = 'inline-block';
  btnConcluir.style.display = 'none';
  carregarPergunta();
});

btnProximo.addEventListener('click', avancar);

btnConcluir.addEventListener('click', () => {
  if (respostas[indicePerguntaAtual] === undefined) {
    alert("Responda a última pergunta.");
    return;
  }
  gerarResultados();
  telaPerguntas.style.display = 'none';
  telaResultado.style.display = 'block';
    // Adiciona seção de feedback após os resultados

    if (!document.getElementById("feedback-section")) {

      const fbDiv = document.createElement("div");

      fbDiv.id = "feedback-section";

      fbDiv.style.margin = "1rem 0";

      fbDiv.style.padding = "0.5rem";

      fbDiv.style.background = "#1e2a3a";

      fbDiv.style.borderRadius = "0.5rem";

      fbDiv.innerHTML = `<p><strong>📢 Sua opinião é importante!</strong><br>Você concorda com as recomendações acima?</p>
        <button id="feedback-sim" style="background:#4caf50; margin-right:0.5rem;">👍 Sim</button>
        <button id="feedback-nao" style="background:#f44336; margin-right:0.5rem;">👎 Não</button>
        <button id="feedback-talvez" style="background:#ff9800;">🤔 Talvez</button>
        <div id="feedback-msg" style="margin-top:0.5rem; font-size:0.8rem;"></div>`;

      document.getElementById("resultado-cargos").insertAdjacentElement("afterend", fbDiv);

      const simBtn = document.getElementById("feedback-sim");

      const naoBtn = document.getElementById("feedback-nao");

      const talvezBtn = document.getElementById("feedback-talvez");

      const msgDiv = document.getElementById("feedback-msg");

      simBtn.addEventListener("click", () => {

        localStorage.setItem("quizFeedback", "sim");

        msgDiv.innerHTML = "🙏 Obrigado! Seu feedback ajuda a melhorar o quiz.";

        setTimeout(() => { fbDiv.style.display = "none"; }, 3000);

      });

      naoBtn.addEventListener("click", () => {

        localStorage.setItem("quizFeedback", "nao");

        msgDiv.innerHTML = "😕 Sentimos muito. Em breve ajustaremos as recomendações.";

        setTimeout(() => { fbDiv.style.display = "none"; }, 3000);

      });

      talvezBtn.addEventListener("click", () => {

        localStorage.setItem("quizFeedback", "talvez");

        msgDiv.innerHTML = "🤔 Obrigado pela honestidade. Continuaremos melhorando!";

        setTimeout(() => { fbDiv.style.display = "none"; }, 3000);

      });

    }


});

btnReiniciar.addEventListener('click', () => {
  telaResultado.style.display = 'none';
  telaNome.style.display = 'block';
  nomeInput.value = '';
  respostas = [];
  indicePerguntaAtual = 0;
});

// Botão de compartilhar resultados (adicionado dinamicamente)
document.addEventListener('DOMContentLoaded', function() {
  const btnCompartilhar = document.getElementById('btn-compartilhar');
  if (btnCompartilhar) {
    btnCompartilhar.addEventListener('click', () => {
      let resumo = `Quiz Vocacional - Resultado para ${usuarioNome}:\n\n`;
      resumo += "🎓 Cursos superiores recomendados:\n";
      const cursosCards = document.querySelectorAll("#resultado-cursos .card");
      cursosCards.forEach(card => {
        const titulo = card.querySelector("h3")?.innerText || "";
        resumo += `- ${titulo}\n`;
      });
      resumo += "\n🏛️ Cargos públicos recomendados:\n";
      const cargosCards = document.querySelectorAll("#resultado-cargos .card");
      cargosCards.forEach(card => {
        const titulo = card.querySelector("h3")?.innerText || "";
        resumo += `- ${titulo}\n`;
      });
      navigator.clipboard.writeText(resumo).then(() => {
        alert("Resumo copiado para a área de transferência!");
      }).catch(() => {
        alert("Não foi possível copiar. Copie manualmente.");
      });
    });
  }
});

// Adiciona evento de clique no botão compartilhar
document.addEventListener('DOMContentLoaded', function() {
  const shareBtn = document.getElementById('btn-compartilhar');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      let resumo = `Quiz Vocacional - Resultado para ${usuarioNome || "usuário"}:\n\n`;
      resumo += "🎓 Cursos superiores recomendados:\n";
      document.querySelectorAll("#resultado-cursos .card h3").forEach(h3 => {
        resumo += `- ${h3.innerText}\n`;
      });
      resumo += "\n🏛️ Cargos públicos recomendados:\n";
      document.querySelectorAll("#resultado-cargos .card h3").forEach(h3 => {
        resumo += `- ${h3.innerText}\n`;
      });
      navigator.clipboard.writeText(resumo).then(() => alert("Resumo copiado para área de transferência!")).catch(() => alert("Falha ao copiar."));
    });
  }
});

// ==================== TELA DE MATÉRIAS ====================
const materiasLista = ["Matemática", "Português", "História", "Ciências", "Artes", "Tecnologia", "Filosofia", "Geografia", "Biologia", "Química", "Física", "Educação Física"];
let notasMaterias = {};

function carregarTelaMaterias() {
  const container = document.getElementById("materias-container");
  if (!container) return;
  let html = "";
  materiasLista.forEach(materia => {
    html += `<div style="margin-bottom: 1rem;">
      <label>${materia}: </label>
      <input type="range" id="nota_${materia}" min="1" max="5" step="1" value="3" style="width: 60%;">
      <span id="valor_${materia}">3</span>
    </div>`;
  });
  container.innerHTML = html;
  // Adiciona eventos para mostrar o valor atual
  materiasLista.forEach(materia => {
    const slider = document.getElementById(`nota_${materia}`);
    const span = document.getElementById(`valor_${materia}`);
    slider.addEventListener("input", () => {
      span.innerText = slider.value;
    });
  });
}

// Substituir o comportamento do botão "Começar quiz"
const btnIniciarOriginal = document.getElementById('btn-iniciar');
if (btnIniciarOriginal) {
  btnIniciarOriginal.addEventListener('click', () => {
    const nome = nomeInput.value.trim();
    if (nome === '') {
      alert('Por favor, digite seu nome.');
      return;
    }
    usuarioNome = nome;
    nomeUsuarioSpan.textContent = usuarioNome;
    resultadoNome.textContent = usuarioNome;
    telaNome.style.display = 'none';
    telaMaterias.style.display = 'block';
    carregarTelaMaterias();
  });
}

// Botão "Próximo" da tela de matérias
document.getElementById('btn-proximo-materias')?.addEventListener('click', () => {
  // Coleta as notas
  materiasLista.forEach(materia => {
    const slider = document.getElementById(`nota_${materia}`);
    if (slider) notasMaterias[materia] = parseInt(slider.value);
  });
  // Armazena no localStorage ou em variável global
  localStorage.setItem("preferenciasMaterias", JSON.stringify(notasMaterias));
  // Avança para as perguntas
  telaMaterias.style.display = 'none';
  telaPerguntas.style.display = 'block';
  // Inicializa o quiz (já existente)
  respostas = new Array(perguntas.length).fill(undefined);
  indicePerguntaAtual = 0;
  btnProximo.style.display = 'inline-block';
  btnConcluir.style.display = 'none';
  carregarPergunta();
});

// Função para gerar texto de adequação com base nas notas das matérias
function getDisciplinasAdequacao(cursoNome, tipo = "cursos") {
  const pesos = window.disciplinasPesos?.[tipo]?.[cursoNome];
  if (!pesos) return "";
  const notas = JSON.parse(localStorage.getItem("preferenciasMaterias") || "{}");
  let feedback = "<p><strong>📖 Disciplinas mais exigidas:</strong><br>";
  for (let [disc, peso] of Object.entries(pesos)) {
    const notaUsuario = notas[disc] || 3; // padrão 3
    let emoji = notaUsuario >= 4 ? "✅" : (notaUsuario <= 2 ? "⚠️" : "➖");
    feedback += `${emoji} ${disc}: sua nota ${notaUsuario} (peso ${peso})<br>`;
  }
  feedback += "</p>";
  return feedback;
}

// Substituir a criação dos cards de cursos e cargos para incluir essa informação.
// Como a função gerarResultados já existe, precisamos alterá-la.
// Vamos fazer uma cópia e modificar com sed (mais seguro).
// Mas, como o script é grande, faremos uma substituição direta.
// Para evitar duplicação, anexamos um observador após o carregamento.
// No entanto, o mais fácil é modificar a função original.
// Vamos usar sed para inserir a chamada dentro do laço de cursos.
// Como não quero arriscar quebrar, vou pedir que você execute um comando sed seguro.
// O comando a seguir insere a linha dentro da criação do card de cursos.

