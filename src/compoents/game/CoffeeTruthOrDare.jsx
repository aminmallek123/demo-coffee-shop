import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { ArrowLeft, Coffee, Users, RotateCcw, Crown, Heart, Zap, AlertTriangle, Shuffle } from "lucide-react"

const playerRoles = [
    {
        id: "connoisseur",
        name: "خبير القهوة",
        emoji: "🧐",
        description: "يعرف كل شيء على حبوب القهوة وطرق التحضير",
        color: "bg-amber-500",
    },
    {
        id: "barista",
        name: "الباريستا",
        emoji: "👨‍🍳",
        description: "أستاذ في فن اللاتيه وتحضير القهوة",
        color: "bg-green-500",
    },
    {
        id: "addict",
        name: "مدمن الكافيين",
        emoji: "😵‍💫",
        description: "ما يقدرش يشتغل بلا قهوة",
        color: "bg-red-500",
    },
    {
        id: "newbie",
        name: "مبتدئ القهوة",
        emoji: "🤔",
        description: "لسه يتعلم على عالم القهوة",
        color: "bg-blue-500",
    },
    {
        id: "snob",
        name: "متكبر القهوة",
        emoji: "😤",
        description: "يشرب برك أغلى وأفخم قهوة",
        color: "bg-purple-500",
    },
    {
        id: "casual",
        name: "شارب عادي",
        emoji: "😊",
        description: "يحب القهوة بس مش مهووس بيها",
        color: "bg-pink-500",
    },
    {
        id: "decaf",
        name: "محب الديكاف",
        emoji: "😴",
        description: "يحب الطعم بلا كافيين",
        color: "bg-gray-500",
    },
    {
        id: "sweet",
        name: "محب الحلويات",
        emoji: "🍭",
        description: "يحب مشروبات القهوة الحلوة والحلويات",
        color: "bg-orange-500",
    },
]

