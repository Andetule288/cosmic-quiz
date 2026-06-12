const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

app.use(express.static(path.join(__dirname, 'public')));

// ─── Question Bank ───────────────────────────────────────────────────────────
const QUESTION_BANK = {
  easy: [
    {
      question: "What is the closest star to Earth?",
      answers: ["The Sun", "Proxima Centauri", "Sirius", "Betelgeuse"],
      correct: 0,
      facts: ["The Sun is about 93 million miles away. Light from it takes 8 minutes 20 seconds to reach us!", "The Sun is so massive that about 1.3 million Earths could fit inside it!", "The Sun has been burning for 4.6 billion years and has enough fuel for another 5 billion!"]
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Venus", "Jupiter", "Mars", "Saturn"],
      correct: 2,
      facts: ["Mars is red because its surface is covered in iron oxide — basically rust!", "Mars has the tallest volcano in the solar system: Olympus Mons, nearly 3× the height of Everest!", "A day on Mars is only about 37 minutes longer than a day on Earth!"]
    },
    {
      question: "How many planets are in our solar system?",
      answers: ["6", "7", "8", "9"],
      correct: 2,
      facts: ["Pluto was reclassified as a dwarf planet in 2006 by the International Astronomical Union!", "All eight planets orbit the Sun in the same direction!", "Remember them: My Very Educated Mother Just Served Us Noodles!"]
    },
    {
      question: "What is the biggest planet in our solar system?",
      answers: ["Saturn", "Neptune", "Uranus", "Jupiter"],
      correct: 3,
      facts: ["Jupiter is so big that all other planets could fit inside it!", "Jupiter's Great Red Spot is a storm that has raged for at least 350 years!", "Jupiter has at least 95 known moons!"]
    },
    {
      question: "Which galaxy do we live in?",
      answers: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"],
      correct: 1,
      facts: ["The Milky Way is about 100,000 light-years across with 100–400 billion stars!", "Our solar system sits about 26,000 light-years from the galactic center!", "The Milky Way will collide with Andromeda in about 4.5 billion years!"]
    },
    {
      question: "What planet has the most moons?",
      answers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      correct: 1,
      facts: ["Saturn has 146 confirmed moons! Its largest, Titan, is bigger than Mercury!", "Saturn's moon Enceladus has geysers that shoot water ice into space!", "Saturn would float if you could find a bathtub big enough — it's less dense than water!"]
    },
    {
      question: "What is a shooting star?",
      answers: ["A star falling", "A meteor burning", "A comet", "A satellite"],
      correct: 1,
      facts: ["Shooting stars are tiny bits of rock or dust that burn up in Earth's atmosphere!", "The Perseid meteor shower happens every August from comet Swift-Tuttle's debris trail!", "About 48.5 tons of meteoroids fall to Earth every single day!"]
    },
    {
      question: "Which planet is the hottest in our solar system?",
      answers: ["Mercury", "Venus", "Mars", "Jupiter"],
      correct: 1,
      facts: ["Venus is hotter than Mercury because its thick atmosphere traps heat like a blanket!", "Venus's surface is hot enough to melt lead — about 900°F (475°C)!", "Venus spins backwards, so the Sun rises in the west and sets in the east!"]
    },
    {
      question: "What do we call a group of stars that form a pattern?",
      answers: ["A solar system", "A nebula", "A constellation", "A galaxy cluster"],
      correct: 2,
      facts: ["There are 88 officially recognized constellations, many named by ancient civilizations!", "Stars in a constellation may look close but can be millions of miles apart!", "Orion is the most famous constellation, visible from both hemispheres!"]
    },
    {
      question: "Which planet has beautiful rings around it?",
      answers: ["Jupiter", "Uranus", "Neptune", "Saturn"],
      correct: 3,
      facts: ["Saturn's rings are made of billions of pieces of ice and rock!", "The rings extend 175,000 miles from the planet but are only ~30 feet thick!", "All four gas giants have rings, but Saturn's are by far the most spectacular!"]
    }
  ],
  medium: [
    {
      question: "Which layer of Earth is in a completely liquid state?",
      answers: ["Crust", "Mantle", "Outer Core", "Inner Core"],
      correct: 2,
      facts: ["The Outer Core is mostly liquid iron and nickel.", "The movement of liquid metal here creates Earth's magnetic field!", "The Inner Core stays solid due to immense pressure, even though it's hotter."]
    },
    {
      question: "Which organelle captures sunlight for photosynthesis in plant cells?",
      answers: ["Mitochondria", "Chloroplast", "Cell Wall", "Vacuole"],
      correct: 1,
      facts: ["Chloroplasts contain the green pigment chlorophyll.", "Animal cells don't have chloroplasts — they must consume food for energy.", "Photosynthesis converts solar energy into glucose stored as chemical energy."]
    },
    {
      question: "What process turns water vapor back into liquid water droplets?",
      answers: ["Evaporation", "Precipitation", "Condensation", "Transpiration"],
      correct: 2,
      facts: ["Condensation is responsible for cloud formation in the sky.", "Morning dew on grass is condensation in action!", "It is the exact opposite of evaporation."]
    },
    {
      question: "Which subatomic particle has a negative charge and orbits the nucleus?",
      answers: ["Proton", "Neutron", "Electron", "Quark"],
      correct: 2,
      facts: ["Electrons are much smaller than protons and neutrons.", "The flow of electrons from atom to atom creates electricity!", "In a neutral atom, the number of electrons equals the number of protons."]
    },
    {
      question: "What type of rock forms when existing rocks are subjected to high heat and pressure without melting?",
      answers: ["Igneous", "Sedimentary", "Metamorphic", "Volcanic"],
      correct: 2,
      facts: ["'Metamorphic' comes from Greek words meaning 'change of form'.", "Marble is a metamorphic rock that starts out as limestone!", "If it melts completely, it becomes magma and forms igneous rock instead."]
    },
    {
      question: "Which body system is responsible for transporting oxygen and nutrients to cells?",
      answers: ["Respiratory System", "Digestive System", "Circulatory System", "Nervous System"],
      correct: 2,
      facts: ["The circulatory system is powered by the heart, which acts as a double pump.", "An adult's heart beats about 100,000 times a day!", "Blood circulates through the entire body in about 20 seconds."]
    },
    {
      question: "Which simple machine is a rigid bar that pivots around a fulcrum?",
      answers: ["Pulley", "Lever", "Inclined Plane", "Wedge"],
      correct: 1,
      facts: ["A seesaw is a classic first-class lever.", "Levers make work easier by increasing the output force.", "Archimedes said: 'Give me a lever long enough and I shall move the world.'"]
    },
    {
      question: "What is the most abundant gas in Earth's atmosphere?",
      answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correct: 2,
      facts: ["Nitrogen makes up about 78% of the air we breathe.", "Oxygen only makes up about 21% of the atmosphere.", "Nitrogen is a key component of DNA and proteins!"]
    },
    {
      question: "What term describes a relationship where BOTH organisms benefit?",
      answers: ["Parasitism", "Mutualism", "Commensalism", "Predation"],
      correct: 1,
      facts: ["Bees and flowers have mutualism: bees get food, flowers get pollinated!", "Gut bacteria also represent mutualism — they help you digest food!", "This is a type of 'Symbiosis.'"]
    },
    {
      question: "Which planet has the most extensive and visible ring system?",
      answers: ["Jupiter", "Uranus", "Neptune", "Saturn"],
      correct: 3,
      facts: ["Saturn's rings are mostly chunks of ice and small amounts of rock.", "While all gas giants have rings, Saturn's are the only ones easily visible from Earth!", "Saturn is so light it would float if you could find an ocean big enough!"]
    }
  ],
  hard: [
    {
      question: "In DNA replication, which enzyme unwinds the double helix at the replication fork?",
      answers: ["DNA Polymerase", "Helicase", "Ligase", "Primase"],
      correct: 1,
      facts: ["Helicase breaks hydrogen bonds between base pairs to separate the strands.", "The energy for unwinding is derived from ATP hydrolysis.", "Single-Strand Binding proteins then prevent the strands from re-annealing."]
    },
    {
      question: "According to the Second Law of Thermodynamics, what happens to entropy of an isolated system?",
      answers: ["It decreases", "It remains constant", "It increases", "It fluctuates predictably"],
      correct: 2,
      facts: ["Entropy is a measure of molecular disorder or randomness within a system.", "This law explains why heat naturally flows from hot objects to cold, not vice versa.", "The 'Heat Death of the Universe' is the theoretical end-state of maximum entropy."]
    },
    {
      question: "What is the correct net ionic equation for HCl reacting with NaOH?",
      answers: ["Na⁺ + Cl⁻ → NaCl", "H⁺ + OH⁻ → H₂O", "HCl + NaOH → H₂O + NaCl", "H₂ + O₂ → H₂O"],
      correct: 1,
      facts: ["A net ionic equation only shows species directly involved in the chemical change.", "Na⁺ and Cl⁻ are 'spectator ions' — they remain unchanged in solution.", "This is an example of an exothermic neutralization reaction."]
    },
    {
      question: "In stoichiometry, what is the reactant completely consumed first, stopping the reaction?",
      answers: ["Excess Reactant", "Theoretical Yield", "Limiting Reactant", "Catalyst"],
      correct: 2,
      facts: ["The limiting reactant determines the maximum amount of product that can form.", "Identifying it requires comparing the mole ratios of starting materials.", "Any reactant remaining after is called the 'excess reactant.'"]
    },
    {
      question: "What is the primary function of Mitochondria during aerobic respiration?",
      answers: ["Protein synthesis", "Generating ATP", "Storing genetic info", "Waste breakdown"],
      correct: 1,
      facts: ["The Krebs Cycle and Electron Transport Chain both occur within the mitochondria.", "Mitochondria have their own circular DNA, supporting the Endosymbiotic Theory.", "The inner membrane is folded into 'cristae' to maximize surface area."]
    },
    {
      question: "At the peak of a vertically thrown object's trajectory, what is its instantaneous velocity?",
      answers: ["9.8 m/s", "Equal to initial velocity", "0 m/s", "Constant"],
      correct: 2,
      facts: ["Even though velocity is zero at the peak, acceleration remains −9.8 m/s².", "Time to reach the peak equals time to fall back to the starting height.", "This assumes we neglect air resistance, standard in introductory physics."]
    },
    {
      question: "Which organic functional group is characterized by a carbon double-bonded to oxygen (C=O)?",
      answers: ["Hydroxyl", "Carbonyl", "Carboxyl", "Amino"],
      correct: 1,
      facts: ["The carbonyl group is the structural core of both aldehydes and ketones.", "At the end of a chain it's an aldehyde; in the middle, a ketone.", "Carbonyl carbons are electrophilic — prone to attack by nucleophiles."]
    },
    {
      question: "What is the phenotypic ratio of a dihybrid cross (AaBb × AaBb)?",
      answers: ["3:1", "1:2:1", "9:3:3:1", "1:1:1:1"],
      correct: 2,
      facts: ["This ratio assumes the two genes are on different chromosomes and assort independently.", "The ratio represents 9 (dom/dom), 3 (dom/rec), 3 (rec/dom), 1 (rec/rec).", "A Punnett square for a dihybrid cross contains 16 boxes."]
    },
    {
      question: "Which describes a 'Scalar' quantity in physics?",
      answers: ["Magnitude and direction", "Magnitude only", "Direction only", "Acceleration over time"],
      correct: 1,
      facts: ["Examples of scalars include mass, temperature, time, and speed.", "Unlike vectors, scalars can be added using simple arithmetic.", "Distance is a scalar, whereas displacement is a vector."]
    },
    {
      question: "Which gas law states pressure is inversely proportional to volume at constant temperature?",
      answers: ["Charles's Law", "Boyle's Law", "Gay-Lussac's Law", "Avogadro's Law"],
      correct: 1,
      facts: ["Boyle's Law is expressed as P₁V₁ = P₂V₂.", "If you halve the volume of a container, the gas pressure doubles.", "Robert Boyle published this in 1662 — one of the first established physical laws of gases."]
    }
  ]
};

