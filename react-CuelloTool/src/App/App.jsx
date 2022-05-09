import React from 'react';

import { GetRequest, GetRequestHooks, GetRequestAsyncAwait, GetRequestErrorHandling, GetRequestSetHeaders } from './';

class App extends React.Component {
    render() {
        return (
            <div>
                <h3 className="p-3 text-center">pc-borusia team</h3>
                <GetRequest repoName="post-purchase-returns-frontend" />
                <GetRequest repoName="returns-middle-end" />
                <GetRequest repoName="returns-shipping-wrapper"/>
                <GetRequest repoName="mediations-actions"/>
                <GetRequest repoName="post-purchase-pdd-controller"/>
                <GetRequest repoName="post-purchase-returns-api" />


           {/*   <GetRequestHooks />
                <GetRequestAsyncAwait />
                <GetRequestErrorHandling />
                <GetRequestSetHeaders />
           */}
            </div>
        );
    }
}

export { App }; 