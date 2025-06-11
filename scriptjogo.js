document.addEventListener('DOMContentLoaded', function() {
    const elements = {
        startButton: document.getElementById('startButton'),
        gameStart: document.getElementById('gameStart'),
        quizContainer: document.getElementById('quizContainer'),
        nextButton: document.getElementById('nextButton'),
        quizResult: document.getElementById('quizResult'),
        restartButton: document.getElementById('restartButton'),
        currentQuestion: document.getElementById('currentQuestion'),
        totalQuestions: document.getElementById('totalQuestions'),
        score: document.getElementById('score'),
        finalScore: document.getElementById('finalScore'),
        resultMessage: document.getElementById('resultMessage'),
        questionText: document.getElementById('questionText'),
        optionsContainer: document.getElementById('optionsContainer'),
        codeSnippet: document.getElementById('codeSnippet'),
        gameContainer: document.getElementById('gameContainer'),
        explanationContainer: document.getElementById('explanationContainer'),
        explanationText: document.getElementById('explanationText')
    };

    if (!elements.startButton || !elements.quizContainer || !elements.optionsContainer) {
        console.error('Elementos essenciais do quiz não encontrados!');
        return;
    }

    const quizState = {
        currentQuestionIndex: 0,
        score: 0,
        totalQuestions: 0,
        questions: [],
        difficulty: '',
        maxScore: 0,
        questionPoints: []
    };

    function initQuiz() {
    
    }

    function createDifficultySelection() {
        const difficultyDiv = document.createElement('div');
        difficultyDiv.id = 'difficultySelection';
        difficultyDiv.className = 'difficulty-selection';
        difficultyDiv.innerHTML = `
            <h2>Escolha a Dificuldade</h2>
            <div class="difficulty-buttons">
                <button class="game-button" id="normalButton">
                    Normal
                    <i class="fas fa-star"></i>
                </button>
                <button class="game-button" id="advancedButton">
                    Avançado
                    <i class="fas fa-rocket"></i>
                </button>
            </div>
        `;
        elements.gameContainer.appendChild(difficultyDiv); 
        
        document.getElementById('normalButton').addEventListener('click', () => startGame('normal'));
        document.getElementById('advancedButton').addEventListener('click', () => startGame('advanced'));
    }

    function startGame(difficulty) {
        quizState.difficulty = difficulty;
        quizState.currentQuestionIndex = 0;
        quizState.score = 0;
        elements.score.textContent = quizState.score;
        
        if (difficulty === 'normal') {
            quizState.totalQuestions = 10;
            quizState.maxScore = 100;
            quizState.questionPoints = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
        } else {
            quizState.totalQuestions = 20;
            quizState.maxScore = 100;
            quizState.questionPoints = [
                1, 1, 2, 3, 1, 3, 5, 5, 5, 6,
                6, 6, 7, 7, 7, 8, 10, 8, 1, 8
            ];
            quizState.maxScore = quizState.questionPoints.reduce((acc, curr) => acc + curr, 0);
        }
        
        elements.totalQuestions.textContent = quizState.totalQuestions;
        
        const difficultySelection = document.getElementById('difficultySelection');
        if (difficultySelection) {
            difficultySelection.classList.add('hidden');
            difficultySelection.addEventListener('transitionend', () => {
                difficultySelection.remove();
            }, { once: true });
        }

        elements.quizContainer.classList.remove('hidden');
        elements.quizContainer.classList.add('show');
        elements.gameStart.classList.add('hidden');
        
        loadQuestions();
        showQuestion();
    }

    function loadQuestions() {
        quizState.questions = [];
        
        const normalQuestions = [
            {
                id: 1,
                title: "Cabo RJ-45",
                question: "Qual é a disposição de cores do padrão T568A em cabos RJ-45?",
                image: "https://vidadesilicio.com.br/wp-content/uploads/2021/09/2226-jpg.webp",
                options: [
                    { text: "Branco/verde, verde, branco/laranja, azul, branco/azul, laranja, branco/marrom, marrom", correct: true },
                    { text: "Branco/laranja, laranja, branco/verde, azul, branco/azul, verde, branco/marrom, marrom", correct: false },
                    { text: "Branco/verde, verde, branco/marrom, azul, branco/azul, marrom, branco/laranja, laranja", correct: false },
                    { text: "Branco/marrom, marrom, branco/verde, azul, branco/azul, verde, branco/laranja, laranja", correct: false },
                    { text: "Branco/laranja, laranja, branco/azul, azul, branco/verde, verde, branco/marrom, marrom", correct: false }
                ],
                explanation: "O padrão T568A em cabos RJ-45 Cat5e segue a sequência: pino 1 – branco/verde; pino 2 – verde; pino 3 – branco/laranja; pino 4 – azul; pino 5 – branco/azul; pino 6 – laranja; pino 7 – branco/marrom; pino 8 – marrom." 
            },
            {
               id: 2,
    title: "Câmera IP",
    question: "O que é uma câmera IP?",
    image: "https://www.indigovision.com/wp-content/uploads/Overview_Camera_Page.png",
    options: [
        { text: "Uma câmera que funciona apenas com conexão Wi-Fi", correct: false },
        { text: "Uma câmera que utiliza protocolo de internet para transmissão de vídeo", correct: true },
        { text: "Uma câmera analógica com conexão USB", correct: false },
        { text: "Uma câmera que só grava em cartões SD", correct: false },
        { text: "Uma câmera que precisa de DVR para funcionar", correct: false }
    ],
    explanation: "Câmeras IP transmitem sinais de vídeo via protocolo de internet (IP), sendo acessíveis via rede local ou internet, diferente das câmeras analógicas."
},
{
    id: 3,
    title: "Conversores",
    question: "Qual é a função de um conversor de mídia?",
    image: "https://m.media-amazon.com/images/I/61-g+w9T6zL._AC_UF894,1000_QL80_.jpg",
    options: [
        { text: "Transformar sinal analógico em digital", correct: false },
        { text: "Aumentar o alcance de sinal Wi-Fi", correct: false },
        { text: "Converter sinal de fibra óptica em sinal elétrico e vice-versa", correct: true },
        { text: "Trocar a resolução de vídeo de uma câmera", correct: false },
        { text: "Melhorar a qualidade de áudio em uma videoconferência", correct: false }
    ],
    explanation: "Conversores de mídia são usados para converter sinais entre diferentes meios físicos, como fibra óptica e par trançado (elétrico)."
},
{
    id: 4,
    title: "Cordão Monomodo",
    question: "Qual é a cor padrão do conector SC em cabos de fibra monomodo?",
    image: "https://blog.intelbras.com.br/wp-content/uploads/2023/01/Post01_1200x628-1.jpg",
    options: [
        { text: "Vermelho", correct: false },
        { text: "Verde", correct: false },
        { text: "Azul", correct: true },
        { text: "Amarelo", correct: false },
        { text: "Preto", correct: false }
    ],
    explanation: "O conector SC azul é o padrão para fibras monomodo com polimento UPC. Verde é usado para APC."
},
{
    id: 5,
    title: "Cabo UTP",
    question: "O que significa a sigla 'UTP' em cabos de rede?",
    image: "https://telhanorte.vtexassets.com/arquivos/ids/330862/1485563.jpg?v=636657997433200000",
    options: [
        { text: "Unidade de Transmissão de Pacotes", correct: false },
        { text: "Unidade Técnica de Padrão", correct: false },
        { text: "Unshielded Twisted Pair", correct: true },
        { text: "Uniform Transmission Path", correct: false },
        { text: "Under Test Protocol", correct: false }
    ],
    explanation: "UTP significa 'par trançado sem blindagem', comum em redes Ethernet (ex: Cat5e, Cat6)."
},
{
    id: 6,
    title: "Fibra x UTP",
    question: "Qual das alternativas abaixo representa uma vantagem da fibra óptica sobre o cabo de cobre?",
    image: "https://www.condufibra.com.br/wp-content/uploads/2019/05/cabo-de-rede-x-fibra-800x400.png",
    options: [
        { text: "Maior interferência eletromagnética", correct: false },
        { text: "Maior custo de manutenção", correct: false },
        { text: "Maior latência", correct: false },
        { text: "Maior alcance e largura de banda", correct: true },
        { text: "Menor velocidade de transmissão", correct: false }
    ],
    explanation: "A fibra óptica oferece maiores velocidades e distâncias de transmissão, com menor interferência."
},
{
    id: 7,
    title: "Definição de Cabos",
    question: "Qual dos seguintes cabos é adequado para redes Ethernet 10/100/1000 Mbps até 100 metros?",
    image: "https://nextcable.com.br/wp-content/uploads/2020/06/caboscat5678.01-1024x682@2x-1.jpg",
    options: [
        { text: "Cabo coaxial RG59", correct: false },
        { text: "Fibra OM4", correct: false },
        { text: "Par trançado Cat5e", correct: true },
        { text: "Par trançado Cat3", correct: false },
        { text: "HDMI", correct: false }
    ],
    explanation: "O cabo Cat5e é suficiente para redes Gigabit Ethernet (10/100/1000 Mbps) até 100 metros."
},
{
    id: 8,
    title: "Fibra Mono x Multi",
    question: "O que diferencia a fibra monomodo da multimodo?",
    image: "https://revistasegurancaeletronica.com.br/wp-content/uploads/2019/07/Qual-a-diferenc%CC%A7a-entre-fibra-monomodo-e-multimodo.jpg",
    options: [
        { text: "A cor da capa externa", correct: false },
        { text: "A espessura da capa de proteção", correct: false },
        { text: "O tipo de feixe de luz e alcance de transmissão", correct: true },
        { text: "A compatibilidade com conversores HDMI", correct: false },
        { text: "O tipo de conector", correct: false }
    ],
    explanation: "Fibra monomodo usa um único modo de luz, permitindo maior alcance. Fibra multimodo utiliza múltiplos modos de luz e tem alcance menor."
},
{
    id: 9,
    title: "CFTV Analógico",
    question: "Qual componente abaixo é essencial em sistemas de CFTV analógico para que sejam transformados em IP?",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyMjKIRQkbrY2VuaGAEe9tuc8iYGc8fE2UTg&s",
    options: [
        { text: "Switch gerenciável", correct: false },
        { text: "Encoder In/Out", correct: true },
        { text: "DVR (Digital Video Recorder)", correct: false },
        { text: "ONU (Optical Network Unit)", correct: false },
        { text: "Servidor web", correct: false }
    ],
    explanation: "Câmeras analógicas precisam de um DVR para gravar o vídeo e converter o sinal analógico em digital."
},
{
    id: 10,
    title: "Curvatura de Cabos",
    question: "O que ocorre se um cabo de rede Cat6 for instalado com curvatura excessiva?",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZi1ajRDlJreZ4I2c46p0evjioXxDK9ol4ag&s",
    options: [
        { text: "Melhora da performance do sinal", correct: false },
        { text: "Não afeta a transmissão", correct: false },
        { text: "Pode causar perda de sinal e atenuação", correct: true },
        { text: "Aumenta a taxa de transferência", correct: false },
        { text: "Reduz a temperatura da transmissão", correct: false }
    ],
    explanation: "Curvatura excessiva altera a impedância do cabo, causando perda de sinal e atenuação."
},
        ];

        const advancedQuestions = [
           {
  id: 11,
  title: "Gerenciamento IP",
  question: "Qual software é tipicamente usado como VMS (Video Management System) para gerenciar múltiplas câmeras IP em uma rede?",
  image: "https://blog.plugmais.com.br/wp-content/uploads/2018/03/178212-o-que-e-um-sistema-cftv.jpg",
  options: [
    { text: "Milestone XProtect Corporate", correct: false },
    { text: "Indigo Vision ", correct: false },
    { text: "Control Center", correct: true },
    { text: "ONVIF Device Manager", correct: false },
    { text: "Switch PoE Gerenciável", correct: false }
  ],
  explanation: "O Control Center (Da distribuidora \"Indigo Vision\") é um VMS completo, capaz de agregar, gravar e gerenciar fluxos de múltiplas câmeras IP em rede."
},
{
  id: 12,
  title: "Atenuação Óptica",
  question: "Em redes de fibra óptica, o que descreve melhor o fenômeno de atenuação?",
  image: "https://www.fibracem.com/wp-content/uploads/2020/05/post-20-06-2018-01-1.png",
  options: [
    { text: "Dispersão cromática no núcleo da fibra", correct: false },
    { text: "Absorção de luz por impurezas no vidro", correct: false },
    { text: "Redução da intensidade do sinal ao longo do cabo", correct: true },
    { text: "Retroreflexão excessiva no conector", correct: false },
    { text: "Conversão de sinais elétricos para ópticos", correct: false }
  ],
  explanation: "A atenuação é a perda gradual de potência do sinal luminoso à medida que viaja pela fibra, decorrente de absorção e espalhamento."
},
{
  id: 13,
  title: "Teste de Fibra",
  question: "Qual ferramenta permite medir perdas e localizar quebras em um cabo de fibra óptica com alta precisão?",
  image: "perguntas/pergunta13.png",
  options: [
    { text: "Power Meter + Light Source", correct: false },
    { text: "LSPM (Link Segmentation and Performance Module)", correct: false },
    { text: "OTDR (Reflectômetro Óptico no Domínio do Tempo)", correct: true },
    { text: "Visual Fault Locator (VFL)", correct: false },
    { text: "Inspeção de conector com vídeo endoscópio", correct: false }
  ],
  explanation: "O OTDR envia pulsos de luz e mede reflexões para mapear atenuações e falhas ao longo de toda a extensão da fibra."
},
{
  id: 14,
  title: "Reparo de Fibra no Campo",
  question: "Qual dispositivo portátil é mais indicado para identificar rapidamente um corte (talho) numa fibra no campo?",
  image: "https://static.wixstatic.com/media/68cebd_316cd90457cc4e82b54703bb3bd555c7~mv2.jpg/v1/fill/w_504,h_680,al_c,q_80,enc_avif,quality_auto/68cebd_316cd90457cc4e82b54703bb3bd555c7~mv2.jpg",
  options: [
    { text: "OTDR (Reflectômetro Óptico no Domínio do Tempo)", correct: false },
    { text: "Caneta de LED", correct: false },
    { text: "VFL 30 mW (Visual Fault Locator)", correct: true },
    { text: "Reflectômetro portátil de pulso curto", correct: false },
    { text: "Gerador de tom e detector cromático", correct: false }
  ],
  explanation: "O VFL emite luz visível pela fibra, permitindo ver rapidamente pontos de quebra."
},
{
  id: 15,
  title: "PoE",
  question: "O que define corretamente o padrão PoE (Power over Ethernet)?",
  image: "https://intelbras.vtexassets.com/arquivos/ids/155694-800-auto?v=637063057694630000&width=800&height=auto&aspect=true",
  options: [
    { text: "Transmissão de energia elétrica via cabo de rede para dispositivos como câmeras IP", correct: true },
    { text: "Sistemas de alimentação ininterrupta para switches", correct: false },
    { text: "Protocolo de sincronização de VLANs", correct: false },
    { text: "Método de modulação de voz em redes IP", correct: false },
    { text: "Fonte externa de alimentação AC para equipamentos de rack", correct: false }
  ],
  explanation: "PoE segue os padrões IEEE 802.3af/at/bt para fornecer alimentação elétrica CC junto com dados em cabos Ethernet Cat5e ou superiores."
},
{
  id: 16,
  title: "Câmeras IP Distantes",
  question: "Em instalações com câmeras IP localizadas além de 100 m do switch, qual solução técnica é mais apropriada?",
  image: "https://cdn.sistemawbuy.com.br/arquivos/7fa4c97e92cf28cae1528e9719b0d241/produtos/643d4bf88a9be/d_932918-mlb48682666894_122021-o-643d4bf8c4177.jpg",
  options: [
    { text: "Extensor PoE ativo sobre Cat 6a até 200 m", correct: false },
    { text: "Switch PoE com uplink SFP e módulo Gigabit LX", correct: false },
    { text: "Conversores de mídia UTP–fibra com transceptores monomodo", correct: true },
    { text: "Powerline Ethernet via rede elétrica local", correct: false },
    { text: "Repeater PoE a cada 80 m usando módulos inline", correct: false }
  ],
  explanation: "A fibra monomodo via conversores de mídia suporta distâncias acima de 2 km e reconverte para UTP+PoE no ponto da câmera."
},
{
  id: 17,
  title: "Desempenho em Switch Core",
  question: "Qual é o principal fator que determina a capacidade de um switch core em processar grande volume de tráfego na rede?",
  image: "https://www.controle.net/novo/assets/img/faq/faq-o-que-e-switch-fibra-optica-e-como-funciona-1790613999.jpg",
  options: [
    { text: "Latência do cabo de fibra", correct: false },
    { text: "Largura de banda do backplane (throughput)", correct: true },
    { text: "Número de portas PoE", correct: false },
    { text: "Quantidade de VLANs configuradas", correct: false },
    { text: "Comprimento máximo do cabo UTP", correct: false }
  ],
  explanation: "O throughput do backplane é a capacidade interna do switch de encaminhar pacotes entre todas as portas; é o principal limitador de desempenho em um switch core."
},
{
    id: 18,
    title: "Mistura de Fibras",
    question: "Qual o principal risco de misturar fibras monomodo e multimodo?",
    image: "phttps://www.fibermall.com/blog/wp-content/uploads/2022/09/differences-e1662455524215.jpg",
    options: [
        { text: "Perda de sinal por incompatibilidade do diâmetro do núcleo", correct: true },
        { text: "Quebra do conector LC", correct: false },
        { text: "Interferência eletromagnética no conector", correct: false },
        { text: "Perda de pacotes por protocolo incompatível", correct: false },
        { text: "Curto-circuito no conector SC", correct: false }
    ],
    explanation: "Fibras têm núcleos de tamanhos diferentes (monomodo ~9μm, multimodo ~50/62,5μm), causando perda de acoplamento e atenuação."
},
{
  id: 19,
  title: "Módulo GBIC Monomodo",
  question: "Para estender um link superior a 100 m usando conversores de mídia UTP–fibra, qual módulo GBIC monomodo é adequado e por quê?",
  image: "https://images.tcdn.com.br/img/img_prod/625353/kit_par_modulo_mini_gbic_sfp_1_25_gbps_1550_1310nm_conector_lc_1_fo_20km_sm_lado_a_e_lado_b_14349_1_890d2504f6e8d6a7afe2f26d1493942d.jpg",
  options: [
    { text: "GBIC 100 Base-TX – porque suporta cobre de longa distância", correct: false },
    { text: "GBIC 1000 Base-SX – porque é otimizado para fibra multimodo", correct: false },
    { text: "GBIC 1000 Base-LX – porque opera em monomodo até dezenas de quilômetros", correct: true },
    { text: "GBIC 10 Base-FL – porque é mais barato e suficiente para links curtos", correct: false },
    { text: "GBIC 10G Base-SR – porque oferece maior largura de banda", correct: false }
  ],
  explanation: "O GBIC 1000 Base-LX usa laser para fibra monomodo e alcança até 10 km, sendo ideal para conversão UTP–fibra em links longos."
},
{
  id: 20,
  title: "Ligação de Câmera IP a >200 m do Switch",
  question: "Qual é o passo a passo correto para instalar uma câmera IP que ficará a mais de 200 m de um switch padrão?",
  image: "https://aprendacftv.com/wp-content/uploads/2019/01/Diagrama-de-camera-IP-conectada-ao-switch-e-PC.jpg",
  options: [
    { text: "1. Executar cabo UTP direto; 2. Configurar PoE no switch; 3. Montar câmera", correct: false },
    { text: "1. Instalar repetidor PoE a cada 100 m; 2. Conectar ao switch; 3. Montar câmera", correct: false },
    { text: "1. Instalar conversor mídia UTP–fibra no switch; 2. Passar fibra monomodo até o ponto da câmera; 3. No lado da câmera, usar conversor fibra–UTP com PoE; 4. Ligar câmera", correct: true },
    { text: "1. Substituir todo o cabo por UTP categoria 7; 2. Habilitar jumbo frames no switch; 3. Montar câmera", correct: false },
    { text: "1. Usar switch gerenciável; 2. Aumentar potência de transmissão; 3. Montar câmera", correct: false }
  ],
  explanation: "Para distâncias acima de 100 m, usa-se fibra monomodo via conversores de mídia: no switch converte UTP→fibra, leva fibra até a câmera e converte de volta com PoE."
},
        ];

        if (quizState.difficulty === 'normal') {
            quizState.questions = [...normalQuestions];
        } else {
            quizState.questions = [...normalQuestions, ...advancedQuestions];
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
    }

   elements.startButton.addEventListener('click', () => {
    elements.gameStart.classList.add('hidden');
    
    if (!document.getElementById('difficultySelection')) {
        createDifficultySelection();
    }
});
    
    elements.nextButton.addEventListener('click', nextQuestion);
    elements.restartButton.addEventListener('click', restartQuiz);

    function showQuestion() {
        resetQuestionState();
        const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
        
        elements.currentQuestion.textContent = quizState.currentQuestionIndex + 1;
        
        elements.questionText.innerHTML = `
            <h2 class="question-title">${currentQuestion.title}</h2>
            <div class="question-content">${currentQuestion.question}</div>
        `;
        
        elements.codeSnippet.innerHTML = `
            <img src="${currentQuestion.image}" alt="Código da questão ${currentQuestion.id}" class="question-image">
        `;
        
        elements.optionsContainer.innerHTML = '';
        
        const shuffledOptions = shuffleArray([...currentQuestion.options]);
        
        shuffledOptions.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.className = 'option-btn';
            optionElement.dataset.correct = option.correct;
            optionElement.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option.text}</span>
            `;
            
            optionElement.addEventListener('click', () => handleOptionClick(optionElement, option));
            elements.optionsContainer.appendChild(optionElement);
        });
    }

    function handleOptionClick(selectedElement, option) {
        const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
        
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            btn.classList.add('disabled');
        });
        
        if (option.correct) {
            selectedElement.classList.add('correct');
            
            const points = quizState.questionPoints[quizState.currentQuestionIndex];
            quizState.score += points;
            
            elements.score.textContent = quizState.score;
            elements.score.classList.add('score-updated');
            setTimeout(() => elements.score.classList.remove('score-updated'), 500);
        } else {
            selectedElement.classList.add('incorrect');
            document.querySelectorAll('.option-btn').forEach(btn => {
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                }
            });
        }
        
        if (currentQuestion.explanation) {
            elements.explanationText.textContent = currentQuestion.explanation;
            elements.explanationContainer.classList.remove('hidden');
        }

        if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
            elements.nextButton.classList.remove('hidden');
        } else {
            setTimeout(showResults, 1000);
        }
    }

    function nextQuestion() {
        quizState.currentQuestionIndex++;
        if (quizState.currentQuestionIndex < quizState.totalQuestions) {
            showQuestion();
        } else {
            showResults(); 
        }
    }

    function showResults() {
        elements.nextButton.classList.add('hidden');
        elements.quizContainer.classList.add('hidden');
        elements.quizContainer.classList.remove('show');

        setTimeout(() => {
            elements.quizResult.classList.remove('hidden');
            elements.quizResult.classList.add('show');
            elements.finalScore.textContent = quizState.score;
            
            let message = "";
            let resultClass = "";
            
            if (quizState.score === quizState.maxScore) {
                message = "🏆 VOCÊ É O MESTRE JEDI DO CONHECIMENTO ! 🏆 Perfeição absoluta! Nenhuma questão escapou de você!";
                resultClass = "excellent";
                createConfetti();
            } else if (quizState.score >= (quizState.maxScore * 0.8)) {
                message = "🎉 Excelente! Quase perfeito! nível de conhecimento expert!";
                resultClass = "excellent";
            } else if (quizState.score >= (quizState.maxScore * 0.6)) {
                message = "👏 Muito bom! Ótimo domínio dos Assuntos de Telecom!";
                resultClass = "good";
            } else if (quizState.score >= (quizState.maxScore * 0.4)) {
                message = "✨ Bom trabalho! Continue praticando para melhorar!";
                resultClass = "average";
            } else if (quizState.score >= (quizState.maxScore * 0.2)) {
                message = "💪 Está progredindo! Revise os conceitos e tente novamente!";
                resultClass = "average";
            } else {
                message = "🤔 Hora de estudar! Revise os fundamentos e tente novamente!";
                resultClass = "poor";
            }
            
            elements.resultMessage.textContent = message;
            elements.quizResult.classList.add(resultClass);
            
            elements.restartButton.innerHTML = `
                <i class="fas fa-redo"></i> Nova Tentativa
            `;
        }, 500);
    }

    function restartQuiz() {
        elements.quizResult.classList.add('hidden');
        elements.quizResult.classList.remove('show');
        elements.quizResult.className = 'quiz-result hidden';
        
        setTimeout(() => {
            document.getElementById('difficultySelection')?.remove();
            createDifficultySelection();
            const difficultySelection = document.getElementById('difficultySelection');
            if (difficultySelection) {
                difficultySelection.classList.remove('hidden');
            }
        }, 500);
    }

    function resetQuestionState() {
        elements.nextButton.classList.add('hidden');
        elements.explanationContainer.classList.add('hidden');
        elements.explanationText.textContent = '';
    }

    initQuiz();
});