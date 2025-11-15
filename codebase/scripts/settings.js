// Global Settings Manager
// This file manages language and font size settings across all pages

// Language translations
const translations = {
    en: {
        // Navigation
        'nav.feed': 'Feed',
        'nav.myOrders': 'My Orders',
        'nav.profile': 'Profile',
        'nav.request': 'Request Page',
        // Common
        'common.cancel': 'Cancel',
        'common.submit': 'Submit',
        'common.return': 'Return',
        'common.complete': 'Complete',
        'common.logout': 'Logout',
        // Feed
        'feed.title': 'Available Jobs',
        'feed.subtitle': 'Browse and accept jobs from The Hive community',
        'feed.takeJob': 'Take Job',
        'feed.jobAccepted': 'Job Accepted!',
        // My Orders
        'orders.title': 'My Orders',
        'orders.subtitle': 'View your accepted and requested jobs',
        'orders.accepted': 'Accepted Jobs',
        'orders.acceptedSubtitle': 'Jobs you have taken',
        'orders.requested': 'Requested Jobs',
        'orders.requestedSubtitle': 'Jobs you have posted',
        'orders.completeOrder': 'Complete Order',
        'orders.orderCompleted': 'Order Completed!',
        // Profile
        'profile.title': 'Profile',
        'profile.subtitle': 'Manage your account and view your achievements',
        'profile.totalCompleted': 'Total Completed',
        'profile.ordersRequested': 'Orders Requested',
        'profile.ordersDelivered': 'Orders Delivered',
        'profile.completedByType': 'Completed Orders by Type',
        'profile.delivery': 'Delivery',
        'profile.tutoring': 'Tutoring',
        'profile.others': 'Others',
        'profile.settings': 'Settings',
        'profile.language': 'Language',
        'profile.fontSize': 'Font Size',
        // Request
        'request.title': 'Create Request',
        'request.subtitle': 'Post a new job request for The Hive community',
        'request.submitRequest': 'Submit Request',
        // Index
        'index.welcome': 'Welcome to The Hive!',
        'index.signIn': 'Sign In',
        'index.email': 'Email',
        'index.password': 'Password'
    },
    es: {
        'nav.feed': 'Feed',
        'nav.myOrders': 'Mis Pedidos',
        'nav.profile': 'Perfil',
        'nav.request': 'Página de Solicitud',
        'common.cancel': 'Cancelar',
        'common.submit': 'Enviar',
        'common.return': 'Volver',
        'common.complete': 'Completar',
        'common.logout': 'Cerrar Sesión',
        'feed.title': 'Trabajos Disponibles',
        'feed.subtitle': 'Explora y acepta trabajos de la comunidad The Hive',
        'feed.takeJob': 'Aceptar Trabajo',
        'feed.jobAccepted': '¡Trabajo Aceptado!',
        'orders.title': 'Mis Pedidos',
        'orders.subtitle': 'Ver tus trabajos aceptados y solicitados',
        'orders.accepted': 'Trabajos Aceptados',
        'orders.acceptedSubtitle': 'Trabajos que has tomado',
        'orders.requested': 'Trabajos Solicitados',
        'orders.requestedSubtitle': 'Trabajos que has publicado',
        'orders.completeOrder': 'Completar Pedido',
        'orders.orderCompleted': '¡Pedido Completado!',
        'profile.title': 'Perfil',
        'profile.subtitle': 'Administra tu cuenta y ve tus logros',
        'profile.totalCompleted': 'Total Completado',
        'profile.ordersRequested': 'Pedidos Solicitados',
        'profile.ordersDelivered': 'Pedidos Entregados',
        'profile.completedByType': 'Pedidos Completados por Tipo',
        'profile.delivery': 'Entrega',
        'profile.tutoring': 'Tutoría',
        'profile.others': 'Otros',
        'profile.settings': 'Configuración',
        'profile.language': 'Idioma',
        'profile.fontSize': 'Tamaño de Fuente',
        'request.title': 'Crear Solicitud',
        'request.subtitle': 'Publica una nueva solicitud de trabajo para la comunidad The Hive',
        'request.submitRequest': 'Enviar Solicitud',
        'index.welcome': '¡Bienvenido a The Hive!',
        'index.signIn': 'Iniciar Sesión',
        'index.email': 'Correo Electrónico',
        'index.password': 'Contraseña'
    },
    fr: {
        'nav.feed': 'Flux',
        'nav.myOrders': 'Mes Commandes',
        'nav.profile': 'Profil',
        'nav.request': 'Page de Demande',
        'common.cancel': 'Annuler',
        'common.submit': 'Soumettre',
        'common.return': 'Retour',
        'common.complete': 'Compléter',
        'common.logout': 'Déconnexion',
        'feed.title': 'Emplois Disponibles',
        'feed.subtitle': 'Parcourez et acceptez des emplois de la communauté The Hive',
        'feed.takeJob': 'Accepter l\'Emploi',
        'feed.jobAccepted': 'Emploi Accepté!',
        'orders.title': 'Mes Commandes',
        'orders.subtitle': 'Voir vos emplois acceptés et demandés',
        'orders.accepted': 'Emplois Acceptés',
        'orders.acceptedSubtitle': 'Emplois que vous avez pris',
        'orders.requested': 'Emplois Demandés',
        'orders.requestedSubtitle': 'Emplois que vous avez publiés',
        'orders.completeOrder': 'Compléter la Commande',
        'orders.orderCompleted': 'Commande Complétée!',
        'profile.title': 'Profil',
        'profile.subtitle': 'Gérez votre compte et consultez vos réalisations',
        'profile.totalCompleted': 'Total Complété',
        'profile.ordersRequested': 'Commandes Demandées',
        'profile.ordersDelivered': 'Commandes Livrées',
        'profile.completedByType': 'Commandes Complétées par Type',
        'profile.delivery': 'Livraison',
        'profile.tutoring': 'Tutorat',
        'profile.others': 'Autres',
        'profile.settings': 'Paramètres',
        'profile.language': 'Langue',
        'profile.fontSize': 'Taille de Police',
        'request.title': 'Créer une Demande',
        'request.subtitle': 'Publiez une nouvelle demande d\'emploi pour la communauté The Hive',
        'request.submitRequest': 'Soumettre la Demande',
        'index.welcome': 'Bienvenue sur The Hive!',
        'index.signIn': 'Se Connecter',
        'index.email': 'E-mail',
        'index.password': 'Mot de Passe'
    },
    zh: {
        'nav.feed': '动态',
        'nav.myOrders': '我的订单',
        'nav.profile': '个人资料',
        'nav.request': '请求页面',
        'common.cancel': '取消',
        'common.submit': '提交',
        'common.return': '返回',
        'common.complete': '完成',
        'common.logout': '登出',
        'feed.title': '可用工作',
        'feed.subtitle': '浏览并接受来自 The Hive 社区的工作',
        'feed.takeJob': '接受工作',
        'feed.jobAccepted': '工作已接受！',
        'orders.title': '我的订单',
        'orders.subtitle': '查看您已接受和已请求的工作',
        'orders.accepted': '已接受的工作',
        'orders.acceptedSubtitle': '您已接受的工作',
        'orders.requested': '已请求的工作',
        'orders.requestedSubtitle': '您已发布的工作',
        'orders.completeOrder': '完成订单',
        'orders.orderCompleted': '订单已完成！',
        'profile.title': '个人资料',
        'profile.subtitle': '管理您的账户并查看您的成就',
        'profile.totalCompleted': '总完成数',
        'profile.ordersRequested': '已请求订单',
        'profile.ordersDelivered': '已交付订单',
        'profile.completedByType': '按类型完成的订单',
        'profile.delivery': '配送',
        'profile.tutoring': '辅导',
        'profile.others': '其他',
        'profile.settings': '设置',
        'profile.language': '语言',
        'profile.fontSize': '字体大小',
        'request.title': '创建请求',
        'request.subtitle': '为 The Hive 社区发布新的工作请求',
        'request.submitRequest': '提交请求',
        'index.welcome': '欢迎来到 The Hive！',
        'index.signIn': '登录',
        'index.email': '电子邮件',
        'index.password': '密码'
    }
};

