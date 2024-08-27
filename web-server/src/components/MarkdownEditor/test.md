# # 1级标题
## ## 2级标题
### ### 3级标题

# 阿里云图片缩放

![1111](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_200,h_200)

<center>

![123](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-02-03/167541605277459557733107_circle.jpeg?x-oss-process=image/resize,w_100,h_100)
</center>

### https://help.aliyun.com/document_detail/44688.html?spm=a2c4g.11186623.4.4.4b2610b7plRDPa


# setSelectionRange方法不生效的解决方案

```js
// 选中指定文字
// focus方法是个异步的
const onSelectText = (start: number, end: number) => {
  const ele = document.getElementById(textareaIdClass) as HTMLTextAreaElement
  if (ele) {
    ele.focus();
    setTimeout(() => {
      ele.setSelectionRange(start, end);
    }, 1);
  }
}
```


图片: ![Alt](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg)

带尺寸的图片: ![Alt](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_100,h_100)

宽度确定高度等比例的图片: ![Alt](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_100)

高度确定宽度等比例的图片: ![Alt](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,h_100)

居中的图片1:
<center>

![Alt](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_100,h_100)
</center>

居中的图片2:
<div align="center">

![Alt](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_100,h_100)
</div>

居右的图片:
<div align="right">

![Alt](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-01-13/167359899266390162572214_circle.jpeg?x-oss-process=image/resize,w_100,h_100)
</div>


<!-- ![Alt](https://gdj-knowledge-client.oss-cn-hangzhou.aliyuncs.com/image/2023-02-17/167661392852848006108986_7f7a72745d4ca0c099a83659a44c4566) -->
