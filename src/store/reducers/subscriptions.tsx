import * as ReduxType from '../types';

export type SubscriptionAction = {
  type: ReduxType.SubscriptionsTypes;
  payload: string | string[];
};

function appendSubscription(subscription: string, subscriptions: string[]): string[] {
  return subscriptions.includes(subscription) ? subscriptions : [...subscriptions, subscription];
}

function deleteSubscription(subscription: string, subscriptions: string[]): string[] {
  return subscriptions.filter((sub) => sub !== subscription);
}

export const subscriptions = (state: string[] = [], action: SubscriptionAction) => {
  switch (action.type) {
    case ReduxType.SET_SUBSCRIPTIONS:
      if (Array.isArray(action.payload)) {
        return action.payload as string[];
      }
    case ReduxType.ADD_SUBSCRIPTION:
      return appendSubscription(action.payload as string, state) as string[];
    case ReduxType.DELETE_SUBSCRIPTION:
      return deleteSubscription(action.payload as string, state) as string[];
    default:
      return state as string[];
  }
};
