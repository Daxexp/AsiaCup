addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  return new Response(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AsiaCup.🔴LIVE.Stream</title>
        <link href="https://vjs.zencdn.net/7.11.4/video-js.css" rel="stylesheet">
        <link rel="icon" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjr4GUPAZTXRhJlUZzIKl-y6aBrnpiAH8Mhw&s" type="image/png">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #70e1f5, #ffd194, #f5a9b8);
            background-size: 400% 400%;
            animation: waveAnimation 30s ease-in-out infinite;
            height: 100vh;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: relative;
          }
          @keyframes waveAnimation {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }
          .title-image {
            width: 100%;
            max-width: 800px;
            height: auto;
            margin-top: 20px;
            margin-bottom: 20px;
            border: 5px solid #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          .button-container {
            text-align: center;
            margin-bottom: 20px;
          }
          .play-button {
            font-size: 1.2rem;
            padding: 15px 25px;
            border: 2px solid transparent;
            background-color: #dc3545;
            color: white;
            border-radius: 12px;
            cursor: pointer;
            position: relative;
            transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), inset 0 -2px 5px rgba(0, 0, 0, 0.2);
          }
          .play-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border: 2px solid #dc3545;
            border-radius: 12px;
            transform: translate(-50%, -50%) scale(1);
            transition: transform 0.3s ease;
            z-index: 0;
          }
          .play-button:hover::before {
            transform: translate(-50%, -50%) scale(1.1);
          }
          .play-button:hover {
            background-color: #c82333;
            transform: scale(1.05);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4), inset 0 -2px 5px rgba(0, 0, 0, 0.3);
          }
          .play-button span {
            position: relative;
            z-index: 1;
          }
          .video-container {
            width: 360px;
            height: 180px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 5px solid #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          .video-js {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
          .watermark-container {
            position: absolute;
            bottom: 10px;
            right: 10px;
            width: 100px;
            height: auto;
            opacity: 0.5;
          }
          .watermark {
            width: 100%;
            height: auto;
          }
          .new-watermark-container {
            position: absolute;
            bottom: 10px;
            left: 10px;
            width: 100px;
            height: auto;
            opacity: 0.5;
            cursor: pointer;
          }
          .new-watermark-container img {
            width: 100%;
            height: auto;
          }
          .bottom-title-image {
            width: 100%;
            max-width: 800px;
            height: auto;
            margin-top: 20px;
            border: 5px solid #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          .audio-container {
            display: none;
            position: absolute;
            bottom: 60px;
            left: 50px;
            width: 0px; /* Adjust width as needed */
            height: 0px; /* Adjust height as needed */
            background: rgba(255, 255, 255, 0.9); /* 90% transparency */
            border: 5px solid #23fa02;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1;
          }
          .audio-container audio {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            display: block; /* Ensure the audio element is displayed */
            opacity: 0; /* Hide the controls */
          }
        </style>
      </head>
      <body>
        <img src="https://yt3.googleusercontent.com/FBDYMLdUJOXjFxM95-Cp7oe-_MwOJAL8W1p_3_9AHuE3Dp822gqDHhf1QlPjzR-P9yJMBF8_bA=w1138-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" alt="ASIA CUP" class="title-image">
        <div class="button-container">
          <button class="play-button" id="playButton"><span>Play Live Stream</span></button>
        </div>
        <div class="video-container" id="videoContainer" style="display: none;">
          <video id="videoPlayer" class="video-js vjs-default-skin" controls preload="auto" autoplay>
            <source src="https://d1kyt65q9mhz2w.cloudfront.net/cd5697ea4f494162b6dd3eec55fa99f0/index.m3u8" type="application/x-mpegURL">
            Your browser does not support the video tag.
          </video>
        </div>
        <a href="https://www.youtube.com/@AsianCricketCouncilTV/videos" target="_blank" class="watermark-container">
          <img src="https://yt3.googleusercontent.com/e0t0o4PcuPHRv5BO_XLEr725pBhoBoR2XenAh66kKH4Mtoxj6pWI1rjQBLo5IrnIi-xnJpi5NQ=s160-c-k-c0x00ffffff-no-rj" alt="Watermark" class="watermark">
        </a>
        <a href="#" class="new-watermark-container" id="newWatermark">
          <img src="data:image/jpeg;base64,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" alt="New Watermark">
        </a>
        <img src="https://yt3.googleusercontent.com/FBDYMLdUJOXjFxM95-Cp7oe-_MwOJAL8W1p_3_9AHuE3Dp822gqDHhf1QlPjzR-P9yJMBF8_bA=w1138-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" alt="2025" class="bottom-title-image">
        <div class="audio-container" id="audioContainer">
          <audio id="audioPlayer">
            <source src="https://" type="audio/mpeg">
            Your browser does not support the audio tag.
          </audio>
        </div>
        <script src="https://vjs.zencdn.net/7.11.4/video.min.js"></script>
        <script>
          document.getElementById('playButton').addEventListener('click', function() {
            document.querySelector('.button-container').style.display = 'none';
            document.getElementById('videoContainer').style.display = 'flex';
            var player = videojs('videoPlayer');
            player.ready(function() {
              player.play();
            });
          });

          document.getElementById('newWatermark').addEventListener('click', function() {
            var audioContainer = document.getElementById('audioContainer');
            var audioPlayer = document.getElementById('audioPlayer');

            if (audioContainer.style.display === 'none' || audioContainer.style.display === '') {
              audioContainer.style.display = 'block';
              audioPlayer.play();
            } else {
              audioPlayer.pause();
              audioContainer.style.display = 'none';
            }
          });

          // Disable right-click
          document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
          });
        </script>
      </body>
    </html>
  `, {
    headers: { 'content-type': 'text/html;charset=UTF-8' },
  });
}
