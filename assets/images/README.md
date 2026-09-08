# الصور المطلوبة — دار الشاورما

كل شي بالموقع هلق صار عبارة عن `<img>` حقيقي. لتحديث أي صورة، بس حط ملف بنفس الاسم بالضبط بالمجلد الصحيح — ما في داعي تلمس أي كود. لحد ما تحط الصورة الحقيقية، المكان بيضل يبين بخلفية لونية + أيقونة بسيطة بدل ما ينكسر.

**الصيغة:** كل الصور المتوقعة `.jpg`. إذا بدك تستخدم `.png` أو `.webp`، لازم تغيّر امتداد الملف بنفس المكان بملف `assets/js/script.js` (كل مسارات الصور مبنية من دالة وحدة بأول الملف، فيها التعديل سطر واحد بس).

---

## 1. الصورة الرئيسية (Hero)
`assets/images/hero/spit.jpg`
مقاس مقترح: مربع تقريبًا (1000×1000)، لأنها بتنقص جوا دائرة.

## 2. صورة قصتنا (Brand Story)
`assets/images/story/story.jpg`
مقاس مقترح: طولي (800×920 تقريبًا).

## 3. صور التصنيفات (6 صور)
| الملف | التصنيف |
|---|---|
| `assets/images/categories/chicken.jpg` | شاورما دجاج |
| `assets/images/categories/beef.jpg` | شاورما لحمة |
| `assets/images/categories/grills.jpg` | مشاوي |
| `assets/images/categories/hummus.jpg` | حمص وسلطات |
| `assets/images/categories/drinks.jpg` | مشروبات |
| `assets/images/categories/desserts.jpg` | حلويات |

مقاس مقترح: طولي (600×720 تقريبًا).

## 4. صور الأصناف (19 صنف — كل صنف صورته الخاصة)
| الملف | اسم الصنف |
|---|---|
| `assets/images/products/c1.jpg` | شاورما دجاج خاصة |
| `assets/images/products/c2.jpg` | شاورما دجاج عادي |
| `assets/images/products/c3.jpg` | صحن شاورما دجاج |
| `assets/images/products/b1.jpg` | شاورما لحمة مشكل |
| `assets/images/products/b2.jpg` | شاورما لحمة عادي |
| `assets/images/products/b3.jpg` | صحن شاورما لحمة |
| `assets/images/products/g1.jpg` | صحن مشاوي دار الشاورما |
| `assets/images/products/g2.jpg` | كباب مشوي |
| `assets/images/products/g3.jpg` | شيش طاووق |
| `assets/images/products/h1.jpg` | صحن حمص باللحمة |
| `assets/images/products/h2.jpg` | حمص عادي |
| `assets/images/products/h3.jpg` | متبل |
| `assets/images/products/h4.jpg` | بطاط بيتي |
| `assets/images/products/h5.jpg` | سلطة خضرا |
| `assets/images/products/d1.jpg` | عيران |
| `assets/images/products/d2.jpg` | كولا |
| `assets/images/products/d3.jpg` | عصير ليمون نعنع |
| `assets/images/products/k1.jpg` | كنافة نابلسية |
| `assets/images/products/k2.jpg` | مهلبية |

مقاس مقترح: أفقي (800×600 تقريبًا). نفس الصورة بتظهر بمكانين: بطاقة الصنف بالمنيو، وصورة مصغّرة بسلة الطلبات.

**لإضافة صنف جديد بالمستقبل:** ضيفه بـ Array يلي اسمه `PRODUCTS` بملف `assets/js/script.js`، وحط صورته بنفس مجلد `products/` بنفس الـ `id` يلي اخترته — بيشتغل تلقائيًا بدون أي تعديل تاني.

## 5. صور معرض الصور (Gallery) — 12 صورة
`assets/images/gallery/gallery-1.jpg` لغاية `assets/images/gallery/gallery-12.jpg`

توزيعهم حسب التصنيف (الأكل / المطعم / التغليف / الجلسات) موجود بـ Array اسمه `GALLERY` بملف `assets/js/script.js` — كل صورة إلها رقم `n` ثابت وتصنيف `cat`، فيك تبدّل التصنيف من هناك بدون ما تغيّر اسم الملف.

مقاس مقترح: مربع (800×800 تقريبًا).

## 6. صورة المشاركة (Open Graph / معاينة الروابط بواتساب وفيسبوك)
`assets/images/og-image.jpg`
مقاس ثابت مطلوب: **1200×630** بالضبط — هاي الصورة يلي بتظهر لما حدا يشارك رابط الموقع بواتساب أو فيسبوك.

---

## أشياء تانية لازم تتحدث قبل الإطلاق

1. **رقم الواتساب:** بأول ملف `assets/js/script.js`، متغير `WHATSAPP_NUMBER`.
2. **الدومين الحقيقي:** بملف `index.html`، بالأعلى (قسم `<head>`) في روابط `canonical` و`og:url` و`og:image` و`twitter:image` كلها حاطة `https://daralshawarma.example.com/` كمكان مؤقت — استبدلها بالدومين الحقيقي.
3. **العنوان والخريطة:** بقسم "زورونا" داخل `index.html`، وبرابط خرائط جوجل المُضمّن.
4. **المراجعات:** حاليًا تجريبية ومُعلَّمة بالكود — استبدلها بمراجعات حقيقية من زباين دار الشاورما.
