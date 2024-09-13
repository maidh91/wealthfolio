import z from 'zod';
import { Goal, GoalAllocation } from '@/lib/types';
import { newGoalSchema } from '@/lib/schemas';
import { getRunEnv, RUN_ENV, invokeTauri } from '@/adapters';

type NewGoal = z.infer<typeof newGoalSchema>;

export const getGoals = async (): Promise<Goal[]> => {
  try {
    switch (getRunEnv()) {
      case RUN_ENV.DESKTOP:
        const goals = await invokeTauri<Goal[]>('get_goals');
        return goals;
      default:
        throw new Error(`Unsupported`);
    }
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
};

export const createGoal = async (goal: NewGoal): Promise<Goal> => {
  const newGoal = {
    ...goal,
    yearlyContribution: 0,
    goalType: 'NEEDS',
    isAchieved: false,
  };
  try {
    switch (getRunEnv()) {
      case RUN_ENV.DESKTOP:
        const createdGoal = await invokeTauri<Goal>('create_goal', { goal: newGoal });
        return createdGoal;
      default:
        throw new Error(`Unsupported`);
    }
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

export const updateGoal = async (goal: Goal): Promise<Goal> => {
  try {
    switch (getRunEnv()) {
      case RUN_ENV.DESKTOP:
        const updatedGoal = await invokeTauri<Goal>('update_goal', { goal });
        return updatedGoal;
      default:
        throw new Error(`Unsupported`);
    }
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
};

export const deleteGoal = async (goalId: string): Promise<void> => {
  try {
    switch (getRunEnv()) {
      case RUN_ENV.DESKTOP:
        await invokeTauri('delete_goal', { goalId });
        return;
      default:
        throw new Error(`Unsupported`);
    }
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw error;
  }
};

export const updateGoalsAllocations = async (allocations: GoalAllocation[]): Promise<void> => {
  try {
    switch (getRunEnv()) {
      case RUN_ENV.DESKTOP:
        await invokeTauri('update_goal_allocations', { allocations });
        return;
      default:
        throw new Error(`Unsupported`);
    }
  } catch (error) {
    console.error('Error saving goals allocations:', error);
    throw error;
  }
};

export const getGoalsAllocation = async (): Promise<GoalAllocation[]> => {
  try {
    switch (getRunEnv()) {
      case RUN_ENV.DESKTOP:
        const allocations = await invokeTauri<GoalAllocation[]>('load_goals_allocations');
        return allocations;
      default:
        throw new Error(`Unsupported`);
    };
  } catch (error) {
    console.error('Error fetching goals allocations:', error);
    throw error;
  }
};
