const express = require('express')
const router = express.Router()
const axios = require('axios');
router.get('/', async (req, res) => {
    let final = [];
    const pageCurrent = 30;
    for(let index = pageCurrent; index < pageCurrent+10; index++){
        console.log("index ", index);
        const data = await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${index}`);
        const fakeData = JSON.parse(JSON.stringify(data.data));    
        for(let i = 0; i < fakeData.items.length; i++) {
            try {
                console.log(`fakeData.items[${i}].slug `, fakeData.items[i].slug);  
                let temp = await axios.get(`https://ophim1.com/phim/${fakeData.items[i].slug}`);
                let obj = {
                    ...temp.data.movie, episodes: temp.data.episodes
                }
                delete obj._id;
                delete obj.modified;
                final.push(obj);
            } catch (errors) {
                console.log("ERROR: ", errors);
            }
        }
    }
    return res.status(200).json({data: final});
})

router.get('/hoat-hinh', async (req, res) => {
    let final = [];
    const pageCurrent = 81;
    const step = 20;
    for(let index = pageCurrent; index < pageCurrent + step; index++){
        console.log("index ", index);
        const data = await axios.get(`https://ophim.tv/_next/data/m5wySfMXDukfAvbiXTiQO/danh-sach/hoat-hinh.json?page=${index}&slug=hoat-hinh`);
        const fakeData = JSON.parse(JSON.stringify(data.data.pageProps.data)); 
        for(let i = 0; i < fakeData.items.length; i++) {
            try {
                console.log(`fakeData.items[${i}].slug `, fakeData.items[i].slug);  
                let temp = await axios.get(`https://ophim1.com/phim/${fakeData.items[i].slug}`);
                let obj = {
                    ...temp.data.movie, episodes: temp.data.episodes
                }
                delete obj._id;
                delete obj.modified;
                final.push(obj);
            } catch (errors) {
                console.log("ERROR: ", errors);
            }
        }
    }
    return res.status(200).json({data: final});
})

router.get('/phim-le', async (req, res) => {
    let final = [];
    const pageCurrent = 1;
    const step = 50;
    for(let index = pageCurrent; index < pageCurrent + step; index++){
        console.log("index ", index);
        const data = await axios.get(`https://ophim.tv/_next/data/m5wySfMXDukfAvbiXTiQO/danh-sach/phim-le.json?page=${index}&slug=hoat-hinh`);
        const fakeData = JSON.parse(JSON.stringify(data.data.pageProps.data)); 
        for(let i = 0; i < fakeData.items.length; i++) {
            try {
                console.log(`fakeData.items[${i}].slug `, fakeData.items[i].slug);  
                let temp = await axios.get(`https://ophim1.com/phim/${fakeData.items[i].slug}`);
                let obj = {
                    ...temp.data.movie, episodes: temp.data.episodes
                }
                delete obj._id;
                delete obj.modified;
                final.push(obj);
            } catch (errors) {
                console.log("ERROR: ", errors);
            }
        }
    }
    return res.status(200).json({data: final});
})

module.exports = router;