
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import SceneComponent from './components/Scene';
import { SECTIONS, NAV_ORDER, INITIAL_ACHIEVEMENTS, QUIZ_QUESTIONS } from './constants';
import type { Section, Achievement, QuizQuestion } from './types';

// --- Helper & UI Components (defined outside main App to prevent re-creation on re-renders) ---

const CTAButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className = '' }) => (
    <button
        onClick={onClick}
        className={`px-10 py-4 text-lg font-bold text-[#050A18] bg-yellow-400 rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 shadow-[0_0_20px_rgba(255,222,29,0.5)] hover:shadow-[0_0_30px_rgba(255,222,29,0.8)] ${className}`}
    >
        {children}
    </button>
);

const HeroSection: React.FC<{ onStart: () => void; onStartTour: () => void }> = ({ onStart, onStartTour }) => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 transition-opacity duration-700 ease-out">
        <h1 className="text-4xl md:text-6xl font-black text-white" style={{ textShadow: '0 0 15px rgba(255, 222, 29, 0.4)' }}>
            الخواص الجامعة للمحاليل
        </h1>
        <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
            "كيف يؤثر عدد الجسيمات، وليس نوعها، في الخواص الفيزيائية للمذيب؟"
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <CTAButton onClick={onStart}>ابدأ الرحلة التعليمية</CTAButton>
            <CTAButton onClick={onStartTour} className="bg-gray-600 hover:bg-gray-700 shadow-gray-500/50 hover:shadow-gray-500/80">جولة إرشادية</CTAButton>
        </div>
        <div className="mt-12 text-gray-300 text-xl flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
            <p>عمل الطالب / محمد نذير ابوالرجال</p>
            <p>للأستاذ / سلطان الزهراني</p>
        </div>
    </div>
);

