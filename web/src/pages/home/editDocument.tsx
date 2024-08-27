/**
 * 编辑文档
 */
import React from 'react';
import './index.scss';
import { AddEditDocView } from './comp';

export const RoutePath = '/home/document/edit/:id';

function EditDocument() {
  return (
    <AddEditDocView type="EDIT" />
  )
}

EditDocument.displayName = 'EditDocument';

export default EditDocument;
