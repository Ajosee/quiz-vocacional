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
  { nome: "Direito", perfil: { logica: 6, linguagem: 8, empatia: 7, organizacao: 7, lideranca: 6, servico_publico: 9, resiliencia: 5 }, pros: "Alta empregabilidade, possibilidade de concursos públicos (magistratura, promotoria), prestígio social.", contras: "Carga de estudos intensa, mercado jurídico saturado em grandes centros, stress em prazos.", salarioInicial: 5000, salarioMaximo: 30000, cargaHoraria: "44h/semana (escritórios) ou 30-35h (serviço público)", tempoLivre: "Médio; depende da área. Carreira pública oferece mais equilíbrio.", vidaFamiliar: 7, saudavel: 6 },
  { nome: "Administração", perfil: { organizacao: 8, lideranca: 7, financas: 8, comunicacao: 7, estabilidade: 5, empreendedorismo: 6 }, pros: "Versátil, permite atuar em empresas, ONGs, concursos (gestão pública).", contras: "Mercado competitivo, salários iniciais baixos, exige especialização.", salarioInicial: 3500, salarioMaximo: 20000, cargaHoraria: "40-44h/semana", tempoLivre: "Médio", vidaFamiliar: 7, saudavel: 7 },
  { nome: "Medicina", perfil: { logica: 8, empatia: 9, resiliencia: 8, atencao: 9, ciencia: 8 }, pros: "Alta remuneração, respeito social, possibilidade de especializações.", contras: "Curso integral e longo (6 anos + residência), plantões exaustivos, responsabilidade enorme.", salarioInicial: 8000, salarioMaximo: 40000, cargaHoraria: "20-60h/semana (varia muito)", tempoLivre: "Baixo na residência, bom após estabilizar", vidaFamiliar: 5, saudavel: 5 },
  { nome: "Ciência da Computação", perfil: { logica: 9, tecnologia: 9, ciencia: 8, criatividade: 6, organizacao: 5 }, pros: "Alta empregabilidade, possibilidade de trabalho remoto, salários competitivos.", contras: "Atualização constante, risco de burnout, trabalho sedentário.", salarioInicial: 6000, salarioMaximo: 25000, cargaHoraria: "40h/semana (flexível)", tempoLivre: "Médio/alto em empresas modernas", vidaFamiliar: 8, saudavel: 6 },
  { nome: "Engenharia Civil", perfil: { logica: 8, organizacao: 7, atencao: 8, resiliencia: 7, ciencia: 7 }, pros: "Boa remuneração, possibilidade de empreender, demanda em infraestrutura.", contras: "Obras em campo podem ser estressantes, responsabilidade técnica alta.", salarioInicial: 7000, salarioMaximo: 25000, cargaHoraria: "44h/semana", tempoLivre: "Médio (depende do projeto)", vidaFamiliar: 6, saudavel: 6 },
  { nome: "Psicologia", perfil: { empatia: 9, comunicacao: 8, humanas: 7, resiliencia: 6, interpessoal: 8 }, pros: "Trabalho gratificante, ajuda a pessoas, várias áreas de atuação.", contras: "Desgaste emocional, renda inicial baixa (clínica), concorrência.", salarioInicial: 4000, salarioMaximo: 15000, cargaHoraria: "30-40h/semana", tempoLivre: "Bom (especialmente em consultório)", vidaFamiliar: 8, saudavel: 7 },
  { nome: "Pedagogia", perfil: { empatia: 8, educacao: 9, comunicacao: 7, organizacao: 6, lideranca: 5 }, pros: "Campo em constante necessidade, horários escolares (40h ou menos), possibilidade de concursos.", contras: "Baixa remuneração inicial, desgaste com indisciplina, pouco prestígio.", salarioInicial: 3500, salarioMaximo: 10000, cargaHoraria: "30-40h/semana", tempoLivre: "Alto (férias escolares)", vidaFamiliar: 9, saudavel: 7 }
];

