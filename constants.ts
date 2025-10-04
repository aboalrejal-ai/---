
import { Sections, Achievements, QuizQuestion } from './types';

export const SECTIONS: Sections = {
    intro: { title: 'مقدمة وتمهيد', content: `<p>هل تساءلت يومًا لماذا يقوم الناس برش الملح على الطرقات في الشتاء لإذابة الجليد؟ هذا الدرس سيجيب عن هذا السؤال ويكشف عن مبدأ كيميائي مهم.</p><p>سنستكشف كيف أن مجرد إضافة مادة مذابة إلى سائل يمكن أن يغير خصائصه الفيزيائية الأساسية مثل درجة الغليان والتجمد بطرق يمكن التنبؤ بها.</p>`, bg: 'intro' },
    definition: { title: 'تعريف الخواص الجامعة', content: `<p>في الكيمياء، لا يقتصر فهم المحاليل على معرفة مكوناتها فقط، بل على كيفية تفاعلها. الخواص الجامعة (Colligative Properties) هي الخواص الفيزيائية للمحاليل التي تتأثر بـ <strong>عدد جسيمات المذاب وليس بطبيعتها.</strong></p><ul class="list-disc mt-4 space-y-2 pr-5"><li><strong>العامل المؤثر:</strong> تركيز جسيمات المذاب (الكمية).</li><li><strong>العامل غير المؤثر:</strong> هوية أو طبيعة المذاب (النوع).</li></ul>`, bg: 'definition' },
    types: { title: 'الأنواع الأربعة', content: `<p>هناك أربع ظواهر رئيسية تندرج تحت مسمى الخواص الجامعة، وكل منها يصف تأثيرًا مختلفًا للمذاب على المذيب. هذه الخواص هي:</p><ul class="list-disc mt-4 space-y-2 pr-5"><li>الانخفاض في الضغط البخاري</li><li>الارتفاع في درجة الغليان</li><li>الانخفاض في درجة التجمد</li><li>الضغط الأسموزي</li></ul>`, bg: 'types' },
    electrolytes: { title: 'المواد المتأينة وغير المتأينة', content: `<p>إن عدد الجسيمات الفعلي في المحلول يعتمد على ما إذا كانت المادة المذابة تتفكك (تتأين) أم لا عند ذوبانها.</p>
        <table class="w-full mt-4 border-collapse">
            <thead>
                <tr><th class="border border-blue-400/30 p-2 bg-blue-500/20">المواد غير المتأينة</th><th class="border border-blue-400/30 p-2 bg-blue-500/20">المواد المتأينة</th></tr>
            </thead>
            <tbody>
                <tr><td class="border border-blue-400/30 p-2">مركبات جزيئية تذوب دون أن تتفكك إلى أيونات.</td><td class="border border-blue-400/30 p-2">مركبات تتفكك في المحلول لإنتاج أيونات.</td></tr>
                <tr><td class="border border-blue-400/30 p-2">مثال: السكروز (C₁₂H₂₂O₁₁)</td><td class="border border-blue-400/30 p-2">مثال: كلوريد الصوديوم (NaCl)</td></tr>
                <tr><td class="border border-blue-400/30 p-2">1 مول ينتج 1 مول جسيمات.</td><td class="border border-blue-400/30 p-2">1 مول ينتج 2 مول جسيمات (Na⁺ + Cl⁻).</td></tr>
                <tr><td class="border border-blue-400/30 p-2">تأثير أقل.</td><td class="border border-blue-400/30 p-2">تأثير أكبر ومضاعف.</td></tr>
            </tbody>
        </table>`, bg: 'electrolytes' },
    vaporPressure: { title: 'الضغط البخاري', content: `<p>الضغط البخاري هو مقياس لميل جزيئات السائل للتبخر. عند إضافة مذاب غير متطاير، تشغل جسيمات المذاب جزءًا من مساحة السطح، مما يقلل من عدد جزيئات المذيب القادرة على الهروب إلى الحالة الغازية.</p><strong class="block mt-4 text-yellow-300">القاعدة الأساسية:</strong><p>كلما زاد عدد جسيمات المذاب، قلّ الضغط البخاري للمحلول.</p>`, bg: 'vaporPressure' },
    boilingPoint: { title: 'درجة الغليان', content: `<p>يغلي السائل عندما يتساوى ضغطه البخاري مع الضغط الجوي المحيط. وبما أن المذاب يخفض الضغط البخاري، يجب تسخين المحلول إلى درجة حرارة أعلى.</p><strong class="block mt-4 text-yellow-300">العلاقة الطردية:</strong><p>كلما زاد تركيز جسيمات المذاب، زاد الارتفاع في درجة الغليان.</p>`, bg: 'boilingPoint' },
    freezingPoint: { title: 'درجة التجمد', content: `<p>تتطلب عملية التجمد أن تترتب جزيئات المذيب في بنية بلورية منتظمة. تعمل جسيمات المذاب كعائق في هذه العملية، حيث تتداخل مع جزيئات المذيب وتجعل من الصعب عليها الاصطفاف بسهولة. لذا، يجب تبريد المحلول لدرجة حرارة أقل.</p>`, bg: 'freezingPoint' },
    osmoticPressure: { title: 'الضغط الأسموزي', content: `<p><strong>الأسموزية (Osmosis)</strong> هي ظاهرة انتشار المذيب (مثل الماء) عبر غشاء شبه منفذ، من منطقة ذات تركيز منخفض للمذاب إلى منطقة ذات تركيز مرتفع.</p><p>الضغط الأسموزي هو مقدار الضغط الإضافي الذي يجب تطبيقه لمنع حركة المذيب. وهو حيوي لعمليات مثل:</p><ul class="list-disc mt-4 space-y-2 pr-5"><li>امتصاص النباتات للماء من التربة.</li><li>الحفاظ على توازن السوائل داخل وخارج خلايا الكائنات الحية.</li></ul>`, bg: 'osmoticPressure' },
    applications: { title: 'تطبيقات واقعية', content: `<p>هذه المبادئ الكيميائية ليست مجرد نظريات أكاديمية، بل هي أساس لحل العديد من المشاكل العملية.</p><ul class="list-disc mt-4 space-y-2 pr-5"><li><strong>❄️ سلامة الطرق:</strong> رش الملح (NaCl) على الطرق في الشتاء يخفض درجة تجمد الماء.</li><li><strong>🍨 صناعة الآيس كريم:</strong> يضاف الملح إلى الجليد المحيط بوعاء خليط الآيس كريم لتبريده أسرع.</li><li><strong>🐠 الحياة البحرية:</strong> وجود الأملاح الذائبة في مياه المحيط يمنعها من التجمد بالكامل في المناطق القطبية.</li></ul>`, bg: 'applications' },
    summary: { title: 'ملخص الدرس', content: `<p>تُعد الخواص الجامعة دليلاً قوياً على أن كمية المادة المذابة، وليس نوعها، هي التي تحدد التغيرات في الخواص الفيزيائية للمحاليل.</p><strong class="block mt-4 text-yellow-300">النقاط الرئيسية:</strong><ul class="list-disc mt-2 space-y-2 pr-5"><li><strong>التعريف:</strong> تعتمد على عدد جسيمات المذاب.</li><li><strong>الأنواع:</strong> انخفاض ضغط بخاري، ارتفاع غليان، انخفاض تجمد، ضغط أسموزي.</li><li><strong>المواد المتأينة:</strong> لها تأثير مضاعف.</li><li><strong>التطبيقات:</strong> من إذابة الجليد إلى تنظيم سوائل الجسم.</li></ul>`, bg: 'summary' },
};

