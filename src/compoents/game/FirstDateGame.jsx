import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "../ui/card"
import { ArrowLeft, Heart, Sparkles, Clock, Zap, MessageCircle, Star, Camera, Download, X, Volume2, VolumeX } from "lucide-react"

const dateScenarios = [
    {
        id: 1,
        title: "☕ في المقهى الرومانسي",
        description: "أنتما في مقهى هادئ مع إضاءة خافتة وموسيقى رومانسية",
        questions: [
            "ما هو أول شيء لاحظته في شريكك عندما دخل المقهى؟",
            "لو كان بإمكانك السفر لأي مكان في العالم معاً، أين ستذهبان؟",
            "ما هي أكثر ذكرى طفولة تحبها وتريد مشاركتها؟",
            "لو كنت ستصف نفسك بثلاث كلمات فقط، ما هي؟",
            "ما هو حلمك الأكبر في الحياة؟",
            "ما هي أكثر لحظة محرجة مررت بها في موعد غرامي؟",
            "لو كنت ستكتب كتاباً، ماذا سيكون موضوعه؟",
            "ما هي الأغنية التي تصف مشاعرك الآن؟",
            "ما هو أفضل نصيحة تلقيتها في حياتك؟",
            "لو كان لديك قوة خارقة، ماذا ستختار ولماذا؟",
        ],
        dares: [
            "امسك يد شريكك لمدة 30 ثانية واحكي له قصة من طفولتك",
            "التقطا صورة سيلفي رومانسية معاً",
            "اكتب رسالة حب قصيرة على منديل وأعطها لشريكك",
            "قل لشريكك 3 أشياء تعجبك فيه بصوت عالٍ",
            "ارقص رقصة بطيئة مع شريكك بجانب الطاولة",
            "اطلب مشروباً لشريكك بدون أن يطلبه هو",
            "اكتب اسم شريكك على كف يدك واريه إياها",
        ],
    },
    {
        id: 2,
        title: "🌅 نزهة على الشاطئ",
        description: "تمشيان على الرمال الذهبية مع صوت الأمواج",
        questions: [
            "ما هو أجمل غروب شمس رأيته في حياتك؟",
            "لو كنت ستعيش على جزيرة مهجورة، ما هي 3 أشياء ستأخذها معك؟",
            "ما هي أكثر مغامرة جريئة قمت بها؟",
            "كيف تتخيل حياتك بعد 10 سنوات؟",
            "ما هو أكثر شيء يجعلك تشعر بالسعادة؟",
            "ما هي أكثر ذكرى جميلة لك على الشاطئ؟",
            "لو كنت تستطيع العيش في أي عصر، أي عصر تختار؟",
            "ما هو الشيء الذي تخاف منه ولكنك تريد التغلب عليه؟",
            "ما هي أكثر لحظة رومانسية في حياتك؟",
            "لو كان لديك آلة زمن، هل ستذهب للماضي أم المستقبل؟",
        ],
        dares: [
            "اجمعا أصداف البحر معاً واصنعا قلب على الرمل",
            "اركضا في الماء معاً واتركا الأمواج تبلل أقدامكما",
            "اكتبا أسماءكما على الرمل واتركا الأمواج تمحوها",
            "التقطا صورة سيلفي مع غروب الشمس في الخلفية",
            "اجلسا على الرمل واحتضنا بعضكما لمدة دقيقة كاملة",
            "ارسما قلباً كبيراً على الرمل والتقطا صورة بداخله",
            "اجمعا أجمل صدفة وقدماها لبعضكما كهدية",
        ],
    },
    {
        id: 3,
        title: "🍽️ عشاء رومانسي",
        description: "في مطعم أنيق مع شموع وأجواء رومانسية",
        questions: [
            "ما هو أفضل طبق طبخته في حياتك؟",
            "لو كنت ستدعو أي شخص في العالم للعشاء، من ستختار؟",
            "ما هي أكثر ذكرى مؤثرة مع عائلتك؟",
            "كيف تحب أن تقضي عطلة نهاية الأسبوع المثالية؟",
            "ما هو أكثر شيء تقدره في الصداقة؟",
            "ما هي الوجبة التي تذكرك بالبيت والأمان؟",
            "لو كنت طباخاً مشهوراً، ما الطبق الذي ستشتهر به؟",
            "ما هو أكثر مطعم له ذكريات خاصة عندك؟",
            "لو كان عليك أن تأكل طعام بلد واحد فقط، أي بلد تختار؟",
            "ما هي أكثر لحظة عائلية تعتز بها؟",
        ],
        dares: [
            "أطعم شريكك قضمة من طبقك بالشوكة",
            "احك نكتة مضحكة واجعل شريكك يضحك",
            "ارفع كأسك واشرب نخب للحب والرومانسية",
            "قل لشريكك لماذا تشعر بالامتنان لوجوده في حياتك",
            "التقطا صورة معاً على ضوء الشموع",
            "اكتبا رسالة حب على المنديل واحتفظا بها",
            "شاركا طبقاً واحداً بطريقة رومانسية",
        ],
    },
    {
        id: 4,
        title: "🎬 في السينما",
        description: "تشاهدان فيلم رومانسي في صالة سينما مظلمة",
        questions: [
            "ما هو أكثر فيلم أثر فيك وغير نظرتك للحياة؟",
            "لو كنت ممثل/ممثلة، أي نوع من الأفلام تحب أن تمثل فيه؟",
            "ما هي أكثر شخصية خيالية تتمنى أن تكونها؟",
            "كيف تحب أن تقضي ليلة مثالية في المنزل؟",
            "ما هو أكثر شيء يجعلك تشعر بالإلهام؟",
            "ما هو الفيلم الذي يمكنك مشاهدته مرات لا نهائية؟",
            "لو كانت حياتك فيلماً، ما نوعه؟ كوميديا، دراما، حركة؟",
            "من هو الممثل/الممثلة المفضل لديك ولماذا؟",
            "ما هو المشهد السينمائي الذي يجعلك تبكي دائماً؟",
            "لو استطعت الدخول في أي فيلم، أي فيلم تختار؟",
        ],
        dares: [
            "همس في أذن شريكك بشيء رومانسي أثناء الفيلم",
            "شارك الفشار مع شريكك بطريقة رومانسية",
            "امسك يد شريكك أثناء مشهد رومانسي في الفيلم",
            "اتركا رؤوسكما تلامس بعضها أثناء المشاهدة",
            "اكتبا رسالة حب قصيرة على تذكرة السينما",
            "التقطا صورة سيلفي خفية في السينما",
            "قلدا مشهداً رومانسياً من الفيلم بعد انتهائه",
        ],
    },
    {
        id: 5,
        title: "🌙 تحت النجوم",
        description: "تستلقيان على العشب وتنظران إلى النجوم",
        questions: [
            "ما هو أكثر شيء تتمناه عندما ترى نجمة ساقطة؟",
            "لو كنت ستسافر إلى الفضاء، ما هو أول شيء ستفعله؟",
            "ما هي أكثر لحظة شعرت فيها بالسلام الداخلي؟",
            "كيف تتخيل الحب المثالي؟",
            "ما هو أكثر شيء تخاف من فقدانه في الحياة؟",
            "ما هي أمنيتك السرية التي لم تخبر بها أحداً؟",
            "لو كنت نجماً في السماء، ماذا تتمنى أن يتمنى الناس عندما يرونك؟",
            "ما هي اللحظة التي شعرت فيها بأنك في المكان الصحيح؟",
            "ماذا يعني الحب الحقيقي بالنسبة لك؟",
            "ما هو أجمل شيء يمكن أن يحدث لك الآن؟",
        ],
        dares: [
            "اشيرا إلى نجمة واتفقا على أنها نجمتكما الخاصة",
            "احتضنا بعضكما واستمعا لأصوات الليل معاً",
            "احكيا لبعضكما عن أحلامكما وأمنياتكما",
            "قبلا بعضكما قبلة رقيقة تحت ضوء النجوم",
            "اتفقا على موعد للقاء مرة أخرى تحت النجوم",
            "التقطا صورة سيلفي تحت النجوم",
            "اتفقا على أمنية سرية وتمنياها معاً",
        ],
    },
]

