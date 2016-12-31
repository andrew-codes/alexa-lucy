import React from 'react';

export default (title, body) => (
    <html>
    <head>
        <title>{title}</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
    </head>
    <body style={{margin: 0}}>
    <div id="root">{body}</div>
    <script src="/public/js/bundle.js" />
    </body>
    </html>
);
