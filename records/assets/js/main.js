async function getSongs() {
    let songs = await fetch('./songs.json');
    songs = await songs.json();
    return songs
}

getSongs().then(songs => {
    songs.forEach(song => {
        setTimeout(() => {
            songss(song)
        }, song * 200);
    })
})

function songss(song) {
    const releases = document.querySelector('.releases');

    const release = document.createElement('a');
    release.setAttribute('class', 'release');
    release.setAttribute('href', song.url);
    release.setAttribute('target', '_blank');

    const cover = document.createElement('img');
    cover.setAttribute('class', 'cover');
    cover.setAttribute('src', song.image);

    const name = document.createElement('p');
    name.innerText = song.name;

    const br = document.createElement('br');

    release.append(cover);
    release.append(name);
    releases.append(release);
    releases.append(br);
}