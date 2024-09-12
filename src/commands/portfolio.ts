import { FinancialHistory, Holding, IncomeSummary } from '@/lib/types';
import { getRunEnv, invokeTauri, RUN_ENV } from '@/commands/utils';

const runEnv = getRunEnv();

export const getHistorical = async (): Promise<FinancialHistory[]> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        const result = await invokeTauri<FinancialHistory[]>('get_historical');
        return result;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

export const computeHoldings = async (): Promise<Holding[]> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        const result = await invokeTauri<Holding[]>('compute_holdings');
        return result;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error computing holdings:', error);
    throw error;
  }
};

export const getIncomeSummary = async (): Promise<IncomeSummary> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        const result = await invokeTauri<IncomeSummary>('get_income_summary');
        return result;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error fetching income summary:', error);
    throw error;
  }
};
