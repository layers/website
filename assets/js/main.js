const _YTAPI = 'AIzaSyDzBAZLbduXO_4ptWc9RwLucp7eTLDKRvE';

const channels = ['UCnWT-K6shcsSkfJGkpYZC1w', 'UCHj5hxvySHFSuCRhS94XMWw', 'UCtDVW57Gfj3FoGMJYs9IPbA'];

channels.forEach((c, value) => {
    setTimeout(() => {
        newChannel(c);
    }, value * 200);
})

function newChannel(id) {
    getInfo(id).then(info => {

        const wrapper = document.querySelector('.wrapper');
        const footer = document.querySelector('.footer');
    
        const channel = document.createElement('div')
        channel.setAttribute('class', 'channel');
    
        const pfp = document.createElement('img');
        pfp.setAttribute('class', 'pfp');
        pfp.setAttribute('src', info.pfp);
    
        const name = document.createElement('p');
        name.setAttribute('class', 'name');
        name.innerText = info.name;
    
        const subs = document.createElement('p');
        subs.setAttribute('class', 'text');
        subs.innerText = `${info.subs} subscribers`;
    
        const views = document.createElement('p');
        views.setAttribute('class', 'text');
        views.innerText = `${info.views} views`;
    
        const videos = document.createElement('p');
        videos.setAttribute('class', 'text');
        videos.innerText = `${info.videos} videos`;
    
    
        channel.appendChild(pfp);
        channel.appendChild(name);
        channel.appendChild(subs);
        channel.appendChild(views);
        channel.appendChild(videos);
    
        wrapper.insertBefore(channel, footer)
    })
}

function getInfo(id) {
    return new Promise((resolve, reject) => {
        if (!id) return;
        fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${id}&key=${_YTAPI}`).then(res => {
            if (!res.ok) reject();
            res.json().then(r => {
                const pfp = r.items[0].snippet.thumbnails.high.url;
                const name = r.items[0].snippet.title;
                const subs = Number(r.items[0].statistics.subscriberCount).toLocaleString();
                const videos = Number(r.items[0].statistics.videoCount).toLocaleString();
                const views = Number(r.items[0].statistics.viewCount).toLocaleString();
                resolve({pfp, name, subs, videos, views});
            });
        });
    })
}