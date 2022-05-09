import React from 'react';

class GetRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            totalReactPackages: null,
            repoName: props.repoName
        };
    }

    componentDidMount() {
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var formdata = new FormData();
        
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/user/:"+this.state.repoName)
            .then(response => response.text())
            .then(result => this.setState({ totalReactPackages: result }))
            .catch(error => console.log('error', error));
    }

    render() {
        const { repoName } = this.props;
        console.log("aca: " + repoName);

        const { totalReactPackages } = this.state;
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">{repoName}</h5>
                <div className="card-body">
                    <p>Environments y Versiones:</p>
                     {totalReactPackages}
                </div>
            </div>
        );
    }
}

export { GetRequest }; 