// === Truth Questions ===
const truthQuestions = [
    {
        id: 1,
        type: "truth",
        category: "قهوة",
        difficulty: "easy",
        text: "شنوة أحب مشروب قهوة عندك وعلاش؟",
        points: 10,
    },
    {
        id: 2,
        type: "truth",
        category: "قهوة",
        difficulty: "easy",
        text: "قداش كاسات قهوة تشرب في النهار؟",
        points: 10,
    },

    // Food & Drinks - Easy
    {
        id: 3,
        type: "truth",
        category: "ماكلة",
        difficulty: "easy",
        text: "شنوة أحب ماكلة تونسية عندك؟",
        points: 10,
    },
    {
        id: 4,
        type: "truth",
        category: "ماكلة",
        difficulty: "easy",
        text: "شنوة أكثر حاجة تكرهها في الماكلة؟",
        points: 10,
    },
    {
        id: 5,
        type: "truth",
        category: "ماكلة",
        difficulty: "easy",
        text: "عمرك جربت تطبخ وفشلت؟ شنوة صار؟",
        points: 10,
    },

    // Travel & Places - Easy
    {
        id: 6,
        type: "truth",
        category: "سفر",
        difficulty: "easy",
        text: "شنوة أحب بلاصة في تونس؟",
        points: 10,
    },
    {
        id: 7,
        type: "truth",
        category: "سفر",
        difficulty: "easy",
        text: "وين تحب تسافر أكثر شيء؟",
        points: 10,
    },
    {
        id: 8,
        type: "truth",
        category: "سفر",
        difficulty: "easy",
        text: "شنوة أسوأ رحلة عملتها؟",
        points: 10,
    },

    // Technology & Social Media - Easy
    {
        id: 9,
        type: "truth",
        category: "تكنولوجيا",
        difficulty: "easy",
        text: "شنوة أكثر تطبيق تستعمله في التليفون؟",
        points: 10,
    },
    {
        id: 10,
        type: "truth",
        category: "تكنولوجيا",
        difficulty: "easy",
        text: "قداش ساعة تقضي في السوشيال ميديا؟",
        points: 10,
    },

    // Sports & Hobbies - Easy
    {
        id: 11,
        type: "truth",
        category: "رياضة",
        difficulty: "easy",
        text: "شنوة الرياضة اللي تحبها؟",
        points: 10,
    },
    {
        id: 12,
        type: "truth",
        category: "رياضة",
        difficulty: "easy",
        text: "شنوة أحب فريق كرة قدم عندك؟",
        points: 10,
    },

    // Music & Entertainment - Easy
    {
        id: 13,
        type: "truth",
        category: "موسيقى",
        difficulty: "easy",
        text: "شنوة أحب مغني تونسي عندك؟",
        points: 10,
    },
    {
        id: 14,
        type: "truth",
        category: "موسيقى",
        difficulty: "easy",
        text: "شنوة آخر أغنية سمعتها؟",
        points: 10,
    },

    // Family & Friends - Easy
    {
        id: 15,
        type: "truth",
        category: "عائلة",
        difficulty: "easy",
        text: "شنوة أحب حاجة في عائلتك؟",
        points: 10,
    },
    {
        id: 16,
        type: "truth",
        category: "عائلة",
        difficulty: "easy",
        text: "منو أقرب صاحب عندك؟",
        points: 10,
    },

    // School/Work - Easy
    {
        id: 17,
        type: "truth",
        category: "خدمة",
        difficulty: "easy",
        text: "شنوة الخدمة اللي تحلم بيها؟",
        points: 10,
    },
    {
        id: 18,
        type: "truth",
        category: "خدمة",
        difficulty: "easy",
        text: "شنوة أصعب حاجة في الخدمة/الدراسة؟",
        points: 10,
    },

    // Money & Shopping - Easy
    {
        id: 19,
        type: "truth",
        category: "فلوس",
        difficulty: "easy",
        text: "شنوة أغلى حاجة شريتها؟",
        points: 10,
    },
    {
        id: 20,
        type: "truth",
        category: "فلوس",
        difficulty: "easy",
        text: "وين تحب تصرف فلوسك أكثر؟",
        points: 10,
    },

    // MEDIUM DIFFICULTY QUESTIONS

    // Personal Secrets - Medium
    {
        id: 21,
        type: "truth",
        category: "شخصي",
        difficulty: "medium",
        text: "شنوة أكبر خوف عندك؟",
        points: 20,
    },
    {
        id: 22,
        type: "truth",
        category: "شخصي",
        difficulty: "medium",
        text: "شنوة أكثر حاجة محرجة صارتلك؟",
        points: 20,
    },
    {
        id: 23,
        type: "truth",
        category: "شخصي",
        difficulty: "medium",
        text: "شنوة موهبة سرية عندك؟",
        points: 20,
    },

    // Relationships - Medium
    {
        id: 24,
        type: "truth",
        category: "علاقات",
        difficulty: "medium",
        text: "شنوة أكبر حاجة تنفرك في الناس؟",
        points: 20,
    },
    {
        id: 25,
        type: "truth",
        category: "علاقات",
        difficulty: "medium",
        text: "عمرك حبيت حد من اللي موجودين هنا؟",
        points: 20,
    },
    {
        id: 26,
        type: "truth",
        category: "علاقات",
        difficulty: "medium",
        text: "شنوة الموعد الأول المثالي متاعك؟",
        points: 20,
    },

    // Social Media & Technology - Medium
    {
        id: 27,
        type: "truth",
        category: "تكنولوجيا",
        difficulty: "medium",
        text: "شنوة أكثر حاجة محرجة نشرتها على الفيسبوك؟",
        points: 20,
    },
    {
        id: 28,
        type: "truth",
        category: "تكنولوجيا",
        difficulty: "medium",
        text: "عمرك تجسست على حد في السوشيال ميديا؟",
        points: 20,
    },

    // Food Adventures - Medium
    {
        id: 29,
        type: "truth",
        category: "ماكلة",
        difficulty: "medium",
        text: "شنوة أغرب حاجة كليتها في حياتك؟",
        points: 20,
    },
    {
        id: 30,
        type: "truth",
        category: "ماكلة",
        difficulty: "medium",
        text: "عمرك كذبت وقلت إنك تحب ماكلة وإنت تكرهها؟",
        points: 20,
    },

    // Travel Stories - Medium
    {
        id: 31,
        type: "truth",
        category: "سفر",
        difficulty: "medium",
        text: "شنوة أكثر موقف محرج صارلك في السفر؟",
        points: 20,
    },
    {
        id: 32,
        type: "truth",
        category: "سفر",
        difficulty: "medium",
        text: "وين أكثر بلاصة تخاف تروحلها؟",
        points: 20,
    },

    // Money Secrets - Medium
    {
        id: 33,
        type: "truth",
        category: "فلوس",
        difficulty: "medium",
        text: "شنوة أكثر حاجة ندمت إنك شريتها؟",
        points: 20,
    },
    {
        id: 34,
        type: "truth",
        category: "فلوس",
        difficulty: "medium",
        text: "عمرك سرقت حاجة؟ شنوة؟",
        points: 20,
    },

    // Family Secrets - Medium
    {
        id: 35,
        type: "truth",
        category: "عائلة",
        difficulty: "medium",
        text: "شنوة أكبر كذبة قلتها لوالديك؟",
        points: 20,
    },
    {
        id: 36,
        type: "truth",
        category: "عائلة",
        difficulty: "medium",
        text: "منو في عائلتك اللي يعصبك أكثر؟",
        points: 20,
    },

    // HARD DIFFICULTY QUESTIONS

    // Deep Personal - Hard
    {
        id: 37,
        type: "truth",
        category: "شخصي",
        difficulty: "hard",
        text: "شنوة أكبر كذبة قلتها في حياتك؟",
        points: 30,
    },
    {
        id: 38,
        type: "truth",
        category: "شخصي",
        difficulty: "hard",
        text: "شنوة حاجة ما قلتهاش لحد أبداً؟",
        points: 30,
    },
    {
        id: 39,
        type: "truth",
        category: "شخصي",
        difficulty: "hard",
        text: "شنوة أكثر حاجة تندم عليها؟",
        points: 30,
    },

    // Relationships - Hard
    {
        id: 40,
        type: "truth",
        category: "علاقات",
        difficulty: "hard",
        text: "منو أسوأ بوسة في حياتك وعلاش؟",
        points: 30,
    },
    {
        id: 41,
        type: "truth",
        category: "علاقات",
        difficulty: "hard",
        text: "عمرك خنت حد؟ احكيلنا الموقف.",
        points: 30,
    },
    {
        id: 42,
        type: "truth",
        category: "علاقات",
        difficulty: "hard",
        text: "شنوة أكثر حاجة مجنونة عملتها للحب؟",
        points: 30,
    },

    // Dark Secrets - Hard
    {
        id: 43,
        type: "truth",
        category: "أسرار",
        difficulty: "hard",
        text: "شنوة أكبر سر تخبيه على الناس؟",
        points: 30,
    },
    {
        id: 44,
        type: "truth",
        category: "أسرار",
        difficulty: "hard",
        text: "عمرك عملت حاجة غير قانونية؟",
        points: 30,
    },

    // Controversial Opinions - Hard
    {
        id: 45,
        type: "truth",
        category: "آراء",
        difficulty: "hard",
        text: "شنوة أكثر رأي مثير للجدل عندك؟",
        points: 30,
    },
    {
        id: 46,
        type: "truth",
        category: "آراء",
        difficulty: "hard",
        text: "شنوة حاجة يعملها الناس وإنت تشوفها غلط؟",
        points: 30,
    },

    // ADULT CONTENT (+18) - Hard
    {
        id: 47,
        type: "truth",
        category: "كبار",
        difficulty: "hard",
        text: "شنوة أكبر فانتازيا عندك ما حكيتهاش لحد؟",
        points: 40,
        isAdult: true,
    },
    {
        id: 48,
        type: "truth",
        category: "كبار",
        difficulty: "hard",
        text: "شنوة أكثر بلاصة مغامرة كنت فيها حميمي؟",
        points: 40,
        isAdult: true,
    },
    {
        id: 49,
        type: "truth",
        category: "كبار",
        difficulty: "hard",
        text: "شنوة أكبر حاجة تثيرك وممكن تفاجئ الناس؟",
        points: 40,
        isAdult: true,
    },
    {
        id: 50,
        type: "truth",
        category: "كبار",
        difficulty: "hard",
        text: "عمرك عشت ليلة واحدة؟ كيف كانت؟",
        points: 40,
        isAdult: true,
    },
]

