import fs from 'fs' // manipula os arquivos do sistema
import path from 'path' // para gerar o caminho para os arquivos
import chalk from 'chalk' // para colorir o console :)
import { Observable } from 'rxjs'

const isCSS = /.+\s*{\s*(.+:\s*.+;\s*)*}\s*/gmi // expressão regular para pegar arquivos CSS
const isHTML = /^<!DOCTYPE html>/ig // expressão regular para pegar arquivos HTML

const files: string[] = [
  path.join(__dirname, 'texto1.txt'),
  path.join(__dirname, 'html1.html'),
  path.join(__dirname, 'css1.css'),
  path.join(__dirname, 'texto2.txt'),
  path.join(__dirname, 'html2.html'),
  path.join(__dirname, 'css2.css'),
  path.join(__dirname, 'texto3.txt'),
  path.join(__dirname, 'html3.html'),
  path.join(__dirname, 'css3.css'),
  path.join(__dirname, 'texto4.txt'),
  path.join(__dirname, 'html4.html'),
  path.join(__dirname, 'css4.css'),
]

function readFiles() {
  
}
