// 25 perguntas (mesmo conteúdo, omitido por brevidade, mas mantenha igual ao que tinha)
// Vou colocar um conteúdo mínimo funcional (com 20 cursos, 20 cargos e pesos)
const perguntas = [
  { texto: "Você gosta de resolver problemas matemáticos e desvendar enigmas numéricos?", areas: { logica: 3, ciencia: 2 } },
  { texto: "Prefere atividades que envolvem leitura, escrita e análise de textos?", areas: { linguagem: 3, humanas: 2 } },
  { texto: "Tem facilidade para criar desenhos, músicas ou inventar novas soluções?", areas: { criatividade: 3, inovacao: 2 } },
  { texto: "Se sente bem organizando tarefas, prazos e detalhes de projetos?", areas: { organizacao: 3, atencao: 2 } },
  { texto: "Você se importa genuinamente com os sentimentos dos outros e gosta de ajudar?", areas: { empatia: 3, interpessoal: 2 } },
  { texto: "Assume facilmente a liderança em trabalhos em grupo e toma decisões?", areas: { lideranca: 3, decisao: 2 } },
  { texto: "Consegue manter a calma sob pressão e lidar com críticas?", areas: { resiliencia: 3 } },
  { texto: "Tem curiosidade sobre como funcionam computadores, redes e novas tecnologias?", areas: { tecnologia: 3, ciencia: 2 } },
  { texto: "Gosta de aprender sobre história, filosofia ou política?", areas: { humanas: 3, servico_publico: 2 } },
  { texto: "Prefere ter segurança e estabilidade no trabalho a correr riscos por altos ganhos?", areas: { estabilidade: 3, empreendedorismo: -2 } },
  { texto: "Você se sente confortável em falar em público e persuadir pessoas?", areas: { comunicacao: 3, lideranca: 2 } },
  { texto: "Tem paciência para ensinar ou treinar outras pessoas?", areas: { empatia: 3, educacao: 2 } },
  { texto: "Gosta de trabalhar ao ar livre ou em locais que variam constantemente?", areas: { versatilidade: 2, saude: 1 } },
  { texto: "Você prefere rotinas previsíveis a desafios inesperados?", areas: { estabilidade: 2, aversao_risco: 2 } },
  { texto: "Tem interesse por economia, finanças e administração?", areas: { financas: 3, organizacao: 2 } },
  { texto: "Acredita que o serviço público pode transformar a sociedade?", areas: { servico_publico: 3, humanas: 2 } },
  { texto: "Você gosta de pesquisar, analisar dados e encontrar padrões?", areas: { logica: 2, ciencia: 3, atencao: 2 } },
  { texto: "Prefere trabalhar em equipe do que sozinho?", areas: { interpessoal: 3, cooperacao: 2 } },
  { texto: "Tem facilidade para aprender idiomas?", areas: { linguagem: 2, comunicacao: 2 } },
  { texto: "Você busca uma profissão que permita tempo para cuidar da saúde e da família?", areas: { qualidade_vida: 3, equilibrio: 3 } },
  { texto: "Você se sente motivado(a) a trabalhar em equipe para resolver problemas sociais?", areas: { cooperacao: 3, servico_publico: 2, empatia: 2 } },
  { texto: "Prefere tarefas que exigem raciocínio rápido e tomada de decisão sob pressão?", areas: { logica: 2, resiliencia: 3, lideranca: 2 } },
  { texto: "Gosta de estudar sobre direito, leis e justiça?", areas: { humanas: 3, servico_publico: 3, linguagem: 2 } },
  { texto: "Tem facilidade para lidar com números e estatísticas?", areas: { logica: 3, financas: 2, ciencia: 2 } },
  { texto: "Você valoriza um trabalho que permita horário flexível para atividades físicas e convívio familiar?", areas: { qualidade_vida: 3, equilibrio: 3, aversao_risco: 1 } }
];

