import { invoke } from '@tauri-apps/api';
import * as z from 'zod';
import { Account } from '@/lib/types';
import { newAccountSchema } from '@/lib/schemas';
import { getRunEnv, invokeTauri, RUN_ENV } from '@/commands/utils';

type NewAccount = z.infer<typeof newAccountSchema>;

const runEnv = getRunEnv();

export const getAccounts = async (): Promise<Account[]> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        const accounts = await invokeTauri('get_accounts');
        return accounts as Account[];
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
    const createdAccount = await invoke('create_account', { account });
    return createdAccount as Account;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

// updateAccount
export const updateAccount = async (account: NewAccount): Promise<Account> => {
  try {
    const { currency, ...updatedAccountData } = account;
    const updatedAccount = await invoke('update_account', { account: updatedAccountData });
    return updatedAccount as Account;
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
};

// deleteAccount
export const deleteAccount = async (accountId: string): Promise<void> => {
  try {
    await invoke('delete_account', { accountId });
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};
