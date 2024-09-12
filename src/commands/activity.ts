import z from 'zod';
import { Activity, ActivityDetails, ActivityImport, ActivitySearchResponse } from '@/lib/types';
import { newActivitySchema } from '@/lib/schemas';
import { getRunEnv, invokeTauri, RUN_ENV } from '@/commands/utils';

const runEnv = getRunEnv();

export type NewActivity = z.infer<typeof newActivitySchema>;

interface Filters {
  accountId?: string;
  activityType?: string;
  symbol?: string;
}

interface Sort {
  id: string;
  desc: boolean;
}

export const getActivities = async (): Promise<ActivityDetails[]> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        const activities = await invokeTauri<ActivityDetails[]>('get_activities');
        return activities;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

export const searchActivities = async (
  page: number,
  pageSize: number,
  filters: Filters,
  searchKeyword: string,
  sort: Sort,
): Promise<ActivitySearchResponse> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        const result = await invokeTauri<ActivitySearchResponse>('search_activities', {
          page,
          pageSize,
          accountIdFilter: filters?.accountId,
          activityTypeFilter: filters?.activityType,
          assetIdKeyword: searchKeyword,
          sort,
        });
        return result;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

// createActivity
export const createActivity = async (activity: NewActivity): Promise<Activity> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        const newActivity = await invokeTauri<Activity>('create_activity', { activity });
        return newActivity;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error creating activity:', error);
    throw error;
  }
};

// updateActivity
export const updateActivity = async (activity: NewActivity): Promise<Activity> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        const updatedActivity = await invokeTauri<Activity>('update_activity', { activity });
        return updatedActivity;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error updating activity:', error);
    throw error;
  }
};

// deleteActivity
export const deleteActivity = async (activityId: string): Promise<void> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        await invokeTauri('delete_activity', { activityId });
        return;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error deleting activity:', error);
    throw error;
  }
};

//checkActivitiesImport
export const checkActivitiesImport = async ({
  account_id,
  file_path,
}: {
  account_id: string;
  file_path: string;
}): Promise<ActivityImport[]> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        const result = await invokeTauri<ActivityImport[]>('check_activities_import', {
          accountId: account_id,
          filePath: file_path,
        });
        return result;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error checking activities import:', error);
    throw error;
  }
};

// importActivities
export const createActivities = async (activities: NewActivity[]): Promise<Number> => {
  try {
    switch (runEnv) {
      case RUN_ENV.DESKTOP:
        const importResult: Number = await invokeTauri('create_activities', { activities });
        return importResult;
      default:
        throw new Error(`Unsupported: ${runEnv}`);
    }
  } catch (error) {
    console.error('Error importing activities:', error);
    throw error;
  }
};
