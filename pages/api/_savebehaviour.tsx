// // import middleware from '../../helpers/middleware';
// import {default as db} from '../../db';
//
// const progressBar: HTMLElement | null = document.getElementById('progress-bar');
//
// // 定义 MongoDB 数据模型
// const DataModel = mongoose.model('Data', {
//     value: String,
// });
//
// export default async function handler(req, res) {
//     const {ID, Owner, Repo}: RequestBody = req.body;
//     try {
//         const response = await fetch('https://example.com/data');
//         const reader = response.body.getReader();
//         const contentLength = +response.headers.get('Content-Length');
//
//         let receivedLength = 0;
//         const chunks = [];
//         while (true) {
//             const { done, value } = await reader.read();
//
//             if (done) break;
//
//             chunks.push(value);
//             receivedLength += value.length;
//
//             // 更新进度条
//             if (progressBar && contentLength) {
//                 const progress = Math.round((receivedLength / contentLength) * 100);
//                 progressBar.style.width = `${progress}%`;
//             }
//         }
//
//         // 合并接收到的数据块
//         const responseData = new Uint8Array(receivedLength);
//         let position = 0;
//         for (const chunk of chunks) {
//             responseData.set(chunk, position);
//             position += chunk.length;
//         }
//         const responseText = new TextDecoder().decode(responseData);
//
//         // 将返回值存储在 MongoDB 数据库中
//         const data = new DataModel({ value: responseText });
//         await data.save();
//
//         // 返回结果给前端
//         res.status(200).json({ success: true, message: 'Data saved successfully.' });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ success: false, message: 'An error occurred.' });
//     }
// }
