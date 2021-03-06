import {ExplorerLayout as Explorer} from './Explorer';
import React from 'react';
import ReactDOM from 'react-dom';
import {json} from 'd3';

(window.onpopstate = function () {
    var match,
        pl = /\+/g, // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); },
        query = window.location.search.substring(1);

    const urlParams = {};
    while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }
    function jsonToQueryString (json) {
        return '?' +
           Object.keys(json).map(function (key) {
               return encodeURIComponent(key) + '=' +
                   encodeURIComponent(json[key]);
           }).join('&');
    }

    // My code
    function renderPage (data) {
        ReactDOM.render(<Explorer images={data.data} totalImagesForQuery={data.total} pageNumber={data.pageNumber} pageSize={data.pageSize} totalPages={data.totalPages} tagged={urlParams.tagged === 'true'} loadMore={loadImages}/>, document.querySelector('body'));
    }

    let searchQuery = urlParams.tagged === 'true' ? { params: JSON.stringify({'hasManualData': true}) } : { params: JSON.stringify({ hasManualData: { $exists: false } }) };
    let pageSize = 100;
    function loadImages (totalLoadedImages, callback) {
        loadImages.query.pageNumber = parseInt(totalLoadedImages / pageSize);
        json('/api/v1/images' + jsonToQueryString(loadImages.query), (err, images) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(images[0]);
            setTimeout(callback, 0, err, images);
        });
    }
    loadImages.query = searchQuery;
    loadImages.query.pageSize = pageSize;

    loadImages(0, (err, images) => {
        if (err) {
            window.alert('Error loading images');
            return;
        }
        renderPage(images);
    });
})();
