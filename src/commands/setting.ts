import { Settings } from '@/lib/types';
import { getRunEnv, RUN_ENV, invokeTauri } from '@/adapters';

// getSettings
export const getSettings = async (): Promise<Settings> => {
  try {
    switch (getRunEnv()) {
      case RUN_ENV.DESKTOP:
        const settings = await invokeTauri<Settings>('get_settings');
        return settings;
      default:
        throw new Error(`Unsupported`);
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {} as Settings;
  }
};

// saveSettings
export const saveSettings = async (settings: Settings): Promise<Settings> => {
  try {
    switch (getRunEnv()) {
      case RUN_ENV.DESKTOP:
        const updatedSettings = await invokeTauri<Settings>('update_settings', { settings });
        return updatedSettings;
      default:
        throw new Error(`Unsupported`);
    }
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};
