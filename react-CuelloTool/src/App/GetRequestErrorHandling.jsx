import React from 'react';

class GetRequestErrorHandling extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            totalReactPackages: null,
            errorMessage: null
        };
    }

    componentDidMount() {
        // GET request using fetch with error handling
        fetch('https://api.npms.io/v2/invalid-url')
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                this.setState({ totalReactPackages: data.total })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    render() {
        const { errorMessage } = this.state;
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">GET Request with Error Handling</h5>
                <div className="card-body">
                    Error message: {errorMessage}
                </div>
            </div>
        );
    }
}

export { GetRequestErrorHandling }; 