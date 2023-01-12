/**
 * DownloadStaticFile.jsx
 * Created by Brian Petway 01/12/23
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

const DownloadStaticFile = () => (
    <div className="download_static-file__container">
        <FontAwesomeIcon data-href="/data/data-sources-download.pdf" icon={faFileDownload} />
        <a
            href="/data/data-sources-download.pdf"
            target="_blank"
            aria-labelledby="atd__download-span"
            aria-label="Download"
            title="Download"
            rel="noopener noreferrer"
            download>
            Download
        </a>
    </div>);

export default DownloadStaticFile;
