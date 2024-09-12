export enum RUN_ENV {
    DESKTOP = 'desktop',
    BROWSER = 'browser',
    UNSUPPORTED = 'unsupported',
};

export const getRunEnv = () => {
    if (typeof window !== 'undefined' && window.__TAURI__) {
        return RUN_ENV.DESKTOP;
    }
    if (typeof window !== 'undefined' && window.indexedDB) {
        return RUN_ENV.BROWSER;
    }
    return RUN_ENV.UNSUPPORTED;
}

export const invokeTauri = async (command: string, payload?: Record<string, unknown>) => {
    const invoke = await import('@tauri-apps/api').then((mod) => mod.invoke);
    return await invoke(command, payload);
}
