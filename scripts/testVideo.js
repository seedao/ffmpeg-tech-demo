var ffmpeg = require('ffmpeg');
const video = require('ffmpeg/lib/video');
// try {

//   var process = new ffmpeg('./example.mp4');
//   console.log('inputfile');

//   process.then(function (video) {

//     console.log('The video is ready to be processed');

//     var watermarkPath = './DeSchool.png',
//       newFilepath = '../output/video-com-watermark.mp4',

//       settings = {
//         position: "SE" // Position: NE NC NW SE SC SW C CE CW 
//         , margin_nord: null // Margin nord 
//         , margin_sud: null // Margin sud 
//         , margin_east: null // Margin east 
//         , margin_west: null // Margin west 
//       };

//     var callback = function (error, files) {
//       if (error) {
//         console.log('ERROR: ', error);
//       }
//       else {
//         console.log('TERMINOU', files);
//       }
//     }

//     //add watermark 
//     video.fnAddWatermark(watermarkPath, newFilepath, settings, callback)

//   }, function (err) {
//     console.log('Error: ' + err);
//   });
// } catch (e) {
//   console.log(e.code);
//   console.log(e.msg);
// } 
try {
	new ffmpeg('./example.mp4', function (err, video) {
		if (!err) {
			console.log('The video is ready to be processed');
		} else {
			console.log('Error: ' + err);
		}
	});
} catch (e) {
	console.log(e.code);
	console.log(e.msg);
}