import { SubscriptionAction } from '../reducers/subscriptions';
import * as ReduxType from '../types';

const setSubscriptions = (payload: string[]) =>
  ({
    type: ReduxType.SET_SUBSCRIPTIONS,
    payload,
  } as SubscriptionAction);

const addSubscription = (payload: string) =>
  ({
    type: ReduxType.ADD_SUBSCRIPTION,
    payload,
  } as SubscriptionAction);

const deleteSubscription = (payload: string) =>
  ({
    type: ReduxType.DELETE_SUBSCRIPTION,
    payload,
  } as SubscriptionAction);

export { setSubscriptions, addSubscription, deleteSubscription };
