import type { Bottleneck, ComponentCheck, Quality, Verdict } from "@/lib/types";

export type Locale = "en" | "pt-BR";

export interface Dictionary {
  /** Wordmark split into [plain, accent] so the brand can localize. */
  brand: [string, string];
  nav: {
    browse: string;
    how: string;
    check: string;
    switchToPt: string;
    switchToEn: string;
  };
  footer: {
    blurb: string;
    explore: string;
    allGames: string;
    checkPc: string;
    howItWorks: string;
    disclaimer: string;
    disclaimerBody: string;
    copyright: (year: number) => string;
    estimates: string;
    artwork: string;
  };
  home: {
    badge: (count: number) => string;
    title: [string, string, string, string];
    subtitle: string;
    build: string;
    browse: string;
    cpus: (count: number) => string;
    gpus: (count: number) => string;
    browser: string;
    how: string;
    howTitle: string;
    howBody: string;
    steps: { title: string; body: string }[];
    notTitle: string;
    notBody: string;
  };
  specs: {
    step: string;
    title: string;
    hint: string;
    detect: string;
    share: string;
    copied: string;
    detectBlocked: string;
    detected: (name: string) => string;
    detectedUnknown: (name: string) => string;
    detectedIntegrated: (name: string) => string;
    copyFailed: string;
    cpu: string;
    gpu: string;
    cpuHint: (count: number) => string;
    gpuHint: (count: number) => string;
    ram: string;
    vram: string;
    auto: string;
    shared: string;
    storage: string;
    maxRes: string;
    targetFps: string;
    storageAria: string;
    maxResAria: string;
    targetAria: string;
    integrated: string;
    discrete: string;
    reset: string;
    searchModel: string;
    noMatch: string;
    searchLabel: (label: string) => string;
    optionsLabel: (label: string) => string;
  };
  results: {
    step: string;
    headline: (count: number) => string;
    summary: (
      playable: number,
      offTarget: number,
      gpu: string,
      cpu: string,
      ram: number,
      fps: number,
      res: string,
    ) => string;
    all: string;
    runnable: string;
    searchPlaceholder: string;
    searchAria: string;
    sortAria: string;
    noResults: string;
    clear: string;
    disclaimer: string;
    snapshot: (date: string) => string;
  };
  library: {
    eyebrow: string;
    title: (count: number) => string;
    body: string;
    yourRig: string;
    change: string;
    all: string;
    searchPlaceholder: string;
    searchAria: string;
    shown: (count: number) => string;
    sortAria: string;
    noResults: string;
    reset: string;
  };
  card: {
    fps: string;
    belowMin: string;
    noBottleneck: string;
    limited: (list: string) => string;
  };
  detail: {
    allGames: string;
    estimate: string;
    fps: string;
    belowMin: string;
    atPreset: (preset: string) => string;
    target: (fps: number, res: string) => string;
    limitedBy: (list: string) => string;
    noBottleneck: string;
    change: string;
    minGpu: string;
    install: string;
    cap: (fps: number) => string;
    uncapped: string;
    playingOnSteam: string;
    snapshot: (date: string) => string;
    yourPc: string;
    recommended100: string;
    minRec: (min: string, rec: string) => string;
    frameRate: string;
    avgNative: string;
    aiming: (fps: number) => string;
    aimingCap: (fps: number, cap: number) => string;
    upscaling: string;
    hitsTarget: string;
    close: string;
    thirty: string;
    rough: string;
    official: string;
    officialBody: string;
    minimum: string;
    recommended: string;
    similar: string;
    similarBody: string;
    requirements: {
      cpu: string;
      gpu: string;
      ram: string;
      vram: string;
      storage: string;
    };
  };
  status: Record<ComponentCheck["status"], string>;
  checks: Record<ComponentCheck["key"], string>;
  bottlenecks: Record<Bottleneck, string>;
  warnings: {
    storage: (need: number, have: number) => string;
    vram: (need: number) => string;
    ram: (need: number) => string;
    integrated: string;
  };
  verdicts: Record<Verdict, string>;
  qualities: Record<Quality, string>;
  genres: Record<string, string>;
  sort: {
    popular: string;
    match: string;
    new: string;
    az: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    body: string;
    browse: string;
  };
  common: {
    select: string;
    gb: string;
    tb: string;
    dash: string;
  };
}