// === Dare Actions ===
const dareActions = [
    {
        id: 51,
        type: "dare",
        category: "أداء",
        difficulty: "easy",
        text: "اعمل تقليد لمشهور تونسي",
        points: 15,
    },
    {
        id: 52,
        type: "dare",
        category: "أداء",
        difficulty: "easy",
        text: "ارقص على أغنية تونسية لمدة دقيقة",
        points: 15,
    },
    {
        id: 53,
        type: "dare",
        category: "أداء",
        difficulty: "easy",
        text: "غني أغنية بالدارجة التونسية",
        points: 15,
    },

    // Food Challenges - Easy
    {
        id: 54,
        type: "dare",
        category: "ماكلة",
        difficulty: "easy",
        text: "اعمل وصفة كسكسي بالإيماءات بلا كلام",
        points: 15,
    },
    {
        id: 55,
        type: "dare",
        category: "ماكلة",
        difficulty: "easy",
        text: "احكي قصة حب بين حرقوس وبريك",
        points: 15,
    },

    // Social Media - Easy
    {
        id: 56,
        type: "dare",
        category: "تكنولوجيا",
        difficulty: "easy",
        text: "انشر ستوري على الفيسبوك تقول فيه شيء مضحك",
        points: 15,
    },
    {
        id: 57,
        type: "dare",
        category: "تكنولوجيا",
        difficulty: "easy",
        text: "ابعث رسالة لآخر شخص كلمته تقوله 'برشا سلام'",
        points: 15,
    },

    // Physical Challenges - Easy
    {
        id: 58,
        type: "dare",
        category: "رياضة",
        difficulty: "easy",
        text: "اعمل 10 تمارين ضغط",
        points: 15,
    },
    {
        id: 59,
        type: "dare",
        category: "رياضة",
        difficulty: "easy",
        text: "امشي على إيديك لمدة 30 ثانية",
        points: 15,
    },

    // Creative Challenges - Easy
    {
        id: 60,
        type: "dare",
        category: "إبداع",
        difficulty: "easy",
        text: "ارسم صورة بعينيك مغمضة",
        points: 15,
    },
    {
        id: 61,
        type: "dare",
        category: "إبداع",
        difficulty: "easy",
        text: "اخترع أغنية على تونس في دقيقة",
        points: 15,
    },

    // Social Interaction - Easy
    {
        id: 62,
        type: "dare",
        category: "اجتماعي",
        difficulty: "easy",
        text: "قول مجاملة حلوة لكل واحد في الغرفة",
        points: 15,
    },
    {
        id: 63,
        type: "dare",
        category: "اجتماعي",
        difficulty: "easy",
        text: "احكي نكتة تونسية تخلي الكل يضحك",
        points: 15,
    },

    // MEDIUM DIFFICULTY DARES

    // Performance - Medium
    {
        id: 64,
        type: "dare",
        category: "أداء",
        difficulty: "medium",
        text: "اعمل مسرحية من دقيقة على الحياة في تونس",
        points: 25,
    },
    {
        id: 65,
        type: "dare",
        category: "أداء",
        difficulty: "medium",
        text: "قلد كل واحد في الغرفة لمدة 30 ثانية",
        points: 25,
    },

    // Social Media - Medium
    {
        id: 66,
        type: "dare",
        category: "تكنولوجيا",
        difficulty: "medium",
        text: "اتصل برقم عشوائي وغنيله أغنية تونسية",
        points: 25,
    },
    {
        id: 67,
        type: "dare",
        category: "تكنولوجيا",
        difficulty: "medium",
        text: "اعمل لايف على الفيسبوك وراجع مطعم وهمي",
        points: 25,
    },

    // Physical - Medium
    {
        id: 68,
        type: "dare",
        category: "رياضة",
        difficulty: "medium",
        text: "اعمل رقصة الدبكة لمدة دقيقتين",
        points: 25,
    },
    {
        id: 69,
        type: "dare",
        category: "رياضة",
        difficulty: "medium",
        text: "اجري حول البيت وإنت تغني النشيد الوطني",
        points: 25,
    },

    // Creative - Medium
    {
        id: 70,
        type: "dare",
        category: "إبداع",
        difficulty: "medium",
        text: "اكتب قصيدة حب لأكلة تونسية",
        points: 25,
    },
    {
        id: 71,
        type: "dare",
        category: "إبداع",
        difficulty: "medium",
        text: "اعمل راب على مشاكل تونس",
        points: 25,
    },

    // Social - Medium
    {
        id: 72,
        type: "dare",
        category: "اجتماعي",
        difficulty: "medium",
        text: "ابعث رسالة لحبيبك تدعوه لقهوة (أو ورينا الرسالة)",
        points: 25,
    },
    {
        id: 73,
        type: "dare",
        category: "اجتماعي",
        difficulty: "medium",
        text: "اطلب من جارك شيء غريب",
        points: 25,
    },

    // HARD DIFFICULTY DARES

    // Extreme Performance - Hard
    {
        id: 74,
        type: "dare",
        category: "أداء",
        difficulty: "hard",
        text: "اعمل ستاند أب كوميدي لمدة 3 دقائق",
        points: 35,
    },
    {
        id: 75,
        type: "dare",
        category: "أداء",
        difficulty: "hard",
        text: "مثل أكثر موقف محرج في حياتك بالتفصيل",
        points: 35,
    },

    // Social Media - Hard
    {
        id: 76,
        type: "dare",
        category: "تكنولوجيا",
        difficulty: "hard",
        text: "انشر فيديو على الفيسبوك وإنت تغني أغنية حب",
        points: 35,
    },
    {
        id: 77,
        type: "dare",
        category: "تكنولوجيا",
        difficulty: "hard",
        text: "اعمل لايف وإنت تطبخ حاجة غريبة",
        points: 35,
    },

    // Extreme Physical - Hard
    {
        id: 78,
        type: "dare",
        category: "رياضة",
        difficulty: "hard",
        text: "اعمل تحدي رياضي صعب قدام الكل",
        points: 35,
    },
    {
        id: 79,
        type: "dare",
        category: "رياضة",
        difficulty: "hard",
        text: "ارقص رقصة مثيرة على أغنية شعبية",
        points: 35,
    },

    // Embarrassing - Hard
    {
        id: 80,
        type: "dare",
        category: "محرج",
        difficulty: "hard",
        text: "اتصل بأهلك وقلهم إنك تحبهم بطريقة مضحكة",
        points: 35,
    },
    {
        id: 81,
        type: "dare",
        category: "محرج",
        difficulty: "hard",
        text: "امشي في الشارع وإنت تغني بصوت عالي",
        points: 35,
    },

    // ADULT CONTENT (+18) - Hard
    {
        id: 82,
        type: "dare",
        category: "كبار",
        difficulty: "hard",
        text: "اعمل مساج حسي لحد في الغرفة لمدة دقيقتين",
        points: 45,
        isAdult: true,
    },
    {
        id: 83,
        type: "dare",
        category: "كبار",
        difficulty: "hard",
        text: "ورّي أحسن تقنية إغراء عندك على لاعب آخر",
        points: 45,
        isAdult: true,
    },
    {
        id: 84,
        type: "dare",
        category: "كبار",
        difficulty: "hard",
        text: "احكي أكثر سر حميمي عندك للمجموعة",
        points: 45,
        isAdult: true,
    },
    {
        id: 85,
        type: "dare",
        category: "كبار",
        difficulty: "hard",
        text: "بوس اللي على يسارك على الخد (أو الشفايف إذا وافق)",
        points: 45,
        isAdult: true,
    },
]


