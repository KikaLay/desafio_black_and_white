const yargs = require('yargs')
const child = require('child_process')
const key = 123
yargs
  .command(
    'login',
    'Comando para acceder al Servidor',
    {
      key: {
        describe: 'key',
        demand: true,
        alias: 'k',
      },
    },
    (args) => {
      if (args.key === key) {
        child.exec('node index.js', (err, stdout) => {
          console.log('Bienvenido !!!!')
          if (err) console.log(err)
          else console.log(stdout)
        })
      } else {
        console.log('Key incorrecta')
      }
    }
  )
  .help().argv