export const NAV_ORDER = Object.keys(SECTIONS);

export const INITIAL_ACHIEVEMENTS: Achievements = {
    explorer: { title: 'المستكشف', description: 'قمت بزيارة جميع أقسام الدرس.', icon: '🧭', unlocked: false },
    apprentice: { title: 'المتعلم المبتدئ', description: 'أكملت الاختبار الأول بنجاح.', icon: '🎓', unlocked: false },
    scholar: { title: 'الباحث', description: 'حصلت على درجة كاملة في الاختبار.', icon: '🌟', unlocked: false },
};

export const LIGHTING_PRESETS = {
    default: { ambient: 0xffffff, directional: 0xffffff, hemisphereSky: 0xffffbb, hemisphereGround: 0x080820, fog: 0x050A18 },
    intro: { ambient: 0x6a7a9a, directional: 0xaabbcc, hemisphereSky: 0xb0c4de, hemisphereGround: 0x465060, fog: 0x050a18 },
    definition: { ambient: 0xaaaaaa, directional: 0xffffff, hemisphereSky: 0xddeeff, hemisphereGround: 0x222233, fog: 0x050A18 },
    types: { ambient: 0x404060, directional: 0x8080ff, hemisphereSky: 0x505080, hemisphereGround: 0x101020, fog: 0x020308 },
    electrolytes: { ambient: 0xbbbbff, directional: 0xffffff, hemisphereSky: 0xeeeeff, hemisphereGround: 0x444499, fog: 0x101030 },
    applications: { ambient: 0x99ccff, directional: 0xffffee, hemisphereSky: 0xccdeff, hemisphereGround: 0x556677, fog: 0x223344 },
    summary: { ambient: 0xffd700, directional: 0xffffff, hemisphereSky: 0xffe4b5, hemisphereGround: 0x654321, fog: 0x110800 },
    freezingPoint: { ambient: 0x87CEEB, directional: 0xE0FFFF, hemisphereSky: 0xB0E0E6, hemisphereGround: 0x4682B4, fog: 0x000033 },
    boilingPoint: { ambient: 0xFF4500, directional: 0xFFD700, hemisphereSky: 0xFF8C00, hemisphereGround: 0x8B0000, fog: 0x4d0000 },
    vaporPressure: { ambient: 0xADD8E6, directional: 0xFFFFFF, hemisphereSky: 0xF0F8FF, hemisphereGround: 0x696969, fog: 0x556677 },
    osmoticPressure: { ambient: 0x98FB98, directional: 0xFFFACD, hemisphereSky: 0xAFEEEE, hemisphereGround: 0x006400, fog: 0x001a00 }
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        question: "ما هو العامل الأساسي الذي يؤثر على الخواص الجامعة للمحاليل؟",
        options: [
            "نوع جسيمات المذاب",
            "عدد جسيمات المذاب",
            "حجم جسيمات المذاب",
            "التفاعل الكيميائي للمذاب"
        ],
        correctAnswer: 1
    },
    {
        question: "لماذا يؤدي رش الملح على الطرق الجليدية إلى ذوبان الجليد؟",
        options: [
            "لأنه يرفع درجة تجمد الماء",
            "لأنه يخفض درجة تجمد الماء",
            "لأنه يولد حرارة عبر تفاعل كيميائي",
            "لأنه لونه داكن ويمتص حرارة الشمس"
        ],
        correctAnswer: 1
    },
    {
        question: "أي من المواد التالية، عند إذابة 1 مول منها في 1 كجم من الماء، ستسبب الارتفاع الأكبر في درجة الغليان؟",
        options: [
            "السكروز (C₁₂H₂₂O₁₁)",
            "كلوريد الصوديوم (NaCl)",
            "كلوريد الكالسيوم (CaCl₂)",
            "بروميد البوتاسيوم (KBr)"
        ],
        correctAnswer: 2
    }
];