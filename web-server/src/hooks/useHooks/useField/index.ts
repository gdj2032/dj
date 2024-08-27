// https://fusion.design/pc/component/field?themeid=2#Field%E5%8F%82%E6%95%B0%E8%AF%B4%E6%98%8E

// const { init, setValues, getError, getValues, validatePromise } = NextField.useField()
// useEffect(() => {
//   setValues({ name1: '111' })
// }, [])
// <Input
//   {...init('name1', { rules: [{ required: true, message: '1111' }] })}
//   placeholder='name1'
//   style={{ borderColor: getError('name1') ? 'red' : '' }}
// />
// {getError('name1') ?
//   <span style={{ color: 'red' }}>{getError('name1').join(',')}</span> : ''}

import { useState, useMemo } from 'react';
import Field from '@alifd/field';
import { FieldOption } from '@alifd/field';
import { cloneAndAddKey } from './utils';

export interface IFieldWrapper extends Field {
  validate(callback?: (errors: object[], values: object) => void): void;
  validate(names?: string[] | string, callback?: (errors: object[], values: object) => void): void;
}

class NextField extends Field {
  static useField(options?: FieldOption): IFieldWrapper {
    if (!useState || !useMemo) {
      console.warn('need react version > 16.8.0');
      //@ts-ignore
      return;
    }
    //@ts-ignore
    return this.getUseField({ useMemo, useState })(options);
  }

  constructor(com: any, options: FieldOption = {}) {
    const newOptions = Object.assign({}, options, {
      // afterValidateRerender: scrollToFirstError,
      processErrorMessage: cloneAndAddKey,
    });
    super(com, newOptions);

    this.validate = this.validate.bind(this);
  }

  //@ts-ignore
  validate(callback?: (errors: object[], values: object) => void): void;
  validate(ns?: string[] | string, cb?: (errors: object[], values: object) => void): void {
    this.validateCallback(ns, cb);
  }

  reset(ns: string[] | string, backToDefault: boolean = false) {
    if (ns === true) {
      this.resetToDefault();
    } else if (backToDefault === true) {
      this.resetToDefault(ns);
    } else {
      this._reset(ns, false);
    }
  }
}

export default NextField;
