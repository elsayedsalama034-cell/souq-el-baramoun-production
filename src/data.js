export const categories = [
  { id: "all", name: "الكل", icon: "✨", description: "كل المنتجات والخدمات المعروضة في سوق البرامون." },
  { id: "cars", name: "سيارات", icon: "🚗", description: "سيارات جديدة ومستعملة وقطع غيار وخدمات السيارات.", subcategories:["سيارات للبيع","سيارات للإيجار","قطع غيار","إكسسوارات سيارات"] },
  { id: "mobiles", name: "موبايلات وتابلت", icon: "📱", description: "موبايلات وأجهزة لوحية وإكسسوارات وأرقام.", subcategories:["موبايلات","تابلت","إكسسوارات","أرقام مميزة"] },
  { id: "realestate", name: "عقارات", icon: "🏠", description: "شقق وبيوت وأراضٍ ومحلات للبيع أو الإيجار.", subcategories:["شقق للبيع","شقق للإيجار","فلل","أراضي","محلات ومكاتب"] },
  { id: "furniture", name: "أثاث وديكور", icon: "🛋️", description: "أثاث منزلي ومكتبي وديكورات وتجهيزات.", subcategories:["غرف نوم","انتريهات","مطابخ","مكاتب","ديكور"] },
  { id: "electronics", name: "إلكترونيات وأجهزة منزلية", icon: "💻", description: "شاشات وأجهزة كمبيوتر وأجهزة منزلية وإلكترونيات.", subcategories:["تلفزيونات","كمبيوتر ولابتوب","أجهزة منزلية","ألعاب إلكترونية"] },
  { id: "services", name: "خدمات", icon: "🛠️", description: "خدمات منزلية ومهنية وتعليمية ونقل وصيانة.", subcategories:["صيانة","تنظيف","نقل","تعليم","خدمات أعمال"] },
  { id: "jobs", name: "وظائف", icon: "💼", description: "فرص عمل وطلبات توظيف ومهن مختلفة.", subcategories:["محاسبة","مبيعات","هندسة","برمجة","خدمة عملاء"] },
  { id: "motorcycles", name: "موتوسيكلات", icon: "🏍️", description: "موتوسيكلات وسكوتر وقطع غيار وإكسسوارات.", subcategories:["موتوسيكلات","سكوتر","قطع غيار","خوذات"] },
  { id: "trucks", name: "نقل ومركبات تجارية", icon: "🚚", description: "نقل ثقيل وبيك أب ومركبات تجارية.", subcategories:["نقل ثقيل","نصف نقل","بيك أب","مقطورات"] },
  { id: "parts", name: "قطع غيار وإكسسوارات", icon: "🔧", description: "قطع غيار السيارات والمركبات وإكسسواراتها.", subcategories:["محركات","فرامل","كهرباء سيارات","إطارات وجنوط"] },
  { id: "computers", name: "كمبيوتر ولابتوب", icon: "🖥️", description: "أجهزة كمبيوتر ولابتوب ومكونات وشبكات.", subcategories:["لابتوب","كمبيوتر مكتبي","مكونات","شبكات"] },
  { id: "gaming", name: "ألعاب ومنصات", icon: "🎮", description: "أجهزة ألعاب وبلايستيشن وإكسسوارات وألعاب.", subcategories:["بلايستيشن","إكس بوكس","ألعاب","ملحقات"] },
  { id: "cameras", name: "كاميرات وتصوير", icon: "📷", description: "كاميرات وعدسات ومعدات تصوير.", subcategories:["كاميرات","عدسات","إضاءة","إكسسوارات تصوير"] },
  { id: "appliances", name: "أجهزة كهربائية", icon: "🧊", description: "ثلاجات وغسالات وتكييفات وأجهزة منزلية.", subcategories:["ثلاجات","غسالات","تكييف","بوتاجازات"] },
  { id: "fashion-women", name: "ملابس حريمي", icon: "👗", description: "ملابس وأحذية وحقائب وإكسسوارات حريمي." },
  { id: "fashion-men", name: "ملابس رجالي", icon: "👔", description: "ملابس وأحذية وإكسسوارات رجالي." },
  { id: "fashion-kids", name: "ملابس وألعاب أطفال", icon: "🧸", description: "ملابس وألعاب ومستلزمات الأطفال." },
  { id: "beauty", name: "جمال وعناية شخصية", icon: "💄", description: "مستحضرات تجميل وعناية وشعر وعطور." },
  { id: "jewelry", name: "ذهب ومجوهرات وساعات", icon: "💍", description: "ذهب ومجوهرات وساعات وإكسسوارات ثمينة." },
  { id: "pets", name: "حيوانات وطيور", icon: "🐾", description: "حيوانات أليفة وطيور وأسماك ومستلزماتها.", subcategories:["كلاب","قطط","طيور","أسماك","مستلزمات حيوانات"] },
  { id: "food", name: "أطعمة ومشروبات", icon: "🍔", description: "أطعمة منزلية ومطاعم وحلويات ومشروبات." },
  { id: "restaurants", name: "مطاعم وكافيهات", icon: "🍽️", description: "مطاعم وكافيهات ومطابخ وتجهيزات غذائية." },
  { id: "health", name: "صحة وطب", icon: "🩺", description: "خدمات طبية ومستلزمات وأجهزة صحية." },
  { id: "education", name: "تعليم ودروس", icon: "📚", description: "دروس خصوصية وكورسات ومراكز تعليم." },
  { id: "sports", name: "رياضة ولياقة", icon: "⚽", description: "أدوات رياضية وجيم ودراجات ومعدات." },
  { id: "bikes", name: "دراجات وعجل", icon: "🚲", description: "دراجات هوائية وكهربائية وقطع غيار." },
  { id: "home-garden", name: "منزل وحديقة", icon: "🌿", description: "أدوات منزلية وحدائق ونباتات وتجهيزات." },
  { id: "tools", name: "عدد وأدوات", icon: "🧰", description: "عدد يدوية وكهربائية وأدوات ورش." },
  { id: "construction", name: "مقاولات ومواد بناء", icon: "🏗️", description: "مواد بناء وتشطيبات ومقاولات ومعدات." },
  { id: "business", name: "تجاري وصناعي", icon: "🏭", description: "معدات صناعية ومحلات ومشروعات وشركات للبيع." },
  { id: "agriculture", name: "زراعة ومواشي", icon: "🌾", description: "معدات زراعية ومواشي ومحاصيل وأراضٍ زراعية." },
  { id: "books", name: "كتب ومستلزمات دراسة", icon: "📖", description: "كتب وروايات وأدوات مدرسية وجامعية." },
  { id: "hobbies", name: "هوايات ومقتنيات", icon: "🎨", description: "تحف ومقتنيات وطوابع وعملات وهوايات." },
  { id: "music", name: "آلات موسيقية", icon: "🎸", description: "آلات موسيقية ومعدات صوت وتسجيل." },
  { id: "travel", name: "سفر وسياحة", icon: "✈️", description: "رحلات وفنادق وتأجير مصايف وحجوزات." },
  { id: "events", name: "حفلات ومناسبات", icon: "🎉", description: "تنظيم حفلات وقاعات وتصوير ومناسبات." },
  { id: "tickets", name: "تذاكر وقسائم", icon: "🎟️", description: "تذاكر فعاليات ومباريات وقسائم شراء." },
  { id: "office", name: "مستلزمات مكتبية", icon: "🗂️", description: "أثاث مكتبي وطابعات وأدوات ومستلزمات شركات." },
  { id: "business-services", name: "خدمات أعمال", icon: "📊", description: "محاسبة وتسويق وتصميم وبرمجة واستشارات." },
  { id: "moving", name: "نقل وشحن", icon: "📦", description: "نقل أثاث وشحن طرود وخدمات لوجستية." },
  { id: "other", name: "أخرى", icon: "📦", description: "إعلانات متنوعة لا تنتمي إلى فئة أخرى." }
];

