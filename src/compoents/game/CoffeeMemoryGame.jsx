import React, { useState, useEffect } from "react";
import { RotateCcw, Trophy, Clock, Zap, ArrowLeft, Coffee } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { getTranslation } from "../../translations/gameTranslations";
import LanguageSelector from "../LanguageSelector";

import CoffeeTruthOrDare from "./CoffeeTruthOrDare";

import CoffeeNameThreeThings from "./CoffeeNameThreeThings";
import FingerSelectionGame from "./FingerSelectionGame";
import FootballChallengeGame from "./FootballChallengeGame";
import FirstDateGame from "./FirstDateGame";

const coffeeItems = [
  { type: "espresso", emoji: "☕", name: "Espresso" },
  { type: "cappuccino", emoji: "🥛", name: "Cappuccino" },
  { type: "latte", emoji: "🍼", name: "Latte" },
  { type: "mocha", emoji: "🍫", name: "Mocha" },
  { type: "americano", emoji: "☕", name: "Americano" },
  { type: "macchiato", emoji: "🥤", name: "Macchiato" },
  { type: "frappuccino", emoji: "🧊", name: "Frappuccino" },
  { type: "turkish", emoji: "🫖", name: "Turkish Coffee" },
];

export default function CoffeeMemoryGame({ isMobile, setCurrentView, isDarkMode }) {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  
  const [currentGame, setCurrentGame] = useState("menu");
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [bestScore, setBestScore] = useState(null);
  const [coffeeBeans, setCoffeeBeans] = useState(1000);

  // Init game + localStorage
  useEffect(() => {
    if (currentGame === "memory") {
      initializeMemoryGame();
    }
    const savedBest = localStorage.getItem("coffee-memory-best-score");
    const savedBeans = localStorage.getItem("coffee-beans");
    if (savedBest) setBestScore(parseInt(savedBest));
    if (savedBeans) setCoffeeBeans(parseInt(savedBeans));
  }, [currentGame]);

  useEffect(() => {
    localStorage.setItem("coffee-beans", coffeeBeans.toString());
  }, [coffeeBeans]);

  useEffect(() => {
    let interval;
    if (gameStarted && !gameCompleted && currentGame === "memory") {
      interval = setInterval(() => setTimeElapsed((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted, currentGame]);

  useEffect(() => {
    if (matchedPairs === coffeeItems.length && gameStarted && currentGame === "memory") {
      setGameCompleted(true);
      setGameStarted(false);
      if (!bestScore || moves < bestScore) {
        setBestScore(moves);
        localStorage.setItem("coffee-memory-best-score", moves.toString());
        setCoffeeBeans((b) => b + 100);
      } else {
        setCoffeeBeans((b) => b + 50);
      }
    }
  }, [matchedPairs, moves, bestScore, gameStarted, currentGame]);

  const initializeMemoryGame = () => {
    let id = 0;
    const gameCards = coffeeItems.flatMap((item) => [
      { id: id++, type: item.type, emoji: item.emoji, name: item.name, isFlipped: false, isMatched: false },
      { id: id++, type: item.type, emoji: item.emoji, name: item.name, isFlipped: false, isMatched: false },
    ]);
    setCards(gameCards.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(false);
    setGameCompleted(false);
  };

  const handleCardClick = (cardId) => {
    if (!gameStarted) setGameStarted(true);
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)));

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped;
      const ca = cards.find((c) => c.id === a);
      const cb = cards.find((c) => c.id === b);
      if (ca && cb && ca.type === cb.type) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === a || c.id === b ? { ...c, isMatched: true } : c))
          );
          setMatchedPairs((p) => p + 1);
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === a || c.id === b ? { ...c, isFlipped: false } : c))
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  // === GAME MENU ===
  if (currentGame === "menu") {
    return (
      <div className={`${isMobile ? "px-6 pt-8 pb-24" : "px-8 pt-12 pb-8"} min-h-screen transition-colors ${
        isDarkMode ? 'bg-black' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div>
            <h1 className={`font-bold ${isMobile ? "text-2xl" : "text-4xl"} mb-2 transition-colors ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>Coffee Games 🎮</h1>
            <p className={`transition-colors ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{t('selectGame')}</p>
          </div>
          <div className="flex items-center gap-4">
            
            <LanguageSelector isDarkMode={isDarkMode} />
          </div>
        </div>

        <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3"} gap-6 sm:gap-8`}>
          {/* Memory Game */}
          <div
            onClick={() => setCurrentGame("memory")}
            className={`group p-6 sm:p-8 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl border ${
              isDarkMode 
                ? 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20' 
                : 'bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200 hover:border-blue-300'
            }`}
          >
            <div className="text-6xl mb-4">🧠</div>
            <h3 className={`font-bold text-xl sm:text-2xl mb-2 transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{t('memoryGame')}</h3>
            <p className={`text-sm transition-colors ${
              isDarkMode ? 'text-white/60' : 'text-gray-600'
            }`}>{t('memoryGameDesc')}</p>
          </div>

          {/* لعبة اختيار الإصبع */}
          <div
            onClick={() => setCurrentGame("fingerGame")}
            className={`group p-6 sm:p-8 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl border ${
              isDarkMode 
                ? 'bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20' 
                : 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200 hover:border-purple-300'
            }`}
          >
            <div className="text-6xl mb-4">☝️</div>
            <h3 className={`font-bold text-xl sm:text-2xl mb-2 transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{t('fingerSelection')}</h3>
            <p className={`text-sm transition-colors ${
              isDarkMode ? 'text-white/60' : 'text-gray-600'
            }`}>{t('fingerSelectionDesc')}</p>
          </div>

          {/* تحدي كرة القدم */}
          <div
            onClick={() => setCurrentGame("footballChallenge")}
            className={`group p-6 sm:p-8 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl border ${
              isDarkMode 
                ? 'bg-green-500/10 border-green-500/20 hover:bg-green-500/20' 
                : 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-200 hover:border-green-300'
            }`}
          >
            <div className="text-6xl mb-4">⚽</div>
            <h3 className={`font-bold text-xl sm:text-2xl mb-2 transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{t('footballChallenge')}</h3>
            <p className={`text-sm transition-colors ${
              isDarkMode ? 'text-white/60' : 'text-gray-600'
            }`}>{t('footballChallengeDesc')}</p>
          </div>

          {/* لعبة الموعد الأول */}
          <div
            onClick={() => setCurrentGame("firstDate")}
            className={`group p-6 sm:p-8 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl border ${
              isDarkMode 
                ? 'bg-pink-500/10 border-pink-500/20 hover:bg-pink-500/20' 
                : 'bg-gradient-to-br from-pink-100 to-rose-100 border-pink-200 hover:border-pink-300'
            }`}
          >
            <div className="text-6xl mb-4">💕</div>
            <h3 className={`font-bold text-xl sm:text-2xl mb-2 transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{t('firstDateGame')}</h3>
            <p className={`text-sm transition-colors ${
              isDarkMode ? 'text-white/60' : 'text-gray-600'
            }`}>{t('firstDateGameDesc')}</p>
          </div>

          {/* Action Vérité */}
          <div
            onClick={() => setCurrentGame("truthOrDare")}
            className={`group p-6 sm:p-8 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl border ${
              isDarkMode 
                ? 'bg-yellow-500/10 border-yellow-500/20 hover:bg-yellow-500/20' 
                : 'bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200 hover:border-yellow-300'
            }`}
          >
            <div className="text-6xl mb-4">🎭</div>
            <h3 className={`font-bold text-xl sm:text-2xl mb-2 transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{t('truthOrDare')}</h3>
            <p className={`text-sm transition-colors ${
              isDarkMode ? 'text-white/60' : 'text-gray-600'
            }`}>{t('truthOrDareDesc')}</p>
          </div>

          {/* سمي 3 حاجات */}
          <div
            onClick={() => setCurrentGame("threeThings")}
            className={`group p-6 sm:p-8 rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl border ${
              isDarkMode 
                ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20' 
                : 'bg-gradient-to-br from-red-100 to-pink-100 border-red-200 hover:border-red-300'
            }`}
          >
            <div className="text-6xl mb-4">🔢</div>
            <h3 className={`font-bold text-xl sm:text-2xl mb-2 transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{t('nameThreeThings')}</h3>
            <p className={`text-sm transition-colors ${
              isDarkMode ? 'text-white/60' : 'text-gray-600'
            }`}>{t('nameThreeThingsDesc')}</p>
          </div>
        </div>
      </div>
    );
  }

  // === OTHER GAMES ===
  if (currentGame === "fingerGame") return <FingerSelectionGame isMobile={isMobile} setCurrentGame={setCurrentGame} />;
  if (currentGame === "footballChallenge") return <FootballChallengeGame isMobile={isMobile} setCurrentGame={setCurrentGame} />;
  if (currentGame === "truthOrDare") return <CoffeeTruthOrDare isMobile={isMobile} setCurrentGame={setCurrentGame} coffeeBeans={coffeeBeans} setCoffeeBeans={setCoffeeBeans} />;
  if (currentGame === "firstDate") return <FirstDateGame isMobile={isMobile} setCurrentGame={setCurrentGame} />;
  if (currentGame === "threeThings") return <CoffeeNameThreeThings isMobile={isMobile} setCurrentGame={setCurrentGame} coffeeBeans={coffeeBeans} setCoffeeBeans={setCoffeeBeans} />;

  // === MEMORY GAME ===
  return (
    <div className={`${isMobile ? "px-6 pt-8 pb-24" : "px-8 pt-12 pb-8"} min-h-screen transition-colors ${
      isDarkMode ? 'bg-black' : 'bg-white'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentGame("menu")} 
            className={`p-2 rounded-xl border transition-all duration-300 hover:shadow-lg ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-white/80 border-black/10 hover:bg-white'
            }`}
          >
            <ArrowLeft className={`w-5 h-5 transition-colors ${
              isDarkMode ? 'text-white/60' : 'text-gray-500'
            }`} />
          </button>
          <div>
            <h1 className={`font-bold ${isMobile ? "text-xl" : "text-3xl"} transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{t('memoryGame')}</h1>
            <p className={`text-sm transition-colors ${
              isDarkMode ? 'text-white/60' : 'text-gray-500'
            }`}>{t('memoryGameDesc')}</p>
          </div>
        </div>
        <button 
          onClick={initializeMemoryGame} 
          className={`px-4 py-2 rounded-xl flex items-center hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold ${
            isDarkMode 
              ? 'bg-amber-500 text-black hover:bg-amber-400' 
              : 'bg-gradient-to-br from-orange-500 to-red-500 text-white'
          }`}
        >
          <RotateCcw className="w-4 h-4 mr-2" /> {t('restart')}
        </button>
      </div>

      {/* Stats */}
      <div className={`grid ${isMobile ? "grid-cols-3" : "grid-cols-4"} gap-4 mb-8`}>
        <div className={`p-4 rounded-xl shadow-lg border-2 transition-colors ${
          isDarkMode 
            ? 'bg-blue-500/10 border-blue-500/20' 
            : 'bg-white border-blue-200'
        }`}>
          <div className={`flex items-center gap-2 mb-2 transition-colors ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>
            <Zap className="w-5 h-5" />
            <span className="font-semibold">{t('moves')}</span>
          </div>
          <p className={`text-2xl font-bold transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>{moves}</p>
        </div>
        <div className={`p-4 rounded-xl shadow-lg border-2 transition-colors ${
          isDarkMode 
            ? 'bg-green-500/10 border-green-500/20' 
            : 'bg-white border-green-200'
        }`}>
          <div className={`flex items-center gap-2 mb-2 transition-colors ${
            isDarkMode ? 'text-green-400' : 'text-green-600'
          }`}>
            <Trophy className="w-5 h-5" />
            <span className="font-semibold">{t('matchedPairs')}</span>
          </div>
          <p className={`text-2xl font-bold transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>{matchedPairs}/{coffeeItems.length}</p>
        </div>
        <div className={`p-4 rounded-xl shadow-lg border-2 transition-colors ${
          isDarkMode 
            ? 'bg-purple-500/10 border-purple-500/20' 
            : 'bg-white border-purple-200'
        }`}>
          <div className={`flex items-center gap-2 mb-2 transition-colors ${
            isDarkMode ? 'text-purple-400' : 'text-purple-600'
          }`}>
            <Clock className="w-5 h-5" />
            <span className="font-semibold">{t('time')}</span>
          </div>
          <p className={`text-2xl font-bold transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>{formatTime(timeElapsed)}</p>
        </div>
        {!isMobile && (
          <div className={`p-4 rounded-xl shadow-lg border-2 transition-colors ${
            isDarkMode 
              ? 'bg-amber-500/10 border-amber-500/20' 
              : 'bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-200'
          }`}>
            <div className={`flex items-center gap-2 mb-2 transition-colors ${
              isDarkMode ? 'text-amber-400' : 'text-amber-700'
            }`}>
              <Coffee className="w-5 h-5" />
              <span className="font-semibold">Beans</span>
            </div>
            <p className={`text-2xl font-bold transition-colors ${
              isDarkMode ? 'text-amber-500' : 'text-amber-800'
            }`}>{coffeeBeans}</p>
          </div>
        )}
      </div>

      {/* Game Board */}
      <div className={`grid ${isMobile ? "grid-cols-4" : "grid-cols-8"} gap-3 mb-8`}>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square flex items-center justify-center rounded-2xl shadow-lg cursor-pointer transition-all duration-300 ${
              card.isMatched 
                ? isDarkMode 
                  ? "bg-green-500/20 border-2 border-green-500/40" 
                  : "bg-gradient-to-br from-green-200 to-emerald-300 border-2 border-green-400"
                : card.isFlipped 
                  ? isDarkMode 
                    ? "bg-amber-500 text-black scale-105" 
                    : "bg-gradient-to-br from-orange-400 to-red-500 text-white scale-105"
                  : isDarkMode 
                    ? "bg-white/5 hover:bg-white/10 hover:scale-105 hover:shadow-xl border-2 border-white/10" 
                    : "bg-white hover:scale-105 hover:shadow-xl border-2 border-gray-200"
            }`}
          >
            {card.isFlipped || card.isMatched ? (
              <div className="text-center">
                <div className={`${isMobile ? "text-2xl" : "text-4xl"} mb-1`}>{card.emoji}</div>
                <p className="text-xs font-semibold">{card.name}</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-3xl">☕</div>
                <p className={`text-xs transition-colors ${
                  isDarkMode ? 'text-white/40' : 'text-gray-500'
                }`}>?</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Game Completed Modal */}
      {gameCompleted && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`rounded-3xl p-8 max-w-md w-full shadow-2xl transition-colors ${
            isDarkMode ? 'bg-zinc-900 border border-white/10' : 'bg-white'
          }`}>
            <div className="text-center">
              <div className="text-7xl mb-4">🎉</div>
              <h2 className={`text-3xl font-bold mb-2 transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>{t('congratulations')}</h2>
              <p className={`mb-6 transition-colors ${
                isDarkMode ? 'text-white/60' : 'text-gray-600'
              }`}>{t('gameComplete')}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-xl transition-colors ${
                  isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'
                }`}>
                  <Zap className={`w-6 h-6 mx-auto mb-2 transition-colors ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <p className={`text-sm transition-colors ${
                    isDarkMode ? 'text-white/60' : 'text-gray-600'
                  }`}>{t('moves')}</p>
                  <p className={`text-2xl font-bold transition-colors ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>{moves}</p>
                </div>
                <div className={`p-4 rounded-xl transition-colors ${
                  isDarkMode ? 'bg-purple-500/10' : 'bg-purple-50'
                }`}>
                  <Clock className={`w-6 h-6 mx-auto mb-2 transition-colors ${
                    isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                  <p className={`text-sm transition-colors ${
                    isDarkMode ? 'text-white/60' : 'text-gray-600'
                  }`}>{t('time')}</p>
                  <p className={`text-2xl font-bold transition-colors ${
                    isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>{formatTime(timeElapsed)}</p>
                </div>
              </div>

              <div className={`p-4 rounded-xl mb-6 transition-colors ${
                isDarkMode 
                  ? 'bg-amber-500/10' 
                  : 'bg-gradient-to-br from-amber-100 to-yellow-100'
              }`}>
                <Coffee className={`w-8 h-8 mx-auto mb-2 transition-colors ${
                  isDarkMode ? 'text-amber-400' : 'text-amber-600'
                }`} />
                <p className={`text-sm font-semibold transition-colors ${
                  isDarkMode ? 'text-amber-400' : 'text-amber-700'
                }`}>Coffee Beans Earned</p>
                <p className={`text-3xl font-bold transition-colors ${
                  isDarkMode ? 'text-amber-500' : 'text-amber-800'
                }`}>
                  +{!bestScore || moves < bestScore ? "100" : "50"}
                </p>
              </div>

              {bestScore && moves < bestScore && (
                <div className={`p-3 rounded-xl mb-6 transition-colors ${
                  isDarkMode ? 'bg-green-500/10' : 'bg-green-50'
                }`}>
                  <Trophy className={`w-6 h-6 mx-auto mb-1 transition-colors ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`} />
                  <p className={`font-semibold transition-colors ${
                    isDarkMode ? 'text-green-400' : 'text-green-700'
                  }`}>New Best Score!</p>
                </div>
              )}

              <button 
                onClick={initializeMemoryGame} 
                className={`w-full py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-amber-500 text-black hover:bg-amber-400' 
                    : 'bg-gradient-to-br from-orange-500 to-red-500 text-white'
                }`}
              >
                {t('restart')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