const cursos = [
  { nome: "Direito", perfil: { logica:6, linguagem:8, empatia:7, organizacao:7, lideranca:6, servico_publico:9, resiliencia:5 }, pros: "Alta empregabilidade, concursos, prestígio.", contras: "Estudos intensos, mercado saturado.", salarioInicial:5000, salarioMaximo:30000, cargaHoraria:"44h", tempoLivre:"Médio", vidaFamiliar:7, saudavel:6 },
  { nome: "Administração", perfil: { organizacao:8, lideranca:7, financas:8, comunicacao:7, estabilidade:5, empreendedorismo:6 }, pros: "Versátil, concursos.", contras: "Competitivo, salários iniciais baixos.", salarioInicial:3500, salarioMaximo:20000, cargaHoraria:"40-44h", tempoLivre:"Médio", vidaFamiliar:7, saudavel:7 },
  { nome: "Medicina", perfil: { logica:8, empatia:9, resiliencia:8, atencao:9, ciencia:8 }, pros: "Alta remuneração, respeito.", contras: "Curso longo, plantões.", salarioInicial:8000, salarioMaximo:40000, cargaHoraria:"20-60h", tempoLivre:"Baixo", vidaFamiliar:5, saudavel:5 },
  { nome: "Ciência da Computação", perfil: { logica:9, tecnologia:9, ciencia:8, criatividade:6, organizacao:5 }, pros: "Alta empregabilidade, trabalho remoto.", contras: "Atualização constante, burnout.", salarioInicial:6000, salarioMaximo:25000, cargaHoraria:"40h", tempoLivre:"Médio/alto", vidaFamiliar:8, saudavel:6 },
  { nome: "Engenharia Civil", perfil: { logica:8, organizacao:7, atencao:8, resiliencia:7, ciencia:7 }, pros: "Boa remuneração, empreender.", contras: "Obras estressantes.", salarioInicial:7000, salarioMaximo:25000, cargaHoraria:"44h", tempoLivre:"Médio", vidaFamiliar:6, saudavel:6 },
  { nome: "Psicologia", perfil: { empatia:9, comunicacao:8, humanas:7, resiliencia:6, interpessoal:8 }, pros: "Gratificante, ajuda pessoas.", contras: "Desgaste emocional.", salarioInicial:4000, salarioMaximo:15000, cargaHoraria:"30-40h", tempoLivre:"Bom", vidaFamiliar:8, saudavel:7 },
  { nome: "Pedagogia", perfil: { empatia:8, educacao:9, comunicacao:7, organizacao:6, lideranca:5 }, pros: "Necessidade constante, concursos.", contras: "Baixa remuneração.", salarioInicial:3500, salarioMaximo:10000, cargaHoraria:"30-40h", tempoLivre:"Alto", vidaFamiliar:9, saudavel:7 },
  { nome: "Arquitetura", perfil: { criatividade:8, organizacao:7, atencao:8, arte:7, ciencia:6 }, pros: "Criatividade, empreendedorismo.", contras: "Mercado instável.", salarioInicial:5000, salarioMaximo:18000, cargaHoraria:"40-44h", tempoLivre:"Médio", vidaFamiliar:6, saudavel:6 },
  { nome: "Enfermagem", perfil: { empatia:9, resiliencia:8, atencao:8, ciencia:7, organizacao:6 }, pros: "Empregabilidade alta.", contras: "Plantões, estresse.", salarioInicial:4500, salarioMaximo:12000, cargaHoraria:"36-44h", tempoLivre:"Médio/baixo", vidaFamiliar:6, saudavel:5 },
  { nome: "Educação Física", perfil: { saude:9, comunicacao:7, lideranca:6, empatia:6, versatilidade:7 }, pros: "Trabalho ativo, horários flexíveis.", contras: "Baixa remuneração inicial.", salarioInicial:3500, salarioMaximo:12000, cargaHoraria:"30-40h", tempoLivre:"Bom", vidaFamiliar:8, saudavel:8 },
  { nome: "Farmácia", perfil: { ciencia:8, atencao:8, organizacao:7, financas:6, empatia:6 }, pros: "Boa empregabilidade.", contras: "Trabalho repetitivo.", salarioInicial:4500, salarioMaximo:15000, cargaHoraria:"40h", tempoLivre:"Médio", vidaFamiliar:7, saudavel:6 },
  { nome: "Odontologia", perfil: { atencao:9, ciencia:8, empatia:7, organizacao:7, empreendedorismo:6 }, pros: "Alta remuneração, consultório próprio.", contras: "Investimento alto.", salarioInicial:6000, salarioMaximo:30000, cargaHoraria:"30-40h", tempoLivre:"Bom", vidaFamiliar:8, saudavel:7 },
  { nome: "Nutrição", perfil: { ciencia:7, empatia:8, organizacao:7, saude:8, comunicacao:7 }, pros: "Crescente demanda.", contras: "Remuneração inicial média.", salarioInicial:4000, salarioMaximo:15000, cargaHoraria:"36-40h", tempoLivre:"Médio", vidaFamiliar:7, saudavel:8 },
  { nome: "Serviço Social", perfil: { empatia:9, humanas:8, servico_publico:8, comunicacao:7, resiliencia:7 }, pros: "Trabalho social relevante, concursos.", contras: "Baixa remuneração.", salarioInicial:3800, salarioMaximo:12000, cargaHoraria:"30-40h", tempoLivre:"Médio", vidaFamiliar:7, saudavel:6 },
  { nome: "Comunicação Social", perfil: { linguagem:8, criatividade:7, comunicacao:9, humanas:6, empreendedorismo:6 }, pros: "Criatividade, mercado variado.", contras: "Competitivo.", salarioInicial:3500, salarioMaximo:18000, cargaHoraria:"40h", tempoLivre:"Médio", vidaFamiliar:6, saudavel:6 },
  { nome: "Geografia", perfil: { logica:6, humanas:8, ciencia:7, organizacao:6, educacao:7 }, pros: "Docência, pesquisas, concursos.", contras: "Mercado restrito.", salarioInicial:3500, salarioMaximo:12000, cargaHoraria:"30-40h", tempoLivre:"Bom", vidaFamiliar:8, saudavel:7 },
  { nome: "História", perfil: { humanas:9, linguagem:7, educacao:7, organizacao:6, pesquisa:7 }, pros: "Docência, museus, concursos.", contras: "Mercado limitado.", salarioInicial:3500, salarioMaximo:12000, cargaHoraria:"30-40h", tempoLivre:"Bom", vidaFamiliar:8, saudavel:7 },
  { nome: "Letras", perfil: { linguagem:9, humanas:7, educacao:7, comunicacao:8, criatividade:6 }, pros: "Docência, tradução, concursos.", contras: "Baixa remuneração inicial.", salarioInicial:3500, salarioMaximo:15000, cargaHoraria:"30-40h", tempoLivre:"Bom", vidaFamiliar:8, saudavel:7 },
  { nome: "Matemática", perfil: { logica:9, ciencia:8, educacao:7, organizacao:6, atencao:8 }, pros: "Docência, setor financeiro, concursos.", contras: "Mercado de ensino saturado.", salarioInicial:4500, salarioMaximo:20000, cargaHoraria:"30-40h", tempoLivre:"Médio/bom", vidaFamiliar:7, saudavel:6 },
  { nome: "Engenharia de Software", perfil: { logica:9, tecnologia:9, ciencia:8, criatividade:7, organizacao:7 }, pros: "Alta demanda, salários altos, remoto.", contras: "Atualização constante, pressão.", salarioInicial:8000, salarioMaximo:35000, cargaHoraria:"40h", tempoLivre:"Médio/alto", vidaFamiliar:7, saudavel:6 }
];

