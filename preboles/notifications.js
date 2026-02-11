// www/js/notifications.js
class NotificationService {
    constructor() {
        this.notificationPermission = false;
        this.init();
    }

    async init() {
        // Solicitar permisos
        if (typeof Capacitor !== 'undefined' && 
            Capacitor.isNativePlatform() &&
            Capacitor.Plugins.LocalNotifications) {
            
            const result = await Capacitor.Plugins.LocalNotifications.requestPermissions();
            this.notificationPermission = result.display === 'granted';
            
            if (this.notificationPermission) {
                console.log("✅ Permisos de notificación concedidos");
                this.scheduleDailyNotification();
            }
        }
    }

    // Programar notificación diaria a una hora específica
    async scheduleDailyNotification() {
        try {
            // Cancelar notificaciones anteriores
            await Capacitor.Plugins.LocalNotifications.cancel({ 
                notifications: [{ id: 100 }] 
            });

            // Configurar hora específica (ejemplo: 17:30 para atardecer)
            const scheduleTime = new Date();
            scheduleTime.setHours(17, 30, 0, 0);

            // Si ya pasó hoy, programar para mañana
            if (scheduleTime.getTime() < Date.now()) {
                scheduleTime.setDate(scheduleTime.getDate() + 1);
            }

            await Capacitor.Plugins.LocalNotifications.schedule({
                notifications: [{
                    id: 100,
                    title: "🌅 Hora de revisar Préboles",
                    body: "Consulta la probabilidad de arrebol en tu ciudad",
                    schedule: {
                        at: scheduleTime,
                        repeats: true,  // Se repite diariamente
                        every: "day"
                    },
                    smallIcon: "ic_stat_icon_config_sample",
                    iconColor: "#FF9800",
                    sound: null,
                    attachments: null,
                    actionTypeId: "",
                    extra: null
                }]
            });

            console.log("✅ Notificación programada para:", scheduleTime.toLocaleString());
        } catch (error) {
            console.error("❌ Error programando notificación:", error);
        }
    }

    // Enviar notificación inmediata (para pruebas)
    async sendTestNotification() {
        if (!this.notificationPermission) return;

        await Capacitor.Plugins.LocalNotifications.schedule({
            notifications: [{
                id: 101,
                title: "🌅 Prueba de notificación",
                body: "Funcionan las notificaciones en Préboles",
                schedule: { at: new Date(Date.now() + 1000) }
            }]
        });
    }

    // Enviar notificación de arrebol detectado
    async sendArrebolAlert(cityName, probability) {
        if (!this.notificationPermission || probability < 0.7) return;

        await Capacitor.Plugins.LocalNotifications.schedule({
            notifications: [{
                id: Date.now() % 1000, // ID único
                title: "🌅 ¡Alta probabilidad de arrebol!",
                body: `${Math.round(probability * 100)}% en ${cityName}`,
                schedule: { at: new Date(Date.now() + 1000) },
                smallIcon: "ic_stat_icon_config_sample",
                iconColor: "#FF9800"
            }]
        });
    }

    // Programar notificación para hora específica de arrebol
    async scheduleArrebolNotification(cityName, optimalTime) {
        if (!this.notificationPermission) return;

        const notificationTime = new Date(optimalTime.getTime() - 30 * 60000); // 30 minutos antes

        await Capacitor.Plugins.LocalNotifications.schedule({
            notifications: [{
                id: 200,
                title: "🌅 Arrebol en camino",
                body: `Máximo arrebol en ${cityName} en 30 minutos`,
                schedule: { at: notificationTime },
                smallIcon: "ic_stat_icon_config_sample",
                iconColor: "#FF9800"
            }]
        });
    }
}

// Exportar instancia global
window.notificationService = new NotificationService();