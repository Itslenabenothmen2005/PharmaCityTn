/**
 * Dictionnaire bilingue Français / Arabe pour PharmaCityTN
 * Support complet de l'internationalisation et bascule dynamique LTR / RTL
 */

export const translations = {
  fr: {
    // Header & Top bar
    'topbar.network': 'PharmaCityTN — Réseau national des officines de pharmacie en Tunisie',
    'topbar.emergency': 'Urgences : 190',
    'topbar.citizenMode': 'Mode Citoyen',
    'topbar.pharmacyMode': 'Mode Pharmacien',
    'header.login': 'Connexion',
    'header.register': 'Créer un compte',
    'header.logout': 'Déconnexion',

    // Navigation publique
    'nav.home': 'Accueil',
    'nav.search': 'Rechercher un médicament',
    'nav.howItWorks': 'Comment ça marche ?',

    // Navigation citoyen
    'nav.dashboard': 'Tableau de bord',
    'nav.searchMed': 'Recherche',
    'nav.request': 'Demander un médicament',
    'nav.requestsTracking': 'Suivi des demandes',
    'nav.favorites': 'Médicaments favoris',
    'nav.notifications': 'Notifications',
    'nav.profile': 'Mon Profil',
    'nav.backToPublic': 'Retour au portail public',
    'nav.logoutConfirm': 'Déconnexion réussie. Retour au portail public.',

    // Navigation pharmacie
    'nav.pharma.dashboard': 'Tableau de bord',
    'nav.pharma.medicines': 'Médicaments',
    'nav.pharma.stock': 'Gestion du stock',
    'nav.pharma.availability': 'Disponibilités',
    'nav.pharma.history': 'Historique des mouvements',
    'nav.pharma.profile': 'Profil pharmacie',

    // Section Hero
    'hero.badge': 'Réseau Officiel des Pharmacies en Tunisie',
    'hero.title': 'Trouvez vos médicaments',
    'hero.titleHighlight': 'plus facilement.',
    'hero.subtitle':
      'Consultez la disponibilité des médicaments dans les pharmacies tunisiennes et gagnez du temps dans vos recherches.',
    'hero.searchPlaceholder': 'Rechercher un médicament (Doliprane, Augmentin, Maxilase)...',
    'hero.searchBtn': 'Rechercher',
    'hero.cnam': 'Officines conventionnées CNAM',
    'hero.duty': 'Gardes de jour & de nuit',

    // Section Comment ça marche
    'how.badge': 'Processus Simple & Transparent',
    'how.title': 'Comment ça marche ?',
    'how.subtitle':
      'En trois étapes rapides, identifiez la pharmacie qui détient votre traitement en stock.',
    'how.step1.title': 'Recherchez votre médicament',
    'how.step1.desc':
      'Indiquez le nom commercial ou le principe actif (DCI) de votre médicament dans notre moteur de recherche.',
    'how.step2.title': 'Consultez les pharmacies',
    'how.step2.desc':
      'Découvrez instantanément les officines déclarées dépositaires du traitement avec indication des stocks.',
    'how.step3.title': 'Contactez la pharmacie',
    'how.step3.desc':
      'Téléphonez directement à l’officine pour confirmer la disponibilité avant votre déplacement au comptoir.',

    // Section Avantages
    'advantages.badge': 'Pourquoi utiliser PharmaCityTN ?',
    'advantages.title': 'Une solution pensée pour votre santé',
    'advantages.subtitle': 'Accédez à des informations fiables pour trouver vos traitements sans perdre de temps.',
    'adv.1.title': 'Recherche simplifiée',
    'adv.1.desc': 'Filtrez par nom commercial, DCI, forme galénique, dosage ou gouvernorat en quelques clics.',
    'adv.2.title': 'Informations de disponibilité',
    'adv.2.desc': 'Visualisez en temps réel les déclarations de stock (Disponible, Stock faible, Rupture).',
    'adv.3.title': 'Gain de temps',
    'adv.3.desc': 'Évitez les trajets inutiles et les files d’attente grâce aux informations préalables vérifiées.',
    'adv.4.title': 'Accès aux coordonnées',
    'adv.4.desc': 'Adresses précises, téléphones directs et localisation des pharmacies de garde jour et nuit.',

    // Section Pharmacies
    'pharmacies.badge': 'Réseau Partenaire',
    'pharmacies.title': 'Officines de pharmacie en Tunisie',
    'pharmacies.subtitle': 'Consultez les pharmacies partenaires et leurs statuts actuels.',
    'pharmacies.filter.all': 'Toutes',
    'pharmacies.filter.open': 'Ouvertes',
    'pharmacies.filter.night': 'Garde de Nuit',

    // Statuts de disponibilité
    'status.available': 'Disponible',
    'status.lowStock': 'Stock limité',
    'status.outOfStock': 'Indisponible',

    // Profil citoyen
    'profile.title': 'Mon Profil Citoyen',
    'profile.active': 'Compte Actif',
    'profile.subtitle': 'Gérez vos coordonnées de contact et configurez votre officine de référence en Tunisie.',
    'profile.personalInfo': 'Informations Personnelles',
    'profile.personalInfoSub': 'Données de contact pour les alertes et réservations',
    'profile.fullName': 'Nom et Prénom',
    'profile.email': 'Adresse Email',
    'profile.phone': 'Numéro de Téléphone (Tunisie)',
    'profile.city': 'Ville de résidence',
    'profile.address': 'Adresse postale',
    'profile.birthDate': 'Date de naissance',
    'profile.preferredPharma': 'Pharmacie de référence habituelle',
    'profile.saveBtn': 'Enregistrer les modifications',
    'profile.cancelBtn': 'Annuler',
    'profile.prefCardTitle': 'Officine Habituelle & Alertes',
    'profile.prefCardSubtitle': 'Personnalisez vos préférences de surveillance des stocks',
    'profile.prefHelper': 'Vos recherches mettront cette officine en priorité lorsque le médicament y est déclaré.',
    'profile.alertChannels': 'Canaux de réception des alertes :',
    'profile.alertEmail': 'M\'avertir par email dès qu\'un médicament favori est de nouveau disponible',
    'profile.alertSms': 'Recevoir une alerte SMS pour les gardes de nuit urgentes',
    'profile.registeredCitizen': 'Citoyen Enregistré',
    'profile.identifier': 'Identifiant :',
    'profile.sector': 'Secteur :',
    'profile.privacyTitle': 'Confidentialité & Données Médicales',
    'profile.privacyDesc': 'PharmaCityTN ne collecte aucune ordonnance ni donnée de santé sans votre consentement. Les informations de disponibilité sont transmises à titre indicatif par les pharmaciens d\'officine.',

    // Dashboard citoyen
    'dashboard.welcome': 'Bonjour',
    'dashboard.subtitle': 'Consultez en un clin d’œil l’état de vos médicaments suivis et vos dernières notifications.',
    'dashboard.newSearch': 'Nouvelle recherche',
    'dashboard.quickSearch': 'Recherche rapide d’un médicament...',
    'dashboard.recentViews': 'Médicaments récemment consultés',
    'dashboard.favorites': 'Mes Médicaments Favoris',
    'dashboard.recentNotifs': 'Notifications Récentes',
    'dashboard.viewAll': 'Tout afficher',
    'dashboard.viewPharmacies': 'Voir les pharmacies',
    'dashboard.favSummary': 'Médicaments favoris',
    'dashboard.notifSummary': 'Alertes disponibilité',
    'dashboard.requestSummary': 'Mes demandes de retrait',
    'dashboard.noRecent': 'Aucun médicament consulté récemment. Utilisez la barre de recherche ci-dessus pour démarrer.',

    // Page de recherche
    'search.title': 'Recherche de Médicaments en Tunisie',
    'search.badge': 'Temps Réel',
    'search.subtitle': 'Recherchez par nom commercial, principe actif (DCI), dosage ou forme galénique dans le réseau d\'officines.',
    'search.placeholder': 'Rechercher par nom (Doliprane), DCI (Paracétamol), dosage ou forme...',
    'search.filterTitle': 'Filtrer les résultats de recherche',
    'search.resetFilters': 'Réinitialiser les filtres',
    'search.dosage': 'Dosage',
    'search.allDosages': 'Tous les dosages',
    'search.form': 'Forme galénique',
    'search.allForms': 'Toutes les formes',
    'search.availability': 'Disponibilité',
    'search.allAvailabilities': 'Tous les statuts',
    'search.city': 'Ville / Gouvernorat',
    'search.allCities': 'Toutes les villes',
    'search.resultsCount': 'résultat(s) trouvé(s)',
    'search.noResults': 'Aucun médicament ne correspond à vos critères.',
    'search.disclaimer': 'Important : Les disponibilités affichées sont déclaratives de la part des officines et ne constituent pas une garantie de délivrance. Consultez toujours un professionnel de santé agréé.',

    // Page favoris
    'favorites.title': 'Mes Médicaments Favoris',
    'favorites.subtitle': 'Retrouvez rapidement les médicaments que vous suivez et vérifiez la disponibilité déclarée en pharmacie.',
    'favorites.badge': 'enregistrés',
    'favorites.filterPlaceholder': 'Filtrer dans mes favoris...',
    'favorites.addBtn': 'Ajouter un médicament',
    'favorites.emptyTitle': 'Aucun médicament dans vos favoris',
    'favorites.emptyDesc': 'Ajoutez des médicaments à vos favoris depuis la recherche pour suivre leur disponibilité en temps réel.',

    // Suivi des demandes
    'requests.title': 'Suivi de mes Demandes de Médicaments',
    'requests.subtitle': 'Consultez l\'avancement de vos demandes de retrait et précommandes auprès des officines.',
    'requests.badge': 'demande(s)',
    'requests.newBtn': 'Nouvelle demande',
    'requests.all': 'Toutes les demandes',
    'requests.pending': 'En cours de validation',
    'requests.confirmed': 'Confirmées (Prêtes)',
    'requests.completed': 'Retirées au comptoir',
    'requests.rejected': 'Refusées',
    'requests.emptyTitle': 'Aucune demande pour l\'instant',
    'requests.emptyDesc': 'Effectuez une demande de réservation ou de retrait auprès d\'une pharmacie pour préparer votre déplacement.',

    // Composants Médicaments
    'medicine.dci': 'DCI :',
    'medicine.form': 'Forme :',
    'medicine.class': 'Classe :',
    'medicine.prescription': 'Sur ordonnance',
    'medicine.noPrescription': 'Sans ordonnance',
    'medicine.viewPharmacies': 'Voir les pharmacies',
    'medicine.pharmaciesCount': 'pharmacies',
    'medicine.pharmacyCount': 'pharmacie',
    'medicine.addFav': 'Ajouter aux favoris',
    'medicine.removeFav': 'Retirer des favoris',
    'medicine.makeRequest': 'Faire une demande de retrait',
    'medicine.close': 'Fermer',
    'medicine.callPharmacy': 'Appeler l\'officine',
    'medicine.pharmaAvailability': 'Disponibilité en officines de pharmacie',

    // Notifications
    'notifications.title': 'Alertes & Historique des Disponibilités',
    'notifications.subtitle': 'Suivez les déclarations de retour en stock et les alertes d’approvisionnement.',
    'notifications.markAll': 'Tout marquer comme lu',
    'notifications.all': 'Toutes les alertes',
    'notifications.unread': 'Non lues',
    'notifications.stock': 'Mouvements de stock',
    'notifications.out': 'Ruptures signalées',
    'notifications.emptyTitle': 'Aucune notification',
    'notifications.emptyDesc': 'Vous êtes à jour ! Vous recevrez des alertes dès qu\'un mouvement de stock concernera vos favoris.',

    // Footer
    'footer.desc': 'Première plateforme numérique tunisienne dédiée à la localisation et à la vérification de disponibilité des médicaments en temps réel dans les officines partenaires.',
    'footer.servicesTitle': 'Services Citoyens',
    'footer.search': '🔍 Rechercher un médicament',
    'footer.duty': '🌙 Pharmacies de garde (Tunis, Sousse, Sfax...)',
    'footer.fav': '⭐ Mes médicaments favoris',
    'footer.notif': '🔔 Alertes disponibilité en stock',
    'footer.pharmaTitle': 'Espace Officines',
    'footer.dashboard': 'Tableau de bord pharmacien',
    'footer.stock': 'Gestion des stocks & déclarations',
    'footer.history': 'Historique des mouvements',
    'footer.security': 'Données certifiées & sécurisées',
    'footer.copyright': '© 2026 PharmaCityTN — Tous droits réservés. République Tunisienne.',

    // Mentions légales & déontologiques
    'legal.disclaimer':
      'Retrait personnel obligatoire au comptoir de l’officine. Aucune vente en ligne ni livraison à domicile.',
  },

  ar: {
    // Header & Top bar
    'topbar.network': 'فارما سيتي تونس — الشبكة الوطنية للصيدليات في الجمهورية التونسية',
    'topbar.emergency': 'طوارئ : 190',
    'topbar.citizenMode': 'فضاء المواطن',
    'topbar.pharmacyMode': 'فضاء الصيدلي',
    'header.login': 'تسجيل الدخول',
    'header.register': 'إنشاء حساب',
    'header.logout': 'تسجيل الخروج',

    // Navigation publique
    'nav.home': 'الرئيسية',
    'nav.search': 'البحث عن دواء',
    'nav.howItWorks': 'كيف يعمل الموقع؟',

    // Navigation citoyen
    'nav.dashboard': 'لوحة التحكم',
    'nav.searchMed': 'البحث',
    'nav.request': 'طلب دواء',
    'nav.requestsTracking': 'متابعة الطلبات',
    'nav.favorites': 'الأدوية المفضلة',
    'nav.notifications': 'التنبيهات',
    'nav.profile': 'ملفي الشخصي',
    'nav.backToPublic': 'العودة إلى البوابة العامة (تسجيل الخروج)',
    'nav.logoutConfirm': 'تم تسجيل الخروج بنجاح. العودة إلى الصفحة الرئيسية.',

    // Navigation pharmacie
    'nav.pharma.dashboard': 'لوحة التحكم',
    'nav.pharma.medicines': 'قائمة الأدوية',
    'nav.pharma.stock': 'إدارة المخزون',
    'nav.pharma.availability': 'حالة التوفر',
    'nav.pharma.history': 'سجل العمليات',
    'nav.pharma.profile': 'بيانات الصيدلية',

    // Section Hero
    'hero.badge': 'الشبكة الرسمية للصيدليات في تونس',
    'hero.title': 'اعثر على أدويتك',
    'hero.titleHighlight': 'بسهولة أكبر.',
    'hero.subtitle':
      'تحقق من توفر الأدوية في الصيدليات التونسية ووفر وقتك وعناء البحث.',
    'hero.searchPlaceholder': 'ابحث عن دواء (دوليبران، أوجمنتين، ماكسيلاز)...',
    'hero.searchBtn': 'بحث',
    'hero.cnam': 'صيدليات متعاقدة مع الكنام (CNAM)',
    'hero.duty': 'صيدليات الحراسة ليلاً ونهاراً',

    // Section Comment ça marche
    'how.badge': 'إجراءات بسيطة وشفافة',
    'how.title': 'كيف يعمل الموقع؟',
    'how.subtitle':
      'في ثلاث خطوات سهلة، تعرف على الصيدلية التي يتوفر لديها دواؤك.',
    'how.step1.title': '1. ابحث عن الدواء',
    'how.step1.desc':
      'أدخل الاسم التجاري أو المادة الفعالة (DCI) لدواؤك في محرك البحث.',
    'how.step2.title': '2. اطلع على الصيدليات',
    'how.step2.desc':
      'اكتشف في ثوانٍ الصيدليات المصرحة بوجود الدواء مع توضيح حالة المخزون.',
    'how.step3.title': '3. اتصل بالصيدلية لتأكيد التوفر',
    'how.step3.desc':
      'اتصل مباشرة بالصيدلية لتأكيد التوفر والاحتفاظ بالدواء قبل الذهاب.',

    // Section Avantages
    'advantages.badge': 'لماذا فارما سيتي تونس؟',
    'advantages.title': 'خدمة رقمية موجهة لصحتك',
    'advantages.subtitle': 'احصل على معلومات دقيقة ومحدثة للعثور على أدويتك دون إضاعة الوقت.',
    'adv.1.title': 'بحث مبسط',
    'adv.1.desc': 'فرز حسب الاسم، المادة الفعالة، الشكل الصيدلاني، الجرعة أو الولاية بنقرات بسيطة.',
    'adv.2.title': 'معلومات التوفر الفورية',
    'adv.2.desc': 'تتبع مباشر لحالة المخزون (متوفر، مخزون محدود، أو نفاد المخزون).',
    'adv.3.title': 'توفير الوقت',
    'adv.3.desc': 'تجنب التنقل العشوائي بين الصيدليات واعرف أين تتوجه مسبقاً.',
    'adv.4.title': 'معلومات الاتصال المباشرة',
    'adv.4.desc': 'عناوين دقيقة، أرقام هواتف مباشرة ومواقع صيدليات الحراسة الليلية.',

    // Section Pharmacies
    'pharmacies.badge': 'شبكة الصيدليات الشريكة',
    'pharmacies.title': 'الصيدليات في تونس',
    'pharmacies.subtitle': 'تصفح الصيدليات الشريكة المعتمدة وحالة عملها.',
    'pharmacies.filter.all': 'الكل',
    'pharmacies.filter.open': 'مفتوحة الآن',
    'pharmacies.filter.night': 'حراسة ليلية',

    // Statuts de disponibilité
    'status.available': 'متوفر',
    'status.lowStock': 'مخزون محدود',
    'status.outOfStock': 'غير متوفر',

    // Profil citoyen
    'profile.title': 'ملفي الشخصي للمواطن',
    'profile.active': 'حساب نشط',
    'profile.subtitle': 'إدارة معلومات الاتصال وتحديد صيدليتك المرجعية في تونس.',
    'profile.personalInfo': 'البيانات الشخصية',
    'profile.personalInfoSub': 'معلومات الاتصال المعتمدة للتنبيهات والطلبات',
    'profile.fullName': 'الاسم واللقب',
    'profile.email': 'البريد الإلكتروني',
    'profile.phone': 'رقم الهاتف (تونس)',
    'profile.city': 'مدينة الإقامة',
    'profile.address': 'العنوان البريدي',
    'profile.birthDate': 'تاريخ الولادة',
    'profile.preferredPharma': 'الصيدلية المعتادة في منطقتك',
    'profile.saveBtn': 'حفظ التعديلات',
    'profile.cancelBtn': 'إلغاء التغييرات',
    'profile.prefCardTitle': 'الصيدلية المعتادة والتنبيهات',
    'profile.prefCardSubtitle': 'تخصيص خيارات متابعة المخزون وتنبيهات التوفر',
    'profile.prefHelper': 'ستعطي نتائج البحث الأولوية لهذه الصيدلية عند توفر الدواء لديها.',
    'profile.alertChannels': 'قنوات استلام التنبيهات :',
    'profile.alertEmail': 'تنبيهي عبر البريد الإلكتروني فور عودة توفر دواء في المفضلة',
    'profile.alertSms': 'استلام تنبيه بالرسائل القصيرة (SMS) لصيدليات الحراسة العاجلة',
    'profile.registeredCitizen': 'مواطن مسجل',
    'profile.identifier': 'المعرف :',
    'profile.sector': 'المنطقة :',
    'profile.privacyTitle': 'السرية والبيانات الصحية',
    'profile.privacyDesc': 'لا يجمع فارما سيتي تونس أي وصفات أو بيانات صحية حساسة دون موافقتك. معلومات التوفر تصريحية ومقدمة من الصيادلة.',

    // Dashboard citoyen
    'dashboard.welcome': 'مرحباً',
    'dashboard.subtitle': 'اطلع في لمحة سريعة على حالة أدويتك المفضلة وآخر التنبيهات.',
    'dashboard.newSearch': 'بحث جديد عن دواء',
    'dashboard.quickSearch': 'بحث سريع عن دواء...',
    'dashboard.recentViews': 'الأدوية التي تمت مراجعتها مؤخراً',
    'dashboard.favorites': 'أدويتي المفضلة',
    'dashboard.recentNotifs': 'أحدث التنبيهات',
    'dashboard.viewAll': 'عرض الكل',
    'dashboard.viewPharmacies': 'عرض الصيدليات',
    'dashboard.favSummary': 'الأدوية المفضلة',
    'dashboard.notifSummary': 'تنبيهات التوفر',
    'dashboard.requestSummary': 'طلبات استلام الأدوية',
    'dashboard.noRecent': 'لم تقم بمراجعة أي دواء مؤخراً. ابدأ بالبحث في الشريط أعلاه.',

    // Page de recherche
    'search.title': 'البحث عن الأدوية في تونس',
    'search.badge': 'مباشر',
    'search.subtitle': 'ابحث بالاسم التجاري أو المادة الفعالة أو الجرعة أو الشكل الصيدلاني في شبكة الصيدليات.',
    'search.placeholder': 'ابحث بالاسم (دوليبران)، المادة الفعالة (باراسيتامول)، الجرعة أو الشكل...',
    'search.filterTitle': 'تصفية نتائج البحث',
    'search.resetFilters': 'إعادة ضبط الفلاتر',
    'search.dosage': 'الجرعة',
    'search.allDosages': 'جميع الجرعات',
    'search.form': 'الشكل الصيدلاني',
    'search.allForms': 'جميع الأشكال',
    'search.availability': 'حالة التوفر',
    'search.allAvailabilities': 'جميع الحالات',
    'search.city': 'المدينة / الولاية',
    'search.allCities': 'جميع المدن',
    'search.resultsCount': 'دواء متوفر',
    'search.noResults': 'لم يتم العثور على أي دواء يطابق معايير البحث.',
    'search.disclaimer': 'تنبيه هام : معلومات التوفر تصريحية من الصيدليات ولا تعتبر ضماناً نهائياً لصرف الدواء. استشر دائماً طبيبك أو الصيدلي.',

    // Page favoris
    'favorites.title': 'أدويتي المفضلة',
    'favorites.subtitle': 'اعثر بسرعة على أدويتك التي تتابعها وتحقق من حالة توفرها في الصيدليات.',
    'favorites.badge': 'أدوية مسجلة',
    'favorites.filterPlaceholder': 'تصفية في أدويتي المفضلة...',
    'favorites.addBtn': 'إضافة دواء جديد',
    'favorites.emptyTitle': 'لا توجد أدوية في قائمتك المفضلة',
    'favorites.emptyDesc': 'أضف الأدوية إلى قائمتك المفضلة من صفحة البحث لمتابعة توفرها باستمرار.',

    // Suivi des demandes
    'requests.title': 'متابعة طلبات الأدوية',
    'requests.subtitle': 'تابع حالة طلبات الأدوية وحجوزاتها لدى الصيدليات الشريكة في تونس.',
    'requests.badge': 'طلبات',
    'requests.newBtn': 'طلب دواء جديد',
    'requests.all': 'جميع الطلبات',
    'requests.pending': 'قيد المعالجة',
    'requests.confirmed': 'مؤكدة وجاهزة للتحضير',
    'requests.completed': 'تم الاستلام في الصيدلية',
    'requests.rejected': 'ملغاة / مرفوضة',
    'requests.emptyTitle': 'لا توجد طلبات حتى الآن',
    'requests.emptyDesc': 'قم بتقديم طلب حجز دواء لدى إحدى الصيدليات الشريكة لتجهيز دوائك قبل التنقل.',

    // Composants Médicaments
    'medicine.dci': 'المادة الفعالة :',
    'medicine.form': 'الشكل :',
    'medicine.class': 'الفئة :',
    'medicine.prescription': 'بوصفة طبية',
    'medicine.noPrescription': 'بدون وصفة',
    'medicine.viewPharmacies': 'عرض الصيدليات',
    'medicine.pharmaciesCount': 'صيدليات',
    'medicine.pharmacyCount': 'صيدلية',
    'medicine.addFav': 'إضافة إلى المفضلة',
    'medicine.removeFav': 'حذف من المفضلة',
    'medicine.makeRequest': 'تقديم طلب حجز الدواء',
    'medicine.close': 'إغلاق',
    'medicine.callPharmacy': 'الاتصال بالصيدلية',
    'medicine.pharmaAvailability': 'حالة التوفر في الصيدليات',

    // Notifications
    'notifications.title': 'التنبيهات وسجل توفر الأدوية',
    'notifications.subtitle': 'تتبع إشعارات توفر الأدوية وتنبيهات التموين من الصيدليات الشريكة.',
    'notifications.markAll': 'تحديد الكل كمقروء',
    'notifications.all': 'كل التنبيهات',
    'notifications.unread': 'غير مقروءة',
    'notifications.stock': 'حركات المخزون',
    'notifications.out': 'حالات النفاد',
    'notifications.emptyTitle': 'لا توجد تنبيهات حالياً',
    'notifications.emptyDesc': 'أنت مطلع على أحدث التحديثات! ستصلك تنبيهات فور تحديث مخزون أدويتك المفضلة.',

    // Footer
    'footer.desc': 'أول منصة رقمية تونسية مخصصة للبحث والتحقق من توفر الأدوية في الوقت الفعلي في الصيدليات الشريكة.',
    'footer.servicesTitle': 'خدمات المواطنين',
    'footer.search': '🔍 البحث عن دواء',
    'footer.duty': '🌙 صيدليات الحراسة (تونس، سوسة، صفاقس...)',
    'footer.fav': '⭐ أدويتي المفضلة',
    'footer.notif': '🔔 تنبيهات توفر الأدوية',
    'footer.pharmaTitle': 'فضاء الصيدليات',
    'footer.dashboard': 'لوحة تحكم الصيدلي',
    'footer.stock': 'إدارة المخزون والتصاريح',
    'footer.history': 'سجل العمليات والمخزون',
    'footer.security': 'بيانات معتمدة ومحمية',
    'footer.copyright': '© 2026 فارما سيتي تونس — جميع الحقوق محفوظة. الجمهورية التونسية.',

    // Mentions légales & déontologiques
    'legal.disclaimer':
      'الاستلام الشخصي إلزامي من شباك الصيدلية. لا يسمح قانونياً بالبيع عبر الإنترنت أو التوصيل للمنازل.',
  },
};
