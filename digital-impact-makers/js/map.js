/**
 * موديول خريطة الأثر الجغرافية للجزائر وولاية بسكرة
 * Digital Impact Map Module
 */

const ImpactMap = {
    selectedWilaya: '07', // الافتراضي: بسكرة

    init() {
        this.renderWilayaStatsGrid();
        this.renderBiskraDetailModal();
        this.bindEvents();
    },

    bindEvents() {
        // البحث السريع بالولايات
        const searchInput = document.getElementById('wilaya-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterWilayas(e.target.value);
            });
        }
    },

    // عرض شبكة الولايات والإحصائيات التفاعلية
    renderWilayaStatsGrid() {
        const container = document.getElementById('wilayas-grid-container');
        if (!container) return;

        const wilayas = PLATFORM_DATA.wilayas;
        let html = '';

        wilayas.forEach(w => {
            const isBiskra = w.code === '07';
            html += 
                <div class="wilaya-card p-4 rounded-xl border transition-all duration-300 cursor-pointer " onclick="ImpactMap.selectWilaya('')">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-bold px-2 py-0.5 rounded ">
                            
                        </span>
                        <h4 class="font-bold text-slate-800 text-sm"></h4>
                        
                    </div>
                    <div class="grid grid-cols-3 gap-1 text-center text-xs pt-2 border-t border-slate-100">
                        <div class="bg-slate-50 p-1.5 rounded">
                            <span class="text-slate-400 block text-[10px]">الشباب</span>
                            <span class="font-bold text-emerald-700"></span>
                        </div>
                        <div class="bg-slate-50 p-1.5 rounded">
                            <span class="text-slate-400 block text-[10px]">الورشات</span>
                            <span class="font-bold text-blue-700"></span>
                        </div>
                        <div class="bg-slate-50 p-1.5 rounded">
                            <span class="text-slate-400 block text-[10px]">المحتوى</span>
                            <span class="font-bold text-purple-700"></span>
                        </div>
                    </div>
                </div>
            ;
        });

        container.innerHTML = html;
    },

    // اختيار ولاية وعرض تفاصيلها
    selectWilaya(code) {
        this.selectedWilaya = code;
        const w = PLATFORM_DATA.wilayas.find(item => item.code === code);
        if (!w) return;

        const infoBox = document.getElementById('selected-wilaya-info');
        if (infoBox) {
            infoBox.innerHTML = 
                <div class="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-extrabold border border-white/20 text-amber-300">
                            
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h3 class="text-2xl font-bold"></h3>
                                
                            </div>
                            <p class="text-emerald-200 text-sm mt-1">مؤشرات الأثر الرقمي والمشاريع الشبابية المسجلة عبر المنصة</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center gap-3">
                        <div class="bg-white/10 px-4 py-2 rounded-xl text-center backdrop-blur-sm border border-white/10 min-w-[90px]">
                            <span class="text-xs text-emerald-200 block">صناع الأثر</span>
                            <span class="text-xl font-bold text-white"></span>
                        </div>
                        <div class="bg-white/10 px-4 py-2 rounded-xl text-center backdrop-blur-sm border border-white/10 min-w-[90px]">
                            <span class="text-xs text-emerald-200 block">الورشات</span>
                            <span class="font-bold text-xl text-amber-300"></span>
                        </div>
                        <div class="bg-white/10 px-4 py-2 rounded-xl text-center backdrop-blur-sm border border-white/10 min-w-[90px]">
                            <span class="text-xs text-emerald-200 block">محتوى منتج</span>
                            <span class="font-bold text-xl text-white"></span>
                        </div>
                        
                    </div>
                </div>
            ;
            if (window.lucide) window.lucide.createIcons();
        }
    },

    // فتح نافذة استعراض بلديات ومؤسسات بسكرة وشتمة
    openBiskraModal() {
        const modal = document.getElementById('biskra-detail-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            this.renderBiskraDetailModal();
        }
    },

    closeBiskraModal() {
        const modal = document.getElementById('biskra-detail-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    },

    // تفاصيل بلديات ومؤسسات ولاية بسكرة
    renderBiskraDetailModal() {
        const container = document.getElementById('biskra-communes-container');
        if (!container) return;

        const communes = PLATFORM_DATA.biskraCommunes;
        let html = '';

        communes.forEach(c => {
            const isChetma = c.name === 'شتمة';
            html += 
                <div class="p-4 rounded-xl border transition-all ">
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full "></span>
                            <h4 class="font-bold text-slate-800"></h4>
                        </div>
                        
                    </div>
                    <p class="text-xs text-slate-600 mb-3 flex items-center gap-1">
                        <span class="font-semibold text-slate-500">المؤسسة الشبانية:</span>
                        <span class="text-emerald-800 font-medium"></span>
                    </p>
                    <div class="grid grid-cols-3 gap-2 text-center text-xs">
                        <div class="bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                            <span class="text-slate-400 block text-[10px]">الشباب</span>
                            <span class="font-bold text-emerald-700 text-sm"></span>
                        </div>
                        <div class="bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                            <span class="text-slate-400 block text-[10px]">الورشات</span>
                            <span class="font-bold text-blue-700 text-sm"></span>
                        </div>
                        <div class="bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                            <span class="text-slate-400 block text-[10px]">المحتوى</span>
                            <span class="font-bold text-purple-700 text-sm"></span>
                        </div>
                    </div>
                </div>
            ;
        });

        container.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    },

    // فلترة الولايات بالاسم أو الرقم
    filterWilayas(query) {
        const cards = document.querySelectorAll('.wilaya-card');
        const q = query.trim().toLowerCase();
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(q)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
};

window.ImpactMap = ImpactMap;