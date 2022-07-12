import fs, { read } from 'fs' // manipula os arquivos do sistema
import path from 'path' // para gerar o caminho para os arquivos
import chalk from 'chalk' // para colorir o console :)
import { catchError, filter, first, last, map, Observable, of, retry, Subject, Subscriber, take, throwError, timeout } from 'rxjs'

const isCSS = /.+\s*{\s*(.+:\s*.+;\s*)*}\s*/gmi // expressão regular para pegar arquivos CSS
const isHTML = /^<!DOCTYPE html>/ig // expressão regular para pegar arquivos HTML

const files: string[] = [
  path.join(__dirname, 'texto1.txt'),
  path.join(__dirname, 'html1.html'),
  path.join(__dirname, 'css1.scss'),
  path.join(__dirname, 'texto2.txt'),
  path.join(__dirname, 'html2.html'),
  path.join(__dirname, 'css2.css'),
  path.join(__dirname, 'texto3.txt'),
  path.join(__dirname, 'html3.html'),
  path.join(__dirname, 'css3.css'),
  path.join(__dirname, 'texto4.txt'),
  path.join(__dirname, 'html4.html'),
  path.join(__dirname, 'css4.css'),
  path.join(__dirname, 'css4.css'),
  path.join(__dirname, 'js1.js'),
]

// receber o caminho dos arquivos que precisam ser lidos e retornados
function readFiles(arquivos: string[], hot: boolean) {
  const leitorDeArquivos$: Observable<string> = new Observable((subscriber: Subscriber<string>) => {
    // 1° Estágio: Sucesso (next) -> Ele conseguiu enviar os dados com sucesso
    // 2° Estágio: Erro (error) -> Algum problema ocorreu na execução do Observable
    // 3° Estágio: Concluído (complete) -> Termina de enviar todos os dados do Observable

    // 1° - Percorrer o array de arquivos e fazer a leitura deles
    let i = 0

    const idInterval = setInterval(() => {
      if (i > arquivos.length - 1) {
        /**
         * quando a função complete for chamada, significa que o observables já te
         * enviou todos os dados com sucesso e não há mais nada para enviar
         */
        subscriber.complete()

        // clearInterval irá parar a execução do setInterval, evitando
        // que ela seja infinito
        clearInterval(idInterval)
      } else {
        try {
          /**
           * a função readFileSync do fs faz a leitura de um arquivo
           * de maneira síncrona e retorna o conteúdo do arquivo como uma string
           */
          const arquivo = arquivos[i]
          const conteudoArquivo = fs.readFileSync(arquivo, { encoding: 'utf-8' })
  
          // a função é responsável por informar que ocorreu sucesso no observable
          // enviando para os observadores
          subscriber.next(conteudoArquivo)
        } catch (error) {
          /**
           * O error é chamado quando acontece algum problema na fonte de dados
           * Quando ele é chamado, a execução do Observable para automaticamente
           */
          subscriber.error(error)
        }
      }

      i++
    }, 3000)
  })

  if (hot == true) {
    const subLeitor$: Subject<string> = new Subject()
    leitorDeArquivos$.subscribe(subLeitor$)

    return subLeitor$
  }

  return leitorDeArquivos$
}

const leitor$ = readFiles(files, true)

/**
 * No momento que a função subscribe é executada, eu estou
 * falando para a fonte de dados que há um novo Observador
 * daqueles dados, ou seja, mais um lugar que a stream de dados
 * deve enviar esses dados
 */

/**
 * 1° -> Sucesso (next)
 * 2° -> Erro (error)
 * 3° -> Concluído (complete)
 */
leitor$
.pipe(
/*   map((conteudo) => {
    return conteudo.length
  }),
  map((qtdCaracteres) => {
    return qtdCaracteres * 3
  }) */
/*   filter((conteudo) => {
    return isCSS.test(conteudo)
  }) */
  /* filter((conteudo) => {
    return isHTML.test(conteudo)
  }),
  map((html) => {
    return html.length
  }) */
  // take(1)
  // first()
  /* first((conteudo) => {
    return !isCSS.test(conteudo) && !isHTML.test(conteudo)
  }) */
  // last()
  /* last((conteudo) => {
    return isHTML.test(conteudo)
  }) */
  /* catchError((erro) => {
    console.log(chalk.italic(chalk.red('ERRO OCORREU NO OBSERVABLE')))

    // return of(erro)
    return throwError(erro)
  }) */
  // retry(5)
  timeout(5000)
)
.subscribe(
  // next
  (conteudoArquivo) => {
    console.log(chalk.green('SUB 1 - Texto lido com sucesso!\n'))
    console.log(conteudoArquivo + '\n')
  },
  // error
  (erro) => {
    console.log(chalk.red('Ocorreu um erro na execução\n'))
    console.log(erro)
  },
  //complete
  () => {
    console.log(chalk.blue('Todos os arquivos foram lidos :)'))
  }
)