const ContentPanel: React.FC<{ section: Section | null; isVisible: boolean; onStartQuiz: () => void; onShowResources: () => void; }> = ({ section, isVisible, onStartQuiz, onShowResources }) => {
    const [boilingResult, setBoilingResult] = useState('0.00');
    const [freezingResult, setFreezingResult] = useState('0.00');

    const handleBoilingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const molality = parseFloat(e.target.value) || 0;
        setBoilingResult((molality * 0.512).toFixed(2));
    };
    const handleFreezingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const molality = parseFloat(e.target.value) || 0;
        setFreezingResult((molality * 1.86).toFixed(2));
    };
    
    return (
        <div className={`fixed top-1/2 right-3 -translate-y-1/2 w-[400px] max-h-[85vh] bg-black/30 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-8 pointer-events-auto overflow-y-auto flex flex-col transition-all duration-500 ease-in-out z-10 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24 invisible'}`}>
            {section && (
                <>
                    <div className="flex-grow">
                        <h2 className="text-3xl font-bold text-yellow-400 mb-4">{section.title}</h2>
                        <div className="text-gray-200 space-y-4" dangerouslySetInnerHTML={{ __html: section.content }} />
                        {section.title === 'درجة الغليان' && (
                             <div className="mt-6 p-4 bg-black/20 rounded-lg border border-blue-400/30">
                                <label htmlFor="boilingMolality" className="block mb-2 font-bold">جرّب بنفسك: أدخل التركيز (مول/كجم)</label>
                                <input type="number" id="boilingMolality" onChange={handleBoilingChange} min="0" step="0.1" placeholder="مثال: 0.5" className="w-full p-2 rounded bg-black/30 border border-blue-500/50 text-white" />
                                <div className="mt-4 text-lg">الارتفاع في درجة الغليان: <span className="font-bold text-yellow-400">{boilingResult}</span> °م</div>
                                <div className="text-sm text-gray-400 mt-2">القانون: ΔT = Kₑ × m (حيث Kₑ للماء = 0.512)</div>
                             </div>
                        )}
                        {section.title === 'درجة التجمد' && (
                             <div className="mt-6 p-4 bg-black/20 rounded-lg border border-blue-400/30">
                                <label htmlFor="freezingMolality" className="block mb-2 font-bold">جرّب بنفسك: أدخل التركيز (مول/كجم)</label>
                                <input type="number" id="freezingMolality" onChange={handleFreezingChange} min="0" step="0.1" placeholder="مثال: 1.0" className="w-full p-2 rounded bg-black/30 border border-blue-500/50 text-white" />
                                <div className="mt-4 text-lg">الانخفاض في درجة التجمد: <span className="font-bold text-yellow-400">{freezingResult}</span> °م</div>
                                <div className="text-sm text-gray-400 mt-2">القانون: ΔT = Kₜ × m (حيث Kₜ للماء = 1.86)</div>
                             </div>
                        )}
                    </div>
                    {section.title === 'ملخص الدرس' && (
                        <div className="mt-auto pt-4 border-t border-blue-400/20 space-y-2">
                             <CTAButton onClick={onStartQuiz} className="w-full">🧠 اختبر فهمك</CTAButton>
                             <CTAButton onClick={onShowResources} className="w-full bg-gray-500 hover:bg-gray-600 shadow-gray-500/50 hover:shadow-gray-500/80">📚 مصادر إضافية</CTAButton>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};


const Navigation: React.FC<{ isVisible: boolean, currentSectionKey: string | null; onSelect: (key: string) => void; onPrev: () => void; onNext: () => void; onShowAchievements: () => void; onShowSettings: () => void; visitedSections: Set<string>; }> = ({ isVisible, currentSectionKey, onSelect, onPrev, onNext, onShowAchievements, onShowSettings, visitedSections }) => {
    const progress = (visitedSections.size / NAV_ORDER.length) * 100;
    const currentIndex = currentSectionKey ? NAV_ORDER.indexOf(currentSectionKey) : -1;

    return (
        <div className={`fixed top-1/2 left-12 -translate-y-1/2 flex flex-col items-center pointer-events-auto z-10 transition-opacity duration-700 ease-out delay-500 ${isVisible ? 'opacity-100' : 'opacity-0 invisible'}`}>
            <div className="w-24 h-2 bg-white/20 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-yellow-400 transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <nav className="flex flex-col gap-5">
                {NAV_ORDER.map(key => (
                    <div key={key} className="relative group">
                        <div
                            onClick={() => onSelect(key)}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 border-2 ${currentSectionKey === key ? 'bg-yellow-400 scale-150 shadow-[0_0_12px_var(--brand-accent)] border-transparent' : 'bg-white/30 hover:bg-yellow-400 hover:scale-125'} ${visitedSections.has(key) ? 'border-yellow-400' : 'border-transparent'}`}
                        />
                        <span className="absolute left-[170%] top-1/2 -translate-y-1/2 text-white bg-black/70 px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            {SECTIONS[key].title}
                        </span>
                    </div>
                ))}
            </nav>
            <div className="mt-6 flex flex-col gap-4">
                <button onClick={onPrev} disabled={currentIndex <= 0} className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-yellow-400/50 hover:scale-110 transition disabled:opacity-30 disabled:cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/></svg>
                </button>
                <button onClick={onNext} disabled={currentIndex >= NAV_ORDER.length - 1} className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-yellow-400/50 hover:scale-110 transition disabled:opacity-30 disabled:cursor-not-allowed">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
                </button>
            </div>
            <button onClick={onShowAchievements} title="الإنجازات" className="mt-4 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-yellow-400/50 hover:scale-110 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0a.5.5 0 0 1 .5.5V2a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 8 0zM7.5 3a.5.5 0 0 0-1 0v3a.5.5 0 0 0 1 0V3zM8 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1h3A.5.5 0 0 1 8 7zM8.5 4.5a.5.5 0 0 0 1 0V1a.5.5 0 0 0-1 0v3.5zM12 7a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V7zM4 14a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1zm1-4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1zm6-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1z"/></svg>
            </button>
            <button onClick={onShowSettings} title="الإعدادات" className="mt-4 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-yellow-400/50 hover:scale-110 transition">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311a1.464 1.464 0 0 1-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c-1.4-.413-1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.858 2.929 2.929 0 0 1 0 5.858z"/></svg>
            </button>
        </div>
    );
};

// --- Main App Component ---

const App: React.FC = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [currentSectionKey, setCurrentSectionKey] = useState<string | null>(null);
    const [hoveredSection, setHoveredSection] = useState<Section | null>(null);
    const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());
    const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);
    const [toasts, setToasts] = useState<Achievement[]>([]);
    const [isQuizVisible, setQuizVisible] = useState(false);
    const [isResourcesVisible, setResourcesVisible] = useState(false);
    const [isAchievementsVisible, setAchievementsVisible] = useState(false);
    const [isSettingsVisible, setSettingsVisible] = useState(false);
    const [lightingMultiplier, setLightingMultiplier] = useState(2);
    const [animationSpeed, setAnimationSpeed] = useState(2.5);
    
    const handleStart = () => setIsStarted(true);

    const handleSelectSection = useCallback((key: string) => {
        setCurrentSectionKey(key);
        setVisitedSections(prev => new Set(prev).add(key));
    }, []);

    const handleShowOverview = useCallback(() => setCurrentSectionKey(null), []);

    const handlePrev = () => {
        const currentIndex = NAV_ORDER.indexOf(currentSectionKey!);
        if (currentIndex > 0) handleSelectSection(NAV_ORDER[currentIndex - 1]);
    };

    const handleNext = () => {
        const currentIndex = currentSectionKey ? NAV_ORDER.indexOf(currentSectionKey) : -1;
        if (currentIndex < NAV_ORDER.length - 1) handleSelectSection(NAV_ORDER[currentIndex + 1]);
    };
    
    useEffect(() => {
        if(visitedSections.size === NAV_ORDER.length && !achievements.explorer.unlocked) {
            setAchievements(prev => ({...prev, explorer: {...prev.explorer, unlocked: true}}));
            setToasts(t => [...t, INITIAL_ACHIEVEMENTS.explorer]);
        }
    }, [visitedSections, achievements.explorer.unlocked]);

    const handleQuizComplete = (score: number, total: number) => {
        if (score > 0 && !achievements.apprentice.unlocked) {
             setAchievements(prev => ({...prev, apprentice: {...prev.apprentice, unlocked: true}}));
             setToasts(t => [...t, INITIAL_ACHIEVEMENTS.apprentice]);
        }
        if (score === total && !achievements.scholar.unlocked) {
            setAchievements(prev => ({...prev, scholar: {...prev.scholar, unlocked: true}}));
             setToasts(t => [...t, INITIAL_ACHIEVEMENTS.scholar]);
        }
    }

    return (
        <>
            {!isStarted && <HeroSection onStart={handleStart} onStartTour={() => {}} />}
            
            <SceneComponent
                onObjectClick={handleSelectSection}
                onObjectHover={setHoveredSection}
                currentSectionKey={currentSectionKey}
                lightingMultiplier={lightingMultiplier}
                animationSpeed={animationSpeed}
            />

            <Navigation 
                isVisible={isStarted}
                currentSectionKey={currentSectionKey}
                onSelect={handleSelectSection}
                onPrev={handlePrev}
                onNext={handleNext}
                onShowAchievements={() => setAchievementsVisible(true)}
                onShowSettings={() => setSettingsVisible(true)}
                visitedSections={visitedSections}
            />
            
            {isStarted && (
                <button onClick={handleShowOverview} className={`fixed top-8 left-8 px-6 py-2 bg-white/10 border border-white/20 rounded-full cursor-pointer z-20 transition-opacity duration-500 ${currentSectionKey ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    عرض الكل
                </button>
            )}

            <ContentPanel 
                section={currentSectionKey ? SECTIONS[currentSectionKey] : null} 
                isVisible={!!currentSectionKey}
                onStartQuiz={() => setQuizVisible(true)}
                onShowResources={() => setResourcesVisible(true)}
            />

            {/* Tooltip */}
            <div className={`fixed bg-black/70 text-white px-3 py-1 rounded pointer-events-none z-50 transition-opacity ${hoveredSection ? 'opacity-100' : 'opacity-0'}`} style={{ top: `20px`, right: `20px` }}>
                {hoveredSection?.title}
            </div>

            {/* Toasts Container */}
            <div className="fixed bottom-8 right-8 z-[1000] flex flex-col gap-2">
                {toasts.map((toast, i) => (
                    <div key={i} className="toast-animate bg-gradient-to-l from-[#0E1630] to-[var(--brand-primary-light)] text-white px-6 py-4 rounded-xl border border-yellow-400 shadow-lg flex items-center gap-4">
                        <div className="text-2xl">{toast.icon}</div>
                        <div>
                            <div className="font-bold">تم فتح إنجاز!</div>
                            <div>{toast.title}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals */}
            <Modal isVisible={isQuizVisible} onClose={() => setQuizVisible(false)} title="اختبر فهمك">
                <Quiz onComplete={handleQuizComplete}/>
            </Modal>
            <Modal isVisible={isResourcesVisible} onClose={() => setResourcesVisible(false)} title="مصادر إضافية">
                <div className="space-y-4 text-white">
                    <p>لتعميق فهمك للموضوع، يمكنك الاطلاع على هذه المصادر الموثوقة:</p>
                    <a href="https://www.youtube.com/watch?v=g2v9EBU1Euc" target="_blank" rel="noopener noreferrer" className="block p-3 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg transition-colors">فيديو شرح: الخواص الجامعة للمحاليل - أكاديمية خان</a>
                    <a href="https://www.youtube.com/watch?v=pGrwLIOCf4I" target="_blank" rel="noopener noreferrer" className="block p-3 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg transition-colors">فيديو: تجربة عملية على درجة التجمد - نفهم</a>
                    <a href="https://ar.wikipedia.org/wiki/%D8%AE%D8%A7%D8%B5%D9%8A%D8%A9_%D8%AA%D8%AC%D9%85%D8%B9%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="block p-3 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg transition-colors">مقالة: خاصية تجميعية - ويكيبيديا</a>
                </div>
            </Modal>
            <Modal isVisible={isAchievementsVisible} onClose={() => setAchievementsVisible(false)} title="الإنجازات">
                <div className="space-y-3">
                    {/* FIX: Explicitly type `ach` as `Achievement` to fix property access errors. */}
                    {Object.values(achievements).map((ach: Achievement) => (
                        <div key={ach.title} className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${ach.unlocked ? 'bg-yellow-400/20' : 'bg-white/5'}`}>
                            <div className={`text-3xl transition-opacity ${ach.unlocked ? 'opacity-100 text-yellow-400' : 'opacity-30'}`}>{ach.icon}</div>
                            <div>
                                <h4 className="font-bold text-white">{ach.title}</h4>
                                <p className="text-sm text-gray-400">{ach.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
            <Modal isVisible={isSettingsVisible} onClose={() => setSettingsVisible(false)} title="الإعدادات">
                <div className="space-y-6 text-white">
                    <div>
                        <label htmlFor="lightingSlider" className="block mb-2 font-bold">درجة سطوع الإضاءة</label>
                        <input id="lightingSlider" type="range" min="0.2" max="4" step="0.1" value={lightingMultiplier} onChange={(e) => setLightingMultiplier(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400" />
                        <div className="text-center text-sm text-gray-400 mt-1">{lightingMultiplier.toFixed(1)}x</div>
                    </div>
                    <div>
                        <label htmlFor="speedSlider" className="block mb-2 font-bold">سرعة الانتقالات</label>
                        <input id="speedSlider" type="range" min="0.5" max="5" step="0.1" value={animationSpeed} onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400" />
                        <div className="text-center text-sm text-gray-400 mt-1">{animationSpeed.toFixed(1)} ثانية</div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

// --- Sub-Components for Modals ---

const Modal: React.FC<{isVisible: boolean, onClose: () => void, title: string, children: React.ReactNode}> = ({isVisible, onClose, title, children}) => (
    <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 invisible'}`}>
        <div className="bg-[#0E1630] border border-blue-400 rounded-2xl p-8 w-full max-w-lg shadow-2xl relative">
            <button onClick={onClose} className="absolute top-4 left-4 text-white text-2xl">&times;</button>
            <h3 className="text-2xl font-bold text-center mb-4 text-yellow-400">{title}</h3>
            {children}
        </div>
    </div>
);

const Quiz: React.FC<{onComplete: (score: number, total: number) => void}> = ({onComplete}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const question = QUIZ_QUESTIONS[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;

    const handleAnswer = (index: number) => {
        if (showResult) return;
        setSelectedAnswer(index);
        setShowResult(true);
        if (index === question.correctAnswer) {
            setScore(s => s + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(i => i + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            onComplete(score, QUIZ_QUESTIONS.length);
        }
    };

    return (
        <div className="text-white">
            <p className="text-lg font-semibold mb-4 text-center">{question.question}</p>
            <div className="space-y-3">
                {question.options.map((option, index) => {
                    let optionClass = 'bg-blue-500/20 border-blue-400/40 hover:bg-blue-500/40';
                    if (showResult) {
                        if (index === question.correctAnswer) optionClass = 'bg-green-500/50 border-green-500';
                        else if (index === selectedAnswer) optionClass = 'bg-red-500/50 border-red-500';
                    }
                    return (
                        <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`block w-full text-right p-3 rounded-lg border transition-colors ${optionClass}`}>
                            {option}
                        </button>
                    );
                })}
            </div>
            {showResult && (
                 <div className="text-center mt-4">
                     <p className={`font-bold text-lg ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                         {isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة'}
                     </p>
                     <button onClick={handleNext} className="mt-2 px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg">
                         {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}
                     </button>
                 </div>
            )}
        </div>
    )
}

export default App;