const QUESTION_TIME = 20;
const POINTS_BASE = 300;
const POINTS_SPEED = 700;

// ─── Room State ───────────────────────────────────────────────────────────────
const rooms = {};

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function getLeaderboard(roomCode) {
  const room = rooms[roomCode];
  if (!room) return [];
  return Object.entries(room.players)
    .map(([id, p]) => ({ id, name: p.name, score: p.score, avatar: p.avatar }))
    .sort((a, b) => b.score - a.score);
}

function shuffleAnswers(question) {
  const indices = [0, 1, 2, 3];
  for (let i = 3; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const shuffledAnswers = indices.map(i => question.answers[i]);
  const newCorrectIndex = indices.indexOf(question.correct);
  return { shuffledAnswers, newCorrectIndex, originalIndices: indices };
}

// ─── Socket.io Logic ─────────────────────────────────────────────────────────
io.on('connection', (socket) => {

  // ── HOST: Create a new room ──────────────────────────────────────────────
  socket.on('create-room', ({ difficulty }) => {
    const code = generateCode();
    rooms[code] = {
      code,
      hostId: socket.id,
      difficulty,
      players: {},
      currentQ: -1,
      phase: 'lobby',  // lobby | countdown | question | reveal | end
      answers: {},
      questionTimer: null,
      shuffleMap: null
    };
    socket.join(code);
    socket.emit('room-created', { code });
    console.log(`Room ${code} created (${difficulty})`);
  });

  // ── PLAYER: Join a room ──────────────────────────────────────────────────
  socket.on('join-room', ({ code, name, avatar }) => {
    const room = rooms[code];
    if (!room) { socket.emit('join-error', 'Room not found.'); return; }
    if (room.phase !== 'lobby') { socket.emit('join-error', 'Game already started.'); return; }
    if (Object.keys(room.players).length >= 50) { socket.emit('join-error', 'Room is full.'); return; }

    room.players[socket.id] = { name: name.trim().slice(0, 20) || 'Explorer', score: 0, avatar: avatar || '🚀', answered: false };
    socket.join(code);
    socket.emit('join-success', { code, name: room.players[socket.id].name });

    // Tell everyone in the room the updated roster
    io.to(code).emit('roster-update', {
      players: getLeaderboard(code),
      count: Object.keys(room.players).length
    });
    console.log(`${room.players[socket.id].name} joined ${code}`);
  });

  // ── HOST: Start the game ─────────────────────────────────────────────────
  socket.on('start-game', ({ code }) => {
    const room = rooms[code];
    if (!room || room.hostId !== socket.id) return;
    if (Object.keys(room.players).length === 0) {
      socket.emit('host-error', 'Need at least 1 player to start!');
      return;
    }
    room.phase = 'countdown';
    io.to(code).emit('game-starting', { countdown: 3 });
    setTimeout(() => sendNextQuestion(code), 3500);
  });

  // ── HOST: Manually advance (skip timer) ──────────────────────────────────
  socket.on('force-next', ({ code }) => {
    const room = rooms[code];
    if (!room || room.hostId !== socket.id) return;
    if (room.phase === 'question') {
      clearTimeout(room.questionTimer);
      endQuestion(code);
    } else if (room.phase === 'reveal') {
      advanceGame(code);
    }
  });

  // ── PLAYER: Submit an answer ──────────────────────────────────────────────
  socket.on('submit-answer', ({ code, answerIndex, timeLeft }) => {
    const room = rooms[code];
    if (!room || room.phase !== 'question') return;
    if (room.answers[socket.id] !== undefined) return; // already answered
    if (!room.players[socket.id]) return;

    room.answers[socket.id] = { answerIndex, timeLeft: Math.max(0, timeLeft) };
    room.players[socket.id].answered = true;

    // Acknowledge to the player
    socket.emit('answer-received');

    // Tell host how many have answered
    const answeredCount = Object.keys(room.answers).length;
    const totalCount = Object.keys(room.players).length;
    io.to(room.hostId).emit('answer-count', { answered: answeredCount, total: totalCount });

    // Auto-end if everyone answered
    if (answeredCount >= totalCount) {
      clearTimeout(room.questionTimer);
      endQuestion(code);
    }
  });

  // ── Disconnect cleanup ────────────────────────────────────────────────────
  socket.on('disconnect', () => {
    // Remove from any room they were a player in
    for (const code in rooms) {
      const room = rooms[code];
      if (room.players[socket.id]) {
        delete room.players[socket.id];
        io.to(code).emit('roster-update', {
          players: getLeaderboard(code),
          count: Object.keys(room.players).length
        });
      }
      // If host disconnects, notify players
      if (room.hostId === socket.id) {
        io.to(code).emit('host-disconnected');
        clearTimeout(room.questionTimer);
        delete rooms[code];
      }
    }
  });
});

// ─── Game Flow Functions ──────────────────────────────────────────────────────
function sendNextQuestion(code) {
  const room = rooms[code];
  if (!room) return;

  room.currentQ++;
  const questions = QUESTION_BANK[room.difficulty];

  if (room.currentQ >= questions.length) {
    endGame(code);
    return;
  }

  const q = questions[room.currentQ];
  const { shuffledAnswers, newCorrectIndex, originalIndices } = shuffleAnswers(q);

  // Save the shuffle so we can score correctly
  room.shuffleMap = { newCorrectIndex, originalIndices };
  room.answers = {};
  room.phase = 'question';

  // Reset answered flags
  for (const pid in room.players) room.players[pid].answered = false;

  // Send to ALL (host sees the correct answer color; players don't)
  io.to(code).emit('new-question', {
    questionIndex: room.currentQ,
    totalQuestions: questions.length,
    question: q.question,
    answers: shuffledAnswers,
    timeLimit: QUESTION_TIME
  });

  // Tell host only which is correct (so it can highlight)
  io.to(room.hostId).emit('correct-index-hint', { correctIndex: newCorrectIndex });

  // Server-side timer
  room.questionTimer = setTimeout(() => endQuestion(code), QUESTION_TIME * 1000);
}

function endQuestion(code) {
  const room = rooms[code];
  if (!room || room.phase !== 'question') return;
  room.phase = 'reveal';

  const questions = QUESTION_BANK[room.difficulty];
  const q = questions[room.currentQ];
  const { newCorrectIndex } = room.shuffleMap;

  // Score all players
  const results = {};
  for (const pid in room.players) {
    const ans = room.answers[pid];
    const player = room.players[pid];
    let pointsEarned = 0;
    let correct = false;

    if (ans !== undefined && ans.answerIndex === newCorrectIndex) {
      correct = true;
      const speedFraction = ans.timeLeft / QUESTION_TIME;
      pointsEarned = Math.round(POINTS_BASE + POINTS_SPEED * speedFraction);
      player.score += pointsEarned;
    }

    results[pid] = { correct, pointsEarned };
  }

  const leaderboard = getLeaderboard(code);
  const randomFact = q.facts[Math.floor(Math.random() * q.facts.length)];

  // Tell each player their personal result
  for (const pid in room.players) {
    const r = results[pid] || { correct: false, pointsEarned: 0 };
    io.to(pid).emit('round-result', {
      correct: r.correct,
      pointsEarned: r.pointsEarned,
      newScore: room.players[pid].score,
      correctIndex: newCorrectIndex,
      fact: randomFact,
      leaderboard
    });
  }

  // Tell host the full reveal
  io.to(room.hostId).emit('round-reveal', {
    correctIndex: newCorrectIndex,
    fact: randomFact,
    leaderboard,
    results
  });

  // Auto-advance after 6 seconds
  room.questionTimer = setTimeout(() => advanceGame(code), 6000);
}

function advanceGame(code) {
  const room = rooms[code];
  if (!room) return;
  const questions = QUESTION_BANK[room.difficulty];

  if (room.currentQ + 1 >= questions.length) {
    endGame(code);
  } else {
    io.to(code).emit('next-question-countdown', { countdown: 3 });
    setTimeout(() => sendNextQuestion(code), 3500);
  }
}

function endGame(code) {
  const room = rooms[code];
  if (!room) return;
  room.phase = 'end';

  const leaderboard = getLeaderboard(code);
  io.to(code).emit('game-over', { leaderboard });

  // Clean up room after a delay
  setTimeout(() => { delete rooms[code]; }, 300000);
  console.log(`Room ${code} ended`);
}

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`\n🚀 Cosmic Quiz Server running on http://localhost:${PORT}`);
  console.log(`   Host screen : http://localhost:${PORT}/host.html`);
  console.log(`   Player screen: http://localhost:${PORT}/player.html\n`);
});
