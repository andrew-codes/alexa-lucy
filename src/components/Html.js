import React from 'react';

export default (title, body) => (
    <html>
    <head>
        <title>{title}</title>
    </head>
    <body>
    <div id="root">{body}</div>
    <script src="/public/js/bundle.js" />
    </body>
    </html>
);