const cargosPublicos = [
  { nome: "Auditor Fiscal", perfil: { logica:8, organizacao:8, atencao:9, financas:9, estabilidade:10, servico_publico:7 }, pros: "Salário muito alto, estabilidade.", contras: "Concurso disputadíssimo.", salarioInicial:20000, salarioMaximo:35000, cargaHoraria:"40h", tempoLivre:"Bom", vidaFamiliar:8, saudavel:7 },
  { nome: "Professor de Educação Básica", perfil: { empatia:9, comunicacao:8, educacao:9, humanas:8, resiliencia:7 }, pros: "Férias regulares, horário reduzido.", contras: "Baixa remuneração.", salarioInicial:4500, salarioMaximo:8000, cargaHoraria:"30-40h", tempoLivre:"Alto", vidaFamiliar:9, saudavel:6 },
  { nome: "Analista Judiciário (Área Administrativa)", perfil: { organizacao:8, linguagem:8, atencao:8, estabilidade:9, servico_publico:7 }, pros: "Salário médio alto, estabilidade.", contras: "Burocracia.", salarioInicial:12000, salarioMaximo:20000, cargaHoraria:"40h", tempoLivre:"Médio", vidaFamiliar:8, saudavel:8 },
  { nome: "Policial Federal", perfil: { resiliencia:9, logica:7, atencao:8, lideranca:7, servico_publico:8 }, pros: "Salário inicial acima de 12k, aposentadoria especial.", contras: "Risco físico, plantões.", salarioInicial:12000, salarioMaximo:20000, cargaHoraria:"40h+plantões", tempoLivre:"Médio", vidaFamiliar:6, saudavel:5 },
  { nome: "Especialista em Políticas Públicas", perfil: { organizacao:8, financas:7, humanas:7, comunicacao:6, lideranca:6 }, pros: "Salários bons (8-15k), impacto social.", contras: "Burocracia.", salarioInicial:8000, salarioMaximo:18000, cargaHoraria:"40h", tempoLivre:"Médio", vidaFamiliar:7, saudavel:7 },
  { nome: "Técnico Judiciário (TI)", perfil: { tecnologia:8, logica:7, organizacao:7, atencao:7, stabilidade:9 }, pros: "Salário médio, estabilidade.", contras: "Atualização lenta.", salarioInicial:6000, salarioMaximo:12000, cargaHoraria:"40h", tempoLivre:"Bom", vidaFamiliar:8, saudavel:8 },
  { nome: "Agente da Polícia Rodoviária Federal", perfil: { resiliencia:8, atencao:8, logica:6, estabilidade:9, servico_publico:7 }, pros: "Salário inicial 10k+, aposentadoria especial.", contras: "Periculosidade, plantões.", salarioInicial:10000, salarioMaximo:18000, cargaHoraria:"40h+plantões", tempoLivre:"Médio/baixo", vidaFamiliar:6, saudavel:5 },
  { nome: "Médico (serviço público)", perfil: { logica:8, empatia:9, resiliencia:8, atencao:9, ciencia:8 }, pros: "Salário alto (15-25k), atendimento à população.", contras: "Plantões, pressão.", salarioInicial:15000, salarioMaximo:30000, cargaHoraria:"20-40h+plantões", tempoLivre:"Médio/baixo", vidaFamiliar:5, saudavel:5 },
  { nome: "Engenheiro Civil (serviço público)", perfil: { logica:8, organizacao:7, atencao:8, resiliencia:7, ciencia:7 }, pros: "Salário médio (8-12k), estabilidade.", contras: "Burocracia.", salarioInicial:8000, salarioMaximo:15000, cargaHoraria:"40h", tempoLivre:"Médio", vidaFamiliar:6, saudavel:6 },
  { nome: "Analista Ambiental", perfil: { ciencia:8, humanas:7, organizacao:7, atencao:7, servico_publico:8 }, pros: "Salário médio (7-12k), trabalho socioambiental.", contras: "Deslocamentos.", salarioInicial:7000, salarioMaximo:15000, cargaHoraria:"40h", tempoLivre:"Médio", vidaFamiliar:7, saudavel:7 },
  { nome: "Procurador Municipal", perfil: { linguagem:9, logica:7, organizacao:8, atencao:8, servico_publico:9 }, pros: "Salário alto (15-25k), prestígio.", contras: "Concurso difícil.", salarioInicial:15000, salarioMaximo:25000, cargaHoraria:"40h", tempoLivre:"Médio", vidaFamiliar:7, saudavel:6 },
  { nome: "Auditor de Controle Externo", perfil: { logica:8, organizacao:8, atencao:9, financas:9, servico_publico:8 }, pros: "Salário muito alto (20k+), fiscalização.", contras: "Concurso extremamente concorrido.", salarioInicial:20000, salarioMaximo:35000, cargaHoraria:"40h", tempoLivre:"Bom", vidaFamiliar:8, saudavel:7 },
  { nome: "Técnico Administrativo Federal", perfil: { organizacao:7, atencao:7, comunicacao:6, estabilidade:9, servico_publico:6 }, pros: "Salário médio (4-7k), estabilidade.", contras: "Rotina burocrática.", salarioInicial:4500, salarioMaximo:9000, cargaHoraria:"40h", tempoLivre:"Bom", vidaFamiliar:8, saudavel:7 },
  { nome: "Oficial de Justiça", perfil: { organizacao:7, atencao:7, resiliencia:7, comunicacao:6, servico_publico:7 }, pros: "Salário médio (8-12k), estabilidade.", contras: "Carga externa, riscos.", salarioInicial:8000, salarioMaximo:15000, cargaHoraria:"40h", tempoLivre:"Médio", vidaFamiliar:7, saudavel:6 },
  { nome: "Policial Rodoviário Estadual", perfil: { resiliencia:8, atencao:8, logica:6, estabilidade:8, servico_publico:7 }, pros: "Salário inicial 8-12k, aposentadoria especial.", contras: "Periculosidade, plantões.", salarioInicial:10000, salarioMaximo:18000, cargaHoraria:"40h+plantões", tempoLivre:"Médio/baixo", vidaFamiliar:6, saudavel:5 },
  { nome: "Bombeiro Militar", perfil: { resiliencia:9, atencao:8, saude:8, lideranca:7, servico_publico:8 }, pros: "Salário médio-alto, aposentadoria especial.", contras: "Risco de vida, plantões.", salarioInicial:8000, salarioMaximo:18000, cargaHoraria:"Escala 24x72", tempoLivre:"Médio", vidaFamiliar:6, saudavel:6 },
  { nome: "Técnico de Laboratório (serviço público)", perfil: { ciencia:8, atencao:8, organizacao:7, resiliencia:6, servico_publico:6 }, pros: "Salário médio (4-7k), estabilidade.", contras: "Remuneração limitada.", salarioInicial:4500, salarioMaximo:10000, cargaHoraria:"40h", tempoLivre:"Bom", vidaFamiliar:7, saudavel:7 },
  { nome: "Agente de Defesa Civil", perfil: { resiliencia:8, atencao:7, logica:6, servico_publico:8, saude:6 }, pros: "Serviço essencial, estabilidade.", contras: "Situações de emergência.", salarioInicial:6000, salarioMaximo:12000, cargaHoraria:"40h+plantões", tempoLivre:"Médio", vidaFamiliar:6, saudavel:5 },
  { nome: "Perito Criminal Federal", perfil: { logica:8, ciencia:8, atencao:9, organizacao:7, servico_publico:8 }, pros: "Salário alto (15-25k), trabalho investigativo.", contras: "Concurso altamente concorrido.", salarioInicial:15000, salarioMaximo:25000, cargaHoraria:"40h", tempoLivre:"Médio", vidaFamiliar:7, saudavel:6 },
  { nome: "Analista de Tecnologia da Informação (serviço público)", perfil: { tecnologia:9, logica:8, organizacao:7, atencao:7, estabilidade:9 }, pros: "Salário bom (8-15k), estabilidade.", contras: "Burocracia, atualização lenta.", salarioInicial:8000, salarioMaximo:18000, cargaHoraria:"40h", tempoLivre:"Bom", vidaFamiliar:8, saudavel:7 }
];

