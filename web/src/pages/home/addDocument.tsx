/**
 * 新增文档
 */
import React from 'react';
import './index.scss';
import { AddEditDocView } from './comp';

export const RoutePath = '/home/document/add';

function AddDocument() {
  return (
    <AddEditDocView type="ADD" />
  )
}

AddDocument.displayName = 'AddDocument';

export default AddDocument;
