export interface PostData {
    id: string;                // 檔名當作 id
    title: string;             // 文章標題
    date: string;              // 從 frontmatter 來的日期，通常存成字串再轉換成 Date
    contentMarkdown: string;   // 文章的 Markdown 內容
    tags?: string[];           // 可選，多個標籤
    category?: string;         // 可選，單一分類
}
