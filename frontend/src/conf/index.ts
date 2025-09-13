const conf = {
    appName: String(import.meta.env.VITE_APP_NAME),
    baseUrl: String(import.meta.env.VITE_PUBLIC_URL),
    apiUrl: String(import.meta.env.VITE_APP_API_URL),
    apiAssetUrl: String(import.meta.env.VITE_APP_ASSET_URL),
}

export default conf;