// Get current language
function getLanguage() {
    return localStorage.getItem('language') || 'en';
}

// Get current font size
function getFontSize() {
    return parseInt(localStorage.getItem('fontSize') || '16', 10);
}

// Apply font size globally
function applyFontSize() {
    const fontSize = getFontSize();
    document.documentElement.style.fontSize = fontSize + 'px';
    document.body.style.fontSize = fontSize + 'px';
}

// Translate text
function t(key) {
    const lang = getLanguage();
    return translations[lang]?.[key] || translations.en[key] || key;
}

// Apply language to page
function applyLanguage() {
    const lang = getLanguage();
    document.documentElement.setAttribute('lang', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key) {
            element.textContent = t(key);
        }
    });
    
    // Update title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (key) {
            element.setAttribute('title', t(key));
            element.setAttribute('aria-label', t(key));
        }
    });
}

// Initialize settings on page load
function initSettings() {
    applyFontSize();
    applyLanguage();
}

// Set language
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    applyLanguage();
    // Reload page to apply language changes
    window.location.reload();
}

// Set font size
function setFontSize(size) {
    localStorage.setItem('fontSize', size.toString());
    applyFontSize();
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSettings);
} else {
    initSettings();
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.Settings = {
        getLanguage,
        getFontSize,
        setLanguage,
        setFontSize,
        applyFontSize,
        applyLanguage,
        t,
        initSettings
    };
}

