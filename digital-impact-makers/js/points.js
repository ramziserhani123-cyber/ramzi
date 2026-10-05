/**
 * موديول نظام النقاط، الأوسمة، الرتب ولوحة الصدارة
 * Impact Points, Gamification & Leaderboard System
 */

const ImpactPoints = {
    userPoints: 120, // الرصيد الافتراضي
    currentRank: "صانع أثر متميز",
    history: [],

    init() {
        this.loadUserPoints();
        this.renderRules();
        this.renderLeaderboard('national');
        this.updateHeaderBadge();
        this.renderIdCard();
    },

    loadUserPoints() {
        const saved = localStorage.getItem('dim_user_points');
        if (saved) {
            this.userPoints = parseInt(saved, 10);
        }
        this.updateRank();
    },

    updateRank() {
        if (this.userPoints >= 150) {
            this.currentRank = "سفير الأثر الرقمي";
        } else if (this.userPoints >= 80) {
            this.currentRank = "صانع أثر متميز";
        } else if (this.userPoints >= 30) {
            this.currentRank = "صانع محتوى فاعل";
        } else {
            this.currentRank = "صانع أثر مبتدئ";
        }
    },

    addPoints(amount, reason) {
        this.userPoints += amount;
        localStorage.setItem('dim_user_points', this.userPoints);
        this.updateRank();
        this.updateHeaderBadge();
        this.renderIdCard();
        this.showToast(`+${amount} نقطة أثر!`, reason);
    },

    updateHeaderBadge() {
        const badge = document.getElementById('user-points-badge');
        if (badge) {
            badge.innerHTML = `
                <i data-lucide="award" class="w-4 h-4 text-amber-400"></i>
                <span class="font-extrabold text-amber-300">${this.userPoints}</span>
                <span class="text-[11px] text-emerald-200">نقطة أثر</span>
            `;
            if (window.lucide) window.lucide.createIcons();
        }
    },

    showToast(title, message) {
        let toast = document.getElementById('points-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'points-toast';
            toast.className = 'fixed bottom-6 left-6 z-50 bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-amber-400/50 flex items-center gap-4 transition-all duration-500 transform translate-y-20 opacity-0';
            document.body.appendChild(toast);
        }

        toast.innerHTML = `
            <div class="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center text-xl font-bold border border-amber-400/30">
                ★
            </div>
            <div>
                <div class="text-amber-300 font-bold text-sm">${title}</div>
                <div class="text-slate-300 text-xs mt-0.5">${message}</div>
            </div>
        `;

        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-20', 'opacity-0');
        }, 4000);
    },

    // عرض سلم احتساب النقاط
    renderRules() {
        const container = document.getElementById('points-rules-container');
        if (!container) return;

        const rules = PLATFORM_DATA.pointsRules;
        let html = '';

        rules.forEach(r => {
            html += `
                <div class="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 transition-colors shadow-sm">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                            <i data-lucide="${r.icon}" class="w-4 h-4"></i>
                        </div>
                        <span class="text-xs font-bold text-slate-700">${r.action}</span>
                    </div>
                    <span class="bg-amber-100 text-amber-900 font-extrabold text-xs px-2.5 py-1 rounded-full border border-amber-200">
                        +${r.points} نقطة
                    </span>
                </div>
            `;
        });

        container.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    },

    // عرض لوحة الصدارة مع إمكانية التصفية
    renderLeaderboard(filterType = 'national') {
        const container = document.getElementById('leaderboard-list-container');
        if (!container) return;

        let list = [...PLATFORM_DATA.leaderboard];

        if (filterType === 'biskra') {
            list = list.filter(item => item.wilaya === 'بسكرة');
        } else if (filterType === 'chetma') {
            list = list.filter(item => item.commune === 'شتمة');
        } else if (filterType === 'content') {
            list = list.filter(item => item.track === 'صناعة المحتوى الرقمي');
        }

        let html = '';
        list.forEach((item, idx) => {
            let rankBadge = '';
            if (idx === 0) rankBadge = '🥇';
            else if (idx === 1) rankBadge = '🥈';
            else if (idx === 2) rankBadge = '🥉';
            else rankBadge = `#${idx + 1}`;

            html += `
                <div class="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-100 hover:border-emerald-300 transition-all shadow-sm ${idx < 3 ? 'bg-amber-50/20' : ''}">
                    <div class="flex items-center gap-3">
                        <span class="w-8 text-center font-bold text-sm text-slate-500">${rankBadge}</span>
                        <div class="w-10 h-10 rounded-full bg-gradient-dz text-white font-bold flex items-center justify-center text-sm shadow-sm">
                            ${item.avatar}
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h4 class="font-bold text-slate-800 text-sm">${item.name}</h4>
                                <span class="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                                    ${item.badge}
                                </span>
                            </div>
                            <p class="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                                <span>${item.commune} (${item.wilaya})</span>
                                <span>•</span>
                                <span class="text-emerald-700">${item.track}</span>
                            </p>
                        </div>
                    </div>
                    <div class="text-left">
                        <div class="text-sm font-extrabold text-amber-600">${item.points}</div>
                        <div class="text-[10px] text-slate-400">نقطة أثر</div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    },

    // توليد وعرض بطاقة صانع الأثر الرقمية (Impact ID Card)
    renderIdCard() {
        const container = document.getElementById('user-id-card-preview');
        if (!container) return;

        const user = window.currentUser || {
            name: "أحمد بن عمارة",
            wilaya: "بسكرة",
            commune: "شتمة",
            track: "صناعة المحتوى الرقمي",
            serialNumber: "DZ-DIM-2026-0847"
        };

        const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://dim-algeria.dz/id/" + encodeURIComponent(user.serialNumber || 'DZ-2026-0847');

        container.innerHTML = `
            <div class="impact-id-card p-5 flex flex-col justify-between select-none relative">
                <!-- شريط الرأس للبطاقة -->
                <div class="flex items-center justify-between border-b border-white/15 pb-2">
                    <div class="flex items-center gap-2">
                        <img src="assets/logo.jpg" alt="Logo" class="w-8 h-8 rounded-full object-cover border border-amber-400/50 shadow-sm">
                        <div>
                            <div class="text-[11px] font-bold tracking-wide">صُنّاع الأثر الرقمي</div>
                            <div class="text-[8px] text-emerald-200">الجمهورية الجزائرية - وزارة الشباب</div>
                        </div>
                    </div>
                    <div class="text-left">
                        <span class="text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-bold">
                            عضوية معتمدة
                        </span>
                    </div>
                </div>

                <!-- محتوى البطاقة والبيانات -->
                <div class="flex items-center gap-4 my-auto">
                    <div class="w-16 h-16 rounded-xl bg-white/10 border border-white/25 flex items-center justify-center text-2xl font-bold text-amber-300 shadow-inner">
                        ${user.name.charAt(0)}
                    </div>
                    <div class="space-y-0.5">
                        <h3 class="text-base font-bold text-white">${user.name}</h3>
                        <p class="text-xs text-amber-300 font-medium">${user.track}</p>
                        <p class="text-[10px] text-emerald-200">${user.commune} — ولاية ${user.wilaya}</p>
                        <div class="flex items-center gap-2 pt-1">
                            <span class="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-200 font-mono">
                                ${user.serialNumber || 'DZ-DIM-2026-0847'}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- شريط الأسفل: الرتبة والنقاط ورمز التحقق -->
                <div class="flex items-center justify-between border-t border-white/15 pt-2">
                    <div class="flex items-center gap-3">
                        <div>
                            <span class="text-[8px] text-emerald-200 block">الرتبة الحالية</span>
                            <span class="text-xs font-bold text-amber-300">${this.currentRank}</span>
                        </div>
                        <div class="border-r border-white/20 pr-3">
                            <span class="text-[8px] text-emerald-200 block">النقاط</span>
                            <span class="text-xs font-extrabold text-white">${this.userPoints}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <img src="${qrUrl}" alt="QR" class="w-8 h-8 rounded bg-white p-0.5">
                    </div>
                </div>
            </div>
        `;
    }
};

window.ImpactPoints = ImpactPoints;