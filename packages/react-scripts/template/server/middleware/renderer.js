import React from 'react'
import Loadable from 'react-loadable';
import ReactDOMServer from 'react-dom/server'

import App from '../../src/App'
import { isModuleSpecifier } from '@babel/types';

const path = require('path')
const fs = require('fs')

// import the manifest generated with the create-react-app build
import manifest from '../../build/asset-manifest.json';
/*
const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k])
*/
const extractAssets = (assets, chunks) => {
    return(
        Object.keys(assets)
        .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
        .map(k => assets[k])
    )
}

export default (req, res, next) => {
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html')
    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if(err) {
            console.error('Error: ', err)
            return res.status(404).end()
        }

        const modules = []

        const html = ReactDOMServer.renderToString(
            <Loadable.Capture report={m => modules.push(m)}>
                <App />
            </Loadable.Capture>
        )

        const extraChunks = extractAssets(manifest, modules)
            .map(chunk => `<script type="text/javascript" src="/${chunk}"></script>`)

        return res.send(
            htmlData
                .replace(
                    '<div id="root"></div>',
                    `<div id="root">${html}</div>`
                )
                .replace('</body>', extraChunks.join('') + '</body>')
        )
    })
}