const cargosPublicos = [
  { nome: "Auditor Fiscal", perfil: { logica: 8, organizacao: 8, atencao: 9, financas: 9, estabilidade: 10, servico_publico: 7 }, pros: "Salário muito alto (20k+), estabilidade, aposentadoria integral.", contras: "Concurso extremamente disputado, pressão por metas, risco de desgaste mental.", salarioInicial: 20000, salarioMaximo: 35000, cargaHoraria: "40h/semana", tempoLivre: "Bom, salvo em períodos de fiscalização intensa", vidaFamiliar: 8, saudavel: 7 },
  { nome: "Professor de Educação Básica", perfil: { empatia: 9, comunicacao: 8, educacao: 9, humanas: 8, resiliencia: 7 }, pros: "Férias regulares, horário reduzido (30-40h), possibilidade de conciliar estudo.", contras: "Baixa remuneração inicial, indisciplina em sala, desvalorização social.", salarioInicial: 4500, salarioMaximo: 8000, cargaHoraria: "30-40h/semana", tempoLivre: "Alto (especialmente para planejamento)", vidaFamiliar: 9, saudavel: 6 },
  { nome: "Analista Judiciário (Área Administrativa)", perfil: { organizacao: 8, linguagem: 8, atencao: 8, estabilidade: 9, servico_publico: 7 }, pros: "Salário médio alto (10-15k), estabilidade, ambiente técnico.", contras: "Excesso de burocracia, certo tédio, concorrência alta.", salarioInicial: 12000, salarioMaximo: 20000, cargaHoraria: "40h/semana", tempoLivre: "Médio (depende do tribunal)", vidaFamiliar: 8, saudavel: 8 },
  { nome: "Policial Federal", perfil: { resiliencia: 9, logica: 7, atencao: 8, lideranca: 7, servico_publico: 8 }, pros: "Salário inicial acima de 12k, aposentadoria especial, atividade investigativa.", contras: "Risco físico, pressão psicológica, escalas de plantão.", salarioInicial: 12000, salarioMaximo: 20000, cargaHoraria: "40h + plantões", tempoLivre: "Médio (depende da escala)", vidaFamiliar: 6, saudavel: 5 },
  { nome: "Especialista em Políticas Públicas", perfil: { organizacao: 8, financas: 7, humanas: 7, comunicacao: 6, lideranca: 6 }, pros: "Salários bons (8-15k), trabalho técnico, impacto social.", contras: "Burocracia, concorrência alta, pouca flexibilidade.", salarioInicial: 8000, salarioMaximo: 18000, cargaHoraria: "40h/semana", tempoLivre: "Médio", vidaFamiliar: 7, saudavel: 7 },
  { nome: "Técnico Judiciário (TI)", perfil: { tecnologia: 8, logica: 7, organizacao: 7, atencao: 7, estabilidade: 9 }, pros: "Salário médio (6-10k), estabilidade, menor stress que desenvolvimento privado.", contras: "Atualização tecnológica mais lenta, burocracia.", salarioInicial: 6000, salarioMaximo: 12000, cargaHoraria: "40h/semana", tempoLivre: "Bom", vidaFamiliar: 8, saudavel: 8 },
  { nome: "Agente da Polícia Rodoviária Federal", perfil: { resiliencia: 8, atencao: 8, logica: 6, estabilidade: 9, servico_publico: 7 }, pros: "Salário inicial 10k+ , aposentadoria especial, fiscalização e atendimento.", contras: "Condições de estrada, periculosidade, escala de turnos.", salarioInicial: 10000, salarioMaximo: 18000, cargaHoraria: "40h + plantões", tempoLivre: "Médio/baixo", vidaFamiliar: 6, saudavel: 5 }
];

window.perguntas = perguntas;
window.cursos = cursos;
window.cargosPublicos = cargosPublicos;