export default function CoffeeTruthOrDare({ isMobile, setCurrentGame, coffeeBeans, setCoffeeBeans }) {
    const [gameState, setGameState] = useState("setup") // "setup" | "spinning" | "playing" | "finished"
    const [players, setPlayers] = useState([])
    const [newPlayerName, setNewPlayerName] = useState("")
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [questionsAsked, setQuestionsAsked] = useState(0)
    const [maxQuestions, setMaxQuestions] = useState(20)
    const [difficulty, setDifficulty] = useState("medium") // "easy" | "medium" | "hard"
    const [usedQuestions, setUsedQuestions] = useState([])
    const [adultContentEnabled, setAdultContentEnabled] = useState(false)
    const [showAgeVerification, setShowAgeVerification] = useState(false)
    const [isSpinning, setIsSpinning] = useState(false)
    const [spinningPlayer, setSpinningPlayer] = useState(null)
    const [showPointsAnimation, setShowPointsAnimation] = useState(null) // { show, points, player }

    const addPlayer = () => {
        if (newPlayerName.trim() && players.length < 8) {
            const availableRoles = playerRoles.filter(
                (role) => !players.some((p) => p.role.id === role.id)
            )
            const randomRole =
                availableRoles.length > 0
                    ? availableRoles[Math.floor(Math.random() * availableRoles.length)]
                    : playerRoles[Math.floor(Math.random() * playerRoles.length)]

            const newPlayer = {
                id: Date.now().toString(),
                name: newPlayerName.trim(),
                score: 0,
                isSelected: false,
                role: randomRole,
            }

            setPlayers([...players, newPlayer])
            setNewPlayerName("")
        }
    }

    const removePlayer = (playerId) => {
        setPlayers(players.filter((p) => p.id !== playerId))
    }

    const startGame = () => {
        if (players.length < 2) {
            alert("You need at least 2 players to start!")
            return
        }

        setPlayers(players.map((p) => ({ ...p, isSelected: false })))
        setGameState("spinning")
        setQuestionsAsked(0)
        setUsedQuestions([])
        spinWheel()
    }

    const spinWheel = () => {
        setIsSpinning(true)
        setSelectedPlayer(null)
        setCurrentQuestion(null)

        let spinCount = 0
        const maxSpins = 20 + Math.floor(Math.random() * 20) // 20-40 spins

        const spinInterval = setInterval(() => {
            const randomPlayer = players[Math.floor(Math.random() * players.length)]
            setSpinningPlayer(randomPlayer)
            spinCount++

            if (spinCount >= maxSpins) {
                clearInterval(spinInterval)
                const finalPlayer = players[Math.floor(Math.random() * players.length)]
                setSelectedPlayer(finalPlayer)
                setSpinningPlayer(null)
                setIsSpinning(false)

                setPlayers(players.map((p) => ({ ...p, isSelected: p.id === finalPlayer.id })))

                setTimeout(() => {
                    setGameState("playing")
                }, 1000)
            }
        }, 100)
    }

    const getRandomQuestion = (type) => {
        const questions = type === "truth" ? truthQuestions : dareActions
        let availableQuestions = questions.filter(
            (q) => q.difficulty === difficulty && !usedQuestions.includes(q.id)
        )

        if (!adultContentEnabled) {
            availableQuestions = availableQuestions.filter((q) => !q.isAdult)
        }

        if (availableQuestions.length === 0) {
            setUsedQuestions([])
            availableQuestions = questions.filter(
                (q) => q.difficulty === difficulty && (!q.isAdult || adultContentEnabled)
            )
        }

        const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
        setUsedQuestions([...usedQuestions, randomQuestion.id])
        return randomQuestion
    }

    const chooseTruthOrDare = (choice) => {
        const question = getRandomQuestion(choice)
        setCurrentQuestion(question)
    }

    const completeChallenge = (completed) => {
        if (currentQuestion && completed && selectedPlayer) {
            setShowPointsAnimation({
                show: true,
                points: currentQuestion.points,
                player: selectedPlayer.name,
            })

            const updatedPlayers = players.map((player) =>
                player.id === selectedPlayer.id
                    ? { ...player, score: player.score + currentQuestion.points }
                    : player
            )
            setPlayers(updatedPlayers)
            setCoffeeBeans((prev) => prev + currentQuestion.points)

            setTimeout(() => {
                setShowPointsAnimation(null)
            }, 2000)
        }

        setQuestionsAsked((prev) => prev + 1)

        if (questionsAsked + 1 >= maxQuestions) {
            setGameState("finished")
        } else {
            setGameState("spinning")
            setTimeout(() => {
                spinWheel()
            }, 1000)
        }
    }

    const resetGame = () => {
        setGameState("setup")
        setPlayers([])
        setSelectedPlayer(null)
        setCurrentQuestion(null)
        setQuestionsAsked(0)
        setUsedQuestions([])
        setIsSpinning(false)
        setSpinningPlayer(null)
    }

    const getWinner = () => {
        return players.reduce(
            (winner, player) => (player.score > winner.score ? player : winner),
            players[0]
        )
    }

    const enableAdultContent = () => {
        setAdultContentEnabled(true)
        setShowAgeVerification(false)
    }

    if (showAgeVerification) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <Card className="bg-white rounded-3xl shadow-2xl max-w-md mx-4">
                    <CardContent className="p-8 text-center">
                        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-[#2f2d2c] mb-4">Age Verification Required</h2>
                        <p className="text-[#9b9b9b] mb-6">
                            Adult content contains mature themes and is only suitable for players 18 years and older.
                        </p>
                        <p className="text-sm text-red-600 mb-6">
                            By enabling adult content, you confirm that all players are 18+ and consent to mature content.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={enableAdultContent} className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl">
                                I'm 18+ - Enable
                            </button>
                            <button
                                onClick={() => setShowAgeVerification(false)}
                                variant="outline"
                                className="flex-1 rounded-xl border-[#ededed]"
                            >
                                Cancel
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // ---------------- SETUP PHASE ----------------
    if (gameState === "setup") {
        return (
            <div
                className={`bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 ${isMobile ? "rounded-t-[32px] mt-12 px-6 pt-8" : "px-8 pt-12"
                    } min-h-screen relative`}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentGame("menu")}
                            className="rounded-xl border-[#ededed] bg-white/80 backdrop-blur-sm"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#9b9b9b]" />
                        </button>
                        <div>
                            <h1 className={`font-bold text-[#2f2d2c] ${isMobile ? "text-2xl" : "text-4xl"} mb-2`}>
                                لعبة صراحة أو جرأة القهوة
                            </h1>
                            <p className="text-[#9b9b9b] text-base">لف العجلة واكتشف أسرار القهوة!</p>
                        </div>
                    </div>

                    {/* Coffee Beans Balance */}
                    <Card className="bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-200 shadow-lg">
                        <CardContent className="p-4 flex items-center gap-3">
                            <Coffee className="w-6 h-6 text-amber-600" />
                            <div>
                                <p className="text-sm text-amber-700 font-medium">حبوب القهوة</p>
                                <p className="text-2xl font-bold text-amber-800">{coffeeBeans.toLocaleString()}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Game Setup */}
                <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-8 mb-8`}>
                    {/* Add Players */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold text-[#2f2d2c] mb-4 flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                أضف لاعبين ({players.length}/8)
                            </h3>

                            <div className="flex gap-2 mb-4">
                                <input
                                    placeholder="Enter player name"
                                    value={newPlayerName}
                                    onChange={(e) => setNewPlayerName(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && addPlayer()}
                                    className="flex-1"
                                />
                                <button
                                    onClick={addPlayer}
                                    disabled={!newPlayerName.trim() || players.length >= 8}
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                >
                                    Add
                                </button>
                            </div>

                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {players.map((player, index) => (
                                    <div key={player.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline">{index + 1}</Badge>
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{player.role.emoji}</span>
                                                <div>
                                                    <span className="font-medium">{player.name}</span>
                                                    <p className="text-xs text-[#9b9b9b]">{player.role.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removePlayer(player.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Game Settings */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold text-[#2f2d2c] mb-4">إعدادات اللعبة</h3>

                            {/* Difficulty */}
                            <div className="mb-6">
                                <p className="text-sm font-medium text-[#9b9b9b] mb-3">مستوى الصعوبة</p>
                                <div className="flex gap-2">
                                    {["easy", "medium", "hard"].map((level) => (
                                        <button
                                            key={level}
                                            variant={difficulty === level ? "default" : "outline"}
                                            onClick={() => setDifficulty(level)}
                                            className={`px-4 py-2 rounded-xl ${difficulty === level
                                                ? "bg-red-500 hover:bg-red-600 text-white"
                                                : "border-[#ededed] text-[#9b9b9b]"
                                                }`}
                                        >
                                            {level.charAt(0).toUpperCase() + level.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Adult Content Toggle */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-sm font-medium text-[#9b9b9b]">محتوى للكبار (18+)</p>
                                    <Badge className={`${adultContentEnabled ? "bg-red-500" : "bg-gray-400"} text-white`}>
                                        {adultContentEnabled ? "Enabled" : "Disabled"}
                                    </Badge>
                                </div>
                                <button
                                    onClick={() => setShowAgeVerification(true)}
                                    disabled={adultContentEnabled}
                                    variant="outline"
                                    className="w-full border-red-300 text-red-600 hover:bg-red-50"
                                >
                                    <AlertTriangle className="w-4 h-4 mr-2" />
                                    {adultContentEnabled ? "Adult Content Enabled" : "Enable Adult Content"}
                                </button>
                            </div>

                            {/* Total Questions */}
                            <div className="mb-6">
                                <p className="text-sm font-medium text-[#9b9b9b] mb-3">مجموع الأسئلة</p>
                                <div className="flex gap-2">
                                    {[10, 20, 30, 50].map((questions) => (
                                        <button
                                            key={questions}
                                            variant={maxQuestions === questions ? "default" : "outline"}
                                            onClick={() => setMaxQuestions(questions)}
                                            className={`px-4 py-2 rounded-xl ${maxQuestions === questions
                                                ? "bg-red-500 hover:bg-red-600 text-white"
                                                : "border-[#ededed] text-[#9b9b9b]"
                                                }`}
                                        >
                                            {questions}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={startGame}
                                disabled={players.length < 2}
                                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 rounded-xl shadow-lg"
                            >
                                <Shuffle className="w-4 h-4 mr-2" />
                                ابدأ اللعب!
                            </button>
                        </CardContent>
                    </Card>
                </div>

                {/* Player Roles Preview */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-[#2f2d2c] mb-4">Player Roles</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {playerRoles.slice(0, 8).map((role) => (
                                <div key={role.id} className="text-center p-3 bg-gray-50 rounded-lg">
                                    <div className="text-3xl mb-2">{role.emoji}</div>
                                    <h4 className="font-semibold text-sm text-[#2f2d2c] mb-1">{role.name}</h4>
                                    <p className="text-xs text-[#9b9b9b]">{role.description}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-[#9b9b9b] mt-4 text-center">
                            Each player gets a random role that adds personality to the game!
                        </p>
                    </CardContent>
                </Card>

                {/* Game Rules */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-[#2f2d2c] mb-4">How to Play</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-[#9b9b9b]">
                            <div>
                                <h4 className="font-semibold text-[#2f2d2c] mb-2">1. Spin the Wheel</h4>
                                <p>The wheel randomly selects a player for each question</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-[#2f2d2c] mb-2">2. Choose Wisely</h4>
                                <p>Selected player picks Truth or Dare based on their comfort level</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-[#2f2d2c] mb-2">3. Complete Challenges</h4>
                                <p>Answer truthfully or complete dares to earn points</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-[#2f2d2c] mb-2">4. Win Big</h4>
                                <p>Earn coffee beans and points. Highest score wins!</p>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-sm text-yellow-800">
                                <strong>New:</strong> Random player selection each turn! No more waiting for your turn - anyone could be
                                next!
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Spinning Phase
    if (gameState === "spinning") {
        return (
            <div
                className={`bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 ${isMobile ? "rounded-t-[32px] mt-12 px-6 pt-8" : "px-8 pt-12"
                    } min-h-screen relative`}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            variant="outline"
                            size="icon"
                            onClick={resetGame}
                            className="rounded-xl border-[#ededed] bg-white/80 backdrop-blur-sm"
                        >
                            <RotateCcw className="w-5 h-5 text-[#9b9b9b]" />
                        </button>
                        <div>
                            <h1 className={`font-bold text-[#2f2d2c] ${isMobile ? "text-xl" : "text-3xl"} mb-1`}>
                                Question {questionsAsked + 1} of {maxQuestions}
                            </h1>
                            <p className="text-[#9b9b9b] text-base">Spinning the wheel...</p>
                        </div>
                    </div>

                    {/* Coffee Beans Balance */}
                    <Card className="bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-200">
                        <CardContent className="p-3 flex items-center gap-2">
                            <Coffee className="w-5 h-5 text-amber-600" />
                            <span className="font-bold text-amber-800">{coffeeBeans}</span>
                        </CardContent>
                    </Card>
                </div>

                {/* Spinning Wheel */}
                <div className="mb-8 text-center">
                    <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200 shadow-2xl">
                        <CardContent className="p-12">
                            <div className="text-8xl mb-6">🎡</div>
                            <h2 className="text-4xl font-bold text-purple-700 mb-4">Spinning the Wheel!</h2>

                            {/* Current spinning player */}
                            {isSpinning && spinningPlayer && (
                                <div className="mb-6">
                                    <div
                                        className={`inline-block p-6 rounded-3xl ${spinningPlayer.role.color} bg-opacity-20 border-4 border-purple-300 animate-pulse`}
                                    >
                                        <div className="text-6xl mb-3">{spinningPlayer.role.emoji}</div>
                                        <h3 className="text-2xl font-bold text-[#2f2d2c]">{spinningPlayer.name}</h3>
                                        <Badge className={`${spinningPlayer.role.color} text-white mt-2`}>
                                            {spinningPlayer.role.name}
                                        </Badge>
                                    </div>
                                </div>
                            )}

                            {/* Final selected player */}
                            {selectedPlayer && !isSpinning && (
                                <div className="mb-6">
                                    <div className="text-6xl mb-4">🎯</div>
                                    <div
                                        className={`inline-block p-8 rounded-3xl ${selectedPlayer.role.color} bg-opacity-30 border-4 border-green-400 animate-bounce`}
                                    >
                                        <div className="text-8xl mb-4">{selectedPlayer.role.emoji}</div>
                                        <h3 className="text-3xl font-bold text-[#2f2d2c] mb-2">{selectedPlayer.name}</h3>
                                        <Badge className={`${selectedPlayer.role.color} text-white text-lg px-4 py-2`}>
                                            {selectedPlayer.role.name}
                                        </Badge>
                                        <p className="text-[#9b9b9b] mt-3">{selectedPlayer.role.description}</p>
                                    </div>
                                    <p className="text-2xl font-bold text-green-600 mt-4">You're up!</p>
                                </div>
                            )}

                            {/* Spinner animation */}
                            {isSpinning && (
                                <div className="flex items-center justify-center gap-3">
                                    <Shuffle className="w-8 h-8 text-purple-600 animate-spin" />
                                    <p className="text-xl text-purple-600 font-semibold">Finding the next player...</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* All Players Display */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-[#2f2d2c] mb-4 text-center">All Players</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {players.map((player) => (
                                <div
                                    key={player.id}
                                    className={`p-4 rounded-xl text-center transition-all duration-300 ${player.isSelected
                                        ? `${player.role.color} bg-opacity-30 border-4 border-green-400 scale-110`
                                        : spinningPlayer?.id === player.id
                                            ? "bg-purple-100 border-2 border-purple-300 scale-105"
                                            : "bg-gray-50 hover:bg-gray-100"
                                        }`}
                                >
                                    <div className="text-4xl mb-2">{player.role.emoji}</div>
                                    <span className="font-semibold text-[#2f2d2c] block">{player.name}</span>
                                    <p className="text-xs text-[#9b9b9b] mb-2">{player.role.name}</p>
                                    <p className="text-lg font-bold text-purple-600">{player.score}</p>
                                    <p className="text-xs text-[#9b9b9b]">points</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Playing Phase
    if (gameState === "playing" && selectedPlayer) {
        return (
            <div
                className={`bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 ${isMobile ? "rounded-t-[32px] mt-12 px-6 pt-8" : "px-8 pt-12"
                    } min-h-screen relative`}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            variant="outline"
                            size="icon"
                            onClick={resetGame}
                            className="rounded-xl border-[#ededed] bg-white/80 backdrop-blur-sm"
                        >
                            <RotateCcw className="w-5 h-5 text-[#9b9b9b]" />
                        </button>
                        <div>
                            <h1 className={`font-bold text-[#2f2d2c] ${isMobile ? "text-xl" : "text-3xl"} mb-1`}>
                                Question {questionsAsked + 1} of {maxQuestions}
                            </h1>
                            <p className="text-[#9b9b9b] text-base">{selectedPlayer.name}'s turn</p>
                        </div>
                    </div>

                    {/* Coffee Beans Balance */}
                    <Card className="bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-200">
                        <CardContent className="p-3 flex items-center gap-2">
                            <Coffee className="w-5 h-5 text-amber-600" />
                            <span className="font-bold text-amber-800">{coffeeBeans}</span>
                        </CardContent>
                    </Card>
                </div>

                {/* Selected Player */}
                <div className="mb-8 text-center">
                    <Card className={`border-2 shadow-xl ${selectedPlayer.role.color} bg-opacity-20`}>
                        <CardContent className="p-6">
                            <div className="text-6xl mb-3">{selectedPlayer.role.emoji}</div>
                            <h2 className="text-3xl font-bold text-[#2f2d2c] mb-2">{selectedPlayer.name}</h2>
                            <Badge className={`${selectedPlayer.role.color} text-white mb-3`}>{selectedPlayer.role.name}</Badge>
                            <p className="text-[#9b9b9b] mb-4">{selectedPlayer.role.description}</p>
                            <Badge className="bg-red-500 text-white">
                                Current Score: {selectedPlayer.score} points
                            </Badge>
                        </CardContent>
                    </Card>
                </div>

                {/* Truth or Dare Choice */}
                {!currentQuestion && (
                    <div className="mb-8">
                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                            <CardContent className="p-8 text-center">
                                <h3 className="text-2xl font-bold text-[#2f2d2c] mb-6">Choose Your Challenge</h3>
                                <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-6`}>
                                    <button
                                        onClick={() => chooseTruthOrDare("truth")}
                                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-8 rounded-xl shadow-lg text-xl"
                                    >
                                        <Heart className="w-8 h-8 mr-3" />
                                        <div>
                                            <div className="font-bold">TRUTH</div>
                                            <div className="text-sm opacity-90">Answer honestly</div>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => chooseTruthOrDare("dare")}
                                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-8 rounded-xl shadow-lg text-xl"
                                    >
                                        <Zap className="w-8 h-8 mr-3" />
                                        <div>
                                            <div className="font-bold">DARE</div>
                                            <div className="text-sm opacity-90">Take the challenge</div>
                                        </div>
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Current Question/Dare */}
                {currentQuestion && (
                    <div className="mb-8">
                        <Card
                            className={`border-0 shadow-xl ${currentQuestion.type === "truth"
                                ? "bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200"
                                : "bg-gradient-to-r from-orange-100 to-red-100 border-orange-200"
                                } ${currentQuestion.isAdult ? "border-4 border-red-400" : ""}`}
                        >
                            <CardContent className="p-8 text-center">
                                <div className="text-6xl mb-4">
                                    {currentQuestion.isAdult ? "🔞" : currentQuestion.type === "truth" ? "💭" : "⚡"}
                                </div>
                                <div className="flex justify-center gap-2 mb-4">
                                    <Badge
                                        className={`${currentQuestion.type === "truth" ? "bg-blue-500" : "bg-orange-500"
                                            } text-white`}
                                    >
                                        {currentQuestion.category}
                                    </Badge>
                                    <Badge
                                        className={`${currentQuestion.type === "truth" ? "bg-blue-500" : "bg-orange-500"
                                            } text-white`}
                                    >
                                        {currentQuestion.difficulty}
                                    </Badge>
                                    <Badge
                                        className={`${currentQuestion.type === "truth" ? "bg-blue-500" : "bg-orange-500"
                                            } text-white`}
                                    >
                                        {currentQuestion.points} points
                                    </Badge>
                                    {currentQuestion.isAdult && (
                                        <Badge className="bg-red-600 text-white">
                                            <AlertTriangle className="w-3 h-3 mr-1" />
                                            18+
                                        </Badge>
                                    )}
                                </div>
                                <h3
                                    className={`text-2xl font-bold mb-6 ${currentQuestion.type === "truth" ? "text-blue-700" : "text-orange-700"
                                        }`}
                                >
                                    {currentQuestion.text}
                                </h3>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() => completeChallenge(true)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl"
                                    >
                                        ✅ Completed
                                    </button>
                                    <button
                                        onClick={() => completeChallenge(false)}
                                        variant="outline"
                                        className="border-red-300 text-red-600 hover:bg-red-50 px-8 py-3 rounded-xl"
                                    >
                                        ❌ Skip
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Points Earned Notification */}
                {currentQuestion && (
                    <div className="mb-4 text-center">
                        <Badge className="bg-green-500 text-white text-lg px-4 py-2">
                            🎯 Complete this challenge to earn {currentQuestion.points} points!
                        </Badge>
                    </div>
                )}

                {showPointsAnimation?.show && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                        <div className="bg-green-500 text-white px-8 py-4 rounded-3xl shadow-2xl animate-bounce">
                            <div className="text-center">
                                <div className="text-4xl mb-2">🎉</div>
                                <p className="text-xl font-bold">{showPointsAnimation.player}</p>
                                <p className="text-lg">+{showPointsAnimation.points} نقطة!</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Player Scores */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-[#2f2d2c] mb-4">Scoreboard</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {players
                                .sort((a, b) => b.score - a.score)
                                .map((player, index) => (
                                    <div
                                        key={player.id}
                                        className={`p-4 rounded-xl text-center transition-all duration-300 ${player.isSelected
                                            ? "bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 scale-105"
                                            : "bg-gray-50 hover:bg-gray-100"
                                            }`}
                                    >
                                        <div className="flex items-center justify-center gap-1 mb-2">
                                            <span className="text-2xl">{player.role.emoji}</span>
                                            {index === 0 && player.score > 0 && <Crown className="w-4 h-4 text-yellow-500" />}
                                        </div>
                                        <span className="font-semibold text-[#2f2d2c] block">{player.name}</span>
                                        <p className="text-xs text-[#9b9b9b] mb-2">{player.role.name}</p>
                                        <p className="text-2xl font-bold text-red-600">{player.score}</p>
                                        <p className="text-xs text-[#9b9b9b]">نقاط</p>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
    if (gameState === "finished") {
        const winner = getWinner();
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

        return (
            <div
                className={`bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 ${isMobile ? "rounded-t-[32px] mt-12 px-6 pt-8" : "px-8 pt-12"
                    } min-h-screen relative`}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            variant="outline"
                            size="icon"
                            onClick={resetGame}
                            className="rounded-xl border-[#ededed] bg-white/80 backdrop-blur-sm"
                        >
                            <RotateCcw className="w-5 h-5 text-[#9b9b9b]" />
                        </button>
                        <div>
                            <h1
                                className={`font-bold text-[#2f2d2c] ${isMobile ? "text-2xl" : "text-4xl"
                                    } mb-2`}
                            >
                                Game Over!
                            </h1>
                            <p className="text-[#9b9b9b] text-base">
                                Thanks for playing Coffee Truth or Dare!
                            </p>
                        </div>
                    </div>

                    {/* Coffee Beans Balance */}
                    <Card className="bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-200 shadow-lg">
                        <CardContent className="p-4 flex items-center gap-3">
                            <Coffee className="w-6 h-6 text-amber-600" />
                            <div>
                                <p className="text-sm text-amber-700 font-medium">Coffee Beans</p>
                                <p className="text-2xl font-bold text-amber-800">
                                    {coffeeBeans.toLocaleString()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Winner Announcement */}
                <div className="mb-8 text-center">
                    <Card className="bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-300 shadow-2xl">
                        <CardContent className="p-8">
                            <div className="text-8xl mb-4">{winner.role.emoji}</div>
                            <h2 className="text-4xl font-bold text-yellow-800 mb-2">
                                {winner.name} Wins!
                            </h2>
                            <Badge className={`${winner.role.color} text-white mb-4`}>
                                {winner.role.name}
                            </Badge>
                            <p className="text-xl text-yellow-700 mb-4">
                                Final Score: {winner.score} points
                            </p>
                            <Badge className="bg-yellow-500 text-white text-lg px-4 py-2">
                                Coffee Truth or Dare Champion!
                            </Badge>
                        </CardContent>
                    </Card>
                </div>

                {/* Final Scoreboard */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-[#2f2d2c] mb-4 text-center">
                            Final Scoreboard
                        </h3>
                        <div className="space-y-3">
                            {sortedPlayers.map((player, index) => (
                                <div
                                    key={player.id}
                                    className={`flex items-center justify-between p-4 rounded-xl ${index === 0
                                            ? "bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-300"
                                            : index === 1
                                                ? "bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300"
                                                : index === 2
                                                    ? "bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300"
                                                    : "bg-gray-50"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index === 0
                                                    ? "bg-yellow-500 text-white"
                                                    : index === 1
                                                        ? "bg-gray-500 text-white"
                                                        : index === 2
                                                            ? "bg-orange-500 text-white"
                                                            : "bg-gray-300 text-gray-600"
                                                }`}
                                        >
                                            {index + 1}
                                        </div>
                                        <span className="text-3xl">{player.role.emoji}</span>
                                        <div>
                                            <span className="font-semibold text-[#2f2d2c] block">
                                                {player.name}
                                            </span>
                                            <span className="text-sm text-[#9b9b9b]">
                                                {player.role.name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-[#2f2d2c]">
                                            {player.score}
                                        </p>
                                        <p className="text-sm text-[#9b9b9b]">points</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Play Again */}
                <div className="text-center pb-32">
                    <button
                        onClick={resetGame}
                        className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl shadow-lg text-xl"
                    >
                        <Shuffle className="w-6 h-6 mr-3" />
                        Spin Again!
                    </button>
                </div>
            </div>
        );
    }

    return null;

}