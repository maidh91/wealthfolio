import { AssetData, QuoteSummary } from '@/lib/types';
import { getRunEnv, invokeTauri, RUN_ENV } from '@/commands/utils';

const runEnv = getRunEnv();

export const searchTicker = async (query: string): Promise<QuoteSummary[]> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        const searchResult = await invokeTauri<QuoteSummary[]>('search_ticker', { query });
        return searchResult;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error searching for ticker:', error);
    throw error;
  }
};

export const syncHistoryQuotes = async (): Promise<void> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        await invokeTauri('synch_quotes');
        return;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error syncing history quotes:', error);
    throw error;
  }
};

export const getAssetData = async (assetId: string): Promise<AssetData> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        const result = await invokeTauri<AssetData>('get_asset_data', { assetId });
        return result;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error loading asset data:', error);
    throw error;
  }
};
