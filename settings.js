module.exports = {
    uiPort: process.env.PORT || 1880,

    mqttReconnectTime: 15000,
    serialReconnectTime: 15000,

    debugMaxLength: 1000,

    httpAdminRoot: "/",
    httpNodeRoot: "/",
    ui: { path: "ui" },

    // Thêm auth nếu cần
    // adminAuth: {
    //     type: "credentials",
    //     users: [{
    //         username: "admin",
    //         password: "$2b$08$hash_password",
    //         permissions: "*"
    //     }]
    // },

    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    },

    editorTheme: {
        projects: {
            enabled: true
        }
    }
}
