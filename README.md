# 世界同一刻：二戰前後三洲 3D 時間軸

一個免後端、可直接部署到 GitHub Pages 的互動式歷史教材。以 1935–1955 為範圍，同步比較亞洲、歐洲與美洲的重要事件、政治領導人及政經議題。

## 線上瀏覽

[開啟 GitHub Pages 網站](https://educatres.github.io/timeline-wwii/)

## 特色

- 三條同步 3D 時間軸
- 拖曳、滑鼠滾輪、方向鍵與年份滑桿操作
- 事件卡片可翻面，正面看摘要、背面看人物與政經脈絡
- 每年自動產生三洲「年度快照」與課堂提問
- 純 HTML／CSS／JavaScript，無須帳號、資料庫或建置工具
- 手機、平板與桌機皆可使用

## 使用方式

1. 將整個專案推送到 GitHub repository。
2. 到 Settings → Pages。
3. Source 選擇 `Deploy from a branch`，指定 `main` 與 `/ (root)`。
4. 儲存後等待 GitHub Pages 網址產生。

## 修改內容

所有事件資料位於 `data.js` 的 `EVENTS` 陣列。每筆資料包含：

```js
{
  id: '唯一代碼',
  region: 'asia | europe | americas',
  year: 1945,
  date: '1945.08',
  type: 'event | leader | economy',
  title: '事件名稱',
  summary: '卡片正面摘要',
  leaders: ['人物一', '人物二'],
  context: '卡片背面脈絡',
  impact: '教學重點',
  source: '資料來源網址'
}
```

## 教學提醒

本教材以跨區比較為核心，不宜把單一事件視為只有一個原因。建議教師搭配原始史料、地圖與不同觀點，引導學生區分事實、解釋與評價。
