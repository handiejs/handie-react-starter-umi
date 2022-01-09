import { history } from 'umi';
import {
  HistoryLocation,
  AppHelper,
  AppInstance,
  createApp as _createApp,
} from 'handie-react-starter-antd';

import { AppDescriptor } from '../types/app';
import { Dialog } from '../controls';
import { setRoutes, getLocation, resolveHistoryParams } from './history';

function createAppHelper(): AppHelper {
  return {
    history: {
      getLocation,
      back: history.goBack,
      forward: history.goForward,
      go: history.go,
      push: (location: HistoryLocation) => history.push(resolveHistoryParams(location)),
      replace: (location: HistoryLocation) => history.replace(resolveHistoryParams(location)),
    },
    alert: (message, callback) => Dialog.alert(message, callback as any),
    confirm: (message, ...args: any[]) => Dialog.confirm(message, ...args),
  };
}

function createApp({ routes, ...others }: AppDescriptor): AppInstance {
  setRoutes(routes);

  return _createApp({ ...others, creators: { appHelper: createAppHelper } });
}

export { createApp };
