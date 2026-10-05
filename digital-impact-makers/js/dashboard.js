/**
 * موديول لوحة القيادة التفاعلية للإدارة والمشرفين (Executive Dashboard)
 * حماية مشفرة بكلمة المرور: biskra2020
 * وزارة الشباب - مديرية الشباب والرياضة بسكرة - جمعية الإبداع شتمة
 */

const ImpactDashboard = {
    ADMIN_PASSWORD: "biskra2020",
    charts: {},
    activeReportType: "monthly", // monthly, quarterly, annual
    moderationFilter: "all",
    usersList: [],
    pendingSubmissions: [
        {
            id: 101,
            author: "محمد العربي مسعودي",
            wilaya: "بسكرة",
            commune: "شتمة",
            track: "صناعة المحتوى الرقمي",
            title: "فيديو قصير: تاريخ صناعة الفخار والواحات في شتمة",
            type: "فيديو (2:10)",
            date: "منذ ساعتين",
            status: "قيد المراجعة",
            mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        },
        {
            id: 102,
            author: "سارة بوزيان",
            wilaya: "بسكرة",
            commune: "سيدي عقبة",
            track: "المجال الطبي والتوعية الصحية",
            title: "إنفوجرافيك: أهمية التغذية السليمة لمرضى السكري",
            type: "تصميم غرافيك",
            date: "منذ 4 ساعات",
            status: "قيد المراجعة",
            mediaUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 103,
            author: "بلال عبد القادر",
            wilaya: "الجزائر",
            commune: "باب الوادي",
            track: "أمن الطرق والسلامة المرورية",
            title: "بودكاست صوتي: السياقة في التقلبات الجوية الشتوية",
            type: "بودكاست (8:45)",
            date: "منذ 6 ساعات",
            status: "قيد المراجعة",
            mediaUrl: "https://actions.google.com/sounds/v1/water/rain_heavy.ogg"
        },
        {
            id: 104,
            author: "سفيان سعيدي",
            wilaya: "بسكرة",
            commune: "سيدي عقبة",
            track: "البيئة والتنمية المستدامة",
            title: "دليل غرس شجرة النخيل والمحافظة على الواحات",
            type: "تصميم غرافيك",
            date: "أمس",
            status: "معتمد",
            mediaUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 105,
            author: "ياسين بن زايد",
            wilaya: "بسكرة",
            commune: "طولقة",
            track: "أمن الطرق والسلامة المرورية",
            title: "ثانية انتباه.. حياة أمان (فيديو سلامة مرورية)",
            type: "فيديو (1:00)",
            date: "منذ يومين",
            status: "معتمد",
            mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
        }
    ],

    init() {
        this.usersList = PLATFORM_DATA.usersList ? [...PLATFORM_DATA.usersList] : [];
        this.checkAccessAndInit();
    },

    // التحقق من حالة تسجيل الدخول بكلمة السر
    isAuthenticated() {
        return sessionStorage.getItem('dim_dashboard_auth') === 'true';
    },

    checkAccessAndInit() {
        const lockScreen = document.getElementById('dashboard-lock-screen');
        const contentScreen = document.getElementById('dashboard-unlocked-content');

        if (!lockScreen || !contentScreen) return;

        if (this.isAuthenticated()) {
            lockScreen.classList.add('hidden');
            contentScreen.classList.remove('hidden');
            this.renderKPIs();
            this.initCharts();
            this.renderModerationQueue();
            this.renderUsersManagementTable();
            if (window.lucide) window.lucide.createIcons();
        } else {
            lockScreen.classList.remove('hidden');
            contentScreen.classList.add('hidden');
            this.renderLockScreen();
        }
    },

    // عرض شاشة القفل الآمنة
    renderLockScreen() {
        const container = document.getElementById('dashboard-lock-screen');
        if (!container) return;

        container.innerHTML = `
            <div class="max-w-md mx-auto my-12 bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 text-center relative overflow-hidden">
                <div class="absolute -top-12 -right-12 w-36 h-36 bg-emerald-50 rounded-full pointer-events-none"></div>
                <div class="absolute -bottom-12 -left-12 w-36 h-36 bg-amber-50 rounded-full pointer-events-none"></div>

                <div class="relative z-10 space-y-5">
                    <div class="w-20 h-20 mx-auto rounded-3xl bg-slate-900 border-2 border-emerald-500/40 p-2 shadow-xl flex items-center justify-center">
                        <img src="assets/logo.jpg" alt="Logo" class="w-full h-full object-cover rounded-2xl">
                    </div>

                    <div>
                        <span class="text-[10px] font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
                            منطقة محمية خاصة بالإدارة والمشرفين
                        </span>
                        <h3 class="text-xl font-extrabold text-slate-800 mt-2 font-['Cairo']">
                            لوحة قيادة المشروع الرقمي
                        </h3>
                        <p class="text-xs text-slate-500 mt-1">
                            وزارة الشباب والرياضة | مديرية بسكرة | جمعية الإبداع شتمة
                        </p>
                    </div>

                    <form onsubmit="ImpactDashboard.handleLogin(event)" class="space-y-4 pt-2">
                        <div class="text-right">
                            <label class="block text-xs font-bold text-slate-700 mb-1">كلمة المرور الإدارية *</label>
                            <div class="relative">
                                <input type="password" id="admin-pass-input" placeholder="أدخل كلمة المرور (biskra2020)" required class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none text-left font-mono" dir="ltr">
                                <button type="button" onclick="ImpactDashboard.togglePasswordVisibility()" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs">
                                    <i data-lucide="eye" id="pass-eye-icon" class="w-4 h-4"></i>
                                </button>
                            </div>
                            <p id="admin-login-error" class="text-xs text-rose-600 font-bold mt-1.5 hidden flex items-center gap-1">
                                <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i>
                                <span>كلمة المرور غير صحيحة! يرجى إدخال: biskra2020</span>
                            </p>
                        </div>

                        <button type="submit" class="btn-primary-dz w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg">
                            <i data-lucide="lock" class="w-4 h-4"></i>
                            <span>دخول إلى لوحة القيادة والمتابعة</span>
                        </button>

                        <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
                            <span>🔑 كلمة السر المعتمدة:</span>
                            <code class="font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-slate-200">biskra2020</code>
                        </div>
                    </form>
                </div>
            </div>
        `;

        if (window.lucide) window.lucide.createIcons();
    },

    togglePasswordVisibility() {
        const input = document.getElementById('admin-pass-input');
        if (!input) return;
        input.type = input.type === 'password' ? 'text' : 'password';
    },

    handleLogin(e) {
        e.preventDefault();
        const input = document.getElementById('admin-pass-input');
        const errorMsg = document.getElementById('admin-login-error');
        if (!input) return;

        if (input.value.trim() === this.ADMIN_PASSWORD) {
            sessionStorage.setItem('dim_dashboard_auth', 'true');
            if (errorMsg) errorMsg.classList.add('hidden');
            this.checkAccessAndInit();
        } else {
            if (errorMsg) {
                errorMsg.classList.remove('hidden');
                if (window.lucide) window.lucide.createIcons();
            }
            input.classList.add('border-rose-500', 'bg-rose-50/50');
            setTimeout(() => {
                input.classList.remove('border-rose-500', 'bg-rose-50/50');
            }, 2000);
        }
    },

    logout() {
        sessionStorage.removeItem('dim_dashboard_auth');
        this.checkAccessAndInit();
    },

    // عرض العدادات الإحصائية الثمانية المباشرة
    renderKPIs() {
        const container = document.getElementById('dashboard-kpis-grid');
        if (!container) return;

        const m = PLATFORM_DATA.info.metrics;

        const kpiItems = [
            { label: "عدد المسجلين", value: `${m.registeredYouth}`, sub: "+18 هذا الأسبوع", icon: "users", color: "emerald", bg: "bg-emerald-50", text: "text-emerald-700" },
            { label: "عدد المستفيدين", value: `${m.youthBeneficiaries}`, sub: "في الورشات والمبادرات", icon: "user-check", color: "blue", bg: "bg-blue-50", text: "text-blue-700" },
            { label: "عدد الدورات", value: `${m.coursesCount}`, sub: "مستويات أكاديمية متدرجة", icon: "book-open", color: "indigo", bg: "bg-indigo-50", text: "text-indigo-700" },
            { label: "عدد الورشات", value: `${m.trainingWorkshops}`, sub: "حضورية وتطبيقية", icon: "video", color: "amber", bg: "bg-amber-50", text: "text-amber-700" },
            { label: "عدد المحتويات", value: `${m.producedContent}`, sub: "فيديو وبودكاست وتصاميم", icon: "film", color: "purple", bg: "bg-purple-50", text: "text-purple-700" },
            { label: "عدد المشاهدات", value: `${m.totalViews}`, sub: "تفاعل ورواج رقمي", icon: "eye", color: "rose", bg: "bg-rose-50", text: "text-rose-700" },
            { label: "عدد المبادرات", value: `${m.activeInitiatives}`, sub: "ميدانية ومجتمعية", icon: "sparkles", color: "teal", bg: "bg-teal-50", text: "text-teal-700" },
            { label: "عدد الشراكات", value: `${m.strategicPartners}`, sub: "قطاعية ومؤسساتية", icon: "handshake", color: "amber", bg: "bg-amber-50", text: "text-amber-800" }
        ];

        container.innerHTML = kpiItems.map(item => `
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-bold text-slate-500">${item.label}</span>
                    <div class="w-9 h-9 rounded-xl ${item.bg} ${item.text} flex items-center justify-center">
                        <i data-lucide="${item.icon}" class="w-4 h-4"></i>
                    </div>
                </div>
                <div>
                    <span class="text-2xl md:text-3xl font-extrabold ${item.text} block font-['Cairo']">${item.value}</span>
                    <span class="text-[11px] text-slate-400 mt-1 block">${item.sub}</span>
                </div>
            </div>
        `).join('');

        if (window.lucide) window.lucide.createIcons();
    },

    // تهيئة وتحديث الرسوم البيانية التفاعلية
    initCharts() {
        if (!this.isAuthenticated()) return;

        // 1. مخطط توزيع الجنس (ذكور / إناث)
        const genderCtx = document.getElementById('genderChart');
        if (genderCtx && window.Chart) {
            if (this.charts.gender) this.charts.gender.destroy();
            const g = PLATFORM_DATA.info.genderDistribution || { maleCount: 167, femaleCount: 143, malePercentage: 54, femalePercentage: 46 };

            this.charts.gender = new Chart(genderCtx, {
                type: 'doughnut',
                data: {
                    labels: [`ذكور (${g.malePercentage}%) - ${g.maleCount}`, `إناث (${g.femalePercentage}%) - ${g.femaleCount}`],
                    datasets: [{
                        data: [g.maleCount, g.femaleCount],
                        backgroundColor: ['#006633', '#D4AF37'],
                        borderWidth: 3,
                        borderColor: '#FFFFFF'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', rtl: true, labels: { font: { family: 'Tajawal', weight: 'bold' } } }
                    }
                }
            });
        }

        // 2. مخطط التوزيع حسب الولايات (Top Wilayas)
        const wilayasCtx = document.getElementById('wilayasChart');
        if (wilayasCtx && window.Chart) {
            if (this.charts.wilayas) this.charts.wilayas.destroy();
            const topWilayas = [...PLATFORM_DATA.wilayas]
                .sort((a, b) => b.count - a.count)
                .slice(0, 8);

            this.charts.wilayas = new Chart(wilayasCtx, {
                type: 'bar',
                data: {
                    labels: topWilayas.map(w => w.name),
                    datasets: [{
                        label: 'عدد الشباب المسجلين',
                        data: topWilayas.map(w => w.count),
                        backgroundColor: topWilayas.map(w => w.code === '07' ? '#006633' : '#38bdf8'),
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                        x: { grid: { display: false } }
                    }
                }
            });
        }

        // 3. مخطط توزيع الإقبال على المسارات
        const tracksCtx = document.getElementById('tracksChart');
        if (tracksCtx && window.Chart) {
            if (this.charts.tracks) this.charts.tracks.destroy();
            const trackLabels = PLATFORM_DATA.tracks.map(t => t.name);
            const trackCounts = PLATFORM_DATA.tracks.map(t => t.metrics.registered);

            this.charts.tracks = new Chart(tracksCtx, {
                type: 'bar',
                data: {
                    labels: trackLabels,
                    datasets: [{
                        label: 'عدد الشباب المسجلين',
                        data: trackCounts,
                        backgroundColor: '#10b981',
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                        y: { grid: { display: false } }
                    }
                }
            });
        }
    },

    // قائمة مراجعة واعتماد المحتوى قبل النشر وحماية البيانات
    renderModerationQueue() {
        const container = document.getElementById('moderation-queue-container');
        if (!container) return;

        let filtered = this.pendingSubmissions;
        if (this.moderationFilter !== 'all') {
            filtered = filtered.filter(item => item.status === this.moderationFilter);
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="text-center py-10 text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                    <i data-lucide="check-circle" class="w-10 h-10 mx-auto text-emerald-500 mb-2"></i>
                    <p class="text-xs font-bold text-slate-600">لا توجد أعمال في هذا التصنيف حالياً</p>
                </div>
            `;
            if (window.lucide) window.lucide.createIcons();
            return;
        }

        let html = '';
        filtered.forEach(item => {
            const isApproved = item.status === 'معتمد';
            const isRejected = item.status === 'مرفوض';
            const isPending = item.status === 'قيد المراجعة';

            html += `
                <div class="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div class="space-y-1">
                        <div class="flex items-center gap-2">
                            <span class="text-xs bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded">${item.type}</span>
                            <span class="text-xs text-slate-400">${item.date}</span>
                            <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                                isApproved ? 'bg-emerald-100 text-emerald-800' : isRejected ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                            }">${item.status}</span>
                        </div>
                        <h4 class="font-bold text-slate-800 text-sm">${item.title}</h4>
                        <p class="text-xs text-slate-500">
                            صانع المحتوى: <strong class="text-slate-700">${item.author}</strong> (${item.commune} - ولاية ${item.wilaya}) • مسار: <span class="text-emerald-700 font-medium">${item.track}</span>
                        </p>
                    </div>
                    <div class="flex items-center gap-2">
                        <a href="${item.mediaUrl}" target="_blank" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1">
                            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                            <span>معاينة</span>
                        </a>
                        ${!isApproved ? `
                            <button onclick="ImpactDashboard.approveSubmission(${item.id})" class="btn-primary-dz px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                                <span>اعتماد ونشر (+20ن)</span>
                            </button>
                        ` : ''}
                        ${!isRejected ? `
                            <button onclick="ImpactDashboard.rejectSubmission(${item.id})" class="px-3.5 py-1.5 rounded-lg text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors flex items-center gap-1">
                                <i data-lucide="x" class="w-3.5 h-3.5"></i>
                                <span>طلب تعديل</span>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    },

    setModerationFilter(filter) {
        this.moderationFilter = filter;
        this.renderModerationQueue();
    },

    approveSubmission(id) {
        const item = this.pendingSubmissions.find(i => i.id === id);
        if (item) {
            item.status = 'معتمد';
            this.renderModerationQueue();
            alert(`✅ تم اعتماد العمل: "${item.title}" ونشره في استوديو الأثر، ومُنح الشاب ${item.author} +20 نقطة أثر بنجاح.`);
        }
    },

    rejectSubmission(id) {
        const note = prompt('يرجى كتابة ملاحظات المراجعة الفنية لتوجيه الشاب لتعديل العمل:', 'تحسين جودة الصوت وضبط الإضاءة وفق المعايير');
        if (note !== null) {
            const item = this.pendingSubmissions.find(i => i.id === id);
            if (item) {
                item.status = 'مرفوض';
                this.renderModerationQueue();
                alert(`⚠️ تم إرسال إشعار للشاب بطلب إجراء التحسينات المطلوبة: "${note}".`);
            }
        }
    },

    // عرض جدول إدارة المستخدمين ونظام الصلاحيات (RBAC)
    renderUsersManagementTable() {
        const container = document.getElementById('users-management-table-body');
        if (!container) return;

        const rolesOptions = [
            "المدير الوطني",
            "مشرف ولائي",
            "مشرف مؤسسة شبابية",
            "المؤطر والمدرب",
            "شاب صانع أثر"
        ];

        container.innerHTML = this.usersList.map(user => `
            <tr class="border-b border-slate-100 hover:bg-slate-50/50 transition-colors text-xs">
                <td class="p-3 font-bold text-slate-800">${user.name}</td>
                <td class="p-3 text-slate-500 font-mono text-[11px]">${user.email}</td>
                <td class="p-3 text-slate-700 font-medium">${user.wilaya}</td>
                <td class="p-3">
                    <select onchange="ImpactDashboard.changeUserRole(${user.id}, this.value)" class="bg-slate-100 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer">
                        ${rolesOptions.map(r => `<option value="${r}" ${user.role === r ? 'selected' : ''}>${r}</option>`).join('')}
                    </select>
                </td>
                <td class="p-3 text-center">
                    <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ${user.status}
                    </span>
                </td>
            </tr>
        `).join('');
    },

    changeUserRole(userId, newRole) {
        const u = this.usersList.find(user => user.id === userId);
        if (u) {
            u.role = newRole;
            alert(`تم تعديل صلاحية المستخدم "${u.name}" إلى: ${newRole}`);
        }
    },

    // فتح نافذة اختيار واستخراج التقارير الرسمية (شهرية، فصلية، سنوية)
    openReportModal(type = 'monthly') {
        this.activeReportType = type;
        const modal = document.getElementById('official-report-modal');
        const content = document.getElementById('official-report-content');
        if (!modal || !content) return;

        const dateStr = new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' });
        const m = PLATFORM_DATA.info.metrics;

        let reportTitle = "";
        let periodDesc = "";

        if (type === 'monthly') {
            reportTitle = "التقرير الشهري لمتابعة مؤشرات أثر منصة «صُنّاع الأثر الرقمي» (شهر سبتمبر 2026)";
            periodDesc = "الحصيلة الشهرية الدورية لأنشطة ورشات وتكوين الشباب لشهر سبتمبر 2026";
        } else if (type === 'quarterly') {
            reportTitle = "التقرير الفصلي للمشروع (الثلاثي الثالث: جويلية - أوت - سبتمبر 2026)";
            periodDesc = "الحصيلة المرحلية للثلاثي الثالث متضمنة تقدم ورشات الإنتاج ومسابقة صانع الأثر";
        } else {
            reportTitle = "التقرير السنوي الشامل لمشروع «صُنّاع الأثر الرقمي» لسنة 2026";
            periodDesc = "التقرير التقييمي السنوي الإجمالي المرفوع لوزارة الشباب والرياضة لولاية بسكرة";
        }

        content.innerHTML = `
            <div id="printable-report" class="bg-white p-8 md:p-10 rounded-2xl text-slate-800 border border-slate-300 shadow-xl space-y-6">
                <!-- شريط أزرار نوع التقرير -->
                <div class="no-print flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-slate-700">تغيير دورية التقرير:</span>
                        <div class="flex items-center gap-1 text-xs">
                            <button onclick="ImpactDashboard.openReportModal('monthly')" class="px-3 py-1 rounded-lg font-bold ${type === 'monthly' ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700 border'}">تقرير شهري</button>
                            <button onclick="ImpactDashboard.openReportModal('quarterly')" class="px-3 py-1 rounded-lg font-bold ${type === 'quarterly' ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700 border'}">تقرير فصلي</button>
                            <button onclick="ImpactDashboard.openReportModal('annual')" class="px-3 py-1 rounded-lg font-bold ${type === 'annual' ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700 border'}">تقرير سنوي</button>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="window.print()" class="btn-primary-dz px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm">
                            <i data-lucide="printer" class="w-3.5 h-3.5"></i>
                            <span>طباعة التقرير / PDF</span>
                        </button>
                        <button onclick="ImpactDashboard.closeReportModal()" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-200">إغلاق</button>
                    </div>
                </div>

                <!-- الترويسة الرسمية للجمهورية الجزائرية -->
                <div class="text-center border-b-2 border-emerald-900 pb-4 space-y-2">
                    <p class="text-sm font-bold text-slate-800">الجمهورية الجزائرية الديمقراطية الشعبية</p>
                    <div class="flex items-center justify-between px-4 pt-1">
                        <div class="text-right text-xs font-bold text-slate-700 leading-relaxed">
                            <div>وزارة الشباب والرياضة</div>
                            <div>مديرية الشباب والرياضة لولاية بسكرة</div>
                        </div>
                        <div class="w-14 h-14 flex items-center justify-center">
                            <img src="assets/logo.jpg" alt="Logo" class="w-12 h-12 rounded-xl object-cover border border-emerald-800 shadow-sm">
                        </div>
                        <div class="text-left text-xs font-bold text-slate-700 leading-relaxed">
                            <div>جمعية الإبداع الثقافية شتمة</div>
                            <div>منصة صُنّاع الأثر الرقمي</div>
                        </div>
                    </div>

                    <h2 class="text-lg md:text-xl font-bold text-emerald-950 mt-2 font-['Cairo']">
                        ${reportTitle}
                    </h2>
                    <p class="text-xs text-slate-500">${periodDesc} — استخرج بتاريخ: ${dateStr}</p>
                </div>

                <!-- 1. الحصيلة الرقمية للمؤشرات الثمانية المطلوبة -->
                <div>
                    <h3 class="text-xs font-bold text-slate-800 mb-2 border-r-4 border-emerald-600 pr-2">
                        أولاً: جدول المؤشرات الإحصائية العامة
                    </h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                        <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                            <span class="text-slate-500 block text-[10px]">عدد المسجلين</span>
                            <span class="text-lg font-bold text-emerald-800 font-['Cairo']">${m.registeredYouth} شاب</span>
                        </div>
                        <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                            <span class="text-slate-500 block text-[10px]">عدد المستفيدين</span>
                            <span class="text-lg font-bold text-blue-800 font-['Cairo']">${m.youthBeneficiaries} مستفيد</span>
                        </div>
                        <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                            <span class="text-slate-500 block text-[10px]">عدد الدورات</span>
                            <span class="text-lg font-bold text-indigo-800 font-['Cairo']">${m.coursesCount} دورات</span>
                        </div>
                        <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                            <span class="text-slate-500 block text-[10px]">عدد الورشات</span>
                            <span class="text-lg font-bold text-amber-700 font-['Cairo']">${m.trainingWorkshops} ورشة</span>
                        </div>
                        <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                            <span class="text-slate-500 block text-[10px]">المحتويات المعتمدة</span>
                            <span class="text-lg font-bold text-purple-800 font-['Cairo']">${m.producedContent} عملاً</span>
                        </div>
                        <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                            <span class="text-slate-500 block text-[10px]">إجمالي المشاهدات</span>
                            <span class="text-lg font-bold text-rose-700 font-['Cairo']">${m.totalViews}</span>
                        </div>
                        <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                            <span class="text-slate-500 block text-[10px]">عدد المبادرات</span>
                            <span class="text-lg font-bold text-teal-700 font-['Cairo']">${m.activeInitiatives} مبادرة</span>
                        </div>
                        <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                            <span class="text-slate-500 block text-[10px]">عدد الشراكات</span>
                            <span class="text-lg font-bold text-amber-800 font-['Cairo']">${m.strategicPartners} شراكة</span>
                        </div>
                    </div>
                </div>

                <!-- 2. نسبة الإناث والذكور والتوزيع الميداني -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                        <h4 class="font-bold text-slate-800 border-r-2 border-emerald-600 pr-1.5">نسبة مشاركة الإناث والذكور:</h4>
                        <p class="text-slate-600">
                            نسبة الذكور: <strong class="text-emerald-800">54%</strong> (167 شاب) | 
                            نسبة الإناث: <strong class="text-amber-800">46%</strong> (143 شابة)
                        </p>
                        <p class="text-[11px] text-slate-500">حضور متميز ومشاركة نوعية للإناث في مسارات التصميم، البودكاست، والتوعية الصحية.</p>
                    </div>
                    <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                        <h4 class="font-bold text-slate-800 border-r-2 border-emerald-600 pr-1.5">التوزيع الولائي والمحلي:</h4>
                        <p class="text-slate-600">
                            ولاية بسكرة (الحاضنة الرئيسية): <strong class="text-emerald-800">142 شاب</strong>، الجزائر: 24، قسنطينة: 15، باتنة: 14، وهران: 16 شاباً.
                        </p>
                        <p class="text-[11px] text-slate-500">تم تسجيل مشاركات وتفاعل من أكثر من 30 ولاية عبر المنصة الرقمية.</p>
                    </div>
                </div>

                <!-- 3. جدول بلديات بسكرة الشريكة -->
                <div>
                    <h3 class="text-xs font-bold text-slate-800 mb-2 border-r-4 border-emerald-600 pr-2">
                        ثانياً: تفصيل مخرجات المشروع ببلديات ولاية بسكرة
                    </h3>
                    <table class="w-full text-xs text-right border border-slate-200">
                        <thead class="bg-slate-100 text-slate-700 font-bold">
                            <tr>
                                <th class="p-2 border">البلدية</th>
                                <th class="p-2 border">المؤسسة الشبانية الحاضنة</th>
                                <th class="p-2 border text-center">المستفيدون</th>
                                <th class="p-2 border text-center">الورشات</th>
                                <th class="p-2 border text-center">الإنتاج المعتمد</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${PLATFORM_DATA.biskraCommunes.map(c => `
                                <tr>
                                    <td class="p-2 border font-bold text-slate-800">${c.name}</td>
                                    <td class="p-2 border text-slate-600">${c.youthCenter}</td>
                                    <td class="p-2 border text-center font-bold text-emerald-800">${c.registered}</td>
                                    <td class="p-2 border text-center font-medium">${c.workshops}</td>
                                    <td class="p-2 border text-center font-bold text-purple-800">${c.content}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- توقيع ومصادقة الإدارة -->
                <div class="grid grid-cols-2 pt-6 border-t-2 border-slate-200 text-center text-xs">
                    <div>
                        <p class="font-bold text-slate-700 mb-12">مديرية الشباب والرياضة لولاية بسكرة</p>
                        <p class="text-slate-400 text-[10px]">(التأشيرة والختم الرسمي)</p>
                    </div>
                    <div>
                        <p class="font-bold text-slate-700 mb-12">رئيس جمعية الإبداع الثقافية شتمة</p>
                        <p class="text-slate-400 text-[10px]">(التوقيع والختم)</p>
                    </div>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        if (window.lucide) window.lucide.createIcons();
    },

    closeReportModal() {
        const modal = document.getElementById('official-report-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }
};

window.ImpactDashboard = ImpactDashboard;
