/**
 * موديول أكاديمية صُنّاع الأثر والشهادات الإلكترونية
 * Digital Impact Academy & Verifiable Certificate Engine
 */

const ImpactAcademy = {
    currentLevel: null,
    currentQuizAnswers: {},
    activeCertificateData: null,

    init() {
        this.renderLevelsGrid();
    },

    // عرض المستويات الستة للأكاديمية
    renderLevelsGrid() {
        const container = document.getElementById('academy-levels-container');
        if (!container) return;

        const levels = PLATFORM_DATA.academyLevels;
        let html = '';

        levels.forEach((lvl, idx) => {
            const isCompleted = idx === 0; // المستوى الأول مجتاز افتراضياً للتجربة
            html += `
                <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg border border-emerald-100">
                                0${lvl.level}
                            </span>
                            <span class="text-xs px-2.5 py-1 rounded-full font-bold ${
                                isCompleted 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-slate-100 text-slate-600'
                            }">
                                ${isCompleted ? '✓ مكتمل ومؤهل للشهادة' : 'متاح للتكوين'}
                            </span>
                        </div>

                        <h3 class="text-xl font-bold text-slate-800 mb-2">${lvl.title}</h3>
                        <p class="text-sm text-slate-600 mb-4 line-clamp-2">${lvl.summary}</p>

                        <div class="space-y-2 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div class="flex items-center justify-between text-xs text-slate-500">
                                <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> مدة التكوين:</span>
                                <span class="font-bold text-slate-700">${lvl.duration}</span>
                            </div>
                            <div class="flex items-center justify-between text-xs text-slate-500">
                                <span class="flex items-center gap-1"><i data-lucide="book-open" class="w-3.5 h-3.5"></i> الدروس المتاحة:</span>
                                <span class="font-bold text-slate-700">${lvl.lessons.length} محاور تدريبية</span>
                            </div>
                        </div>

                        <div class="border-t border-slate-100 pt-3">
                            <h4 class="text-xs font-bold text-slate-700 mb-2">المحاور الرئيسية:</h4>
                            <ul class="text-xs text-slate-600 space-y-1">
                                ${lvl.lessons.map(l => `<li class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>${l.title}</li>`).join('')}
                            </ul>
                        </div>
                    </div>

                    <div class="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                        <button onclick="ImpactAcademy.startQuiz(${lvl.level})" class="btn-primary-dz flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                            <i data-lucide="help-circle" class="w-4 h-4"></i>
                            <span>اجتياز الاختبار والتقييم</span>
                        </button>
                        ${isCompleted ? `
                            <button onclick="ImpactAcademy.previewCertificate('${lvl.title}')" class="btn-gold-dz py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1" title="استعراض الشهادة">
                                <i data-lucide="award" class="w-4 h-4"></i>
                                <span>الشهادة</span>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    },

    // فتح نافذة الاختبار التقييمي
    startQuiz(levelNumber) {
        const lvl = PLATFORM_DATA.academyLevels.find(l => l.level === levelNumber);
        if (!lvl || !lvl.quiz || lvl.quiz.length === 0) {
            alert('الاختبار لهذا المستوى قيد الإعداد والإثراء.');
            return;
        }

        this.currentLevel = lvl;
        this.currentQuizAnswers = {};

        const modal = document.getElementById('quiz-modal');
        const content = document.getElementById('quiz-modal-content');
        if (!modal || !content) return;

        let questionsHtml = '';
        lvl.quiz.forEach((q, qIdx) => {
            questionsHtml += `
                <div class="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p class="font-bold text-slate-800 text-sm mb-3">السؤال ${qIdx + 1}: ${q.q}</p>
                    <div class="space-y-2">
                        ${q.options.map((opt, optIdx) => `
                            <label class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white hover:bg-emerald-50/50 cursor-pointer transition-colors text-xs font-medium text-slate-700">
                                <input type="radio" name="quiz-q-${qIdx}" value="${optIdx}" onchange="ImpactAcademy.recordAnswer(${qIdx}, ${optIdx})" class="w-4 h-4 text-emerald-600 focus:ring-emerald-500">
                                <span>${opt}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        content.innerHTML = `
            <div class="mb-4">
                <span class="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                    تقييم الكفاءة والمهارة
                </span>
                <h3 class="text-xl font-bold text-slate-800 mt-2">${lvl.title}</h3>
                <p class="text-xs text-slate-500 mt-1">أجب عن الأسئلة بدقة لنيل شهادة الكفاءة الرقمية ونقاط الأثر (+10 نقاط).</p>
            </div>
            ${questionsHtml}
            <div id="quiz-result-area" class="hidden mb-4 p-4 rounded-xl text-center font-bold"></div>
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button onclick="ImpactAcademy.closeQuiz()" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100">إلغاء</button>
                <button onclick="ImpactAcademy.submitQuiz()" class="btn-primary-dz px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                    <i data-lucide="check" class="w-4 h-4"></i>
                    <span>تأكيد الإجابات والحصول على النتيجة</span>
                </button>
            </div>
        `;

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        if (window.lucide) window.lucide.createIcons();
    },

    recordAnswer(questionIdx, optionIdx) {
        this.currentQuizAnswers[questionIdx] = optionIdx;
    },

    closeQuiz() {
        const modal = document.getElementById('quiz-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    },

    // تصحيح الاختبار وحساب النتيجة
    submitQuiz() {
        const lvl = this.currentLevel;
        if (!lvl) return;

        let correctCount = 0;
        const total = lvl.quiz.length;

        lvl.quiz.forEach((q, idx) => {
            if (this.currentQuizAnswers[idx] === q.correct) {
                correctCount++;
            }
        });

        const percentage = Math.round((correctCount / total) * 100);
        const resultArea = document.getElementById('quiz-result-area');
        if (!resultArea) return;

        resultArea.classList.remove('hidden');

        if (percentage >= 50) {
            resultArea.className = "mb-4 p-4 rounded-xl text-center font-bold bg-emerald-50 border border-emerald-300 text-emerald-800";
            resultArea.innerHTML = `
                <div class="text-2xl mb-1">🎉 تهانينا! نجحت بامتياز</div>
                <div class="text-sm">لقد حققت نتيجة ${percentage}% (${correctCount} من ${total}). تم إضافة +10 نقاط أثر إلى رصيدك!</div>
                <button onclick="ImpactAcademy.closeQuiz(); ImpactAcademy.previewCertificate('${lvl.title}')" class="btn-gold-dz mt-3 px-5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2">
                    <i data-lucide="award" class="w-4 h-4"></i>
                    <span>إصدار وتحميل الشهادة الإلكترونية الرسمية فوراً</span>
                </button>
            `;
            if (window.ImpactPoints) {
                ImpactPoints.addPoints(10, 'إتمام دورة واجتياز اختبار الأكاديمية بنجاح');
            }
        } else {
            resultArea.className = "mb-4 p-4 rounded-xl text-center font-bold bg-rose-50 border border-rose-300 text-rose-800";
            resultArea.innerHTML = `
                <div class="text-lg mb-1">لم توفق هذه المرة (${percentage}%)</div>
                <div class="text-xs font-normal">يرجى مراجعة محاور الدورة وإعادة المحاولة لنيل الشهادة والنقاط.</div>
            `;
        }

        if (window.lucide) window.lucide.createIcons();
    },

    // عرض وتوليد الشهادة الإلكترونية المعتمدة
    previewCertificate(courseTitle) {
        const student = window.currentUser || {
            name: "أحمد بن عمارة",
            wilaya: "بسكرة",
            commune: "شتمة",
            track: "صناعة المحتوى الرقمي",
            serialNumber: "DZ-DIM-2026-0847"
        };

        const modal = document.getElementById('certificate-modal');
        const container = document.getElementById('certificate-render-target');
        if (!modal || !container) return;

        const dateStr = new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' });
        const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://dim-algeria.dz/verify/" + encodeURIComponent(student.serialNumber || 'DZ-2026-DIM-0847');

        container.innerHTML = `
            <div id="printable-certificate" class="official-certificate-container p-8 md:p-12 rounded-lg text-slate-800 relative bg-[#fffdf9] overflow-hidden">
                <!-- الديباجة الرسمية للجمهورية الجزائرية -->
                <div class="text-center border-b-2 border-emerald-800/30 pb-4 mb-6">
                    <div class="flex items-center justify-between mb-3 px-4">
                        <div class="text-right text-xs font-bold text-emerald-900 leading-relaxed">
                            <div>الجمهورية الجزائرية الديمقراطية الشعبية</div>
                            <div>وزارة الشبــــــــــاب والرياضة</div>
                            <div>مديرية الشباب والرياضة لولاية بسكرة</div>
                        </div>
                        <div class="w-16 h-16 flex items-center justify-center">
                            <img src="assets/logo.jpg" alt="Logo" class="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-700 shadow-md">
                        </div>
                        <div class="text-left text-xs font-bold text-emerald-900 leading-relaxed">
                            <div>منصة صُنّاع الأثر الرقمي</div>
                            <div>جمعية الإبداع الثقافية شتمة</div>
                            <div>مختبر الإعلام والإنتاج الشبابي</div>
                        </div>
                    </div>
                    <h2 class="text-2xl md:text-3xl font-extrabold text-emerald-900 font-['Amiri'] tracking-wide">
                        شهــــادة كفــــاءة وتكويـــن رقمـــي
                    </h2>
                    <p class="text-xs text-amber-700 font-bold mt-1">طاقات شبابية ... رسالة رقمية هادفة</p>
                </div>

                <!-- نص الشهادة الفخم -->
                <div class="text-center my-6 space-y-4">
                    <p class="text-sm text-slate-600 font-medium">
                        تُشهد جمعية الإبداع الثقافية شتمة بالتنسيق والمرافقة مع مديرية الشباب والرياضة لولاية بسكرة بأنّ الشاب(ة):
                    </p>
                    <div class="text-3xl md:text-4xl font-extrabold text-emerald-950 font-['Amiri'] py-2 border-b-2 border-dashed border-amber-400 inline-block px-12">
                        ${student.name}
                    </div>
                    <p class="text-xs text-slate-500 font-medium">
                        المقيم ببلدية <span class="font-bold text-slate-800">${student.commune}</span> (ولاية <span class="font-bold text-slate-800">${student.wilaya}</span>)
                    </p>
                    <p class="text-sm md:text-base text-slate-700 max-w-xl mx-auto leading-relaxed">
                        قد أتم(ت) بنجاح واقتدار كافة متطلبات البرنامج التدريبي في:
                        <br>
                        <span class="text-lg md:text-xl font-bold text-emerald-800 block mt-1">« ${courseTitle} »</span>
                        ضمن مسار: <strong class="text-amber-800">${student.track}</strong>
                    </p>
                    <p class="text-xs text-slate-500">
                        واجتاز(ت) كافة التقييمات المقررة بمشروع المنصة الوطنية لصناع الأثر الرقمي.
                    </p>
                </div>

                <!-- التوقيعات والأختام الرسمية ورمز التحقق -->
                <div class="grid grid-cols-3 items-center pt-6 mt-6 border-t-2 border-emerald-800/30 text-center">
                    <div>
                        <p class="text-xs font-bold text-slate-700 mb-1">مديرية الشباب والرياضة</p>
                        <p class="text-[11px] text-slate-500">ولاية بسكرة (المرافق)</p>
                        <div class="h-14 flex items-center justify-center">
                            <span class="text-emerald-800 font-bold text-xs italic">مصلحة نشاطات الشباب</span>
                        </div>
                    </div>

                    <div class="flex flex-col items-center justify-center">
                        <div class="certificate-seal">
                            <i data-lucide="award" class="w-6 h-6 text-amber-700"></i>
                        </div>
                        <span class="text-[10px] text-slate-400 font-mono mt-1">${student.serialNumber || 'DZ-2026-DIM-0847'}</span>
                    </div>

                    <div>
                        <p class="text-xs font-bold text-slate-700 mb-1">رئيس الجمعية</p>
                        <p class="text-[11px] text-slate-500">جمعية الإبداع الثقافية شتمة</p>
                        <div class="h-14 flex items-center justify-center">
                            <span class="text-emerald-800 font-bold text-xs italic font-['Amiri'] text-base">رئيس الجمعية</span>
                        </div>
                    </div>
                </div>

                <!-- شريط الأسفل: رمز الاستجابة السريعة وتاريخ الإصدار -->
                <div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
                    <div>تحريراً ببسكرة في: ${dateStr}</div>
                    <div class="flex items-center gap-2">
                        <span>شهادة رسمية موثقة إلكترونياً عبر البوابة الرقمية</span>
                        <img src="${qrUrl}" alt="QR" class="w-7 h-7 rounded border border-slate-200">
                    </div>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        if (window.lucide) window.lucide.createIcons();
    },

    closeCertificate() {
        const modal = document.getElementById('certificate-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    },

    printCertificate() {
        window.print();
    }
};

window.ImpactAcademy = ImpactAcademy;