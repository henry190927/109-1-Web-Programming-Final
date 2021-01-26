# 109-1-Web-Programming-Final


## (Group 86) Musify
### Group Member / 組長：吳育嘉 / 組員：葉曜德

#### [DEMO LINK] https://www.youtube.com/watch?v=qicJlAjLPDM&feature=youtu.be
#### [DEPLOY LINK] 一直失敗沒有辦法deploy成功...

#### [執行方式]
~~~python
cd own
~~~
進到資料夾後分別執行 
~~~python
yarn server
~~~
~~~python
yarn start
~~~

#### [介紹]
  這個服務的目的是希望可以建立一個在線上的音樂播放器以及播放歌曲的介面，用戶可以瀏覽頁面上的不同的歌曲、創作者以及專輯的資訊，
  此外也能夠將喜歡的歌曲隨時加入或是移除自己的database，並且還能夠建立屬於自己的播放清單，並將建立好的播放清單publish到社群上，
  其他在線的用戶也能夠及時看到被廣播的播放清單，並且可以選擇是否要將播放清單加入自己的清單進行聆聽。透過簡單的介面設計可以讓用戶
  除了能夠在線聆聽音樂也能夠與其他用戶彼此分享各自的playlist
  
#### [使用方式]
- 簡單的登入介面
- 可以在瀏覽介面查看音樂、專籍
- 點選音樂的旁的加號可以將音樂加入自己的資料庫
- 可以利用search功能查詢歌曲、專輯、作家
  
#### [功能/實作]
 目前有完成的功能有：
 - 點選音樂可以在線播放
 - 音樂播放器的進度條效果
 - 可以在public的資料庫或是自己的database上進行搜尋的功能
 - 可以在public的資料庫中將加入或是移除音樂、專輯到自己的database中
 
 尚未實現的功能：
 - 音樂播放器左右切換
 - 用戶可以製作自己的播放清單
 - 用戶可以廣播自己的播放清單到media上
 - 用戶可以將廣播的播放清單加入到自己的播放清單中
 
 其他發想
 - 用戶可以針對每個播放清單進行評論、點讚等等
 - 用戶可以自行上傳音樂檔
 - 記錄不同用戶的聆聽習慣到資料庫中已更新瀏覽介面推薦給用戶的音樂種類
 
#### [架構/框架]
- frontend: React-js, React-hook, antd-icon-design
- backend: graphql, websocket
- database: mongodb
- other: apollo-server, apollo-client, 開源的圖片庫、mp3檔案

#### [專題製作心得]：

  葉曜德：這次的期末專題其實很遺憾由於時間上的問題並沒有做的完整，原本的打算是想做一個功能相對簡單並且
    與音樂播放有關的專案，但是中間花了太多時間在研究CSS框架還有關於audio在瀏覽器播放時的問題，
    導致後面真正想實現的目的沒有達成，音樂的資料庫也還很少，而且看到其他同學們的作品都相當的厲害就感到自慚形穢qq 
    可是整體來說還是覺得真的有從這堂課學到了很多東西的感覺，對於設計網路服務程式的我來說還是很開心能夠
    真正嘗試參與一個這樣的專案製作，之後打算二月考完試之後會繼續把想做來的東西完成
    
#### [其他資訊]
  組員貢獻：葉曜德：主要負責前端設計跟後端連接的程式寫作、找資料 吳育嘉：幫忙一點資料搜尋與資料庫的建立