// PESOS DAS DISCIPLINAS
if (!window.disciplinasPesos) window.disciplinasPesos = {};
window.disciplinasPesos.cursos = {
  Direito: { Português:5, História:5, Filosofia:4, Geografia:3, Matemática:2 },
  Administração: { Matemática:4, Português:4, Geografia:3, Filosofia:2, Tecnologia:3 },
  Medicina: { Biologia:5, Química:5, Ciências:5, Português:3, Matemática:3 },
  "Ciência da Computação": { Matemática:5, Tecnologia:5, Física:4, Lógica:5 },
  "Engenharia Civil": { Matemática:5, Física:5, Química:3, "Desenho Técnico":4 },
  Psicologia: { Português:4, Filosofia:4, Biologia:4, História:3 },
  Pedagogia: { Português:5, História:4, Filosofia:4, Artes:3 },
  Arquitetura: { Matemática:3, Artes:5, História:3, Física:4, "Desenho Técnico":5 },
  Enfermagem: { Biologia:5, Química:4, Português:3, Psicologia:4 },
  "Educação Física": { "Educação Física":5, Biologia:4, Português:3, Psicologia:3 },
  Farmácia: { Química:5, Biologia:5, Matemática:3, Português:3 },
  Odontologia: { Biologia:5, Química:4, Artes:2, Português:3 },
  Nutrição: { Biologia:5, Química:4, Português:3, "Educação Física":3 },
  "Serviço Social": { Português:4, História:4, Filosofia:3, Geografia:3 },
  "Comunicação Social": { Português:5, Artes:4, História:3, Filosofia:3 },
  Geografia: { Geografia:5, História:4, Ciências:4, Português:3 },
  História: { História:5, Português:4, Filosofia:4, Geografia:3 },
  Letras: { Português:5, Inglês:4, História:3, Filosofia:3 },
  Matemática: { Matemática:5, Física:4, Lógica:4, Português:3 },
  "Engenharia de Software": { Matemática:5, Tecnologia:5, Lógica:5, Inglês:4 }
};
window.disciplinasPesos.cargos = {
  "Auditor Fiscal": { Matemática:5, Direito:4, Economia:5, Português:4 },
  "Professor de Educação Básica": { Pedagogia:5, Português:5, Matemática:4, Psicologia:4 },
  "Analista Judiciário (Área Administrativa)": { Português:5, Direito:5, Administração:4, Raciocínio:4 },
  "Policial Federal": { "Educação Física":5, Psicologia:3, Direito:4 },
  "Especialista em Políticas Públicas": { Economia:4, Sociologia:4, Português:4 },
  "Técnico Judiciário (TI)": { Tecnologia:5, Matemática:4, Inglês:3 },
  "Agente da Polícia Rodoviária Federal": { "Educação Física":5, Direito:3, Geografia:4 },
  "Médico (serviço público)": { Biologia:5, Química:5, Português:3, Psicologia:3 },
  "Engenheiro Civil (serviço público)": { Matemática:5, Física:5, Química:3, "Desenho Técnico":4 },
  "Analista Ambiental": { Biologia:5, Geografia:4, Química:4, Português:3 },
  "Procurador Municipal": { Direito:5, Português:5, História:4, Raciocínio:4 },
  "Auditor de Controle Externo": { Matemática:5, Direito:4, Economia:5, Português:4 },
  "Técnico Administrativo Federal": { Português:4, Matemática:3, Administração:3, Informática:3 },
  "Oficial de Justiça": { Direito:4, Português:4, Raciocínio:3, Geografia:2 },
  "Policial Rodoviário Estadual": { "Educação Física":5, Direito:3, Geografia:4 },
  "Bombeiro Militar": { "Educação Física":5, Química:3, Física:3, Português:3 },
  "Técnico de Laboratório (serviço público)": { Química:5, Biologia:5, Matemática:3, Português:3 },
  "Agente de Defesa Civil": { Geografia:4, "Educação Física":4, Direito:3, Português:3 },
  "Perito Criminal Federal": { Química:5, Biologia:5, Física:4, Matemática:4 },
  "Analista de Tecnologia da Informação (serviço público)": { Tecnologia:5, Matemática:4, Lógica:4, Inglês:4 }
};

window.perguntas = perguntas;
window.cursos = cursos;
window.cargosPublicos = cargosPublicos;
