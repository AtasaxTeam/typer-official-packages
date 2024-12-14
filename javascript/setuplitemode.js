async (data) => { 
    await execute('typer-import', 'typer-import https://grosik.ovh/cdn/typer/clearsettings')
    let cmd = await execute('clearsettings', ''); cmd = cmd.replace('revert default settings', 'setup lite mode')
    if(cmd.includes('rerun')) return cmd
    log(cmd)
    log(await execute('tcm-install', 'tcm-install aliases'))
    execute('aliases', '')
    log('Set aliases')
    execute('set', 'set global-cmdwrite false');
    log('Turned command remembering off')
    localStorage.setItem('typer/preasm', 'cursor-off;')
    execute('tcm-install', 'tcm-install cursor-off')
    log('Turned cursor blinking off')
    execute('set', 'set global-prefixindicator blue')
    setTimeout(() => {
         execute('restart', '') 
    }, 5000); 
    return 'Everything set. The page will reload in 5 seconds.'
}
