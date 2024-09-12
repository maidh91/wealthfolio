import z from 'zod';
import { Account } from '@/lib/types';
import { newAccountSchema } from '@/lib/schemas';
import { getRunEnv, invokeTauri, RUN_ENV } from '@/commands/utils';

const runEnv = getRunEnv();

type NewAccount = z.infer<typeof newAccountSchema>;

export const getAccounts = async (): Promise<Account[]> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        const accounts = await invokeTauri<Account[]>('get_accounts');
        return accounts;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

// createAccount
export const createAccount = async (account: NewAccount): Promise<Account> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        const createdAccount = await invokeTauri<Account>('create_account', { account });
        return createdAccount;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

// updateAccount
export const updateAccount = async (account: NewAccount): Promise<Account> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        const { currency, ...updatedAccountData } = account;
        const updatedAccount = await invokeTauri<Account>('update_account', { account: updatedAccountData });
        return updatedAccount;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
};

// deleteAccount
export const deleteAccount = async (accountId: string): Promise<void> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        await invokeTauri('delete_account', { accountId });
        return;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};
