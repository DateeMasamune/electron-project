(async () => {
  const response = await window.versions.ping()
  console.log('window.versions', window.versions);
  console.log(response, 'response') // получаем информацию от основного процесса
})()