const img = {
  sweets: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
  car1: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
  car2: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  phone1: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
  phone2: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
  home: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  land: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
  furniture1: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
  furniture2: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80",
  laptop: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
  tv: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=900&q=80",
  service: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  barber: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80",
  job1: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
  job2: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80"
};

const baseAds = [
  { id:"demo-c1", demo:true, title:"أول أستر 2021 ديجيتو 4 فلول", price:"480,000 ج.م", category:"cars", categoryName:"سيارات", city:"البرامون", time:"منذ 4 ساعات", image:img.car1, featured:true, views:1220, seller:"محمد للسيارات", phone:"01111111111", description:"سيارة بحالة ممتازة، فحص ومعاينة متاحان." },
  { id:"demo-c2", demo:true, title:"تويوتا أوري 2020", price:"165,000 ج.م", category:"cars", categoryName:"سيارات", city:"المنصورة", time:"منذ 15 ساعة", image:img.car2, featured:false, views:615, seller:"أحمد", phone:"01555555555", description:"سيارة اقتصادية بحالة جيدة ومناسبة للاستخدام اليومي." },
  { id:"demo-m1", demo:true, title:"موبايل سامسونج A54 256 جيجا", price:"13,500 ج.م", category:"mobiles", categoryName:"موبايلات", city:"أجا", time:"منذ 3 ساعات", image:img.phone1, featured:true, views:910, seller:"متجر البرامون", phone:"01666666666", description:"هاتف بحالة ممتازة مع العلبة والشاحن." },
  { id:"demo-m2", demo:true, title:"آيفون 13 بحالة ممتازة", price:"25,000 ج.م", category:"mobiles", categoryName:"موبايلات", city:"البرامون", time:"منذ 7 ساعات", image:img.phone2, featured:false, views:740, seller:"محمود", phone:"01012345678", description:"جهاز نظيف مع ذاكرة مناسبة وتصميم مميز." },
  { id:"demo-r1", demo:true, title:"شقة 140 متر أول البرامون", price:"950,000 ج.م", category:"realestate", categoryName:"عقارات", city:"البرامون", time:"منذ ساعتين", image:img.home, featured:true, views:1450, seller:"مكتب البرامون العقاري", phone:"01777777777", description:"شقة واسعة في موقع مميز، تشطيب جيد وقريبة من الخدمات." },
  { id:"demo-r2", demo:true, title:"قطعة أرض للبيع على طريق رئيسي", price:"1,250,000 ج.م", category:"realestate", categoryName:"عقارات", city:"المنصورة", time:"منذ يوم", image:img.land, featured:false, views:510, seller:"مكتب عقارات البرامون", phone:"01022223333", description:"أرض مناسبة لبناء منزل أو مشروع، والمستندات متاحة للمعاينة." },
  { id:"demo-f1", demo:true, title:"كنبة مودرن خام طبيعي", price:"1,900 ج.م", category:"furniture", categoryName:"أثاث", city:"البرامون", time:"منذ 6 ساعات", image:img.furniture1, featured:false, views:380, seller:"معرض البيت", phone:"01222222222", description:"قطعة أثاث بحالة جيدة جداً ومناسبة للمنزل العصري." },
  { id:"demo-f2", demo:true, title:"غرفة نوم كاملة مودرن", price:"18,500 ج.م", category:"furniture", categoryName:"أثاث", city:"أجا", time:"منذ يوم", image:img.furniture2, featured:true, views:680, seller:"معرض البرامون للأثاث", phone:"01233334444", description:"غرفة نوم كاملة بتصميم عصري وحالة ممتازة." },
  { id:"demo-e1", demo:true, title:"لاب توب للأعمال والدراسة", price:"22,000 ج.م", category:"electronics", categoryName:"إلكترونيات", city:"البرامون", time:"منذ 5 ساعات", image:img.laptop, featured:true, views:800, seller:"مركز التقنية", phone:"01144445555", description:"جهاز مناسب للدراسة والعمل المكتبي، بحالة ممتازة." },
  { id:"demo-e2", demo:true, title:"شاشة سمارت 55 بوصة", price:"19,900 ج.م", category:"electronics", categoryName:"إلكترونيات", city:"المنصورة", time:"منذ يوم", image:img.tv, featured:false, views:420, seller:"متجر الإلكترونيات", phone:"01055556666", description:"شاشة سمارت بحجم كبير وصورة واضحة." },
  { id:"demo-s1", demo:true, title:"خدمة تنظيف منازل احترافية", price:"من 250 ج.م", category:"services", categoryName:"خدمات", city:"البرامون", time:"منذ 4 ساعات", image:img.service, featured:true, views:842, seller:"خدمات البرامون", phone:"01000000000", description:"خدمة تنظيف للمنازل والشقق والمكاتب مع مواعيد مرنة." },
  { id:"demo-s2", demo:true, title:"حلاق رجالي وحجز بالمواعيد", price:"100 ج.م", category:"services", categoryName:"خدمات", city:"البرامون", time:"منذ 8 ساعات", image:img.barber, featured:false, views:330, seller:"صالون البرامون", phone:"01277778888", description:"حلاقة رجالي وقصات حديثة مع إمكانية الحجز مسبقاً." },
  { id:"demo-j1", demo:true, title:"مطلوب موظف مبيعات", price:"راتب مجزي", category:"jobs", categoryName:"وظائف", city:"البرامون", time:"منذ 3 ساعات", image:img.job1, featured:true, views:560, seller:"شركة محلية", phone:"01088889999", description:"مطلوب موظف مبيعات بدوام كامل، الخبرة ميزة إضافية." },
  { id:"demo-j2", demo:true, title:"فرصة عمل لمحاسب", price:"حسب الخبرة", category:"jobs", categoryName:"وظائف", city:"المنصورة", time:"منذ يوم", image:img.job2, featured:false, views:390, seller:"مكتب تجاري", phone:"01199990000", description:"فرصة عمل لمحاسب للعمل ضمن فريق صغير ومنظم." },
  { id:"demo-x1", demo:true, title:"حلويات قنديل", price:"220 ج.م", category:"services", categoryName:"خدمات", city:"البرامون", time:"منذ 4 ساعات", image:img.sweets, featured:false, views:510, seller:"حلويات قنديل", phone:"01000000000", description:"حلويات ومخبوزات طازجة بجودة عالية، متاحة للطلبات والمناسبات." }
];


