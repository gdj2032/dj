import { IMDHeaderButton, IMDGrammar } from "./type"

export const MD_GRAMMAR: IMDGrammar = {
  title: '语法说明',
  list: [
    {
      title: '标题',
      content: `# # 1级标题\n\r## ## 2级标题\n\r### ### 3级标题\n\r#### #### 4级标题\n\r##### ##### 5级标题\n\r###### ###### 6级标题`,
      copy: `# 1级标题\n## 2级标题\n### 3级标题\n#### 4级标题\n##### 5级标题\n###### 6级标题`,
    },
    {
      title: '文本样式',
      content: `*\\*强调文本\\** _\\_强调文本\\__<br />**\\*\\*加粗文本\\*\\*** __\\_\\_加粗文本\\_\\___<br />~~\\~\\~删除文本\\~\\~~~<br />\\> 引用文本<br />`,
      copy: `*强调文本* _强调文本_\n**加粗文本** __加粗文本__\n~~删除文本~~\n> 引用文本\n`,
    },
    {
      title: '列表',
      content: `\\- 任务\n\r  \\* 任务\n\r    \\+ 任务\n\r\n\r1\\. 任务1\n\r2\\. 任务2\n\r3\\. 任务3\n\r\n\r\\- [] 计划任务\n\r\\- [x] 完成任务\n\r`,
      copy: '- 任务\n  * 任务\n    + 任务\n\n1. 任务1\n2. 任务2\n3. 任务3\n\n- [ ] 计划任务\n- [x] 完成任务\n',
    },
    {
      title: '图片',
      content: `图片: \\!\\[Alt\\]\\(https://<span></span>gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg\\)\n\n带尺寸的图片: \\!\\[Alt\\]\\(https://<span></span>gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_100,h_100\\)\n\n宽度确定高度等比例的图片: \\!\\[Alt\\]\\(https://<span></span>gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_100\\)\n\n高度确定宽度等比例的图片: \\!\\[Alt\\]\\(https://<span></span>gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,h_100\\)\n\n居中的图片1:\n\n\\<center>\n\n\\!\\[Alt\\]\\(https://<span></span>gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_100,h_100\\)\n\\</center>\n\n居中的图片2:\n\n\\<div align=\\"center\\">\n\n\\!\\[Alt\\]\\(https://<span></span>gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_100,h_100\\)\n\\</div>\n\n居右的图片:\n\n\\<div align=\\"right\\">\n\n\\!\\[Alt\\]\\(https://<span></span>gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_100,h_100\\)\n</div>`,
      copy: '图片: ![Alt](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg)\n\n带尺寸的图片: ![Alt](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_100,h_100)\n\n宽度确定高度等比例的图片: ![Alt](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_100)\n\n高度确定宽度等比例的图片: ![Alt](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,h_100)\n\n居中的图片1:\n<center>\n\n![Alt](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_100,h_100)\n</center>\n\n居中的图片2:\n<div align=\\"center\\">\n\n![Alt](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_100,h_100)\n</div>\n\n居右的图片:\n<div align=\\"right\\">\n\n![Alt](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_100,h_100)\n</div>',
    },
    {
      title: '链接',
      content: '链接: \\[百度链接]\\(https://<span></span>www<span></span>.baidu.com\\)',
      copy: '链接: [百度链接](https://www.baidu.com)'
    },
    {
      title: '代码片段',
      content: "\\`\\`\\`<br />// A code block<br />var foo = 'bar';<br />\\`\\`\\`<br /><br />\\`\\`\\`javascript<br />// An highlighted block<br />var foo = 'bar';<br />\\`\\`\\`<br />",
      copy: "```\n// A code block\nvar foo = 'bar';\n```\n\n```javascript\n// An highlighted block\nvar foo = 'bar';\n```\n",
    },
    {
      title: '表格',
      content: "项目  \\| Value<br />------ \\| -----<br />电脑  \\| $1600<br />手机  \\| $12<br />导管  \\| $1<br />\\| Column 1 \\| Column 2      \\|<br />\\|\\:--------\\:\\| -------------\\:\\|<br />\\| centered 文本居中 \\| right-aligned 文本居右 \\|",
      copy: "|  |  |\n|--|--|\n|  |  |\n"
    }
  ]
}

export const MD_HEADER_BUTTON: IMDHeaderButton[][] = [
  [
    {
      title: '加粗',
      svg: 'md_bold',
      type: 'bold',
      default: '**加粗样式**',
      select: {
        start: 2,
        end: 6,
      }
    },
    {
      title: '斜体',
      svg: 'md_italic',
      type: 'italic',
      default: '*斜体样式*',
      select: {
        start: 1,
        end: 5,
      }
    },
    {
      title: '标题',
      svg: 'md_title',
      type: 'title',
      default: '## 标题',
      select: {
        start: 3,
        end: 5,
      }
    },
    {
      title: '删除线',
      svg: 'md_stripper_line',
      type: 'stripper_line',
      default: '~~删除文本~~',
      select: {
        start: 2,
        end: 6,
      }
    },
  ],
  [
    {
      title: '无序',
      svg: 'md_unordered_list',
      type: 'unordered_list',
      default: '- 无序1',
      select: {
        start: 2,
        end: 5,
      }
    },
    {
      title: '有序',
      svg: 'md_ordered_list',
      type: 'ordered_list',
      default: '1 有序1',
      select: {
        start: 2,
        end: 5,
      }
    },
    {
      title: '待办',
      svg: 'md_upcoming',
      type: 'upcoming',
      default: '- [ ] 待办1',
      select: {
        start: 6,
        end: 9,
      }
    },
    {
      title: '引用',
      svg: 'md_reference',
      type: 'reference',
      default: '> 引用1',
      select: {
        start: 2,
        end: 5,
      }
    },
    {
      title: '代码块',
      svg: 'md_code_block',
      type: 'code_block',
      default: '```demo\n在这里插入代码片\n```\n',
      select: {
        start: 8,
        end: 16,
      }
    },
  ],
  [
    {
      title: '图片',
      svg: 'md_image',
      type: 'image',
      default: '图片: ![描述](url)',
    }
  ],
  [
    {
      title: '表格',
      svg: 'md_table',
      type: 'table',
      default: "|  |  |\n|--|--|\n|  |  |\n"
    }
  ]
]
