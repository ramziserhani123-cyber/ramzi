/**
 * التطبيق الرئيسي لمنصة صُنّاع الأثر الرقمي
 * Main Orchestrator & State Management
 */

window.currentUser = {
    name: "أحمد بن عمارة",
    dob: "2002-05-14",
    phone: "0661234567",
    email: "ahmed.dz@impact.dz",
    wilaya: "بسكرة",
    commune: "شتمة",
    track: "صناعة المحتوى الرقمي",
    skillLevel: "متوسط",
    serialNumber: "DZ-DIM-2026-0847"
};

window.currentRole = "شاب صانع أثر"; // الأدوار: مدير وطني، مشرف ولائي، مشرف مؤسسة، مؤطر، شاب

const App = {
    activeTab: 'home',

    init() {
        this.loadStoredUser();
        this.bindNavigation();
        this.renderHomeHero();
        this.renderTracks();
        this.renderStudio('all');
        this.renderChallenge();
        this.renderPartners();
        this.renderPhases();
        this.initRoleSwitcher();
        this.initRegistrationForm();

        // تهيئة الموديولات الفرعية
        if (window.ImpactPoints) window.ImpactPoints.init();
        if (window.ImpactAcademy) window.ImpactAcademy.init();
        if (window.ImpactMap) window.ImpactMap.init();
        if (window.ImpactDashboard) window.ImpactDashboard.init();

        if (window.lucide) window.lucide.createIcons();
    },

    loadStoredUser() {
        const stored = localStorage.getItem('dim_current_user');
        if (stored) {
            try {
                window.currentUser = JSON.parse(stored);
            } catch (e) {
                console.error('Error parsing stored user', e);
            }
        }
    },

    bindNavigation() {
        const navLinks = document.querySelectorAll('[data-tab-target]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('data-tab-target');
                this.switchTab(target);
            });
        });
    },

    switchTab(tabId) {
        this.activeTab = tabId;

        // إخفاء كل التبويبات
        const tabContents = document.querySelectorAll('.tab-content-panel');
        tabContents.forEach(panel => {
            panel.classList.add('hidden');
        });

        // إظهار التبويب المطلوب
        const targetPanel = document.getElementById(`tab-panel-${tabId}`);
        if (targetPanel) {
            targetPanel.classList.remove('hidden');
        }

        // تحديث حالة أزرار الملاحة
        const navButtons = document.querySelectorAll('[data-tab-target]');
        navButtons.forEach(btn => {
            if (btn.getAttribute('data-tab-target') === tabId) {
                btn.classList.add('active', 'border-b-2', 'border-emerald-600', 'text-emerald-700', 'font-bold');
                btn.classList.remove('text-slate-600');
            } else {
                btn.classList.remove('active', 'border-b-2', 'border-emerald-600', 'text-emerald-700', 'font-bold');
                btn.classList.add('text-slate-600');
            }
        });

        // إذا كانت لوحة القيادة، نقوم بالتحقق من الصلاحية أو عرض شاشة القفل بكلمة السر biskra2020
        if (tabId === 'dashboard' && window.ImpactDashboard) {
            setTimeout(() => {
                window.ImpactDashboard.checkAccessAndInit();
            }, 50);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (window.lucide) window.lucide.createIcons();
    },

    // عرض قسم الهيرو والواجهة الرئيسية
    renderHomeHero() {
        const m = PLATFORM_DATA.info.metrics;
        const metricsContainer = document.getElementById('hero-metrics-container');
        if (metricsContainer) {
            metricsContainer.innerHTML = `
                <div class="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-emerald-100 shadow-sm text-center">
                    <span class="text-3xl font-extrabold text-emerald-700 block">${m.youthBeneficiaries}+</span>
                    <span class="text-xs text-slate-500 font-bold mt-1 block">شاب مستفيد</span>
                </div>
                <div class="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-emerald-100 shadow-sm text-center">
                    <span class="text-3xl font-extrabold text-blue-700 block">${m.trainingWorkshops}</span>
                    <span class="text-xs text-slate-500 font-bold mt-1 block">ورشة تكوينية</span>
                </div>
                <div class="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-emerald-100 shadow-sm text-center">
                    <span class="text-3xl font-extrabold text-purple-700 block">${m.producedContent}+</span>
                    <span class="text-xs text-slate-500 font-bold mt-1 block">محتوى هادف منتج</span>
                </div>
                <div class="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-emerald-100 shadow-sm text-center">
                    <span class="text-3xl font-extrabold text-amber-600 block">${m.strategicPartners}</span>
                    <span class="text-xs text-slate-500 font-bold mt-1 block">شركاء مؤسساتيون</span>
                </div>
            `;
        }
    },

    // استعراض المسارات الستة
    renderTracks() {
        const container = document.getElementById('tracks-grid-container');
        if (!container) return;

        let html = '';
        PLATFORM_DATA.tracks.forEach(track => {
            html += `
                <div class="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                    <div>
                        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <i data-lucide="${track.icon}" class="w-6 h-6"></i>
                        </div>
                        <h3 class="text-lg font-bold text-slate-800 mb-2">${track.name}</h3>
                        <p class="text-xs text-slate-600 mb-4 leading-relaxed">${track.desc}</p>
                        
                        <div class="border-t border-slate-100 pt-3 mb-4">
                            <h4 class="text-xs font-bold text-slate-700 mb-2">التخصصات والفروع:</h4>
                            <div class="flex flex-wrap gap-1.5">
                                ${track.subTracks.map(sub => `
                                    <span class="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                                        ${sub.name}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>المسجلون: <strong class="text-emerald-700">${track.metrics.registered}</strong></span>
                        <button onclick="App.selectTrackForRegistration('${track.name}')" class="text-emerald-700 font-bold hover:underline flex items-center gap-1">
                            <span>الانضمام للمسار</span>
                            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    },

    selectTrackForRegistration(trackName) {
        this.switchTab('register');
        const trackSelect = document.getElementById('reg-track-select');
        if (trackSelect) {
            trackSelect.value = trackName;
        }
    },

    // استعراض محتويات استوديو الأثر
    renderStudio(filter = 'all') {
        const container = document.getElementById('studio-gallery-container');
        if (!container) return;

        let items = PLATFORM_DATA.studioItems;
        if (filter !== 'all') {
            items = items.filter(it => it.type === filter);
        }

        let html = '';
        items.forEach(item => {
            html += `
                <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div class="relative h-48 overflow-hidden group">
                        <img src="${item.poster}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                            <span class="text-xs bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded-full">${item.badge}</span>
                        </div>
                        <button onclick="App.openMediaModal(${item.id})" class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                            <div class="w-12 h-12 rounded-full bg-white/90 text-emerald-800 flex items-center justify-center shadow-lg">
                                <i data-lucide="play" class="w-5 h-5 fill-current"></i>
                            </div>
                        </button>
                    </div>

                    <div class="p-5 flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                                <span>${item.commune} (${item.wilaya})</span>
                                <span>${item.date}</span>
                            </div>
                            <h3 class="font-bold text-slate-800 text-sm mb-2 line-clamp-1">${item.title}</h3>
                            <p class="text-xs text-slate-600 line-clamp-2 mb-3">${item.desc}</p>
                        </div>

                        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span class="font-semibold text-slate-700">بواسطة: ${item.author}</span>
                            <div class="flex items-center gap-3 text-slate-400">
                                <span class="flex items-center gap-1"><i data-lucide="eye" class="w-3.5 h-3.5"></i> ${item.views}</span>
                                <span class="flex items-center gap-1 text-rose-500"><i data-lucide="heart" class="w-3.5 h-3.5 fill-current"></i> ${item.likes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    },

    openMediaModal(itemId) {
        const item = PLATFORM_DATA.studioItems.find(i => i.id === itemId);
        if (!item) return;

        const modal = document.getElementById('media-player-modal');
        const content = document.getElementById('media-player-content');
        if (!modal || !content) return;

        let mediaDisplay = '';
        if (item.type === 'video') {
            mediaDisplay = `
                <div class="aspect-video bg-black rounded-xl overflow-hidden mb-4">
                    <video src="${item.mediaUrl}" poster="${item.poster}" controls class="w-full h-full object-contain"></video>
                </div>
            `;
        } else if (item.type === 'podcast') {
            mediaDisplay = `
                <div class="p-6 bg-slate-900 rounded-xl text-white mb-4 text-center">
                    <img src="${item.poster}" class="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-amber-400 object-cover">
                    <h4 class="font-bold text-base mb-2">${item.title}</h4>
                    <audio src="${item.mediaUrl}" controls class="w-full mt-2"></audio>
                </div>
            `;
        } else {
            mediaDisplay = `
                <div class="rounded-xl overflow-hidden mb-4 border border-slate-200">
                    <img src="${item.poster}" class="w-full max-h-[400px] object-cover">
                </div>
            `;
        }

        content.innerHTML = `
            ${mediaDisplay}
            <div class="space-y-2">
                <div class="flex items-center justify-between">
                    <span class="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">${item.track}</span>
                    <span class="text-xs text-slate-400">${item.commune} - ولاية ${item.wilaya}</span>
                </div>
                <h3 class="text-lg font-bold text-slate-800">${item.title}</h3>
                <p class="text-xs text-slate-600 leading-relaxed">${item.desc}</p>
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>صاحب العمل: <strong>${item.author}</strong></span>
                    <button onclick="alert('تم نسخ رابط العمل لمشاركته!');" class="text-emerald-700 font-bold hover:underline flex items-center gap-1">
                        <i data-lucide="share-2" class="w-4 h-4"></i>
                        <span>مشاركة العمل</span>
                    </button>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        if (window.lucide) window.lucide.createIcons();
    },

    closeMediaModal() {
        const modal = document.getElementById('media-player-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            const video = modal.querySelector('video');
            const audio = modal.querySelector('audio');
            if (video) video.pause();
            if (audio) audio.pause();
        }
    },

    // استعراض التحدي الشهري
    renderChallenge() {
        const c = PLATFORM_DATA.activeChallenge;
        const container = document.getElementById('active-challenge-container');
        if (!container) return;

        container.innerHTML = `
            <div class="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                <div class="relative z-10">
                    <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <span class="bg-amber-400 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                            ${c.month} — متبقي ${c.daysRemaining} يوماً
                        </span>
                        <span class="text-xs text-emerald-200">
                            المشاركات المسجلة حتى الآن: <strong>${c.submissionsCount} مشاركة</strong>
                        </span>
                    </div>

                    <h2 class="text-2xl md:text-3xl font-extrabold mb-3 text-white">${c.title}</h2>
                    <p class="text-sm text-slate-300 max-w-2xl mb-6 leading-relaxed">${c.theme}</p>

                    <!-- معايير التقييم الخماسية -->
                    <div class="mb-8 bg-white/10 p-5 rounded-2xl border border-white/15 backdrop-blur-sm">
                        <h4 class="text-xs font-bold text-amber-300 mb-3 flex items-center gap-1.5">
                            <i data-lucide="check-square" class="w-4 h-4"></i>
                            <span>مصفوفة التقييم والتحكيم الخماسية (100%):</span>
                        </h4>
                        <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
                            ${c.criteria.map(crit => `
                                <div class="bg-white/10 p-2.5 rounded-xl border border-white/10">
                                    <span class="font-bold text-white block text-sm">${crit.weight}%</span>
                                    <span class="text-[11px] text-slate-300 mt-0.5 block">${crit.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- الجوائز والمكافآت -->
                    <div class="mb-8">
                        <h4 class="text-xs font-bold text-amber-300 mb-3 flex items-center gap-1.5">
                            <i data-lucide="trophy" class="w-4 h-4"></i>
                            <span>جوائز التميز والتتويج:</span>
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                            ${c.rewards.map(r => `
                                <div class="bg-white/5 p-3.5 rounded-xl border border-white/10">
                                    <span class="text-amber-400 font-bold block text-sm">${r.rank}</span>
                                    <span class="text-slate-300 text-xs mt-1 block">${r.prize}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <button onclick="App.openChallengeSubmitModal()" class="btn-gold-dz px-8 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-2xl">
                        <i data-lucide="upload" class="w-5 h-5"></i>
                        <span>رفع وتسليم مشاركتك في التحدي (+10 نقاط فورية)</span>
                    </button>
                </div>
            </div>
        `;

        if (window.lucide) window.lucide.createIcons();
    },

    openChallengeSubmitModal() {
        const modal = document.getElementById('challenge-submit-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    },

    closeChallengeSubmitModal() {
        const modal = document.getElementById('challenge-submit-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    },

    submitChallengeWork(e) {
        e.preventDefault();
        alert('🎉 تم تسليم مشاركتك في التحدي الشهري بنجاح، وستخضع للتقييم من لجنة التحكيم. تم إضافة +10 نقاط لرصيدك!');
        if (window.ImpactPoints) {
            window.ImpactPoints.addPoints(10, 'المشاركة في التحدي الشهري للمنصة');
        }
        this.closeChallengeSubmitModal();
    },

    // استعراض شبكة الشركاء
    renderPartners() {
        const container = document.getElementById('partners-grid-container');
        if (!container) return;

        let html = '';
        PLATFORM_DATA.partners.forEach(p => {
            html += `
                <div class="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                            ${p.badge}
                        </span>
                        <span class="text-xs text-slate-400 font-medium">${p.type}</span>
                    </div>
                    <h3 class="font-bold text-slate-800 text-sm mb-2">${p.name}</h3>
                    <p class="text-xs text-slate-600 leading-relaxed">${p.role}</p>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    // استعراض مراحل تنفيذ المشروع الخمس
    renderPhases() {
        const container = document.getElementById('phases-timeline-container');
        if (!container) return;

        let html = '';
        PLATFORM_DATA.executionPhases.forEach((p, idx) => {
            const isCompleted = p.status.includes('مكتملة');
            const isCurrent = p.status.includes('جارية');

            html += `
                <div class="relative pr-8 pb-8 ${idx === PLATFORM_DATA.executionPhases.length - 1 ? '' : 'border-r-2 border-slate-200'}">
                    <div class="absolute -right-3 top-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        isCompleted ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-amber-500 text-white ring-4 ring-amber-100' : 'bg-slate-300 text-slate-700'
                    }">
                        ${isCompleted ? '✓' : p.phase}
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <h3 class="font-bold text-slate-800 text-sm">${p.title}</h3>
                            <div class="flex items-center gap-2">
                                <span class="text-xs text-slate-400">${p.duration}</span>
                                <span class="text-xs font-bold px-2 py-0.5 rounded-full ${
                                    isCompleted ? 'bg-emerald-100 text-emerald-800' : isCurrent ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                                }">${p.badge}</span>
                            </div>
                        </div>

                        <ul class="text-xs text-slate-600 space-y-1.5 mt-3">
                            ${p.items.map(it => `
                                <li class="flex items-center gap-2">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <span>${it}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    // تهيئة استمارة التسجيل الذكية
    initRegistrationForm() {
        const form = document.getElementById('impact-registration-form');
        if (!form) return;

        // ملء قائمة الولايات
        const wilayaSelect = document.getElementById('reg-wilaya-select');
        if (wilayaSelect) {
            wilayaSelect.innerHTML = PLATFORM_DATA.wilayas.map(w => `
                <option value="${w.name}" ${w.code === '07' ? 'selected' : ''}>${w.code} - ولاية ${w.name}</option>
            `).join('');
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-fullname').value;
            const dob = document.getElementById('reg-dob').value;
            const phone = document.getElementById('reg-phone').value;
            const email = document.getElementById('reg-email').value;
            const wilaya = document.getElementById('reg-wilaya-select').value;
            const commune = document.getElementById('reg-commune').value || 'شتمة';
            const track = document.getElementById('reg-track-select').value;
            const skillLevel = document.getElementById('reg-skill-level').value;

            const randomId = Math.floor(1000 + Math.random() * 9000);
            const serialNumber = `DZ-DIM-2026-${randomId}`;

            window.currentUser = {
                name, dob, phone, email, wilaya, commune, track, skillLevel, serialNumber
            };

            localStorage.setItem('dim_current_user', JSON.stringify(window.currentUser));

            // منح نقاط التسجيل الأولى (+10 نقاط)
            if (window.ImpactPoints) {
                window.ImpactPoints.addPoints(10, 'التسجيل الأولي وتفعيل حساب صانع الأثر الرقمي');
                window.ImpactPoints.renderIdCard();
            }

            alert(`🎉 مرحباً بك يا ${name}! تم إنشاء وتفعيل بطاقة صانع الأثر الرقمية الخاصة بك بنجاح، وأضيفت 10 نقاط ترحيبية إلى رصيدك.`);
            this.switchTab('points');
        });
    },

    // محاكي تبديل الأدوار الإدارية والصلاحيات
    initRoleSwitcher() {
        const select = document.getElementById('role-switcher-select');
        if (!select) return;

        select.addEventListener('change', (e) => {
            window.currentRole = e.target.value;
            const indicator = document.getElementById('current-role-indicator');
            if (indicator) {
                indicator.textContent = window.currentRole;
            }

            // إظهار/إخفاء الأدوات الخاصة بالمشرفين
            const adminOnlyElements = document.querySelectorAll('.admin-only-feature');
            if (window.currentRole === 'شاب صانع أثر') {
                adminOnlyElements.forEach(el => el.classList.add('opacity-50'));
            } else {
                adminOnlyElements.forEach(el => el.classList.remove('opacity-50'));
            }

            alert(`تم تبديل الصلاحية الحالية إلى: ${window.currentRole}`);
        });
    },

    // التبديل بين شاشات محاكي تطبيق الهاتف الذكي (Android / iOS)
    switchMobileAppTab(screenName) {
        const screens = ['home', 'courses', 'challenges', 'notifications', 'profile'];
        screens.forEach(s => {
            const el = document.getElementById(`m-screen-${s}`);
            const tabBtn = document.getElementById(`m-tab-${s}`);
            if (el) {
                if (s === screenName) el.classList.remove('hidden');
                else el.classList.add('hidden');
            }
            if (tabBtn) {
                if (s === screenName) {
                    tabBtn.className = "flex flex-col items-center text-emerald-700 font-bold";
                } else {
                    tabBtn.className = "flex flex-col items-center hover:text-emerald-700 text-slate-500";
                }
            }
        });
        if (window.lucide) window.lucide.createIcons();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

window.App = App;