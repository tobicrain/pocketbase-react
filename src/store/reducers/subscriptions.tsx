import * as ReduxType from '../types';

export interface ReduxSubscriptions {
  subscriptions: string[];
}

export type SubscriptionAction = {
  type: ReduxType.SubscriptionsTypes;
  payload: string | string[];
};

function appendSubscription(subscription: string, subscriptions: string[]): string[] {
  return [...subscriptions, subscription];
}

function deleteSubscription(subscription: string, subscriptions: string[]): string[] {
  return subscriptions.filter((sub) => sub !== subscription);
}

export const subscriptions = (
  state: ReduxSubscriptions = {
    subscriptions: [],
  },
  action: SubscriptionAction
) => {
  const list = state.subscriptions;

  switch (action.type) {
    case ReduxType.SET_SUBSCRIPTIONS:
      if (Array.isArray(action.payload)) {
        return {
          subscriptions: action.payload,
        };
      }
    case ReduxType.ADD_SUBSCRIPTION:
      return {
        subscriptions: appendSubscription(action.payload as string, list),
      };
    case ReduxType.DELETE_SUBSCRIPTION:
      return {
        subscriptions: deleteSubscription(action.payload as string, list),
      };
    default:
      return state;
  }
};