const intimacyLevels = [
    { name: "بداية التعارف", icon: "😊", color: "from-blue-400 to-cyan-400" },
    { name: "تقارب أكثر", icon: "😍", color: "from-pink-400 to-rose-400" },
    { name: "رومانسية عالية", icon: "🥰", color: "from-red-400 to-pink-500" },
    { name: "حميمية كاملة", icon: "😘", color: "from-purple-500 to-pink-600" },
]


export default function FirstDateGame({ isMobile, setCurrentGame }) {
    const [isLoading, setIsLoading] = useState(true)
    const [gameState, setGameState] = useState("menu") // "menu" | "scenario" | "playing" | "question" | "dare" | "camera"
    const [selectedScenario, setSelectedScenario] = useState(null)
    const [selectedLevel, setSelectedLevel] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState("")
    const [currentDare, setCurrentDare] = useState("")
    const [usedQuestions, setUsedQuestions] = useState([])
    const [usedDares, setUsedDares] = useState([])
    const [timer, setTimer] = useState(0)
    const [isTimerActive, setIsTimerActive] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [autoRead, setAutoRead] = useState(true)
    const [capturedPhotos, setCapturedPhotos] = useState(() => {
        // Load photos from localStorage on init
        try {
            const saved = localStorage.getItem('firstDatePhotos')
            return saved ? JSON.parse(saved) : []
        } catch (err) {
            console.error("Error loading photos from localStorage:", err)
            return []
        }
    })
    const [showCamera, setShowCamera] = useState(false)
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const [stream, setStream] = useState(null)
    const speechRef = useRef(null)

    // Loading effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2500)
        return () => clearTimeout(timer)
    }, [])

    // Timer effect
    useEffect(() => {
        let interval
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
        } else if (timer === 0 && isTimerActive) {
            setIsTimerActive(false)
        }
        return () => clearInterval(interval)
    }, [isTimerActive, timer])

    // Cleanup camera on unmount
    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop())
            }
        }
    }, [stream])

    // Save photos to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('firstDatePhotos', JSON.stringify(capturedPhotos))
        } catch (err) {
            console.error("Error saving photos to localStorage:", err)
            // If localStorage is full, remove oldest photos
            if (err.name === 'QuotaExceededError') {
                const reducedPhotos = capturedPhotos.slice(-5) // Keep only last 5
                setCapturedPhotos(reducedPhotos)
                try {
                    localStorage.setItem('firstDatePhotos', JSON.stringify(reducedPhotos))
                } catch (e) {
                    console.error("Still can't save, clearing all:", e)
                    localStorage.removeItem('firstDatePhotos')
                }
            }
        }
    }, [capturedPhotos])

    // Text to speech function
    const speakText = (text) => {
        if (!autoRead) return
        
        // Stop any ongoing speech
        if (speechRef.current) {
            window.speechSynthesis.cancel()
        }

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'ar-SA' // Arabic
        utterance.rate = 0.9 // Slightly slower for clarity
        utterance.pitch = 1
        utterance.volume = 1

        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)

        speechRef.current = utterance
        window.speechSynthesis.speak(utterance)
    }

    const stopSpeaking = () => {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
    }

    const toggleAutoRead = () => {
        setAutoRead(!autoRead)
        if (!autoRead === false) {
            stopSpeaking()
        }
    }

    // Auto-read when question or dare changes
    useEffect(() => {
        if (gameState === "question" && currentQuestion && autoRead) {
            speakText(currentQuestion)
        }
    }, [currentQuestion, gameState, autoRead])

    useEffect(() => {
        if (gameState === "dare" && currentDare && autoRead) {
            speakText(currentDare)
        }
    }, [currentDare, gameState, autoRead])

    // Stop speaking when leaving question/dare state
    useEffect(() => {
        if (gameState !== "question" && gameState !== "dare") {
            stopSpeaking()
        }
    }, [gameState])

    const selectScenario = (scenario) => {
        setSelectedScenario(scenario)
        setGameState("scenario")
        setUsedQuestions([])
        setUsedDares([])
    }

    const startGame = () => setGameState("playing")

    const getRandomQuestion = () => {
        if (!selectedScenario) return
        const available = selectedScenario.questions
            .map((q, i) => ({ q, i }))
            .filter((q) => !usedQuestions.includes(q.i))

        if (available.length === 0) {
            setUsedQuestions([])
            return selectedScenario.questions[0]
        }

        const random = available[Math.floor(Math.random() * available.length)]
        setUsedQuestions([...usedQuestions, random.i])
        setCurrentQuestion(random.q)
        setGameState("question")
        setTimer(120)
        setIsTimerActive(true)
    }

    const getRandomDare = () => {
        if (!selectedScenario) return
        const available = selectedScenario.dares
            .map((d, i) => ({ d, i }))
            .filter((d) => !usedDares.includes(d.i))

        if (available.length === 0) {
            setUsedDares([])
            return selectedScenario.dares[0]
        }

        const random = available[Math.floor(Math.random() * available.length)]
        setUsedDares([...usedDares, random.i])
        setCurrentDare(random.d)
        setGameState("dare")
        setTimer(300)
        setIsTimerActive(true)
    }

    const backToPlaying = () => {
        setGameState("playing")
        setIsTimerActive(false)
        setTimer(0)
    }

    const resetGame = () => {
        setGameState("menu")
        setSelectedScenario(null)
        setSelectedLevel(0)
        setUsedQuestions([])
        setUsedDares([])
        setIsTimerActive(false)
        setTimer(0)
        stopCamera()
    }

    const formatTime = (s) => {
        const m = Math.floor(s / 60)
        const sec = s % 60
        return `${m}:${sec.toString().padStart(2, "0")}`
    }

    // Camera functions
    const startCamera = async () => {
        console.log("Starting camera...")
        try {
            // Check if getUserMedia is supported
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert("متصفحك لا يدعم الوصول إلى الكاميرا")
                return
            }

            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }, 
                audio: false 
            })
            
            console.log("Camera stream obtained:", mediaStream)
            setStream(mediaStream)
            setShowCamera(true)
            
            // Wait for video element to be ready
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream
                    videoRef.current.play()
                        .then(() => console.log("Video playing"))
                        .catch(err => console.error("Error playing video:", err))
                }
            }, 100)
        } catch (err) {
            console.error("Error accessing camera:", err)
            let errorMessage = "لا يمكن الوصول إلى الكاميرا. "
            
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                errorMessage += "يرجى السماح للمتصفح باستخدام الكاميرا."
            } else if (err.name === 'NotFoundError') {
                errorMessage += "لم يتم العثور على كاميرا."
            } else {
                errorMessage += "تأكد من إعطاء الإذن للمتصفح."
            }
            
            alert(errorMessage)
        }
    }

    const stopCamera = () => {
        console.log("Stopping camera...")
        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop()
                console.log("Track stopped:", track.kind)
            })
            setStream(null)
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null
        }
        setShowCamera(false)
    }

    const capturePhoto = () => {
        console.log("Capturing photo...")
        const canvas = canvasRef.current
        const video = videoRef.current
        
        if (!canvas || !video) {
            console.error("Canvas or video not available")
            alert("الكاميرا غير جاهزة بعد")
            return
        }

        console.log("Video ready state:", video.readyState)
        console.log("Video dimensions:", video.videoWidth, "x", video.videoHeight)

        if (video.readyState < video.HAVE_CURRENT_DATA) {
            alert("انتظر قليلاً حتى تصبح الكاميرا جاهزة...")
            return
        }

        // Set canvas size to match video (reduced for localStorage)
        const maxWidth = 800 // Reduced size to save space
        const width = video.videoWidth || 640
        const height = video.videoHeight || 480
        const scale = Math.min(maxWidth / width, 1)
        const scaledWidth = width * scale
        const scaledHeight = height * scale
        
        canvas.width = scaledWidth
        canvas.height = scaledHeight
        
        console.log("Canvas size set to:", scaledWidth, "x", scaledHeight)
        
        const ctx = canvas.getContext('2d')
        
        try {
            // Draw video frame
            ctx.drawImage(video, 0, 0, scaledWidth, scaledHeight)
            
            // Add romantic overlay
            ctx.fillStyle = 'rgba(255, 192, 203, 0.1)'
            ctx.fillRect(0, 0, scaledWidth, scaledHeight)
            
            // Add heart watermark (scaled)
            const heartSize = Math.floor(60 * scale)
            ctx.font = `bold ${heartSize}px Arial`
            ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'
            ctx.fillText('❤️', scaledWidth - (80 * scale), 70 * scale)
            
            // Add text overlay (scaled)
            const textSize = Math.floor(20 * scale)
            ctx.font = `bold ${textSize}px Arial`
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            ctx.textAlign = 'center'
            ctx.fillText('💕 لحظة حب 💕', scaledWidth / 2, scaledHeight - (30 * scale))
            
            // Convert to JPEG with quality 0.7 to reduce size
            const photoData = canvas.toDataURL('image/jpeg', 0.7)
            console.log("Photo captured successfully, size:", Math.round(photoData.length / 1024), "KB")
            
            const newPhoto = { 
                id: Date.now(), 
                data: photoData,
                scenario: selectedScenario?.title || 'موعد رومانسي',
                timestamp: new Date().toLocaleString('ar-TN', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            }
            
            // Update state without blocking
            setTimeout(() => {
                setCapturedPhotos(prev => {
                    const updated = [...prev, newPhoto]
                    // Keep only last 10 photos to avoid localStorage issues
                    return updated.slice(-10)
                })
            }, 0)
            
            // Flash effect
            const flash = document.createElement('div')
            flash.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: white;
                z-index: 9999;
                opacity: 1;
                transition: opacity 0.3s;
                pointer-events: none;
            `
            document.body.appendChild(flash)
            
            setTimeout(() => {
                flash.style.opacity = '0'
                setTimeout(() => {
                    if (document.body.contains(flash)) {
                        document.body.removeChild(flash)
                    }
                }, 300)
            }, 100)
            
        } catch (err) {
            console.error("Error capturing photo:", err)
            alert("حدث خطأ أثناء التقاط الصورة: " + err.message)
        }
    }

    const downloadPhoto = (photo) => {
        const link = document.createElement('a')
        link.download = `love-moment-${photo.id}.png`
        link.href = photo.data
        link.click()
    }

    const deletePhoto = (photoId) => {
        setCapturedPhotos(prev => prev.filter(p => p.id !== photoId))
    }

    const clearAllPhotos = () => {
        if (confirm("هل أنت متأكد من حذف جميع الصور؟")) {
            setCapturedPhotos([])
            localStorage.removeItem('firstDatePhotos')
        }
    }

    return (
        <div
            className={`min-h-screen bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 ${isMobile ? "px-4 py-6" : "px-8 py-12"
                }`}
        >
            {/* Loader */}
            {isLoading && (
                <div className="fixed inset-0 bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 z-50 flex items-center justify-center">
                    <div className="text-center">
                        {/* Animated hearts */}
                        <div className="relative mb-8">
                            <div className="text-8xl md:text-9xl animate-pulse">💕</div>
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <div className="text-6xl md:text-7xl animate-ping opacity-75">❤️</div>
                            </div>
                            <div className="absolute -top-4 -right-4 text-3xl md:text-4xl animate-bounce">💖</div>
                            <div className="absolute -bottom-4 -left-4 text-3xl md:text-4xl animate-bounce delay-100">💗</div>
                            <div className="absolute top-0 -left-8 text-2xl md:text-3xl animate-pulse delay-200">💝</div>
                            <div className="absolute top-0 -right-8 text-2xl md:text-3xl animate-pulse delay-300">💓</div>
                        </div>

                        {/* Title */}
                        <h1 className={`font-bold text-white ${isMobile ? "text-3xl" : "text-5xl"} mb-4 drop-shadow-lg animate-fade-in`}>
                            💕 لعبة الموعد الأول
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="text-white/90 text-lg md:text-xl mb-8 animate-fade-in-delay">
                            جاري تحضير لحظات رومانسية...
                        </p>

                        {/* Loading bar */}
                        <div className="w-64 md:w-96 mx-auto bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                            <div className="h-full bg-white rounded-full animate-loading-bar shadow-lg"></div>
                        </div>

                        {/* Loading dots */}
                        <div className="flex justify-center items-center gap-2 mt-6">
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
                        </div>

                        {/* Romantic messages */}
                        <div className="mt-8 text-pink-100 text-sm md:text-base animate-fade-in-slow">
                            <p className="animate-pulse">✨ استعدوا لأجمل اللحظات معاً ✨</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={() => {
                        stopCamera()
                        setCurrentGame("menu")
                    }}
                    className="text-white hover:bg-white/20 rounded-xl p-3 transition-all duration-300 hover:scale-110"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="text-center flex-1">
                    <h1
                        className={`font-bold text-white ${isMobile ? "text-2xl" : "text-4xl"} mb-2 drop-shadow-lg`}
                    >
                        💕 لعبة الموعد الأول
                    </h1>
                    <p className="text-pink-100 drop-shadow">اكتشفا بعضكما البعض في أجواء رومانسية</p>
                </div>
                <div className="w-12"></div>
            </div>

            {/* Game States */}
            {gameState === "menu" && (
                <div className="max-w-6xl mx-auto">
                    {/* Level select */}
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
                            ✨ اختر مستوى التقارب
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {intimacyLevels.map((level, i) => (
                                <Card
                                    key={i}
                                    className={`cursor-pointer transition-all duration-300 hover:scale-105 border-0 ${selectedLevel === i ? "ring-4 ring-white shadow-2xl scale-105" : "shadow-xl"
                                        }`}
                                    onClick={() => setSelectedLevel(i)}
                                >
                                    <CardContent
                                        className={`p-6 text-center bg-gradient-to-br ${level.color} text-white rounded-xl`}
                                    >
                                        <div className="text-5xl mb-3 animate-bounce">{level.icon}</div>
                                        <p className="font-bold text-sm">{level.name}</p>
                                        {selectedLevel === i && (
                                            <div className="mt-2">
                                                <span className="text-xs bg-white/30 px-2 py-1 rounded-full">✓ محدد</span>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Scenario select */}
                    <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
                        💫 اختر السيناريو
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dateScenarios.map((s) => (
                            <Card
                                key={s.id}
                                onClick={() => selectScenario(s)}
                                className="group hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer shadow-xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <CardContent className="p-6 text-center relative">
                                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {s.title.split(" ")[0]}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors">
                                        {s.title.substring(2)}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{s.description}</p>
                                    <div className="flex justify-center gap-4 text-gray-500 text-sm bg-gray-50 rounded-lg p-3">
                                        <div className="flex items-center gap-1">
                                            <Heart className="w-4 h-4 text-pink-500" />
                                            <span className="font-semibold">{s.questions.length} أسئلة</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Sparkles className="w-4 h-4 text-purple-500" />
                                            <span className="font-semibold">{s.dares.length} تحديات</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-pink-600 font-bold text-sm">اضغط للبدء ←</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Scenario details */}
            {gameState === "scenario" && selectedScenario && (
                <div className="max-w-3xl mx-auto">
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white">
                            <div className="text-7xl mb-4 text-center animate-bounce">
                                {selectedScenario.title.split(" ")[0]}
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                                {selectedScenario.title.substring(2)}
                            </h2>
                            <p className="text-pink-100 text-center text-lg">
                                {selectedScenario.description}
                            </p>
                        </div>
                        <CardContent className="p-8">
                            {/* Level badge */}
                            <div className="flex justify-center mb-6">
                                <div className={`px-6 py-3 rounded-full bg-gradient-to-r ${intimacyLevels[selectedLevel].color} text-white font-bold shadow-lg`}>
                                    <span className="text-2xl mr-2">{intimacyLevels[selectedLevel].icon}</span>
                                    {intimacyLevels[selectedLevel].name}
                                </div>
                            </div>

                            {/* Info cards */}
                            <div className="grid md:grid-cols-2 gap-4 mb-8">
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center border-2 border-blue-200">
                                    <Heart className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                                    <p className="text-3xl font-bold text-blue-600 mb-1">{selectedScenario.questions.length}</p>
                                    <p className="text-sm text-gray-600 font-semibold">أسئلة عميقة</p>
                                    <p className="text-xs text-gray-500 mt-2">لاكتشاف بعضكما</p>
                                </div>
                                <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6 text-center border-2 border-pink-200">
                                    <Sparkles className="w-10 h-10 mx-auto mb-3 text-pink-600" />
                                    <p className="text-3xl font-bold text-pink-600 mb-1">{selectedScenario.dares.length}</p>
                                    <p className="text-sm text-gray-600 font-semibold">تحديات رومانسية</p>
                                    <p className="text-xs text-gray-500 mt-2">لحظات لا تنسى</p>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-xl">
                                <p className="font-semibold text-yellow-800 mb-2">💡 كيف تلعبون؟</p>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    <li>• اختاروا بين الأسئلة العميقة أو التحديات الرومانسية</li>
                                    <li>• أجيبوا بصدق وانفتاح لتقوية الرابطة بينكما</li>
                                    <li>• استمتعوا باللحظات واصنعوا ذكريات جميلة</li>
                                </ul>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={startGame}
                                    className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                >
                                    ❤️ ابدأ الموعد
                                </button>
                                <button
                                    onClick={() => setGameState("menu")}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-8 py-4 rounded-xl transition-all duration-300"
                                >
                                    ← العودة
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Playing */}
            {gameState === "playing" && (
                <div className="max-w-4xl mx-auto">
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl mb-6">
                        <CardContent className="p-8">
                            <div className="text-center mb-8">
                                <div className="text-6xl mb-4">{selectedScenario?.title.split(" ")[0]}</div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                    {selectedScenario?.title.substring(2)}
                                </h2>
                                <p className="text-gray-600">{selectedScenario?.description}</p>
                            </div>

                            {/* Level indicator */}
                            <div className="flex justify-center mb-8">
                                <div className={`px-6 py-3 rounded-full bg-gradient-to-r ${intimacyLevels[selectedLevel].color} text-white font-bold shadow-lg`}>
                                    <span className="text-2xl mr-2">{intimacyLevels[selectedLevel].icon}</span>
                                    {intimacyLevels[selectedLevel].name}
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="grid md:grid-cols-3 gap-4 mb-6">
                                <button
                                    onClick={getRandomQuestion}
                                    className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    <div className="relative">
                                        <MessageCircle className="w-10 h-10 mx-auto mb-3" />
                                        <h3 className="text-xl font-bold mb-1">سؤال عميق</h3>
                                        <p className="text-xs text-white/80">اكتشفوا بعضكما أكثر</p>
                                        <div className="mt-3 flex items-center justify-center gap-2 text-xs">
                                            <Clock className="w-3 h-3" />
                                            <span>دقيقتين للإجابة</span>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={getRandomDare}
                                    className="group relative overflow-hidden bg-gradient-to-br from-pink-500 to-red-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    <div className="relative">
                                        <Sparkles className="w-10 h-10 mx-auto mb-3" />
                                        <h3 className="text-xl font-bold mb-1">تحدي رومانسي</h3>
                                        <p className="text-xs text-white/80">لحظات لا تنسى</p>
                                        <div className="mt-3 flex items-center justify-center gap-2 text-xs">
                                            <Zap className="w-3 h-3" />
                                            <span>5 دقائق للتحدي</span>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={startCamera}
                                    className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    <div className="relative">
                                        <Camera className="w-10 h-10 mx-auto mb-3" />
                                        <h3 className="text-xl font-bold mb-1">صورة معاً</h3>
                                        <p className="text-xs text-white/80">احفظوا هذه اللحظة</p>
                                        <div className="mt-3 flex items-center justify-center gap-2 text-xs">
                                            <Heart className="w-3 h-3 animate-pulse" />
                                            <span>{capturedPhotos.length} صور</span>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            {/* Progress */}
                            <div className="bg-gray-100 rounded-xl p-4 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-gray-700">التقدم في الموعد</span>
                                    <span className="text-sm text-gray-500">
                                        {usedQuestions.length + usedDares.length} / {selectedScenario?.questions.length + selectedScenario?.dares.length}
                                    </span>
                                </div>
                                <div className="bg-gray-300 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-pink-500 to-purple-600 h-full transition-all duration-500"
                                        style={{
                                            width: `${((usedQuestions.length + usedDares.length) / (selectedScenario?.questions.length + selectedScenario?.dares.length)) * 100}%`
                                        }}
                                    ></div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-blue-50 rounded-xl p-4 text-center">
                                    <MessageCircle className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                                    <p className="text-2xl font-bold text-blue-600">{usedQuestions.length}</p>
                                    <p className="text-sm text-gray-600">أسئلة مجابة</p>
                                </div>
                                <div className="bg-pink-50 rounded-xl p-4 text-center">
                                    <Sparkles className="w-6 h-6 mx-auto mb-2 text-pink-600" />
                                    <p className="text-2xl font-bold text-pink-600">{usedDares.length}</p>
                                    <p className="text-sm text-gray-600">تحديات منجزة</p>
                                </div>
                            </div>

                            {/* Back button */}
                            <button
                                onClick={resetGame}
                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-xl transition-all duration-300"
                            >
                                إنهاء الموعد
                            </button>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Question */}
            {gameState === "question" && (
                <div className="max-w-3xl mx-auto">
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
                        <CardContent className="p-8">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full mb-4">
                                    <MessageCircle className="w-6 h-6 inline mr-2" />
                                    <span className="font-bold text-lg">سؤال عميق</span>
                                </div>
                                
                                {/* Audio controls */}
                                <div className="flex justify-center gap-2 mt-4">
                                    <button
                                        onClick={toggleAutoRead}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                            autoRead 
                                                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                        title={autoRead ? "تعطيل القراءة التلقائية" : "تفعيل القراءة التلقائية"}
                                    >
                                        {autoRead ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                        <span className="text-sm font-semibold">
                                            {autoRead ? "قراءة تلقائية" : "قراءة معطلة"}
                                        </span>
                                    </button>
                                    
                                    {isSpeaking && (
                                        <button
                                            onClick={stopSpeaking}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-all"
                                        >
                                            <X className="w-4 h-4" />
                                            <span className="text-sm font-semibold">إيقاف</span>
                                        </button>
                                    )}
                                    
                                    {!isSpeaking && autoRead && (
                                        <button
                                            onClick={() => speakText(currentQuestion)}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-all"
                                        >
                                            <Volume2 className="w-4 h-4" />
                                            <span className="text-sm font-semibold">إعادة القراءة</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Timer */}
                            <div className="mb-8">
                                <div className="flex justify-center items-center gap-3 mb-4">
                                    <Clock className={`w-8 h-8 ${timer <= 30 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`} />
                                    <div className={`text-6xl font-bold ${timer <= 30 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`}>
                                        {formatTime(timer)}
                                    </div>
                                </div>
                                <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${timer <= 30 ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}
                                        style={{ width: `${(timer / 120) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Question */}
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
                                <div className="text-4xl mb-4 text-center">💭</div>
                                <p className="text-2xl md:text-3xl text-gray-800 font-bold text-center leading-relaxed">
                                    {currentQuestion}
                                </p>
                            </div>

                            {/* Tips */}
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-xl">
                                <div className="flex items-start gap-3">
                                    <Star className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-yellow-800 mb-1">نصيحة</p>
                                        <p className="text-sm text-yellow-700">كونوا صادقين ومنفتحين في إجاباتكم. الصدق يقرب القلوب!</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={backToPlaying}
                                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                                >
                                    ✓ تم الإجابة
                                </button>
                                <button
                                    onClick={getRandomQuestion}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-4 rounded-xl transition-all duration-300"
                                >
                                    ⤴ سؤال آخر
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Dare */}
            {gameState === "dare" && (
                <div className="max-w-3xl mx-auto">
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
                        <CardContent className="p-8">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="inline-block bg-gradient-to-r from-pink-500 to-red-600 text-white px-6 py-3 rounded-full mb-4 animate-pulse">
                                    <Sparkles className="w-6 h-6 inline mr-2" />
                                    <span className="font-bold text-lg">تحدي رومانسي</span>
                                </div>
                                
                                {/* Audio controls */}
                                <div className="flex justify-center gap-2 mt-4">
                                    <button
                                        onClick={toggleAutoRead}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                            autoRead 
                                                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                        title={autoRead ? "تعطيل القراءة التلقائية" : "تفعيل القراءة التلقائية"}
                                    >
                                        {autoRead ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                        <span className="text-sm font-semibold">
                                            {autoRead ? "قراءة تلقائية" : "قراءة معطلة"}
                                        </span>
                                    </button>
                                    
                                    {isSpeaking && (
                                        <button
                                            onClick={stopSpeaking}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-all"
                                        >
                                            <X className="w-4 h-4" />
                                            <span className="text-sm font-semibold">إيقاف</span>
                                        </button>
                                    )}
                                    
                                    {!isSpeaking && autoRead && (
                                        <button
                                            onClick={() => speakText(currentDare)}
                                            className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 hover:bg-pink-200 rounded-lg transition-all"
                                        >
                                            <Volume2 className="w-4 h-4" />
                                            <span className="text-sm font-semibold">إعادة القراءة</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Timer */}
                            <div className="mb-8">
                                <div className="flex justify-center items-center gap-3 mb-4">
                                    <Clock className={`w-8 h-8 ${timer <= 60 ? 'text-red-500 animate-pulse' : 'text-pink-600'}`} />
                                    <div className={`text-6xl font-bold ${timer <= 60 ? 'text-red-500 animate-pulse' : 'text-pink-600'}`}>
                                        {formatTime(timer)}
                                    </div>
                                </div>
                                <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${timer <= 60 ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-pink-500 to-red-600'}`}
                                        style={{ width: `${(timer / 300) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Dare */}
                            <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-8 mb-8 border-2 border-pink-200 relative overflow-hidden">
                                <div className="absolute top-0 right-0 text-9xl opacity-10">❤️</div>
                                <div className="relative">
                                    <div className="text-4xl mb-4 text-center">💫</div>
                                    <p className="text-2xl md:text-3xl text-gray-800 font-bold text-center leading-relaxed">
                                        {currentDare}
                                    </p>
                                </div>
                            </div>

                            {/* Encouragement */}
                            <div className="bg-gradient-to-r from-pink-100 to-red-100 border-l-4 border-pink-500 p-4 mb-6 rounded-r-xl">
                                <div className="flex items-start gap-3">
                                    <Heart className="w-5 h-5 text-pink-600 flex-shrink-0 mt-1 animate-pulse" />
                                    <div>
                                        <p className="font-semibold text-pink-800 mb-1">تشجيع</p>
                                        <p className="text-sm text-pink-700">لا تخجلوا! هذه اللحظات ستكون من أجمل ذكرياتكم 💕</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={backToPlaying}
                                    className="flex-1 bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                                >
                                    ✓ تم التحدي
                                </button>
                                <button
                                    onClick={getRandomDare}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-4 rounded-xl transition-all duration-300"
                                >
                                    ⤴ تحدي آخر
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Camera Modal */}
            {showCamera && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="max-w-4xl w-full my-8">
                        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                            {/* Camera header */}
                            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 text-white">
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={backToPlaying}
                                        className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all flex items-center gap-2"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                        <span className="text-sm font-semibold">رجوع</span>
                                    </button>
                                    <h2 className="text-2xl font-bold flex items-center gap-2">
                                        <Camera className="w-6 h-6" />
                                        التقاط صورة رومانسية
                                    </h2>
                                    <button
                                        onClick={stopCamera}
                                        className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Camera view */}
                            <div className="relative bg-black">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full max-h-[60vh] object-cover mx-auto"
                                    onLoadedMetadata={() => {
                                        if (videoRef.current) {
                                            videoRef.current.play().catch(err => console.error("Play error:", err))
                                        }
                                    }}
                                />
                                <canvas ref={canvasRef} className="hidden" />
                                
                                {/* Overlay hearts */}
                                <div className="absolute top-4 right-4 text-4xl opacity-50 animate-pulse">❤️</div>
                                <div className="absolute bottom-4 left-4 text-4xl opacity-50 animate-pulse">💕</div>
                                
                                {/* Frame overlay */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute inset-0 border-4 border-pink-500/30 rounded-lg m-4"></div>
                                </div>
                            </div>

                            {/* Camera controls */}
                            <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-50">
                                <button
                                    onClick={capturePhoto}
                                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-3 text-lg"
                                >
                                    <Camera className="w-6 h-6" />
                                    التقاط الصورة 📸
                                </button>
                            </div>
                        </div>

                        {/* Photos gallery */}
                        {capturedPhotos.length > 0 && (
                            <div className="mt-6 bg-white rounded-3xl p-6 shadow-2xl">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-pink-500" />
                                        ذكرياتكما ({capturedPhotos.length})
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={clearAllPhotos}
                                            className="text-sm text-red-500 hover:text-red-700 font-semibold"
                                        >
                                            حذف الكل
                                        </button>
                                        <button
                                            onClick={backToPlaying}
                                            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-all"
                                            title="إغلاق"
                                        >
                                            <X className="w-5 h-5 text-gray-700" />
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto pr-2">
                                    {capturedPhotos.map((photo) => (
                                        <div key={photo.id} className="relative group">
                                            <img
                                                src={photo.data}
                                                alt="Love moment"
                                                className="w-full h-32 object-cover rounded-xl shadow-lg"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => downloadPhoto(photo)}
                                                    className="bg-white/90 hover:bg-white p-2 rounded-full transition-all"
                                                    title="تحميل"
                                                >
                                                    <Download className="w-5 h-5 text-pink-600" />
                                                </button>
                                                <button
                                                    onClick={() => deletePhoto(photo.id)}
                                                    className="bg-white/90 hover:bg-white p-2 rounded-full transition-all"
                                                    title="حذف"
                                                >
                                                    <span className="text-red-600 font-bold">✕</span>
                                                </button>
                                            </div>
                                            <div className="mt-1 text-xs text-gray-500 text-center">{photo.timestamp}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}