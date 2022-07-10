import fs from 'fs'
import path from 'path';
import {  } from 'rxjs';
import chalk from 'chalk'

const isCSS = /.+\s*{\s*(.+:\s*.+;\s*)*}\s*/gmi
const isHTML = /^<!DOCTYPE html>/ig

const filePaths: string[] = [
  path.join(__dirname, 'arquivo1.txt'),
  path.join(__dirname, 'arquivo2.html'),
  path.join(__dirname, 'arquivo3.css'),
  path.join(__dirname, 'arquivo4.txt'),
]

function readFiles() {

}