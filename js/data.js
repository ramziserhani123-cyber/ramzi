/**
 * منصة صُنّاع الأثر الرقمي - Digital Impact Makers
 * جمعية الإبداع الثقافية شتمة - مديرية الشباب والرياضة بسكرة - وزارة الشباب
 * بنك البيانات والمحتوى المرجعي
 */

const PLATFORM_DATA = {
    info: {
        nameAr: "صُنّاع الأثر الرقمي",
        nameEn: "Digital Impact Makers",
        slogan: "طاقات شبابية ... رسالة رقمية هادفة",
        sponsor: "وزارة الشباب والرياضة",
        implementer: "جمعية الإبداع الثقافية شتمة",
        facilitator: "مديرية الشباب و الرياضة لولاية بسكرة",
        wilaya: "بسكرة",
        commune: "شتمة",
        metrics: {
            registeredYouth: 310,      // عدد المسجلين
            youthBeneficiaries: 248,   // عدد المستفيدين
            coursesCount: 6,           // عدد الدورات
            trainingWorkshops: 14,     // عدد الورشات
            producedContent: 52,       // عدد المحتويات
            totalViews: "450K+",       // عدد المشاهدات
            activeInitiatives: 18,     // عدد المبادرات
            strategicPartners: 12      // عدد الشراكات
        },
        genderDistribution: {
            maleCount: 167,
            femaleCount: 143,
            malePercentage: 54,
            femalePercentage: 46
        }
    },

    // قائمة المستخدمين ونظام الصلاحيات (RBAC)
    usersList: [
        { id: 1, name: "عمر فاروق بوخالفة", email: "omar.dg@mjs.gov.dz", wilaya: "الجزائر", role: "المدير الوطني", status: "نشط", dateJoined: "2026-08-01" },
        { id: 2, name: "كريم شريف", email: "kareem.djs@biskra.dz", wilaya: "بسكرة", role: "مشرف ولائي", status: "نشط", dateJoined: "2026-08-05" },
        { id: 3, name: "سعيد رحماني", email: "saeed.chetma@dim.dz", wilaya: "بسكرة", role: "مشرف مؤسسة شبابية", status: "نشط", dateJoined: "2026-08-10" },
        { id: 4, name: "ياسين بن عمار", email: "yassine.trainer@dim.dz", wilaya: "بسكرة", role: "المؤطر والمدرب", status: "نشط", dateJoined: "2026-08-15" },
        { id: 5, name: "أحمد بن عمارة", email: "ahmed.dz@impact.dz", wilaya: "بسكرة", role: "شاب صانع أثر", status: "نشط", dateJoined: "2026-09-01" },
        { id: 6, name: "د. إيمان خذير", email: "dr.imene@impact.dz", wilaya: "بسكرة", role: "شاب صانع أثر", status: "نشط", dateJoined: "2026-09-05" },
        { id: 7, name: "سفيان سعيدي", email: "sofiane.s@impact.dz", wilaya: "بسكرة", role: "شاب صانع أثر", status: "نشط", dateJoined: "2026-09-08" },
        { id: 8, name: "أميرة رحماني", email: "amira.r@impact.dz", wilaya: "بسكرة", role: "شاب صانع أثر", status: "نشط", dateJoined: "2026-09-12" }
    ],

    tracks: [
        {
            id: "content-creation",
            name: "صناعة المحتوى الرقمي",
            icon: "video",
            color: "emerald",
            desc: "تأهيل الشباب لإنتاج محتوى بصري ورقمي ذو جودة عالية ورسالة هادفة.",
            subTracks: [
                { id: "photography", name: "التصوير الاحترافي" },
                { id: "editing", name: "المونتاج ومعالجة الفيديو" },
                { id: "graphic-design", name: "التصميم والغرافيك" },
                { id: "podcast", name: "صناعة وهندسة البودكاست" },
                { id: "social-media", name: "إدارة وصناعة محتوى السوشيال ميديا" },
                { id: "ai-media", name: "أدوات الذكاء الاصطناعي في الإعلام" },
                { id: "scriptwriting", name: "الكتابة وصناعة السيناريو" },
                { id: "digital-marketing", name: "التسويق الرقمي والترويج" }
            ],
            metrics: { registered: 112, produced: 28 }
        },
        {
            id: "medical-health",
            name: "المجال الطبي والتوعية الصحية",
            icon: "activity",
            color: "rose",
            desc: "نشر الثقافة الصحية، التوعية بالأمراض، ودعم حملات التبرع بالدم والإسعافات الأولية.",
            subTracks: [
                { id: "health-awareness", name: "صناعة الرسائل الصحية الموثوقة" },
                { id: "first-aid", name: "فيديوهات الإسعافات الأولية" },
                { id: "blood-donation", name: "حملات التبرع بالدم الرقمية" }
            ],
            metrics: { registered: 34, produced: 7 }
        },
        {
            id: "citizenship",
            name: "المواطنة والعمل التطوعي",
            icon: "heart",
            color: "blue",
            desc: "تعزيز قيم التضامن، العمل التطوعي الميداني، والحملات التحسيسية الهادفة.",
            subTracks: [
                { id: "volunteering", name: "توثيق المبادرات التطوعية" },
                { id: "awareness-campaigns", name: "الحملات التحسيسية المجتمعية" },
                { id: "civic-initiatives", name: "مبادرات خدمة الحي والمجتمع" }
            ],
            metrics: { registered: 42, produced: 10 }
        },
        {
            id: "environment",
            name: "البيئة والتنمية المستدامة",
            icon: "leaf",
            color: "green",
            desc: "حماية البيئة، حملات التشجير، التدوير، والتعريف بالطبيعة والواحات في بسكرة والجزائر.",
            subTracks: [
                { id: "afforestation", name: "حملات الغرس والتشجير الرقمية" },
                { id: "recycling", name: "التوعية بإعادة التدوير والنظافة" },
                { id: "oasis-preservation", name: "حماية واحات النخيل والبيئة الصحراوية" }
            ],
            metrics: { registered: 26, produced: 6 }
        },
        {
            id: "science-tech",
            name: "المجال العلمي والتكنولوجي",
            icon: "cpu",
            color: "indigo",
            desc: "تبسيط العلوم، البرمجة، الروبوتيك، والابتكارات الرقمية للشباب.",
            subTracks: [
                { id: "science-communication", name: "تبسيط المفاهيم العلمية" },
                { id: "coding-robotics", name: "عروض البرمجة والروبوتيك" },
                { id: "tech-solutions", name: "ابتكار حلول رقمية للمشاكل المحلية" }
            ],
            metrics: { registered: 21, produced: 4 }
        },
        {
            id: "road-safety",
            name: "أمن الطرق والسلامة المرورية",
            icon: "shield-alert",
            color: "amber",
            desc: "التوعية بمخاطر حوادث المرور، نشر ثقافة السياقة الوقائية، وحماية الأرواح.",
            subTracks: [
                { id: "traffic-awareness", name: "فيديوهات وفواصل السلامة المرورية" },
                { id: "preventive-driving", name: "سلسلة السياقة الوقائية" },
                { id: "pedestrian-safety", name: "حملات حماية الراجلين وأطفال المدارس" }
            ],
            metrics: { registered: 13, produced: 3 }
        }
    ],

    academyLevels: [
        {
            level: 1,
            title: "المستوى الأول: أساسيات صناعة المحتوى",
            icon: "award",
            duration: "6 ساعات تدريبية",
            summary: "مدخل شامل لفهم الإعلام الجديد، بناء الفكرة، مهارات الإلقاء وتحديد الجمهور المستهدف والرسالة الهادفة.",
            lessons: [
                { title: "ما هو المحتوى الرقمي الهادف؟ ولماذا نحتاجه؟", duration: "45 د" },
                { title: "تحديد الفكرة، الجمهور المستهدف والرسالة الوطنية", duration: "60 د" },
                { title: "أخلاقيات الإعلام الرقمي والمسؤولية القانونية", duration: "40 د" }
            ],
            quiz: [
                {
                    q: "ما هو العنصر الأهم في نجاح المحتوى الرقمي الشبابي الهادف؟",
                    options: ["وضوح الرسالة والأثر الإيجابي", "المؤثرات الصوتية الصاخبة فقط", "كثرة الألوان بدون فكرة", "الاعتماد على الإثارة السلبية"],
                    correct: 0
                },
                {
                    q: "قبل البدء في صناعة أي فيديو أو منشور، ما هي الخطوة الأولى؟",
                    options: ["نشر الفيديو فوراً", "تحديد الجمهور المستهدف والهدف من الرسالة", "شراء أحدث كاميرا", "تقليد محتوى أجنبي دون تعديل"],
                    correct: 1
                }
            ]
        },
        {
            level: 2,
            title: "المستوى الثاني: التصوير الاحترافي بالموبايل",
            icon: "camera",
            duration: "8 ساعات تدريبية",
            summary: "استثمار الهاتف الذكي لإنتاج لقطات سينمائية: قواعد التكوين، زوايا التصوير، ضبط الإضاءة وتوزيعها.",
            lessons: [
                { title: "قاعدة الأثلاث وتأطير اللقطات الاحترافية", duration: "50 د" },
                { title: "التحكم اليدوي في كاميرا الهاتف (ISO, Shutter, Focus)", duration: "60 د" },
                { title: "تقنيات الإضاءة الطبيعية والصناعية بتكلفة بسيطة", duration: "55 د" }
            ],
            quiz: [
                {
                    q: "ما هي قاعدة الأثلاث (Rule of Thirds) في التصوير؟",
                    options: ["تقسيم الشاشة إلى 9 مستطيلات متساوية لوضع عناصر الجذب", "استخدام 3 فلاتر ملونة", "تصوير 3 ثوانٍ فقط", "التصوير من 3 زوايا عشوائية"],
                    correct: 0
                },
                {
                    q: "كيف نتجنب ظهور التحبب (Noise) في لقطات الفيديو بالهاتف؟",
                    options: ["رفع حساسية الضوء ISO لأقصى حد", "تأمين إضاءة كافية وخفض الـ ISO", "التكبير الرقمي Zoom 10x", "إطفاء الأنوار"],
                    correct: 1
                }
            ]
        },
        {
            level: 3,
            title: "المستوى الثالث: فن المونتاج ومعالجة الفيديو",
            icon: "film",
            duration: "10 ساعات تدريبية",
            summary: "تقطيع المشاهد، ريتم التحرير، مزامنة الصوت والموسيقى، إضافة النصوص والانتقالات الاحترافية باستخدام CapCut / Premiere.",
            lessons: [
                { title: "مبادئ القطع النظيف وتدفق القصة البصرية", duration: "60 د" },
                { title: "هندسة الصوت وتنقية الضوضاء الخلفية", duration: "50 د" },
                { title: "إضافة العناوين والمؤثرات المناسبة لمنصات التواصل", duration: "70 د" }
            ],
            quiz: [
                {
                    q: "ما هو الـ B-Roll في عملية المونتاج؟",
                    options: ["لقطات تكميلية داعمة للقصة تكسر رتابة اللقطة الرئيسية", "الصوت المعيب", "شاشة النهاية فقط", "حذف الفيديو كلياً"],
                    correct: 0
                }
            ]
        },
        {
            level: 4,
            title: "المستوى الرابع: صناعة وهندسة البودكاست",
            icon: "mic",
            duration: "8 ساعات تدريبية",
            summary: "إعداد المحاور، تقنيات الحوار والاستجواب، اختيار الميكروفونات، وتوزيع البودكاست على المنصات العالمية.",
            lessons: [
                { title: "إعداد خطة الحلقة وصياغة الأسئلة الذكية", duration: "60 د" },
                { title: "تسجيل الصوت الاحترافي وتجنب الصدى", duration: "60 د" },
                { title: "التسويق السمعي وصناعة الفواصل الترويجية (Reels)", duration: "45 د" }
            ],
            quiz: [
                {
                    q: "ما هو العنصر الأكثر حساسية في البودكاست لجذب واستمرار المستمع؟",
                    options: ["نقاوة الصوت وجودته الخالية من الصدى والضجيج", "مدة الحلقة 4 ساعات متواصلة", "تغيير المذيع في كل دقيقة", "الصراخ في الميكروفون"],
                    correct: 0
                }
            ]
        },
        {
            level: 5,
            title: "المستوى الخامس: أدوات الذكاء الاصطناعي في الإعلام",
            icon: "sparkles",
            duration: "8 ساعات تدريبية",
            summary: "توظيف نماذج التوليد الذكي لكتابة السيناريو، توليد الصور التوضيحية، الترجمة التلقائية، وتحسين إنتاجية صانع المحتوى.",
            lessons: [
                { title: "كتابة الأوامر الفعالة (Prompt Engineering) للأفكار والسيناريو", duration: "60 د" },
                { title: "أدوات توليد الصوت والتعليق الصوتي والترجمة التلقائية", duration: "50 د" },
                { title: "التحقق من الأخبار المزيفة ومكافحة التضليل بالذكاء الاصطناعي", duration: "50 د" }
            ],
            quiz: [
                {
                    q: "كيف يجب أن يتعامل صانع الأثر الرقمي مع مخرجات الذكاء الاصطناعي؟",
                    options: ["كمساعد للإلهام والتسريع مع التحقق والمراجعة الإنسانية الدائمة", "كنسخ ولصق أعمى دون أي تدقيق", "كبديل كلي عن الإبداع البشري", "رفضه تماماً"],
                    correct: 0
                }
            ]
        },
        {
            level: 6,
            title: "المستوى السادس: صناعة المحتوى الهادف والقيم الوطنية",
            icon: "flag",
            duration: "10 ساعات تدريبية",
            summary: "دمج التقنية بالرسالة السامية، التأثير المجتمعي المقاس، حماية الهوية الوطنية، وإدارة الحملات التحسيسية الكبرى.",
            lessons: [
                { title: "صياغة الرسائل الوطنية الملهمة للشباب", duration: "60 د" },
                { title: "قياس مؤشرات الأثر المجتمعي (Engagement & Impact)", duration: "60 د" },
                { title: "المشروع التخرجي: إنتاج حملة رقمية مكتملة الأركان", duration: "90 د" }
            ],
            quiz: [
                {
                    q: "ما هو جوهر مبادرة 'صناع الأثر الرقمي'؟",
                    options: ["تحويل شغف الشباب بالتقنية إلى مشاريع تنموية تخدم المجتمع والوطن", "جمع الإعجابات الوهمية فقط", "التصوير بدون هدف محدد", "التركيز على الترفيه السلبي"],
                    correct: 0
                }
            ]
        }
    ],

    studioItems: [
        {
            id: 1,
            title: "سحر واحات شتمة وتراث بسكرة الخالد",
            type: "video",
            author: "أحمد بن عمارة",
            wilaya: "بسكرة",
            commune: "شتمة",
            track: "صناعة المحتوى الرقمي",
            views: 4200,
            likes: 380,
            date: "2026-09-15",
            badge: "عمل متميز",
            duration: "2:45",
            desc: "وثائقي قصير بتقنيات التصوير الجوي يسلط الضوء على عراقة النخيل والهندسة المعمارية التراثية في بلدية شتمة بوابات الزيبان.",
            mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            poster: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            title: "بودكاست أثر: كيف تنقذ حياة في 3 دقائق؟",
            type: "podcast",
            author: "د. إيمان خذير",
            wilaya: "بسكرة",
            commune: "بسكرة",
            track: "المجال الطبي والتوعية الصحية",
            views: 1950,
            likes: 210,
            date: "2026-09-12",
            badge: "الأكثر تأثيراً",
            duration: "14:20",
            desc: "حلقة بودكاست توعوية تشرح بالصوت والخطوات المبسطة الإسعاف الأولي لحالات الاختناق وضربات الشمس في موسم الصيف.",
            mediaUrl: "https://actions.google.com/sounds/v1/water/rain_heavy.ogg",
            poster: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            title: "دليل غرس شجرة النخيل والمحافظة على الواحات",
            type: "design",
            author: "سفيان سعيدي",
            wilaya: "بسكرة",
            commune: "سيدي عقبة",
            track: "البيئة والتنمية المستدامة",
            views: 3100,
            likes: 412,
            date: "2026-09-08",
            badge: "إنفوجرافيك تعليمي",
            duration: "تصميم غرافيك",
            desc: "سلسلة ملصقات رقمية عالية الدقة تشرح أساليب السقي بالتنقيط والحفاظ على التربة الخصبة في مناطق الزيبان.",
            poster: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            title: "ثانية انتباه.. حياة أمان (فيديو سلامة مرورية)",
            type: "video",
            author: "ياسين بن زايد",
            wilaya: "بسكرة",
            commune: "طولقة",
            track: "أمن الطرق والسلامة المرورية",
            views: 5800,
            likes: 670,
            date: "2026-09-02",
            badge: "حملة وطنية",
            duration: "1:00",
            desc: "فيديو درامي قصير مدته دقيقة يجسد خطورة استعمال الهاتف النقال أثناء السياقة في المنعرجات الصحراوية.",
            mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
            poster: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 5,
            title: "شباب بسكرة المتطوع: حملة تنظيف وادي شتمة",
            type: "story",
            author: "فوج الكشافة الإسلامية شتمة",
            wilaya: "بسكرة",
            commune: "شتمة",
            track: "المواطنة والعمل التطوعي",
            views: 2800,
            likes: 330,
            date: "2026-08-28",
            badge: "قصة نجاح",
            duration: "تقرير مصور",
            desc: "تغطية ميدانية مصورة لجهود 45 شاباً متطوعاً في إعادة تهيئة المساحات الخضراء ومحيط الواحة ببلدية شتمة.",
            poster: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 6,
            title: "روبوت فرز التمور الذكي: مشروع شبابي واعد",
            type: "design",
            author: "أميرة رحماني",
            wilaya: "بسكرة",
            commune: "بسكرة",
            track: "المجال العلمي والتكنولوجي",
            views: 3400,
            likes: 490,
            date: "2026-08-20",
            badge: "ابتكار تكنولوجي",
            duration: "نموذج ثلاثي الأبعاد",
            desc: "تصميم وعرض تقني لنموذج أولي يعتمد على الذكاء الاصطناعي لفرز تمور دقلة نور بجامعة بسكرة.",
            poster: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
        }
    ],

    activeChallenge: {
        id: "challenge-sep-2026",
        title: "التحدي الشهري: دقيقة واحدة لصناعة الفارق في مجتمعك",
        month: "سبتمبر 2026",
        deadline: "2026-10-15",
        daysRemaining: 18,
        theme: "طرح مشكلة اجتماعية، بيئية أو سلوكية في محيطك وتقديم حل رقمي ملهم يبرز الوعي والمواطنة وقيم الهوية الوطنية.",
        criteria: [
            { name: "الإبداع والابتكار في التناول", weight: 20 },
            { name: "جودة الإنتاج البصري والصوتي", weight: 20 },
            { name: "أصالة الفكرة وحاجة المجتمع إليها", weight: 20 },
            { name: "وضوح الرسالة والتأثير القيمي", weight: 20 },
            { name: "قابلية القياس والأثر الميداني", weight: 20 }
        ],
        rewards: [
            { rank: "المركز الأول", prize: "درع التميز الرقمي + تجهيزات تصوير متكاملة + 100 نقطة أثر" },
            { rank: "المركز الثاني", prize: "ميكروفون لاسلكي احترافي + شهادة تقدير + 70 نقطة أثر" },
            { rank: "المركز الثالث", prize: "حامل ذكي ذو تثبيت ثلاثي + شهادة تقدير + 50 نقطة أثر" }
        ],
        submissionsCount: 38
    },

    pointsRules: [
        { action: "التسجيل في المنصة وتفعيل الحساب", points: 10, icon: "user-check" },
        { action: "حضور ورشة تكوينية حضورية أو تفاعلية", points: 10, icon: "calendar" },
        { action: "إتمام دورة واجتياز اختبار الأكاديمية", points: 10, icon: "award" },
        { action: "إنتاج محتوى رقمي معتمد في الاستوديو", points: 20, icon: "upload-cloud" },
        { action: "المشاركة في التحدي الشهري للمنصة", points: 10, icon: "target" },
        { action: "الفوز بأحد المراتب الأولى في التحدي", points: 30, icon: "trophy" },
        { action: "تدريب وتأطير شاب آخر في الورشة", points: 10, icon: "users" },
        { action: "إطلاق مبادرة مجتمعية ميدانية موثقة", points: 20, icon: "sparkles" }
    ],

    leaderboard: [
        { rank: 1, name: "أحمد بن عمارة", wilaya: "بسكرة", commune: "شتمة", track: "صناعة المحتوى الرقمي", points: 190, badge: "سفير الأثر الرقمي", avatar: "A" },
        { rank: 2, name: "د. إيمان خذير", wilaya: "بسكرة", commune: "بسكرة", track: "المجال الطبي والتوعية الصحية", points: 170, badge: "صانع أثر متميز", avatar: "E" },
        { rank: 3, name: "سفيان سعيدي", wilaya: "بسكرة", commune: "سيدي عقبة", track: "البيئة والتنمية المستدامة", points: 150, badge: "صانع أثر متميز", avatar: "S" },
        { rank: 4, name: "ياسين بن زايد", wilaya: "بسكرة", commune: "طولقة", track: "أمن الطرق والسلامة المرورية", points: 140, badge: "صانع أثر نشط", avatar: "Y" },
        { rank: 5, name: "أميرة رحماني", wilaya: "بسكرة", commune: "بسكرة", track: "المجال العلمي والتكنولوجي", points: 130, badge: "صانع أثر نشط", avatar: "A" },
        { rank: 6, name: "خالد قرين", wilaya: "الجزائر", commune: "الجزائر الوسطى", track: "صناعة المحتوى الرقمي", points: 120, badge: "صانع أثر نشط", avatar: "K" },
        { rank: 7, name: "نور الهدى جدي", wilaya: "قسنطينة", commune: "قسنطينة", track: "المواطنة والعمل التطوعي", points: 110, badge: "صانع أثر واعد", avatar: "N" },
        { rank: 8, name: "عبد الرؤوف دراجي", wilaya: "وهران", commune: "وهران", track: "صناعة المحتوى الرقمي", points: 100, badge: "صانع أثر واعد", avatar: "R" }
    ],

    partners: [
        {
            name: "وزارة الشباب والرياضة",
            type: "الممول والراعي الرسمي",
            role: "التأطير العام، الدعم المالي، الإشراف السيادي على الاستراتيجية الوطنية للشباب والإعلام الرقمي.",
            badge: "راعي رئيسي"
        },
        {
            name: "مديرية الشباب و الرياضة لولاية بسكرة",
            type: "المرافق المؤسساتي والتقني",
            role: "المرافقة الإدارية والميدانية، تسخير المرافق الشبانية، ومتابعة تنفيذ أنشطة المشروع بولاية بسكرة.",
            badge: "شريك استراتيجي"
        },
        {
            name: "جمعية الإبداع الثقافية شتمة",
            type: "الهيئة المنفذة للمشروع",
            role: "الإدارة التنفيذية، إعداد الورشات، إدارة استوديو الإنتاج، تأطير الشباب، والإشراف على منصة الأثر الرقمي.",
            badge: "المنفذ الميداني"
        },
        {
            name: "ديوان مؤسسات الشباب (ODEJ) بسكرة",
            type: "مؤسسة شبانية قطاعية",
            role: "تنسيق استقبال الشباب في المركبات الجوارية ودور الشباب وتوسيع رقعة الورشات التكوينية.",
            badge: "شريك ميداني"
        },
        {
            name: "دار الشباب شتمة",
            type: "مقر الاحتضان والورشات",
            role: "احتضان ورشات صناعة المحتوى، استوديو التسجيل الصوتي والمرئي، ومختبر الإنتاج الرقمي المشترك.",
            badge: "مقر احتضان"
        },
        {
            name: "الكشافة الإسلامية الجزائرية (أفواج بسكرة)",
            type: "شريك مجتمعي وتطوعي",
            role: "تجنيد الطاقات الشبابية، المشاركة الفعالة في حملات المواطنة، البيئة والتوعية الميدانية.",
            badge: "شريك مجتمعي"
        },
        {
            name: "جامعة محمد خيضر بسكرة",
            type: "شريك أكاديمي وعلمي",
            role: "الاستشارة العلمية، تأطير ورشات الذكاء الاصطناعي والتكنولوجيات الحديثة وتبادل الخبرات الطلابية.",
            badge: "شريك علمي"
        },
        {
            name: "المؤسسات الإعلامية والإذاعة الجهوية بسكرة",
            type: "شريك إعلامي وترويجي",
            role: "تغطية مخرجات المشروع، بث البرامج والبودكاست الشبابي المتميز وتسليط الضوء على المواهب الصاعدة.",
            badge: "شريك إعلامي"
        }
    ],

    biskraCommunes: [
        { name: "شتمة", registered: 65, workshops: 6, content: 22, youthCenter: "دار الشباب شتمة + استوديو جمعية الإبداع" },
        { name: "بسكرة (المركز)", registered: 85, workshops: 4, content: 15, youthCenter: "المركب الرياضي الجواري العالية + دار الشباب الحكيم سعدان" },
        { name: "سيدي عقبة", registered: 32, workshops: 2, content: 6, youthCenter: "دار الشباب سيدي عقبة" },
        { name: "طولقة", registered: 28, workshops: 1, content: 4, youthCenter: "المركب الجواري طولقة" },
        { name: "أولاد جلال", registered: 18, workshops: 1, content: 3, youthCenter: "دار الشباب أولاد جلال" },
        { name: "زريبة الوادي", registered: 12, workshops: 0, content: 2, youthCenter: "قاعة النشاطات الشبانية" }
    ],

    wilayas: [
        { code: "01", name: "أدرار", count: 4, workshops: 0, content: 1 },
        { code: "02", name: "الشلف", count: 3, workshops: 0, content: 0 },
        { code: "03", name: "الأغواط", count: 6, workshops: 1, content: 2 },
        { code: "04", name: "أم البواقي", count: 5, workshops: 0, content: 1 },
        { code: "05", name: "باتنة", count: 14, workshops: 1, content: 3 },
        { code: "06", name: "بجاية", count: 5, workshops: 0, content: 1 },
        { code: "07", name: "بسكرة", count: 142, workshops: 10, content: 32, active: true },
        { code: "08", name: "بشار", count: 4, workshops: 0, content: 1 },
        { code: "09", name: "البليدة", count: 6, workshops: 0, content: 1 },
        { code: "10", name: "البويرة", count: 3, workshops: 0, content: 0 },
        { code: "11", name: "تمنراست", count: 3, workshops: 0, content: 1 },
        { code: "12", name: "تبسة", count: 5, workshops: 0, content: 1 },
        { code: "13", name: "تلمسان", count: 6, workshops: 0, content: 1 },
        { code: "14", name: "تيارت", count: 4, workshops: 0, content: 0 },
        { code: "15", name: "تيزي وزو", count: 4, workshops: 0, content: 1 },
        { code: "16", name: "الجزائر", count: 24, workshops: 1, content: 4 },
        { code: "17", name: "الجلفة", count: 6, workshops: 0, content: 1 },
        { code: "18", name: "جيجل", count: 4, workshops: 0, content: 1 },
        { code: "19", name: "سطيف", count: 12, workshops: 1, content: 2 },
        { code: "20", name: "سعيدة", count: 3, workshops: 0, content: 0 },
        { code: "21", name: "سكيكدة", count: 5, workshops: 0, content: 1 },
        { code: "22", name: "سيدي بلعباس", count: 4, workshops: 0, content: 1 },
        { code: "23", name: "عنابة", count: 9, workshops: 0, content: 2 },
        { code: "24", name: "قالمة", count: 4, workshops: 0, content: 1 },
        { code: "25", name: "قسنطينة", count: 15, workshops: 1, content: 3 },
        { code: "26", name: "المدية", count: 4, workshops: 0, content: 1 },
        { code: "27", name: "مستغانم", count: 5, workshops: 0, content: 1 },
        { code: "28", name: "المسيلة", count: 8, workshops: 0, content: 1 },
        { code: "29", name: "معسكر", count: 4, workshops: 0, content: 0 },
        { code: "30", name: "ورقلة", count: 11, workshops: 1, content: 2 },
        { code: "31", name: "وهران", count: 16, workshops: 1, content: 3 },
        { code: "32", name: "البيض", count: 2, workshops: 0, content: 0 },
        { code: "33", name: "إليزي", count: 2, workshops: 0, content: 0 },
        { code: "34", name: "برج بوعريريج", count: 5, workshops: 0, content: 1 },
        { code: "35", name: "بومرداس", count: 5, workshops: 0, content: 1 },
        { code: "36", name: "الطارف", count: 3, workshops: 0, content: 0 },
        { code: "37", name: "تندوف", count: 2, workshops: 0, content: 0 },
        { code: "38", name: "تسمسيلت", count: 2, workshops: 0, content: 0 },
        { code: "39", name: "الوادي", count: 10, workshops: 0, content: 2 },
        { code: "40", name: "خنشلة", count: 6, workshops: 0, content: 1 },
        { code: "41", name: "سوق أهراس", count: 3, workshops: 0, content: 0 },
        { code: "42", name: "تيبازة", count: 5, workshops: 0, content: 1 },
        { code: "43", name: "ميلة", count: 4, workshops: 0, content: 1 },
        { code: "44", name: "عين الدفلى", count: 4, workshops: 0, content: 0 },
        { code: "45", name: "النعامة", count: 2, workshops: 0, content: 0 },
        { code: "46", name: "عين تموشنت", count: 3, workshops: 0, content: 0 },
        { code: "47", name: "غرداية", count: 7, workshops: 0, content: 1 },
        { code: "48", name: "غليزان", count: 3, workshops: 0, content: 0 },
        { code: "49", name: "تيميمون", count: 2, workshops: 0, content: 0 },
        { code: "50", name: "برج باجي مختار", count: 1, workshops: 0, content: 0 },
        { code: "51", name: "أولاد جلال", count: 18, workshops: 1, content: 3 },
        { code: "52", name: "بني عباس", count: 2, workshops: 0, content: 0 },
        { code: "53", name: "إن صالح", count: 2, workshops: 0, content: 0 },
        { code: "54", name: "إن قزام", count: 1, workshops: 0, content: 0 },
        { code: "55", name: "تقرت", count: 5, workshops: 0, content: 1 },
        { code: "56", name: "جانت", count: 2, workshops: 0, content: 0 },
        { code: "57", name: "المغير", count: 4, workshops: 0, content: 1 },
        { code: "58", name: "المنيعة", count: 2, workshops: 0, content: 0 }
    ],

    executionPhases: [
        {
            phase: 1,
            title: "المرحلة الأولى: التحضير، الحملات الإعلامية واقتناء التجهيزات",
            duration: "الشهر 1 - 2",
            status: "مكتملة بنجاح",
            badge: "100%",
            items: [
                "إطلاق الحملة الترويجية للمنصة في دور ومؤسسات الشباب",
                "فتح باب التسجيل الرقمي واستقطاب الطاقات الشبابية الشابة",
                "اقتناء كاميرات ومعدات الصوت والإضاءة لوحدة الإنتاج بدار الشباب شتمة",
                "تجهيز استوديو الأثر وقاعات التكوين التفاعلية"
            ]
        },
        {
            phase: 2,
            title: "المرحلة الثانية: انطلاق الورشات التكوينية الحضورية والرقمية",
            duration: "الشهر 3 - 4",
            status: "جارية حالياً",
            badge: "قيد التنفيذ (75%)",
            items: [
                "تنفيذ ورشات أساسيات التصوير الاحترافي والمونتاج بالموبايل",
                "تكوين المشاركين في مهارات السيناريو وبناء الرسائل الهادفة",
                "إطلاق دورات الذكاء الاصطناعي والإعلام الجديد",
                "إجراء الاختبارات الدورية ومنح الشهادات الإلكترونية الأولية"
            ]
        },
        {
            phase: 3,
            title: "المرحلة الثالثة: تفعيل مختبر الإنتاج والعمل الجماعي للفرق",
            duration: "الشهر 5 - 6",
            status: "قيد التفعيل",
            badge: "40%",
            items: [
                "توزيع الشباب المستفيدين إلى فرق إنتاج حسب المسارات الستة",
                "إشراف المؤطرين على تصوير ومونتاج الأفلام القصيرة والبودكاست",
                "رفع الأعمال الأولية على استوديو الأثر ومراجعتها من لجنة التحكيم",
                "تنظيم خرجات ميدانية لتوثيق واحات بسكرة والمبادرات التطوعية"
            ]
        },
        {
            phase: 4,
            title: "المرحلة الرابعة: إطلاق المسابقة الولائية وتقييم الأعمال الرقمية",
            duration: "الشهر 7 - 8",
            status: "مبرمجة",
            badge: "قريباً",
            items: [
                "فتح مسابقة 'تحدي صانع الأثر' على مستوى ولاية بسكرة والمستوى الوطني",
                "تقييم المشاريع وفق مصفوفة المعايير الخماسية (الإبداع، الجودة، الرسالة...)",
                "فتح تصويت الجمهور التفاعلي عبر المنصة لاختيار الأعمال الأكثر تأثيراً",
                "فرز قائمة الفائزين وإعداد لوحة الشرف الرسمية"
            ]
        },
        {
            phase: 5,
            title: "المرحلة الأخيرة: الملتقى الختامي والتكريم وإعداد التقارير النهائية",
            duration: "الشهر 9",
            status: "الختام",
            badge: "تتويج المشروع",
            items: [
                "تنظيم الملتقى الولائي الختامي تحت رعاية والي بسكرة ومديرية الشباب",
                "تكريم صُنّاع الأثر المتميزين وتوزيع الجوائز وشهادات الامتياز",
                "عرض شريط الإنجازات والأثر المجتمعي المحقق",
                "استخراج التقرير الإحصائي والمالي النهائي ورفعه إلى وزارة الشباب والرياضة"
            ]
        }
    ]
};

window.PLATFORM_DATA = PLATFORM_DATA;