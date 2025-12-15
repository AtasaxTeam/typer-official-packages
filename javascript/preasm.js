async (data) => {
  let sbcmd = data.split(' ')[1];
  let as = await localStorage.getItem('typer/preasm') ? await localStorage.getItem('typer/preasm') : '';
  let cmd = data.length > 7 ? data.replace(`preasm ${sbcmd} `, '') : '';
  switch(sbcmd) {
    case 'add':
      if(cmd=='') return 'You need to provide a command!';
      localStorage.setItem('typer/preasm', `${as}${cmd};`);
      return `Added ${cmd} to pre-autostart`;
    case 'ls':
    case 'list':
      return (await localStorage.getItem('typer/preasm') ? await localStorage.getItem('typer/preasm').split(';').join('\\n').replaceAll('<', ';') : 'No commands found');
    case 'rm':
    case 'remove':
      if(cmd=='') return 'You need to provide a command!';
      if(as == '') return 'No commands in pre-autostart';
      as = as.replaceAll(`${cmd};`, '');
      localStorage.setItem('typer/preasm', as);
      return `Removed every instance of ${cmd} from pre-autostart`;
    case 'help':
      return typerDesign.help.menu('preasm', {
        'add': 'adds a command to pre-autostart',
        'list': { text: 'lists all commands in pre-autostart', alias: ['ls'] },
        'remove': { text: 'removes all instances of a command from pre-autostart'}
      })
    default:
      return typerDesign.error.syntax('preasm')
  }
}
