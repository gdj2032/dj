// @ts-nocheck
import React from 'react';
// import ReactDOM from 'react-dom';
import { hydrateRoot } from 'react-dom/client';

export const destroyFns: Array<() => void> = [];

export interface IModalProps {
  /* 限制这3个参数必须 */
  visible: boolean;
  // onClose: any;
  afterClose: (params?: any) => void
  [key: string]: any;
}
// type ConfigUpdate = IModalProps | ((prevConfig: IModalProps) => IModalProps);

interface ICallBack<ITModalProps> {
  destroy: (args?: { triggerCancel: boolean }) => void;
  // eslint-disable-next-line max-len
  update: (configUpdate: Partial<ITModalProps> | ((prevConfig: IModalProps) => IModalProps)) => void;
}

export default function openModal<ITModalProps = IModalProps>(
  DialogComponent: React.ComponentType<ITModalProps>,
  config: Omit<ITModalProps, 'visible' | 'afterClose'>,
): ICallBack<ITModalProps> {
  const div = document.createElement('div');
  document.body.appendChild(div);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  let currentConfig = { ...(config || {}), close, visible: true } as any;

  const root = hydrateRoot(div, <DialogComponent />)

  // function destroy(...args: any[]) {
  function destroy() {
    // console.info('--- destroyFns --->', destroyFns);
    // root.unmount()
    div?.parentNode?.removeChild?.(div);
    // const triggerCancel = args.some((param) => param && param.triggerCancel);
    // if (config.onClose && triggerCancel) {
    //   config.onClose(false, args);
    // }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function render({ ...props }: any) {
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     *
     * Sync render blocks React event. Let's make this async.
     */
    setTimeout(() => {
      root.render(<DialogComponent {...props} />);
    });
  }

  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: () => {
        // @ts-ignore
        if (typeof config.afterClose === 'function') {
          // @ts-ignore
          config.afterClose(...args);
        }
        // @ts-ignore
        destroy.apply(this, args);
      },
    };
    render(currentConfig);
  }

  function update(configUpdate: Function | object) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = {
        ...currentConfig,
        ...configUpdate,
      };
    }
    render(currentConfig);
  }

  render(currentConfig);

  destroyFns.push(close);

  return { destroy, update };
}
