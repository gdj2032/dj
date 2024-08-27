/**
 * 文档详情
 */
import { CBaseInfo, CBreadcrumb, MarkdownPreview } from '@/components';
import { ICBaseInfoData } from '@/components/CBaseInfo';
import { PathConfig } from '@/framework/routes/routes';
import { documentService } from '@/services';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.scss';

export const RoutePath = '/home/document/detail/:id';

function DocumentDetail() {
  const { id } = useParams()
  const [data, setData] = useState<DocumentService.IDocument>()
  const route = [
    { name: '首页', url: PathConfig.home },
    { name: '文档详情' },
  ]

  const init = async () => {
    const res = await documentService.getDocumentDetail(id)
    setData(res.data)
  }

  useEffect(() => {
    init()
  }, [])

  const baseInfos = (): ICBaseInfoData[] => {
    const {
      name,
      description,
      types,
    } = data || {}
    return [
      { label: '标题', value: name },
      { label: '类型', value: types?.map?.((e) => e.name).join(',') },
      { label: '描述', value: description || '-' },
    ]
  }
  return (
    <div className='DocumentDetail'>
      <CBreadcrumb route={route} />
      <CBaseInfo data={baseInfos()} needMarginTop />
      <Card title="正文" style={{ marginTop: 16 }}>
        <MarkdownPreview value={data?.content} themes="light" />
      </Card>
    </div>
  )
}

DocumentDetail.displayName = 'DocumentDetail';

export default DocumentDetail;
