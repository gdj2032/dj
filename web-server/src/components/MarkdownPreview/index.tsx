/**
 * markdown预览
 */
import React, { useEffect, useState } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

import './index.scss'

interface IProps {
  themes?: 'dark' | 'light';
  value: string;
  height?: number | string;
  disableCopy?: boolean;
}

function Markdown(props: IProps) {
  const { themes = 'dark', value: propsValue, height = 300, disableCopy } = props;

  const [value, setValue] = useState(propsValue)

  useEffect(() => {
    setValue(propsValue)
  }, [propsValue])

  return (
    <MarkdownPreview
      className="g-react-mark-down"
      style={{ height }}
      source={value}
      disableCopy={disableCopy}
      warpperElement={{
        "data-color-mode": themes,
      }}
    />
  )
}

Markdown.displayName = 'Markdown';

export default Markdown;
