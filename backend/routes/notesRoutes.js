// const express = require('express');
// const zmq = require('zeromq');

// const router = express.Router();

// async function sendRequestToNoteService(action, data={}) {
//     const socket = new zmq.Request();
//     socket.connect('tcp://localhost:6000');

//     const request = { action, ...data };
//     await socket.send(JSON.stringify(request));

//     const responseBuffer = await socket.receive();
//     const response = JSON.parse(responseBuffer.toString());
//     return response;
// }

// router.post('/', async (req, res) => {
//     const { recipeId, content, author } = req.body;

//     try {
//         const response = await sendRequestToNoteService('create', { content, author });
//         res.status(201).json({ note: { ...response.note, recipeId } });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// router.get('/', async (req, res) => {
//     try {
//         const response = await sendRequestToNoteService('getAll', {});
//         res.status(200).json({ notes: response.notes });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// })

// module.exports = router;