export const EN: Dictionary = {
  brand: ["RIG", "CHECK"],
  nav: {
    browse: "Browse games",
    how: "How it works",
    check: "Check my PC",
    switchToPt: "Switch to Portuguese",
    switchToEn: "Switch to English",
  },
  footer: {
    blurb:
      "An honest, independent compatibility checker. Pick your parts, see what runs. No accounts, no telemetry, no affiliate links.",
    explore: "Explore",
    allGames: "All games",
    checkPc: "Check your PC",
    howItWorks: "How the estimate works",
    disclaimer: "Disclaimer",
    disclaimerBody:
      "Results are estimates based on public system requirements and relative hardware benchmarks. Drivers, patches and settings all move the needle.",
    copyright: (year) => `© ${year} RigCheck. Built for people with old GPUs.`,
    estimates: "ESTIMATES, NOT GUARANTEES",
    artwork: "Game artwork via Steam and Riot Games.",
  },
  home: {
    badge: (count) => `${count} games · no signup`,
    title: ["Which games can", "your PC", "actually", "run?"],
    subtitle:
      "Pick your CPU, GPU and RAM. We compare them against a curated library of games and tell you the settings and frame rates to expect — plus the one part holding you back.",
    build: "Build my rig",
    browse: "Browse the library",
    cpus: (count) => `${count} CPUs indexed`,
    gpus: (count) => `${count} GPUs indexed`,
    browser: "Everything runs in your browser",
    how: "How it works",
    howTitle: "Estimates you can actually use.",
    howBody:
      "We don't just tick boxes against a spec sheet. Every part gets a relative performance score, then each game is simulated against your rig at every resolution and quality preset.",
    steps: [
      {
        title: "Your parts, indexed",
        body: "Each CPU and GPU maps to a relative gaming score, so a Ryzen 5 5600 and a Core i5-12400 can be compared without guesswork.",
      },
      {
        title: "Every game, every tier",
        body: "Minimum and recommended specs are translated onto the same index, including RAM, VRAM and storage. No more wondering whether a GTX 970 beats an RX 580.",
      },
      {
        title: "A verdict, not a yes",
        body: "You get a recommended preset, an estimated frame rate and the exact component that fails first — GPU, CPU, RAM or VRAM.",
      },
    ],
    notTitle: "What this is not",
    notBody:
      "It is not a benchmark. Real performance depends on your exact model, cooling, drivers, resolution scaling, upscalers (DLSS, FSR, XeSS), background apps and the game's latest patch. Treat the numbers as a well-informed starting point, then adjust in-game.",
  },
  specs: {
    step: "Step 01 — Your hardware",
    title: "What's in your PC?",
    hint: "Don't see your exact part? Pick the closest model — precision matters less than tier.",
    detect: "Auto-detect GPU",
    share: "Share rig",
    copied: "Link copied",
    detectBlocked: "Your browser blocked GPU detection. Pick your card manually.",
    detected: (name) => `Detected ${name}. Double-check it above.`,
    detectedUnknown: (name) =>
      `Detected "${name}" — not in our list. Pick the closest model above.`,
    detectedIntegrated: (name) =>
      `Detected integrated graphics (${name}) but not the exact model. Pick the closest one above.`,
    copyFailed: "Could not copy. Use your browser's address bar.",
    cpu: "Processor",
    gpu: "Graphics card",
    cpuHint: (count) =>
      `${count} CPUs listed. Laptop chips are usually a tier below their desktop namesake.`,
    gpuHint: (count) => `${count} GPUs listed, desktop and integrated.`,
    ram: "System RAM",
    vram: "Video memory",
    auto: "(auto)",
    shared: "(shared)",
    storage: "Free space",
    maxRes: "Max resolution",
    targetFps: "Target frame rate",
    storageAria: "Free storage in gigabytes",
    maxResAria: "Maximum resolution",
    targetAria: "Target frame rate",
    integrated: "Integrated graphics",
    discrete: "Discrete graphics",
    reset: "Reset",
    searchModel: "Search by model…",
    noMatch: "No match. Try a shorter model name.",
    searchLabel: (label) => `Search ${label}`,
    optionsLabel: (label) => `${label} options`,
  },
  results: {
    step: "Step 02 — The answer",
    headline: (count) => `${count} ${count === 1 ? "game runs" : "games run"} great or better.`,
    summary: (playable, offTarget, gpu, cpu, ram, fps, res) =>
      `${
        playable === 0
          ? "None are playable at reduced settings"
          : `${playable} more ${playable === 1 ? "is" : "are"} playable at reduced settings`
      }${
        offTarget > 0 ? `, and ${offTarget} won't hit your target.` : "."
      } Based on ${gpu}, ${cpu} and ${ram} GB of RAM, aiming for ${fps} FPS at up to ${res}.`,
    all: "All",
    runnable: "Can run",
    searchPlaceholder: "Search games…",
    searchAria: "Search games by title, studio or genre",
    sortAria: "Sort games",
    noResults: "No games match that filter.",
    clear: "Clear filters",
    disclaimer:
      "Frame rates are estimates — patches, drivers, upscaling and background apps all change the real number.",
    snapshot: (date) => `Steam player counts are a snapshot from ${date}.`,
  },
  library: {
    eyebrow: "The library",
    title: (count) => `${count} games, scored against your PC.`,
    body: "Every game is checked against your hardware at every preset, not just the minimum spec sheet. Click one to see the full breakdown.",
    yourRig: "Your rig",
    change: "Change specs",
    all: "All",
    searchPlaceholder: "Search by title, studio or genre…",
    searchAria: "Search games by title, studio or genre",
    shown: (count) => `${count} shown`,
    sortAria: "Sort games",
    noResults: "Nothing matches that search.",
    reset: "Reset filters",
  },
  card: {
    fps: "FPS est.",
    belowMin: "Below minimum specs",
    noBottleneck: "No bottleneck",
    limited: (list) => `${list} limited`,
  },
  detail: {
    allGames: "All games",
    estimate: "Estimate",
    fps: "FPS est.",
    belowMin: "Your hardware falls below the minimum requirements.",
    atPreset: (preset) => `At ${preset}`,
    target: (fps, res) => `Your target: ${fps} FPS at up to ${res}`,
    limitedBy: (list) => `Limited by your ${list}`,
    noBottleneck: "No component is holding you back",
    change: "Change my specs",
    minGpu: "Min GPU",
    install: "install",
    cap: (fps) => `${fps} FPS cap`,
    uncapped: "Uncapped frame rate",
    playingOnSteam: "playing on Steam",
    snapshot: (date) => `Steam snapshot · ${date}`,
    yourPc: "Your PC vs. this game",
    recommended100: "RECOMMENDED = 100%",
    minRec: (min, rec) => `Min: ${min} · Rec: ${rec}`,
    frameRate: "Frame rate by preset",
    avgNative: "AVG FPS · NATIVE",
    aiming: (fps) => `Aiming for ${fps} FPS. `,
    aimingCap: (fps, cap) =>
      `Aiming for ${fps} FPS, though this game caps at ${cap} FPS. `,
    upscaling:
      "Upscaling (DLSS / FSR / XeSS) is not included — enabling it usually buys you a preset or two.",
    hitsTarget: "Hits target",
    close: "Close",
    thirty: "30+ FPS",
    rough: "Rough",
    official: "Official requirements",
    officialBody: "As published by the developer, simplified to the parts that matter most.",
    minimum: "Minimum",
    recommended: "Recommended",
    similar: "If you like this",
    similarBody: "Similar games, scored against the same PC.",
    requirements: {
      cpu: "CPU",
      gpu: "GPU",
      ram: "RAM",
      vram: "VRAM",
      storage: "Storage",
    },
  },
  status: {
    recommended: "Meets recommended",
    minimum: "Meets minimum",
    below: "Below minimum",
  },
  checks: {
    gpu: "Graphics card",
    cpu: "Processor",
    ram: "System RAM",
    vram: "Video memory",
    storage: "Free storage",
  },
  bottlenecks: {
    gpu: "Graphics card",
    cpu: "Processor",
    ram: "System RAM",
    vram: "VRAM",
  },
  warnings: {
    storage: (need, have) =>
      `Needs ${need} GB of storage — you have ${have} GB free.`,
    vram: (need) =>
      `Below the ${need} GB VRAM minimum — expect texture pop-in and stutter.`,
    ram: (need) => `Below the ${need} GB RAM minimum — expect hitching.`,
    integrated: "Integrated graphics detected — it shares system RAM, so dual-channel memory helps.",
  },
  verdicts: {
    maxed: "Maxed out",
    great: "Runs great",
    playable: "Playable",
    weak: "Below target",
    no: "Won't run",
  },
  qualities: {
    Ultra: "Ultra",
    High: "High",
    Medium: "Medium",
    Low: "Low",
  },
  genres: {
    ARPG: "ARPG",
    Action: "Action",
    "Action RPG": "Action RPG",
    Adventure: "Adventure",
    Arcade: "Arcade",
    "Battle Royale": "Battle Royale",
    "Card Game": "Card Game",
    "Choices Matter": "Choices Matter",
    "City Builder": "City Builder",
    Climbing: "Climbing",
    "Co-op": "Co-op",
    Competitive: "Competitive",
    Crime: "Crime",
    "Dark Fantasy": "Dark Fantasy",
    Driving: "Driving",
    Extraction: "Extraction",
    FPS: "FPS",
    Factory: "Factory",
    Fantasy: "Fantasy",
    Farming: "Farming",
    "Fast Paced": "Fast Paced",
    "First Person": "First Person",
    Flight: "Flight",
    "Free to Play": "Free to Play",
    "Greek Mythology": "Greek Mythology",
    Hardcore: "Hardcore",
    "Hero Shooter": "Hero Shooter",
    History: "History",
    Horror: "Horror",
    Hunting: "Hunting",
    Indie: "Indie",
    Japan: "Japan",
    "Large Scale": "Large Scale",
    "Life Sim": "Life Sim",
    Loot: "Loot",
    "Looter Shooter": "Looter Shooter",
    MMORPG: "MMORPG",
    MOBA: "MOBA",
    Medieval: "Medieval",
    Military: "Military",
    Mining: "Mining",
    Movement: "Movement",
    Multiplayer: "Multiplayer",
    Mythology: "Mythology",
    Narrative: "Narrative",
    "Open World": "Open World",
    Parkour: "Parkour",
    Physics: "Physics",
    Pirate: "Pirate",
    Platformer: "Platformer",
    "Post-Apocalyptic": "Post-Apocalyptic",
    Psychological: "Psychological",
    RPG: "RPG",
    RTS: "RTS",
    Racing: "Racing",
    Realistic: "Realistic",
    Relaxing: "Relaxing",
    Remake: "Remake",
    Roguelike: "Roguelike",
    Samurai: "Samurai",
    Sandbox: "Sandbox",
    "Sci-Fi": "Sci-Fi",
    Shooter: "Shooter",
    Simulation: "Simulation",
    "Souls-like": "Souls-like",
    Soviet: "Soviet",
    Space: "Space",
    Sports: "Sports",
    "Star Wars": "Star Wars",
    Stealth: "Stealth",
    Steampunk: "Steampunk",
    "Story Rich": "Story Rich",
    Strategy: "Strategy",
    Subscription: "Subscription",
    Superhero: "Superhero",
    Survival: "Survival",
    "Survival Horror": "Survival Horror",
    Tactical: "Tactical",
    "Third Person": "Third Person",
    "Turn-Based": "Turn-Based",
    "Turn-Based RPG": "Turn-Based RPG",
    Underwater: "Underwater",
    Vikings: "Vikings",
    Western: "Western",
    Zombies: "Zombies",
  },
  sort: {
    popular: "Most played",
    match: "Best match",
    new: "Newest",
    az: "A–Z",
  },
  notFound: {
    eyebrow: "404 — not in the library",
    title: "That game doesn't exist. Yet.",
    body: "We probably haven't added it, or the link is wrong. The library is still the best place to look.",
    browse: "Browse games",
  },
  common: {
    select: "Select",
    gb: "GB",
    tb: "1 TB",
    dash: "—",
  },
};

export const PT_BR: Dictionary = {
  brand: ["Dá pra ", "rodar?"],
  nav: {
    browse: "Explorar jogos",
    how: "Como funciona",
    check: "Ver meu PC",
    switchToPt: "Mudar para português",
    switchToEn: "Mudar para inglês",
  },
  footer: {
    blurb:
      "Um comparador honesto e independente. Escolha suas peças, veja o que roda. Sem conta, sem telemetria, sem links de afiliado.",
    explore: "Explorar",
    allGames: "Todos os jogos",
    checkPc: "Verificar seu PC",
    howItWorks: "Como a estimativa funciona",
    disclaimer: "Aviso",
    disclaimerBody:
      "Os resultados são estimativas baseadas em requisitos públicos e benchmarks relativos de hardware. Drivers, patches e configurações mudam o resultado.",
    copyright: (year) => `© ${year} Dá pra rodar? — feito para quem tem uma GPU antiga.`,
    estimates: "ESTIMATIVAS, NÃO GARANTIAS",
    artwork: "Artes dos jogos via Steam e Riot Games.",
  },
  home: {
    badge: (count) => `${count} jogos · sem cadastro`,
    title: ["Quais jogos o seu PC", "", "realmente", "roda?"],
    subtitle:
      "Escolha seu processador, placa de vídeo e memória RAM. Comparamos com uma biblioteca selecionada de jogos e mostramos as configurações e o FPS esperado — além da peça que está te limitando.",
    build: "Montar meu PC",
    browse: "Explorar a biblioteca",
    cpus: (count) => `${count} CPUs cadastradas`,
    gpus: (count) => `${count} GPUs cadastradas`,
    browser: "Tudo roda no seu navegador",
    how: "Como funciona",
    howTitle: "Estimativas que você pode usar de verdade.",
    howBody:
      "Não ficamos só marcando caixinhas na ficha técnica. Cada peça recebe uma pontuação relativa de desempenho, e cada jogo é simulado no seu PC em todas as resoluções e presets de qualidade.",
    steps: [
      {
        title: "Suas peças, indexadas",
        body: "Cada CPU e GPU tem uma pontuação relativa para jogos, então um Ryzen 5 5600 e um Core i5-12400 podem ser comparados sem chute.",
      },
      {
        title: "Cada jogo, cada nível",
        body: "Requisitos mínimos e recomendados são convertidos para o mesmo índice, incluindo RAM, VRAM e armazenamento. Chega de dúvida se uma GTX 970 é melhor que uma RX 580.",
      },
      {
        title: "Um veredito, não um sim",
        body: "Você recebe um preset recomendado, um FPS estimado e o componente exato que falha primeiro — GPU, CPU, RAM ou VRAM.",
      },
    ],
    notTitle: "O que isto não é",
    notBody:
      "Isto não é um benchmark. O desempenho real depende do seu modelo exato, refrigeração, drivers, escala de resolução, upscalers (DLSS, FSR, XeSS), apps em segundo plano e o patch mais recente do jogo. Trate os números como um ponto de partida bem informado e ajuste dentro do jogo.",
  },
  specs: {
    step: "Passo 01 — Seu hardware",
    title: "O que tem no seu PC?",
    hint: "Não achou sua peça exata? Escolha o modelo mais próximo — a precisão importa menos que a categoria.",
    detect: "Detectar GPU",
    share: "Compartilhar PC",
    copied: "Link copiado",
    detectBlocked: "Seu navegador bloqueou a detecção de GPU. Escolha sua placa manualmente.",
    detected: (name) => `Detectamos ${name}. Confira acima.`,
    detectedUnknown: (name) =>
      `Detectamos "${name}" — não está na nossa lista. Escolha o modelo mais próximo acima.`,
    detectedIntegrated: (name) =>
      `Detectamos gráficos integrados (${name}), mas não o modelo exato. Escolha o mais próximo acima.`,
    copyFailed: "Não foi possível copiar. Use a barra de endereços do navegador.",
    cpu: "Processador",
    gpu: "Placa de vídeo",
    cpuHint: (count) =>
      `${count} CPUs cadastradas. Chips de notebook costumam ficar um nível abaixo do equivalente de desktop.`,
    gpuHint: (count) => `${count} GPUs cadastradas, dedicadas e integradas.`,
    ram: "Memória RAM",
    vram: "Memória de vídeo",
    auto: "(auto)",
    shared: "(compartilhada)",
    storage: "Espaço livre",
    maxRes: "Resolução máxima",
    targetFps: "FPS desejado",
    storageAria: "Espaço livre em gigabytes",
    maxResAria: "Resolução máxima",
    targetAria: "Taxa de quadros desejada",
    integrated: "Gráficos integrados",
    discrete: "Gráficos dedicados",
    reset: "Redefinir",
    searchModel: "Busque pelo modelo…",
    noMatch: "Nenhum resultado. Tente um nome mais curto.",
    searchLabel: (label) => `Buscar ${label}`,
    optionsLabel: (label) => `Opções de ${label}`,
  },
  results: {
    step: "Passo 02 — A resposta",
    headline: (count) =>
      `${count} ${count === 1 ? "jogo roda" : "jogos rodam"} muito bem ou melhor.`,
    summary: (playable, offTarget, gpu, cpu, ram, fps, res) =>
      `${
        playable === 0
          ? "Nenhum está jogável em configurações reduzidas"
          : `${playable} ${playable === 1 ? "outro está jogável" : "outros estão jogáveis"} em configurações reduzidas`
      }${
        offTarget > 0 ? `, e ${offTarget} não vão atingir sua meta.` : "."
      } Baseado em ${gpu}, ${cpu} e ${ram} GB de RAM, mirando ${fps} FPS em até ${res}.`,
    all: "Todos",
    runnable: "Roda",
    searchPlaceholder: "Buscar jogos…",
    searchAria: "Buscar jogos por título, estúdio ou gênero",
    sortAria: "Ordenar jogos",
    noResults: "Nenhum jogo corresponde a esse filtro.",
    clear: "Limpar filtros",
    disclaimer:
      "Os FPS são estimativas — patches, drivers, upscaling e apps em segundo plano mudam o número real.",
    snapshot: (date) => `Os números de jogadores da Steam são um retrato de ${date}.`,
  },
  library: {
    eyebrow: "A biblioteca",
    title: (count) => `${count} jogos, avaliados no seu PC.`,
    body: "Cada jogo é testado no seu hardware em todos os presets, não só na ficha de requisitos mínimos. Clique em um para ver o detalhamento completo.",
    yourRig: "Seu PC",
    change: "Alterar peças",
    all: "Todos",
    searchPlaceholder: "Busque por título, estúdio ou gênero…",
    searchAria: "Buscar jogos por título, estúdio ou gênero",
    shown: (count) => `${count} exibidos`,
    sortAria: "Ordenar jogos",
    noResults: "Nada corresponde a essa busca.",
    reset: "Limpar filtros",
  },
  card: {
    fps: "FPS est.",
    belowMin: "Abaixo dos requisitos mínimos",
    noBottleneck: "Sem gargalo",
    limited: (list) => `Limitado por ${list}`,
  },
  detail: {
    allGames: "Todos os jogos",
    estimate: "Estimativa",
    fps: "FPS est.",
    belowMin: "Seu hardware fica abaixo dos requisitos mínimos.",
    atPreset: (preset) => `Em ${preset}`,
    target: (fps, res) => `Sua meta: ${fps} FPS em até ${res}`,
    limitedBy: (list) => `Limitado por: ${list}`,
    noBottleneck: "Nenhum componente está te segurando",
    change: "Alterar minhas peças",
    minGpu: "GPU mínima",
    install: "de instalação",
    cap: (fps) => `limite de ${fps} FPS`,
    uncapped: "FPS sem limite",
    playingOnSteam: "jogando na Steam",
    snapshot: (date) => `Retrato da Steam · ${date}`,
    yourPc: "Seu PC vs. este jogo",
    recommended100: "RECOMENDADO = 100%",
    minRec: (min, rec) => `Mín: ${min} · Rec: ${rec}`,
    frameRate: "FPS por preset",
    avgNative: "FPS MÉDIO · NATIVO",
    aiming: (fps) => `Mirando ${fps} FPS. `,
    aimingCap: (fps, cap) =>
      `Mirando ${fps} FPS, mas este jogo limita a ${cap} FPS. `,
    upscaling:
      "Upscaling (DLSS / FSR / XeSS) não está incluído — ativá-lo geralmente rende um ou dois presets.",
    hitsTarget: "Atinge a meta",
    close: "Perto",
    thirty: "30+ FPS",
    rough: "Ruim",
    official: "Requisitos oficiais",
    officialBody: "Como publicados pelo desenvolvedor, simplificados para as peças que mais importam.",
    minimum: "Mínimos",
    recommended: "Recomendados",
    similar: "Se você gostar deste",
    similarBody: "Jogos parecidos, avaliados no mesmo PC.",
    requirements: {
      cpu: "CPU",
      gpu: "GPU",
      ram: "RAM",
      vram: "VRAM",
      storage: "Armazenamento",
    },
  },
  status: {
    recommended: "Atende ao recomendado",
    minimum: "Atende ao mínimo",
    below: "Abaixo do mínimo",
  },
  checks: {
    gpu: "Placa de vídeo",
    cpu: "Processador",
    ram: "Memória RAM",
    vram: "Memória de vídeo",
    storage: "Espaço livre",
  },
  bottlenecks: {
    gpu: "Placa de vídeo",
    cpu: "Processador",
    ram: "Memória RAM",
    vram: "VRAM",
  },
  warnings: {
    storage: (need, have) =>
      `Precisa de ${need} GB de armazenamento — você tem ${have} GB livres.`,
    vram: (need) =>
      `Abaixo do mínimo de ${need} GB de VRAM — espere texturas carregando e engasgos.`,
    ram: (need) => `Abaixo do mínimo de ${need} GB de RAM — espere engasgos.`,
    integrated: "Gráficos integrados detectados — eles usam a memória do sistema; memória em dual-channel ajuda.",
  },
  verdicts: {
    maxed: "No talo",
    great: "Roda muito bem",
    playable: "Jogável",
    weak: "Abaixo da meta",
    no: "Não roda",
  },
  qualities: {
    Ultra: "Ultra",
    High: "Alto",
    Medium: "Médio",
    Low: "Baixo",
  },
  genres: {
    ARPG: "ARPG",
    Action: "Ação",
    "Action RPG": "RPG de ação",
    Adventure: "Aventura",
    Arcade: "Arcade",
    "Battle Royale": "Battle Royale",
    "Card Game": "Jogo de cartas",
    "Choices Matter": "Escolhas importam",
    "City Builder": "Construção de cidades",
    Climbing: "Escalada",
    "Co-op": "Cooperativo",
    Competitive: "Competitivo",
    Crime: "Crime",
    "Dark Fantasy": "Fantasia sombria",
    Driving: "Direção",
    Extraction: "Extração",
    FPS: "FPS",
    Factory: "Fábrica",
    Fantasy: "Fantasia",
    Farming: "Fazenda",
    "Fast Paced": "Rápido",
    "First Person": "Primeira pessoa",
    Flight: "Voo",
    "Free to Play": "Grátis para jogar",
    "Greek Mythology": "Mitologia grega",
    Hardcore: "Hardcore",
    "Hero Shooter": "Hero shooter",
    History: "História",
    Horror: "Terror",
    Hunting: "Caça",
    Indie: "Indie",
    Japan: "Japão",
    "Large Scale": "Grande escala",
    "Life Sim": "Simulador de vida",
    Loot: "Loot",
    "Looter Shooter": "Looter shooter",
    MMORPG: "MMORPG",
    MOBA: "MOBA",
    Medieval: "Medieval",
    Military: "Militar",
    Mining: "Mineração",
    Movement: "Movimento",
    Multiplayer: "Multijogador",
    Mythology: "Mitologia",
    Narrative: "Narrativa",
    "Open World": "Mundo aberto",
    Parkour: "Parkour",
    Physics: "Física",
    Pirate: "Pirata",
    Platformer: "Plataforma",
    "Post-Apocalyptic": "Pós-apocalíptico",
    Psychological: "Psicológico",
    RPG: "RPG",
    RTS: "RTS",
    Racing: "Corrida",
    Realistic: "Realista",
    Relaxing: "Relaxante",
    Remake: "Remake",
    Roguelike: "Roguelike",
    Samurai: "Samurai",
    Sandbox: "Sandbox",
    "Sci-Fi": "Ficção científica",
    Shooter: "Shooter",
    Simulation: "Simulação",
    "Souls-like": "Souls-like",
    Soviet: "Soviético",
    Space: "Espaço",
    Sports: "Esportes",
    "Star Wars": "Star Wars",
    Stealth: "Furtividade",
    Steampunk: "Steampunk",
    "Story Rich": "História rica",
    Strategy: "Estratégia",
    Subscription: "Assinatura",
    Superhero: "Super-herói",
    Survival: "Sobrevivência",
    "Survival Horror": "Terror de sobrevivência",
    Tactical: "Tático",
    "Third Person": "Terceira pessoa",
    "Turn-Based": "Por turnos",
    "Turn-Based RPG": "RPG por turnos",
    Underwater: "Submarino",
    Vikings: "Vikings",
    Western: "Faroeste",
    Zombies: "Zumbis",
  },
  sort: {
    popular: "Mais jogados",
    match: "Melhor para meu PC",
    new: "Mais recentes",
    az: "A–Z",
  },
  notFound: {
    eyebrow: "404 — fora da biblioteca",
    title: "Esse jogo não existe. Ainda.",
    body: "Provavelmente ainda não adicionamos, ou o link está errado. A biblioteca continua sendo o melhor lugar para procurar.",
    browse: "Explorar jogos",
  },
  common: {
    select: "Selecionar",
    gb: "GB",
    tb: "1 TB",
    dash: "—",
  },
};

export const DICTIONARIES: Record<Locale, Dictionary> = {
  en: EN,
  "pt-BR": PT_BR,
};