const extraCategorySeeds = [
  ["motorcycles","موتوسيكل سوزوكي مستعمل","28,000 ج.م","🏍️"],["trucks","بيك أب للعمل","420,000 ج.م","🚚"],["parts","طقم إطارات وجنوط","8,500 ج.م","🔧"],["computers","كمبيوتر مكتبي كامل","18,000 ج.م","🖥️"],["gaming","بلايستيشن 5 مع ذراعين","32,000 ج.م","🎮"],["cameras","كاميرا تصوير احترافية","27,500 ج.م","📷"],["appliances","غسالة أوتوماتيك","16,000 ج.م","🧊"],["fashion-women","فستان سهرة جديد","1,800 ج.م","👗"],["fashion-men","بدلة رجالي كاملة","3,900 ج.م","👔"],["fashion-kids","ملابس أطفال تشكيلة","850 ج.م","🧸"],["beauty","عطور ومستحضرات عناية","650 ج.م","💄"],["jewelry","ساعة ومجوهرات هدية","4,500 ج.م","💍"],["pets","قط شيرازي للتبني","1,500 ج.م","🐾"],["food","صينية حلويات للمناسبات","700 ج.م","🍔"],["restaurants","تجهيز مطعم وكافيه","75,000 ج.م","🍽️"],["health","جهاز قياس ضغط وسكر","1,200 ج.م","🩺"],["education","مدرس رياضيات للثانوية","200 ج.م","📚"],["sports","مشاية كهربائية","14,000 ج.م","⚽"],["bikes","عجلة رياضية","4,200 ج.م","🚲"],["home-garden","نباتات وأدوات حديقة","900 ج.م","🌿"],["tools","عدة كهربائية كاملة","6,800 ج.م","🧰"],["construction","أدوات وتشطيبات","12,000 ج.م","🏗️"],["business","معدات مشروع صغير","55,000 ج.م","🏭"],["agriculture","معدات زراعية","24,000 ج.م","🌾"],["books","كتب جامعية ودراسية","500 ج.م","📖"],["hobbies","مجموعة عملات قديمة","3,000 ج.م","🎨"],["music","جيتار احترافي","7,500 ج.م","🎸"],["travel","رحلة مصيفية للعائلة","6,500 ج.م","✈️"],["events","تنظيم حفلة كاملة","8,000 ج.م","🎉"],["tickets","تذاكر فعالية","750 ج.م","🎟️"],["office","مكتب وتجهيزات شركة","22,000 ج.م","🗂️"],["business-services","تصميم هوية تجارية","2,500 ج.م","📊"],["moving","نقل أثاث وشحن","600 ج.م","📦"],["other","إعلان متنوع تجريبي","1,000 ج.م","📦"]
];
const demoImagePool = Object.values(img);
export const extraDemoAds = extraCategorySeeds.flatMap(([category,title,price]) => {
  const c = categories.find(x=>x.id===category);
  const image = demoImagePool[categories.findIndex(x=>x.id===category)%demoImagePool.length];
  return [{id:`demo-${category}-1`,demo:true,title,price,category,categoryName:c?.name||category,city:"البرامون",time:"منذ 3 ساعات",image,featured:false,views:240,seller:`متجر ${c?.name||"البرامون"}`,phone:"01012340000",description:`بيانات تجريبية لفئة ${c?.name||category}. يمكنك حذفها لاحقًا واستبدالها بإعلاناتك الحقيقية.`}];
});
export const ads = [...baseAds, ...extraDemoAds];


