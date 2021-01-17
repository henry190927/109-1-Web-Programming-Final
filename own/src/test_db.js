const song = [
  {
    name: "正想著你呢",
    artist: "持修",
    album: "房間裡的大象",
    image: "https://i.kfs.io/album/global/65889785,1v2/fit/500x500.jpg",
    audio: new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Marshmello%20-%20Silence%20ft.%20Khalid.mp3") 
  }
]

const test_db = {
  song
}

export {test_db as default};