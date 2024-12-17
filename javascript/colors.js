async (data) => {

    if(data.split(' ')[0] == 'url') {

        if(document.getElementById('colors') == undefined) {
            const h = document.createElement('style');
            h.id = 'colors'
            document.head.append(h);
        }

        let f = (await fetch(data.split(' ')[1]))
        if(f.status !== 200) return `${t('warn')}Code ${f.status}${t('end')}`

        let d = (await f.text()).split('\n')
        d.forEach(l => {
            let name = l.split(' ')[0]
            let color = l.split(' ')[1]
        
            const h = document.getElementById('colors')
            h.innerHTML += `.${name} { color: ${color}; }`
            placeholders[`{${name}}`] = color;
        
            return `Color name <b class="${name}">${name}</b> is now binded to <b class="${name}">${color}</b>.`
        })


    } else {
        let name = data.split(' ')[0]
        let color = data.split(' ')[1]
    
        if(document.getElementById('colors') != undefined) {
            const h = document.getElementById('colors')
            h.innerHTML += `.${name} { color: ${color}; }`
        } else {
            const h = document.createElement('style');
            h.id = 'colors'
            h.innerHTML = `.${name} { color: ${color}; }`
            document.head.append(h);
        }
    
        placeholders[`{${name}}`] = color;
    
    
        return `Color name <b class="${name}">${name}</b> is now binded to <b class="${name}">${color}</b>.`
    }

}
