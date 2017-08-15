import {ExplorerLayout as Explorer} from './Explorer';
import React from 'react';
import ReactDOM from 'react-dom';
import {json} from 'd3';

function renderPage (data) {
    ReactDOM.render(<Explorer images={data}/>, document.querySelector('body'));
}

json('/api/v1/images', (err, images) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(images[0]);
    setTimeout(renderPage, 0, images);
});