export const demoSubscribers = [
  { id:"demo-u-c1", name:"محمد للسيارات", phone:"01111111111", category:"cars", city:"البرامون", role:"معلن", bio:"متخصص في بيع وشراء السيارات والفحص والمعاينة." },
  { id:"demo-u-c2", name:"أحمد للسيارات", phone:"01555555555", category:"cars", city:"المنصورة", role:"معلن", bio:"سيارات مستعملة بحالات وأسعار متنوعة." },
  { id:"demo-u-m1", name:"متجر البرامون للموبايلات", phone:"01666666666", category:"mobiles", city:"البرامون", role:"معلن", bio:"موبايلات وإكسسوارات وأجهزة أصلية ومستعملة." },
  { id:"demo-u-m2", name:"محمود فون", phone:"01012345678", category:"mobiles", city:"أجا", role:"معلن", bio:"بيع وشراء الموبايلات وتبديل الأجهزة." },
  { id:"demo-u-r1", name:"مكتب البرامون العقاري", phone:"01777777777", category:"realestate", city:"البرامون", role:"معلن", bio:"شقق وأراضٍ ومحلات للبيع والإيجار." },
  { id:"demo-u-r2", name:"عقارات البرامون", phone:"01022223333", category:"realestate", city:"المنصورة", role:"معلن", bio:"تسويق عقاري ومعاينات داخل المنطقة." },
  { id:"demo-u-f1", name:"معرض البيت", phone:"01222222222", category:"furniture", city:"البرامون", role:"معلن", bio:"أثاث منزلي مودرن وكلاسيك وتجهيزات كاملة." },
  { id:"demo-u-f2", name:"معرض البرامون للأثاث", phone:"01233334444", category:"furniture", city:"أجا", role:"معلن", bio:"غرف نوم وانتريهات وأثاث منزلي." },
  { id:"demo-u-e1", name:"مركز التقنية", phone:"01144445555", category:"electronics", city:"البرامون", role:"معلن", bio:"كمبيوترات ولابتوبات وشاشات وإلكترونيات." },
  { id:"demo-u-e2", name:"متجر الإلكترونيات", phone:"01055556666", category:"electronics", city:"المنصورة", role:"معلن", bio:"أجهزة منزلية وشاشات وإكسسوارات." },
  { id:"demo-u-s1", name:"خدمات البرامون", phone:"01000000000", category:"services", city:"البرامون", role:"معلن", bio:"خدمات منزلية ومهنية داخل البرامون." },
  { id:"demo-u-s2", name:"صالون البرامون", phone:"01277778888", category:"services", city:"البرامون", role:"معلن", bio:"حلاقة رجالي وقصات حديثة بالحجز." },
  { id:"demo-u-j1", name:"شركة محلية", phone:"01088889999", category:"jobs", city:"البرامون", role:"معلن", bio:"فرص عمل متنوعة للشباب وأصحاب الخبرة." },
  { id:"demo-u-j2", name:"مكتب تجاري", phone:"01199990000", category:"jobs", city:"المنصورة", role:"معلن", bio:"وظائف محاسبة وإدارة ومبيعات." }
];

export const extraDemoSubscribers = extraCategorySeeds.map(([category])=>{const c=categories.find(x=>x.id===category);return {id:`demo-user-${category}`,name:`معلن ${c?.name||category}`,phone:"01098760000",category,city:"البرامون",role:"معلن",bio:`معلن تجريبي متخصص في ${c?.name||category}.`};});
export const allDemoSubscribers = [...demoSubscribers, ...extraDemoSubscribers];


export const demoCategoryInfo = categories.reduce((acc, c) => {
  if (c.id !== "all") {
    acc[c.id] = {
      description: c.description,
      subscribers: allDemoSubscribers.filter(u => u.category === c.id),
      ads: ads.filter(a => a.category === c.id)
    };
  }
  return acc;
}, {});
