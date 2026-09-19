(function () {
  /* ============ CONFIG ============ */
  // Restaurant WhatsApp number in international format, no + and no spaces.
  // TODO(owner/developer): replace with the real Dar Al-Shawarma WhatsApp number.
  const WHATSAPP_NUMBER = "972592419577";

  // Number customers transfer the payment to (shown with the payment instructions).
  const PAYMENT_NUMBER = "0592419577";
  // Number customers can call with questions about an order.
  const CONTACT_NUMBER = "0592419577";
  // Prefix for the generated order reference, e.g. DS-260918-4823
  const ORDER_PREFIX = "DS";
  // Shop timezone — order date/time is stamped in local shop time.
  const SHOP_TIMEZONE = "Asia/Hebron";

  // Base folder for all real photography. Drop matching files here and they appear automatically —
  // see /assets/images/README.md for the exact filename each slot expects.
  const IMG_BASE = "assets/images/";
  function productImg(p) { return `${IMG_BASE}products/${p.id}.webp`; }
  function categoryImg(c) { return `${IMG_BASE}categories/${c.id}.webp`; }
  function galleryImg(n) { return `${IMG_BASE}gallery/gallery-${n}.webp`; }

  /* ============ DATA ============ */
  const CATEGORIES = [
    { id: 'chicken', ar: 'شاورما دجاج', en: 'Chicken Shawarma', grad: 'radial-gradient(120% 120% at 25% 15%, #FBAD5C, #F98F20 55%, #1B1613 100%)' },
    { id: 'beef', ar: 'شاورما لحمة', en: 'Beef Shawarma', grad: 'radial-gradient(120% 120% at 75% 15%, #FCA33A, #C96B12 55%, #1B1613 100%)' },
    { id: 'grills', ar: 'مشاوي', en: 'Grills', grad: 'radial-gradient(120% 120% at 25% 85%, #FBAD5C, #8E4B04 60%, #1B1613 100%)' },
    { id: 'hummus', ar: 'حمص وسلطات', en: 'Hummus & Salads', grad: 'radial-gradient(120% 120% at 75% 85%, #F98F20, #8E4B04 55%, #1B1613 100%)' },
    { id: 'drinks', ar: 'مشروبات', en: 'Drinks', grad: 'radial-gradient(120% 120% at 50% 30%, #F9B94D, #F98F20 55%, #1B1613 100%)' },
    { id: 'desserts', ar: 'حلويات', en: 'Desserts', grad: 'radial-gradient(120% 120% at 50% 70%, #F9B94D, #8E4B04 55%, #1B1613 100%)' }
  ];

  const PLACEHOLDER_GRAD = 'radial-gradient(120% 120% at 40% 30%, #3a2e22, #1B1613 70%)';

  const PRODUCTS = [
    { id: 'c1', cat: 'chicken', ar: 'شاورما دجاج خاصة', en: 'Special Chicken Shawarma', dAr: 'دجاج متبل ومشوي عالفحم، ثومية بيتية، وخبز طازة سخن.', dEn: 'Charcoal-grilled marinated chicken, house garlic sauce, fresh warm laffa.', price: 18, best: true, badgeAr: 'الأكثر طلبًا', badgeEn: 'Best Seller' },
    { id: 'c2', cat: 'chicken', ar: 'شاورما دجاج عادي', en: 'Classic Chicken Shawarma', dAr: 'شاورما دجاج بالطحينة والمخلل بخبز طازة.', dEn: 'Classic chicken shawarma with tahini and pickles in fresh bread.', price: 15 },
    { id: 'c3', cat: 'chicken', ar: 'صحن شاورما دجاج', en: 'Chicken Shawarma Plate', dAr: 'قطع دجاج مشوية عالفحم مع أرز وسلطة.', dEn: 'Charcoal-grilled chicken pieces served with rice and salad.', price: 28 },
    { id: 'b1', cat: 'beef', ar: 'شاورما لحمة مشكل', en: 'Mixed Beef Shawarma', dAr: 'لحمة بلدي طرية، بصل مشوي، وصوص طحينة خاص.', dEn: 'Tender beef, charred onions, and our special tahini sauce.', price: 22, best: true },
    { id: 'b2', cat: 'beef', ar: 'شاورما لحمة عادي', en: 'Classic Beef Shawarma', dAr: 'شاورما لحمة كلاسيكية بخبز طازة وصوص بيتي.', dEn: 'Classic beef shawarma in fresh bread with house sauce.', price: 20 },
    { id: 'b3', cat: 'beef', ar: 'صحن شاورما لحمة', en: 'Beef Shawarma Plate', dAr: 'شاورما لحمة مع أرز وسلطة وخبز.', dEn: 'Beef shawarma served with rice, salad and bread.', price: 32 },
    { id: 'g1', cat: 'grills', ar: 'صحن مشاوي دار الشاورما', en: 'Dar Al-Shawarma Grill Plate', dAr: 'تشكيلة مشاوي عالفحم، أرز، وسلطة خضرا طازة.', dEn: 'A charcoal-grilled mixed platter with rice and fresh salad.', price: 45, best: true, badgeAr: "اختيار الشيف", badgeEn: "Chef's Choice" },
    { id: 'g2', cat: 'grills', ar: 'كباب مشوي', en: 'Grilled Kebab', dAr: 'كباب لحمة مشوي عالفحم بالتوابل البيتية.', dEn: 'Charcoal-grilled beef kebab with house spices.', price: 30 },
    { id: 'g3', cat: 'grills', ar: 'شيش طاووق', en: 'Shish Tawook', dAr: 'قطع دجاج متبلة ومشوية عالفحم.', dEn: 'Marinated chicken skewers, charcoal-grilled.', price: 28 },
    { id: 'h1', cat: 'hummus', ar: 'صحن حمص باللحمة', en: 'Hummus with Meat', dAr: 'حمص ناعم، سمنة بلدي، وقطع لحمة مشوية فوق.', dEn: 'Silky hummus, house ghee, and grilled meat on top.', price: 20, best: true },
    { id: 'h2', cat: 'hummus', ar: 'حمص عادي', en: 'Plain Hummus', dAr: 'حمص بيتي ناعم بزيت الزيتون.', dEn: 'Smooth house hummus with olive oil.', price: 12 },
    { id: 'h3', cat: 'hummus', ar: 'متبل', en: 'Mutabbal', dAr: 'باذنجان مشوي مهروس بالطحينة.', dEn: 'Grilled eggplant mashed with tahini.', price: 12 },
    { id: 'h4', cat: 'hummus', ar: 'بطاط بيتي', en: 'House Fries', dAr: 'بطاط مقرمش، متبل بتوابلنا الخاصة.', dEn: 'Crispy fries tossed in our house spice blend.', price: 10, best: true },
    { id: 'h5', cat: 'hummus', ar: 'سلطة خضرا', en: 'Green Salad', dAr: 'خضار موسمية طازة مقطعة ناعم.', dEn: 'Fresh seasonal vegetables, finely chopped.', price: 8 },
    { id: 'd1', cat: 'drinks', ar: 'عيران', en: 'Ayran', dAr: 'لبن بارد منعش.', dEn: 'Cold, refreshing yogurt drink.', price: 5 },
    { id: 'd2', cat: 'drinks', ar: 'كولا', en: 'Cola', dAr: 'مشروب غازي بارد.', dEn: 'Chilled soft drink.', price: 5 },
    { id: 'd3', cat: 'drinks', ar: 'عصير ليمون نعنع', en: 'Lemon Mint Juice', dAr: 'ليمون طازة ونعنع بلدي.', dEn: 'Fresh lemon with garden mint.', price: 10 },
    { id: 'k1', cat: 'desserts', ar: 'كنافة نابلسية', en: 'Nabulsi Kunafa', dAr: 'جبنة طازة وقطر بلدي، تقدم سخنة.', dEn: 'Fresh cheese and house syrup, served warm.', price: 15, best: true },
    { id: 'k2', cat: 'desserts', ar: 'مهلبية', en: 'Muhallabia', dAr: 'حلا بيتي بارد بنكهة ماء الورد.', dEn: 'Cold house milk pudding with rose water.', price: 10 }
  ];

  const GALLERY = [
    { n: 1, cat: 'food' },
    { n: 2, cat: 'food' },
    { n: 3, cat: 'restaurant' },
    { n: 4, cat: 'food' },
    { n: 5, cat: 'packaging' },
    { n: 6, cat: 'seating' },
    { n: 7, cat: 'food' },
    { n: 8, cat: 'restaurant' },
    { n: 9, cat: 'packaging' },
    { n: 10, cat: 'food' },
    { n: 11, cat: 'seating' },
    { n: 12, cat: 'restaurant' }
  ];
  const GALLERY_TABS = [
    { id: 'all', ar: 'الكل', en: 'All' },
    { id: 'food', ar: 'الأكل', en: 'Food' },
    { id: 'restaurant', ar: 'المطعم', en: 'Restaurant' },
    { id: 'packaging', ar: 'التغليف', en: 'Packaging' },
    { id: 'seating', ar: 'الجلسات', en: 'Seating' }
  ];

  let currentLang = 'ar';
  let activeCategory = 'chicken';
  let activeGalleryTab = 'all';
  const selectorQty = {}; // per-product pending quantity on cards
  const cart = {}; // productId -> qty in the order

  /* ============ HELPERS ============ */
  function t(ar, en) { return currentLang === 'ar' ? ar : en; }
  function product(id) { return PRODUCTS.find(p => p.id === id); }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function dishCardHTML(p) {
    const grad = CATEGORIES.find(c => c.id === p.cat).grad;
    const qty = selectorQty[p.id] || 1;
    const badge = p.badgeAr ? `<span class="badge">${esc(t(p.badgeAr, p.badgeEn))}</span>` : '';
    const alt = esc(t(p.ar, p.en));
    return `
  <div class="dish-card" data-product="${p.id}">
    <div class="dish-media" style="background:${grad}">
      <img src="${productImg(p)}" alt="${alt}" loading="lazy" onerror="this.style.display='none'">
      ${badge}
    </div>
    <div class="dish-body">
      <div class="dish-top">
        <h3>${esc(t(p.ar, p.en))}</h3>
        <span class="dish-price">${p.price} ₪</span>
      </div>
      <p class="dish-desc">${esc(t(p.dAr, p.dEn))}</p>
      <div class="dish-foot">
        <div class="qty-stepper" data-id="${p.id}">
          <button type="button" class="qty-minus" aria-label="decrease">−</button>
          <span class="qty-val">${qty}</span>
          <button type="button" class="qty-plus" aria-label="increase">+</button>
        </div>
        <button type="button" class="add-btn" data-id="${p.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
          <span data-role="label">${esc(t('ضيف عالطلب', 'Add to Order'))}</span>
        </button>
      </div>
    </div>
  </div>`;
  }

  function renderBestSellers() {
    document.getElementById('bestSellersGrid').innerHTML = PRODUCTS.filter(p => p.best).map(dishCardHTML).join('');
  }

  function renderCatTiles() {
    document.getElementById('catTiles').innerHTML = CATEGORIES.slice(0, 4).map(c => `
    <button type="button" class="cat-card" data-cat="${c.id}" style="background:none">
      <div class="plate" style="background:${c.grad}"></div>
      <img src="${categoryImg(c)}" alt="${esc(t(c.ar, c.en))}" loading="lazy" onerror="this.style.display='none'">
      <div class="fade"></div>
      <div class="label"><h3>${esc(t(c.ar, c.en))}</h3><p>${PRODUCTS.filter(p => p.cat === c.id).length} ${esc(t('أصناف', 'items'))}</p></div>
    </button>
  `).join('');
    document.querySelectorAll('.cat-card').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-cat');
        renderMenu();
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function renderMenuTabs() {
    const tabsEl = document.getElementById('menuTabs');
    // keep the horizontal swipe position across re-renders
    const prevScroll = tabsEl.scrollLeft;
    tabsEl.innerHTML = CATEGORIES.map(c => `
    <button type="button" class="menu-tab ${c.id === activeCategory ? 'active' : ''}" data-cat="${c.id}">${esc(t(c.ar, c.en))}</button>
  `).join('');
    tabsEl.scrollLeft = prevScroll;
    // keep the selected category visible inside the pinned bar.
    // measured from rects so it works the same in RTL and LTR.
    const activeBtn = tabsEl.querySelector('.menu-tab.active');
    if (activeBtn) {
      const btn = activeBtn.getBoundingClientRect();
      const bar = tabsEl.getBoundingClientRect();
      const delta = (btn.left + btn.width / 2) - (bar.left + bar.width / 2);
      if (Math.abs(delta) > 1) tabsEl.scrollBy({ left: delta, behavior: 'smooth' });
    }
    document.querySelectorAll('.menu-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-cat');
        renderMenu();
        keepTabsInView();
      });
    });
  }

  /* Sticky category bar: if the bar is already pinned when you switch category,
     scroll so the new list starts right under it instead of jumping. */
  function keepTabsInView() {
    const tabsEl = document.getElementById('menuTabs');
    const navH = document.getElementById('nav').offsetHeight;
    if (tabsEl.getBoundingClientRect().top <= navH + 1) {
      const y = window.scrollY + tabsEl.getBoundingClientRect().top - navH;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  function renderMenu() {
    renderMenuTabs();
    document.getElementById('menuGrid').innerHTML = PRODUCTS.filter(p => p.cat === activeCategory).map(dishCardHTML).join('');
    if (typeof wireScrollReveal === 'function') wireScrollReveal();
  }

  function renderGalleryTabs() {
    document.getElementById('galleryTabs').innerHTML = GALLERY_TABS.map(g => `
    <button type="button" class="gallery-tab ${g.id === activeGalleryTab ? 'active' : ''}" data-tab="${g.id}">${esc(t(g.ar, g.en))}</button>
  `).join('');
    document.querySelectorAll('.gallery-tab').forEach(btn => {
      btn.addEventListener('click', () => { activeGalleryTab = btn.getAttribute('data-tab'); renderGallery(); });
    });
  }

  function renderGallery() {
    renderGalleryTabs();
    const items = GALLERY.filter(g => activeGalleryTab === 'all' || g.cat === activeGalleryTab);
    document.getElementById('galleryGrid').innerHTML = items.map(g => {
      const tabInfo = GALLERY_TABS.find(t2 => t2.id === g.cat);
      const label = esc(t(tabInfo.ar, tabInfo.en));
      return `<div class="gallery-tile" style="background:${PLACEHOLDER_GRAD}">
      <img src="${galleryImg(g.n)}" alt="${label}" loading="lazy" onerror="this.style.display='none'">
      <div class="hover"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></div>
      <span class="tag">${label}</span>
    </div>`;
    }).join('');
    if (typeof wireScrollReveal === 'function') wireScrollReveal();
  }

  /* ============ CART LOGIC ============ */
  function cartCount() { return Object.values(cart).reduce((a, b) => a + b, 0); }
  function cartTotal() { return Object.entries(cart).reduce((sum, [id, qty]) => { const p = product(id); return p ? sum + p.price * qty : sum; }, 0); }

  function addToCart(id, qty) {
    cart[id] = (cart[id] || 0) + qty;
    ensureOrderNo();
    saveCart();
    refreshCartUI();
    const btn = document.querySelector(`.add-btn[data-id="${id}"]`);
    if (btn) {
      btn.classList.add('added');
      const label = btn.querySelector('[data-role="label"]');
      const prevText = label.textContent;
      label.textContent = t('انضاف!', 'Added!');
      setTimeout(() => { btn.classList.remove('added'); label.textContent = prevText; }, 1100);
    }
    showToast(t(`تمت إضافة ${qty} × ${product(id)[currentLang === 'ar' ? 'ar' : 'en']}`, `Added ${qty} × ${product(id)[currentLang === 'ar' ? 'ar' : 'en']}`));
  }

  function changeCartQty(id, delta) {
    if (!cart[id]) return;
    cart[id] += delta;
    if (cart[id] <= 0) delete cart[id];
    saveCart();
    refreshCartUI();
  }

  function removeFromCart(id) { delete cart[id]; saveCart(); refreshCartUI(); }
  function clearCart() {
    Object.keys(cart).forEach(id => delete cart[id]);
    saveCart();
    refreshCartUI();
    showToast(t('تم حذف كل الأصناف من الطلب', 'All items removed from your order'));
  }

  function saveCart() {
    try { localStorage.setItem('dar_alshawarma_cart', JSON.stringify(cart)); } catch (e) { }
  }
  function loadCart() {
    try {
      const raw = localStorage.getItem('dar_alshawarma_cart');
      if (raw) {
        const parsed = JSON.parse(raw);
        Object.keys(parsed).forEach(id => {
          if (product(id) && Number.isFinite(parsed[id]) && parsed[id] > 0) {
            cart[id] = parsed[id];
          }
        });
      }
    } catch (e) { }
  }

  /* ============ ORDER REFERENCE + TIMESTAMP ============ */
  // One reference per order: created when the cart first fills, dropped when it empties.
  let orderNo = '';

  // Date/time broken into parts in shop time, with Latin digits so it stays
  // readable inside WhatsApp regardless of the customer's device locale.
  function shopParts(date) {
    let parts = {};
    try {
      const fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: SHOP_TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      });
      fmt.formatToParts(date).forEach(p => { parts[p.type] = p.value; });
    } catch (e) { }
    if (!parts.year) {
      const p2 = n => String(n).padStart(2, '0');
      parts = {
        year: String(date.getFullYear()), month: p2(date.getMonth() + 1), day: p2(date.getDate()),
        hour: p2(date.getHours()), minute: p2(date.getMinutes())
      };
    }
    return {
      yyyy: parts.year, yy: String(parts.year).slice(-2),
      mm: parts.month, dd: parts.day, hh: parts.hour, min: parts.minute
    };
  }

  function orderDateText(date) {
    const d = shopParts(date);
    return `${d.dd}/${d.mm}/${d.yyyy}`;
  }

  function orderTimeText(date) {
    const d = shopParts(date);
    let h = parseInt(d.hh, 10);
    const suffix = t(h < 12 ? 'ص' : 'م', h < 12 ? 'AM' : 'PM');
    h = h % 12 || 12;
    return `${h}:${d.min} ${suffix}`;
  }

  function ensureOrderNo() {
    if (!orderNo) {
      const d = shopParts(new Date());
      const rand = String(Math.floor(1000 + Math.random() * 9000));
      orderNo = `${ORDER_PREFIX}-${d.yy}${d.mm}${d.dd}-${rand}`;
      try { localStorage.setItem('dar_alshawarma_order_no', orderNo); } catch (e) { }
    }
    return orderNo;
  }
  function resetOrderNo() {
    orderNo = '';
    try { localStorage.removeItem('dar_alshawarma_order_no'); } catch (e) { }
  }
  function loadOrderNo() {
    try { orderNo = localStorage.getItem('dar_alshawarma_order_no') || ''; } catch (e) { }
  }

  function captureCustomerInfo() {
    const nameEl = document.getElementById('custName');
    const phoneEl = document.getElementById('custPhone');
    const addressEl = document.getElementById('custAddress');
    const notesEl = document.getElementById('custNotes');
    const orderTypeEl = document.querySelector('input[name="orderType"]:checked');
    return {
      name: nameEl ? nameEl.value : '',
      phone: phoneEl ? phoneEl.value : '',
      address: addressEl ? addressEl.value : '',
      notes: notesEl ? notesEl.value : '',
      orderType: orderTypeEl ? orderTypeEl.value : 'delivery'
    };
  }

  function renderDrawer() {
    const saved = captureCustomerInfo();
    const body = document.getElementById('drawerBody');
    const ids = Object.keys(cart);
    if (ids.length === 0) {
      body.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.2 11.4a2 2 0 002 1.6h7.6a2 2 0 002-1.6L20 8H6"/><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>
        <p>${esc(t('السلة فاضية لهلق — ضيف أصناف من المنيو.', 'Your cart is empty — add some dishes from the menu.'))}</p>
      </div>`;
      document.getElementById('sendOrderBtn').style.display = 'none';
      document.getElementById('drawerTotal').textContent = '0 ₪';
      return;
    }
    document.getElementById('sendOrderBtn').style.display = 'flex';
    let linesHTML = ids.map(id => {
      const p = product(id);
      const qty = cart[id];
      const cat = CATEGORIES.find(c => c.id === p.cat);
      return `
    <div class="cart-line" data-id="${id}">
      <div class="cart-line-icon" style="background:${cat.grad}"><img src="${productImg(p)}" alt="${esc(t(p.ar, p.en))}" loading="lazy" onerror="this.style.display='none'"></div>
      <div class="cart-line-info">
        <h4>${esc(t(p.ar, p.en))}</h4>
        <div class="unit">${p.price} ₪ ${esc(t('للحبة', 'each'))}</div>
        <button type="button" class="cart-line-remove" data-remove="${id}">${esc(t('حذف', 'Remove'))}</button>
      </div>
      <div class="cart-line-right">
        <div class="sub">${p.price * qty} ₪</div>
        <div class="cart-line-ctrl">
          <button type="button" data-dec="${id}" aria-label="${esc(t('إنقاص الكمية', 'Decrease quantity'))}">−</button>
          <span>${qty}</span>
          <button type="button" data-inc="${id}" aria-label="${esc(t('زيادة الكمية', 'Increase quantity'))}">+</button>
        </div>
      </div>
    </div>`;
    }).join('');

    const deliveryChecked = saved.orderType === 'delivery';
    const formHTML = `
  <div class="cart-form">
    <div>
      <label for="custName">${esc(t('الاسم', 'Name'))}</label>
      <input type="text" id="custName" placeholder="${esc(t('اسمك', 'Your name'))}" value="${esc(saved.name)}">
    </div>
    <div>
      <label for="custPhone">${esc(t('رقم الهاتف', 'Phone Number'))}</label>
      <input type="tel" id="custPhone" placeholder="059XXXXXXX" dir="ltr" value="${esc(saved.phone)}">
    </div>
    <div>
      <label id="orderTypeLabel">${esc(t('نوع الطلب', 'Order Type'))}</label>
      <div class="order-type" role="radiogroup" aria-labelledby="orderTypeLabel">
        <label><input type="radio" name="orderType" value="delivery" ${deliveryChecked ? 'checked' : ''}><span>${esc(t('توصيل', 'Delivery'))}</span></label>
        <label><input type="radio" name="orderType" value="pickup" ${deliveryChecked ? '' : 'checked'}><span>${esc(t('استلام من المحل', 'Pickup'))}</span></label>
      </div>
    </div>
    <div id="addressWrap" style="display:${deliveryChecked ? '' : 'none'}">
      <label for="custAddress">${esc(t('عنوان التوصيل', 'Delivery Address'))}</label>
      <input type="text" id="custAddress" placeholder="${esc(t('الحي، الشارع...', 'Neighborhood, street...'))}" value="${esc(saved.address)}">
    </div>
    <div>
      <label for="custNotes">${esc(t('ملاحظات إضافية', 'Additional Notes'))}</label>
      <textarea id="custNotes" placeholder="${esc(t('مثلاً: بدون بصل', 'e.g. no onions'))}">${esc(saved.notes)}</textarea>
    </div>
  </div>`;

    const now = new Date();
    const metaHTML = `
  <div class="order-meta">
    <div class="order-meta-row">
      <span>${esc(t('رقم الطلب', 'Order No.'))}</span>
      <b dir="ltr">${esc(ensureOrderNo())}</b>
    </div>
    <div class="order-meta-row">
      <span>${esc(t('التاريخ', 'Date'))}</span>
      <b dir="ltr">${esc(orderDateText(now))}</b>
    </div>
    <div class="order-meta-row">
      <span>${esc(t('الوقت', 'Time'))}</span>
      <b>${esc(orderTimeText(now))}</b>
    </div>
  </div>`;

    const payHTML = `
  <div class="pay-note">
    <h4>${esc(t('طريقة الدفع', 'Payment'))}</h4>
    <p>${esc(t('يرجى تحويل المبلغ وإرسال صورة الإيصال ليتم اعتماد الطلب.', 'Please transfer the amount and send a photo of the receipt so your order can be confirmed.'))}</p>
    <div class="pay-num">
      <span>${esc(t('رقم التحويل', 'Transfer to'))}</span>
      <b dir="ltr">${esc(PAYMENT_NUMBER)}</b>
    </div>
    <div class="pay-num">
      <span>${esc(t('للاستفسار', 'Questions'))}</span>
      <b dir="ltr">${esc(CONTACT_NUMBER)}</b>
    </div>
  </div>`;

    body.innerHTML = metaHTML + linesHTML + formHTML + payHTML;
    document.getElementById('drawerTotal').textContent = cartTotal() + ' ₪';

    body.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => changeCartQty(b.getAttribute('data-inc'), 1)));
    body.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => changeCartQty(b.getAttribute('data-dec'), -1)));
    body.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => removeFromCart(b.getAttribute('data-remove'))));

    document.querySelectorAll('input[name="orderType"]').forEach(r => {
      r.addEventListener('change', () => {
        document.getElementById('addressWrap').style.display = (r.value === 'pickup' && r.checked) ? 'none' : '';
      });
    });
  }

  function refreshCartUI() {
    const count = cartCount();
    const total = cartTotal();
    // an empty cart ends the order — the next one gets a fresh reference
    if (count === 0) resetOrderNo();
    // written defensively: one missing node must never take the whole cart down
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const badge = document.getElementById('cartBadge');
    if (badge) { badge.textContent = count; badge.classList.toggle('show', count > 0); }
    setText('stickyCount', count);
    setText('stickyTotal', total + ' ₪');
    const sticky = document.getElementById('mobileSticky');
    if (sticky) sticky.classList.toggle('show', count > 0);
    document.body.classList.toggle('has-cart-sticky', count > 0);
    const clearBtn = document.getElementById('clearCartBtn');
    if (clearBtn) clearBtn.style.display = count > 0 ? 'inline' : 'none';
    renderDrawer();
  }

  /* ============ WHATSAPP MESSAGE ============ */
  function buildWhatsAppMessage() {
    const name = (document.getElementById('custName') || {}).value.trim() || '';
    const phone = (document.getElementById('custPhone') || {}).value.trim() || '';
    const orderTypeEl = document.querySelector('input[name="orderType"]:checked');
    const orderType = orderTypeEl ? orderTypeEl.value : 'delivery';
    const address = (document.getElementById('custAddress') || {}).value.trim() || '';
    const notes = (document.getElementById('custNotes') || {}).value.trim() || '';
    const divider = '----------------------------';

    const now = new Date();

    let lines = [];
    lines.push(t('*دار الشاورما — طلب جديد*', '*Dar Al-Shawarma — New Order*'));
    lines.push(`${t('رقم الطلب', 'Order No.')}: ${ensureOrderNo()}`);
    lines.push(`${t('التاريخ', 'Date')}: ${orderDateText(now)}`);
    lines.push(`${t('الوقت', 'Time')}: ${orderTimeText(now)}`);
    lines.push(divider);

    // customer info block (only shown if at least one field was filled)
    if (name || phone || (orderType === 'delivery' && address) || notes) {
      lines.push(t('*بيانات الزبون*', '*Customer Details*'));
      if (name) lines.push(`${t('الاسم', 'Name')}: ${name}`);
      if (phone) lines.push(`${t('الهاتف', 'Phone')}: ${phone}`);
      lines.push(`${t('نوع الطلب', 'Order Type')}: ${orderType === 'delivery' ? t('توصيل', 'Delivery') : t('استلام من المحل', 'Pickup')}`);
      if (orderType === 'delivery' && address) lines.push(`${t('العنوان', 'Address')}: ${address}`);
      if (notes) lines.push(`${t('ملاحظات', 'Notes')}: ${notes}`);
      lines.push(divider);
    } else {
      lines.push(`${t('نوع الطلب', 'Order Type')}: ${orderType === 'delivery' ? t('توصيل', 'Delivery') : t('استلام من المحل', 'Pickup')}`);
      lines.push(divider);
    }

    lines.push(t('*تفاصيل الطلب*', '*Order Details*'));
    let i = 1;
    Object.keys(cart).forEach(id => {
      const p = product(id);
      const qty = cart[id];
      const sub = p.price * qty;
      lines.push(`${i}. ${t(p.ar, p.en)} — ${qty} × ${p.price}₪ = ${sub}₪`);
      i++;
    });
    lines.push(divider);
    lines.push(t(`*الإجمالي: ${cartTotal()}₪*`, `*Total: ${cartTotal()}₪*`));
    lines.push(divider);

    // payment instructions
    lines.push(t('*طريقة الدفع*', '*Payment*'));
    lines.push(t(
      `يرجى تحويل المبلغ على الرقم: ${PAYMENT_NUMBER}`,
      `Please transfer the amount to: ${PAYMENT_NUMBER}`
    ));
    lines.push(t(
      'وإرسال صورة الإيصال ليتم اعتماد الطلب ✅',
      'and send a photo of the receipt so the order can be confirmed ✅'
    ));
    lines.push(`${t('للاستفسار', 'Questions')}: ${CONTACT_NUMBER}`);
    lines.push('');
    lines.push(t('شكرًا إلكم 🙏', 'Thank you 🙏'));

    return lines.join('\n');
  }

  function waLink(msg) {
    return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`;
  }

  function sendOrder() {
    if (cartCount() === 0) {
      showToast(t('السلة فاضية — ضيف صنف قبل ما تبعت الطلب.', 'Your cart is empty — add an item before sending.'));
      return;
    }
    const msg = buildWhatsAppMessage();
    window.location.href = waLink(msg);
  }

  /* ============ DRAWER OPEN/CLOSE ============ */
  function openDrawer() {
    document.getElementById('overlay').classList.add('open');
    document.getElementById('drawer').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    document.getElementById('overlay').classList.remove('open');
    document.getElementById('drawer').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ============ TOAST ============ */
  let toastTimer;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg><span>${esc(msg)}</span>`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  /* ============ LANGUAGE ============ */
  function applyStaticLang(lang) {
    const html = document.documentElement;
    html.lang = lang; html.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.getElementById('langBtn').textContent = (lang === 'ar') ? 'EN' : 'AR';
    document.querySelectorAll('[data-ar]').forEach(el => {
      const val = el.getAttribute('data-' + lang);
      // never overwrite a wrapper that holds other elements — textContent would
      // delete them (that is how the cart counter used to disappear on switch)
      if (val !== null && !el.firstElementChild) el.textContent = val;
    });
    document.querySelectorAll('[data-ar-html]').forEach(el => {
      const val = el.getAttribute('data-' + lang + '-html');
      if (val !== null) el.innerHTML = val;
    });
    document.querySelectorAll('[data-ar-placeholder]').forEach(el => {
      const val = el.getAttribute('data-' + lang + '-placeholder');
      if (val !== null) el.setAttribute('placeholder', val);
    });
  }

  /* ============ BEST SELLERS BANNER (carousel) ============ */
  const BSB_SLIDES = [
    { id: 'c1', badgeAr: 'الأكثر طلبًا', badgeEn: 'BEST SELLER' },
    { id: 'g1', badgeAr: 'المفضل عند الزباين', badgeEn: 'CUSTOMER FAVORITE' },
    { id: 'b1', badgeAr: 'لا تفوّتها', badgeEn: "DON'T MISS IT" }
  ];
  let bsbIndex = 0;
  let bsbTimer = null;
  const bsbReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function bsbSlideHTML(slide, i) {
    const p = product(slide.id);
    if (!p) return '';
    const alt = esc(t(p.ar, p.en));
    return `
  <article class="bsb-slide${i === 0 ? ' is-active' : ''}" data-index="${i}" aria-roledescription="slide" aria-label="${i + 1} / ${BSB_SLIDES.length}" ${i === 0 ? '' : 'aria-hidden="true"'}>
    <div class="bsb-media">
      <img src="${productImg(p)}" alt="${alt}" loading="lazy" onerror="this.style.display='none'">
    </div>
    <div class="bsb-content">
      <span class="bsb-badge">${esc(t(slide.badgeAr, slide.badgeEn))}</span>
      <h3>${esc(t(p.ar, p.en))}</h3>
      <p>${esc(t(p.dAr, p.dEn))}</p>
      <div class="bsb-meta">
        <span class="dish-price">${p.price} ₪</span>
        <a href="#menu" class="btn btn-primary btn-sm">${esc(t('اطلب هلق', 'Order Now'))}</a>
      </div>
    </div>
  </article>`;
  }

  function renderBSB() {
    const track = document.getElementById('bsbTrack');
    const dots = document.getElementById('bsbDots');
    if (!track || !dots) return;
    track.innerHTML = BSB_SLIDES.map((s, i) => bsbSlideHTML(s, i)).join('');
    dots.innerHTML = BSB_SLIDES.map((s, i) =>
      `<button type="button" class="bsb-dot${i === 0 ? ' is-active' : ''}" data-index="${i}" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}" aria-label="${esc(t('اذهب للشريحة', 'Go to slide'))} ${i + 1}"></button>`
    ).join('');
  }

  function bsbGoTo(index) {
    const slides = document.querySelectorAll('#bsbTrack .bsb-slide');
    const dots = document.querySelectorAll('#bsbDots .bsb-dot');
    if (!slides.length) return;
    const n = slides.length;
    const prevIndex = bsbIndex;
    bsbIndex = (index + n) % n;
    slides.forEach((el, i) => {
      const computeOffset = (from) => {
        let off = i - from;
        if (off > n / 2) off -= n;
        if (off < -n / 2) off += n;
        return off;
      };
      const prevOffset = computeOffset(prevIndex);
      const offset = computeOffset(bsbIndex);
      if (Math.abs(offset - prevOffset) >= 2) {
        // this slide needs to jump to the opposite off-screen side — snap instantly
        // instead of animating it visibly across the center of the banner.
        el.style.transition = 'none';
        el.style.setProperty('--bsb-offset', offset);
        void el.offsetHeight; // force reflow so the snap applies before re-enabling the transition
        el.style.transition = '';
      } else {
        el.style.setProperty('--bsb-offset', offset);
      }
      el.classList.toggle('is-active', i === bsbIndex);
      el.setAttribute('aria-hidden', i === bsbIndex ? 'false' : 'true');
    });
    dots.forEach((el, i) => {
      el.classList.toggle('is-active', i === bsbIndex);
      el.setAttribute('aria-selected', i === bsbIndex ? 'true' : 'false');
    });
  }
  function bsbNext() { bsbGoTo(bsbIndex + 1); }
  function bsbPrev() { bsbGoTo(bsbIndex - 1); }

  function bsbStopAutoplay() { if (bsbTimer) { clearInterval(bsbTimer); bsbTimer = null; } }
  function bsbStartAutoplay() {
    if (bsbReducedMotion) return;
    bsbStopAutoplay();
    bsbTimer = setInterval(bsbNext, 2700);
  }

  function refreshBSB() {
    renderBSB();
    bsbGoTo(bsbIndex);
  }

  /* ============ NAV SCROLL-SPY ============ */
  function initNavScrollSpy() {
    const sectionIds = ['top', 'bestsellers', 'menu', 'story', 'offer', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    function setActive(id) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }

    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { setActive(entry.target.id); }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(sec => spy.observe(sec));
  }

  function initBSB() {
    const banner = document.getElementById('bsbBanner');
    if (!banner) return;

    document.getElementById('bsbNext').addEventListener('click', () => { bsbNext(); bsbStartAutoplay(); });
    document.getElementById('bsbPrev').addEventListener('click', () => { bsbPrev(); bsbStartAutoplay(); });
    document.getElementById('bsbDots').addEventListener('click', (e) => {
      const dot = e.target.closest('.bsb-dot');
      if (!dot) return;
      bsbGoTo(parseInt(dot.getAttribute('data-index'), 10));
      bsbStartAutoplay();
    });
    banner.addEventListener('mouseenter', bsbStopAutoplay);
    banner.addEventListener('mouseleave', bsbStartAutoplay);

    let touchStartX = 0, touchDeltaX = 0;
    const track = document.getElementById('bsbTrack');
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchDeltaX = 0;
      bsbStopAutoplay();
    }, { passive: true });
    track.addEventListener('touchmove', (e) => {
      touchDeltaX = e.touches[0].clientX - touchStartX;
    }, { passive: true });
    track.addEventListener('touchend', () => {
      if (Math.abs(touchDeltaX) > 40) {
        if (touchDeltaX < 0) { bsbNext(); } else { bsbPrev(); }
      }
      bsbStartAutoplay();
    });

    bsbStartAutoplay();
  }

  function fullRerender() {
    renderCatTiles();
    renderBestSellers();
    renderMenu();
    renderGallery();
    refreshBSB();
    refreshCartUI();
    if (typeof wireScrollReveal === 'function') wireScrollReveal();
  }

  /* ============ EVENTS ============ */
  document.addEventListener('click', function (e) {
    const plus = e.target.closest('.qty-plus');
    const minus = e.target.closest('.qty-minus');
    const add = e.target.closest('.add-btn');
    if (plus) {
      const id = plus.closest('.qty-stepper').getAttribute('data-id');
      selectorQty[id] = (selectorQty[id] || 1) + 1;
      plus.closest('.qty-stepper').querySelector('.qty-val').textContent = selectorQty[id];
    }
    if (minus) {
      const id = minus.closest('.qty-stepper').getAttribute('data-id');
      selectorQty[id] = Math.max(1, (selectorQty[id] || 1) - 1);
      minus.closest('.qty-stepper').querySelector('.qty-val').textContent = selectorQty[id];
    }
    if (add) {
      const id = add.getAttribute('data-id');
      const qty = selectorQty[id] || 1;
      addToCart(id, qty);
      selectorQty[id] = 1;
      const stepper = document.querySelector(`.qty-stepper[data-id="${id}"] .qty-val`);
      if (stepper) stepper.textContent = 1;
    }
  });

  document.getElementById('cartBtn').addEventListener('click', openDrawer);
  document.getElementById('stickyViewBtn').addEventListener('click', openDrawer);
  document.getElementById('closeDrawerBtn').addEventListener('click', closeDrawer);
  document.getElementById('overlay').addEventListener('click', closeDrawer);
  document.getElementById('sendOrderBtn').addEventListener('click', sendOrder);
  document.getElementById('clearCartBtn').addEventListener('click', clearCart);

  function waGenericLink() {
    const msg = t('مرحبا، بدي أطلب من دار الشاورما.', 'Hello, I would like to order from Dar Al-Shawarma.');
    return waLink(msg);
  }
  document.getElementById('waDirectBtn').addEventListener('click', function (e) { e.preventDefault(); window.location.href = waGenericLink(); });
  document.getElementById('waDirectBtn2').addEventListener('click', function (e) { e.preventDefault(); window.location.href = waGenericLink(); });

  // sticky nav shadow + pinned menu category bar
  const nav = document.getElementById('nav');
  const menuTabsEl = document.getElementById('menuTabs');

  // A 1px sentinel sits just above the category bar: once it passes the nav line
  // the bar is pinned, and that is when the shadow goes on.
  const tabsSentinel = document.createElement('div');
  tabsSentinel.className = 'menu-tabs-sentinel';
  tabsSentinel.setAttribute('aria-hidden', 'true');
  menuTabsEl.parentNode.insertBefore(tabsSentinel, menuTabsEl);

  // expose the live nav height so the category bar can pin right beneath it
  function syncNavHeight() {
    document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
    updatePinned();
  }

  function updatePinned() {
    const navH = nav.offsetHeight;
    const sentinelTop = tabsSentinel.getBoundingClientRect().top;
    const barBottom = menuTabsEl.getBoundingClientRect().bottom;
    // pinned = the bar has reached its offset and its section is still on screen
    menuTabsEl.classList.toggle('stuck', sentinelTop < navH && barBottom > navH);
  }

  let scrollTicking = false;
  let settleTimer;
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 8);
    updatePinned();
    scrollTicking = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(onScroll); }
    // a jump (anchor link, scrollIntoView) can settle after the last scroll
    // event, so re-measure once things stop moving
    clearTimeout(settleTimer);
    settleTimer = setTimeout(onScroll, 120);
  }, { passive: true });

  syncNavHeight();
  window.addEventListener('resize', syncNavHeight, { passive: true });
  if (window.ResizeObserver) new ResizeObserver(syncNavHeight).observe(nav);
  onScroll();

  // mobile menu
  const mobileMenu = document.getElementById('mobileMenu');
  document.getElementById('burgerBtn').addEventListener('click', () => mobileMenu.classList.add('open'));
  document.getElementById('closeMenuBtn').addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

  // escape key closes drawer / mobile menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDrawer();
      mobileMenu.classList.remove('open');
    }
  });

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ============ DIRECTIONAL CARD REVEAL ============ */
  // Cards in a grid come in from the side they sit on — left column from the
  // left, right column from the right, a lone column simply rises. Direction
  // and delay are measured from the real layout, so it follows whatever the
  // breakpoint decided and works the same in RTL and LTR.
  const SR_SHIFT = 40;   // px of sideways travel
  const SR_STEP = 90;    // ms between neighbours in a row
  const SR_MAX_STEPS = 4;

  const srObserver = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      srObserver.unobserve(en.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -5% 0px' });

  function wireScrollReveal() {
    if (bsbReducedMotion) return;  // same media query the carousel already respects
    const rtl = document.documentElement.dir === 'rtl';

    document.querySelectorAll('[data-sr-group]').forEach(group => {
      const fresh = Array.from(group.children).filter(el => el.nodeType === 1 && !el.classList.contains('sr'));
      if (!fresh.length) return;

      const gRect = group.getBoundingClientRect();
      const gMid = gRect.left + gRect.width / 2;

      // bucket by row, so each row flows in as one wave rather than the whole grid at once
      const rows = new Map();
      fresh.forEach(el => {
        const r = el.getBoundingClientRect();
        const key = Math.round(r.top / 8);
        if (!rows.has(key)) rows.set(key, []);
        rows.get(key).push({ el: el, r: r });
      });

      rows.forEach(row => {
        // the wave starts from the edge the reader starts at
        row.sort((a, b) => rtl ? b.r.left - a.r.left : a.r.left - b.r.left);
        row.forEach((item, i) => {
          const mid = item.r.left + item.r.width / 2;
          const delta = mid - gMid;
          // a card only travels sideways when it is clearly off-centre —
          // otherwise a single-column layout would slide in from nowhere
          const sideways = row.length > 1 && Math.abs(delta) > item.r.width * 0.3;
          item.el.style.setProperty('--sr-x', sideways ? (delta < 0 ? -SR_SHIFT : SR_SHIFT) + 'px' : '0px');
          item.el.style.setProperty('--sr-y', sideways ? '14px' : '26px');
          item.el.style.setProperty('--sr-delay', Math.min(i, SR_MAX_STEPS) * SR_STEP + 'ms');
          item.el.classList.add('sr');
          srObserver.observe(item.el);
        });
      });
    });
  }

  // a resize can change the column count, so re-measure the cards that have
  // not been seen yet; ones already revealed keep their place untouched
  let srResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(srResizeTimer);
    srResizeTimer = setTimeout(() => {
      document.querySelectorAll('[data-sr-group] > .sr:not(.in)').forEach(el => {
        srObserver.unobserve(el);
        el.classList.remove('sr');
      });
      wireScrollReveal();
    }, 200);
  }, { passive: true });

  // language toggle
  document.getElementById('langBtn').addEventListener('click', () => {
    currentLang = (currentLang === 'ar') ? 'en' : 'ar';
    applyStaticLang(currentLang);
    fullRerender();
  });

  // newsletter (visual only)
  document.getElementById('newsletterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    showToast(currentLang === 'ar' ? 'تم الاشتراك، إلك منّا شكر!' : 'Subscribed — thank you!');
    this.reset();
  });

  /* ============ INIT ============ */
  loadCart();
  loadOrderNo();
  fullRerender();
  initBSB();
  initNavScrollSpy();
  wireScrollReveal();
})();
